<template>
  <div class="app" :class="locale">
    <NavBar />
    <main class="main">
      <router-view />
    </main>
    <FooterBar />
    <AuthModal />
    <ToastBar :toasts="toasts" />
  </div>
</template>

<script setup>
import { ref, provide, watch } from 'vue'
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
import AuthModal from './components/AuthModal.vue'
import ToastBar from './components/ToastBar.vue'
import { useToast } from './stores/toast.js'

const locale = ref('zh')
const toggleLang = () => { locale.value = locale.value === 'zh' ? 'en' : 'zh' }

const { toasts, show: showToast } = useToast()
provide('locale', locale)
provide('toggleLang', toggleLang)
provide('showToast', showToast)

const tr = {
  navHome: { zh: '首页', en: 'Home' },
  navStories: { zh: '剧情库', en: 'Stories' },
  navCreate: { zh: '创作者中心', en: 'For Creators' },
  navAI: { zh: 'AI 陪伴', en: 'AI Companion' },
  navCommunity: { zh: '社区', en: 'Community' },
  heroBrand: { zh: 'Her Tale', en: 'Her Tale' },
  heroTitle: { zh: '她写故事，她做定义，她自心动', en: 'She writes the story, she defines the rules, she follows her heart.' },
  heroSubtitle: { zh: '在乙女的世界里，她永远是主角', en: 'In the otome world, she is always the protagonist.' },
  heroCTA: { zh: '开始探索', en: 'Explore Now' },
  storiesTitle: { zh: '精选剧情', en: 'Featured Stories' },
  storiesSubtitle: { zh: '每一段叙事，都是一次心灵的共振', en: 'Every narrative, a resonance of souls' },
  storyCard1Tag: { zh: '反套路 · 奇幻', en: 'Anti-trope · Fantasy' },
  storyCard1Title: { zh: '月光航线', en: 'Moonlight Voyage' },
  storyCard1Author: { zh: '鹿饮溪', en: 'Deer Creek' },
  storyCard1Desc: { zh: '她是船长，他是星际海盗。当权力天平倾斜，爱情不再是唯一的答案。', en: 'She is the captain. He is the pirate. When power shifts, love is not the only answer.' },
  storyCard2Tag: { zh: '治愈 · 现代', en: 'Healing · Modern' },
  storyCard2Title: { zh: '不存在的恋人', en: 'The Lover Who Never Was' },
  storyCard2Author: { zh: '月下独白', en: 'Monologue' },
  storyCard2Desc: { zh: '一段AI与人类的感情实验。当程序有了心跳，她选择转身走向现实。', en: 'An AI-human romance experiment. When the program learns to feel, she chooses reality.' },
  storyCard3Tag: { zh: '古风 · 权谋', en: 'Historical · Strategy' },
  storyCard3Title: { zh: '她的王朝', en: 'Her Dynasty' },
  storyCard3Author: { zh: '青黛', en: 'Indigo' },
  storyCard3Desc: { zh: '她不是等待拯救的公主，而是执棋之人。江山与挚爱，皆为棋子。', en: 'No princess waiting to be saved. The kingdom and its lovers are her chess pieces.' },
  storyMore: { zh: '阅读更多 →', en: 'Read More →' },
  creatorTitle: { zh: '创作者中心', en: 'Creator Center' },
  creatorSubtitle: { zh: '每一位女性都是天生的叙事者。你的笔触，值得被看见。', en: 'Every woman is a born storyteller. Your voice deserves to be heard.' },
  creator1Title: { zh: '自由创作', en: 'Write Freely' },
  creator1Desc: { zh: '支持分支叙事、多结局、插画嵌入。打破线性叙事的边界。', en: 'Branching narratives, multiple endings, embedded illustrations.' },
  creator2Title: { zh: '版权保护', en: 'Rights Protected' },
  creator2Desc: { zh: '基于区块链的内容存证，每一份创作都有据可查，版权归属于你。', en: 'Blockchain-based verification. Every creation is traceable and yours.' },
  creator3Title: { zh: '读者共创', en: 'Co-create' },
  creator3Desc: { zh: '开放读者参与剧情走向投票、角色设定提案，让叙事成为集体实验。', en: 'Let readers vote on plot directions. Make storytelling collective.' },
  creator4Title: { zh: '创作联系', en: 'Connect' },
  creator4Desc: { zh: '加入她叙创作者社群，与志同道合的叙事者一起成长、交流、合作。', en: 'Join the Her Tale creator community to grow, share, and collaborate with fellow storytellers.' },
  creatorCTA: { zh: '开始创作', en: 'Start Creating' },
  aiTitle: { zh: 'AI 情感陪伴', en: 'AI Emotional Companion' },
  aiSubtitle: { zh: '不止于对话。她理解你的每一个情绪，陪你编织故事的每一帧。', en: 'Beyond conversation. She understands every emotion, weaving your story with you.' },
  ai1Title: { zh: '24/7 倾听者', en: '24/7 Listener' },
  ai1Desc: { zh: '任何时候，AI以温柔的姿态回应你的每一种情绪。', en: 'Anytime, anywhere. AI responds with gentleness to every emotion.' },
  ai2Title: { zh: '故事共创伙伴', en: 'Story Co-creator' },
  ai2Desc: { zh: '与AI一起脑暴剧情、打磨对白。你的创意永不停歇。', en: 'Brainstorm plots, refine dialogue with AI. Creativity never stops.' },
  ai3Title: { zh: '角色对话练习', en: 'Character Practice' },
  ai3Desc: { zh: '和故事中的角色「真实」对话，探索不同选择的叙事可能。', en: 'Have real conversations with your characters. Explore every possibility.' },
  aiCTA: { zh: '体验 AI 陪伴 →', en: 'Try AI Companion →' },
  communityTitle: { zh: '社区共鸣', en: 'Community' },
  communitySubtitle: { zh: '和志同道合的灵魂相遇，让叙事的力量在此汇聚', en: 'Meet kindred spirits. Let the power of narrative converge here.' },
  footerDesc: { zh: 'Her Tale 是一个以女性叙事为核心的乙女共创平台。以她为主角，以她的叙事为中心——由她定义，由她主导的浪漫叙事。', en: 'Her Tale is an otome co-creation platform centered on women\'s narratives. She is the protagonist, her story is the center.' },
  footerTagline: { zh: '她写故事，她做定义，她自心动', en: 'She writes the story. She sets the rules. She feels her own heartbeat.' },
  footerAbout: { zh: '关于', en: 'About' },
  footerTerms: { zh: '服务条款', en: 'Terms' },
  footerPrivacy: { zh: '隐私政策', en: 'Privacy' },
  footerFAQ: { zh: '常见问题', en: 'FAQ' },
  footerContact: { zh: '联系我们', en: 'Contact' },
  navAbout: { zh: '关于', en: 'About' },

  // Auth
  authLogin: { zh: '登录', en: 'Log In' },
  authLoginTitle: { zh: '欢迎回来', en: 'Welcome Back' },
  authPhone: { zh: '手机号', en: 'Phone Number' },
  authCode: { zh: '验证码', en: 'Verification Code' },
  authGetCode: { zh: '获取验证码', en: 'Get Code' },
  authCodeSent: { zh: '已发送', en: 'Sent' },
  authLoginBtn: { zh: '登录', en: 'Log In' },
  authAgreement: { zh: '我已阅读并同意', en: 'I have read and agree to' },
  authUserAgreement: { zh: '《用户协议》', en: ' User Agreement' },
  authPrivacy: { zh: '《隐私政策》', en: ' Privacy Policy' },
  authAnd: { zh: '和', en: ' and ' },
  authRequired: { zh: '请勾选同意用户协议和隐私政策', en: 'Please agree to the User Agreement and Privacy Policy' },
  authPhoneRequired: { zh: '请输入手机号', en: 'Please enter your phone number' },
  authCodeRequired: { zh: '请输入验证码', en: 'Please enter the verification code' },
  authSuccess: { zh: '登录成功', en: 'Login successful' },
  authLogout: { zh: '退出登录', en: 'Log Out' },

  // New auth strings
  authEmail: { zh: '邮箱', en: 'Email' },
  authPassword: { zh: '密码', en: 'Password' },
  authEmailLogin: { zh: '邮箱登录', en: 'Email Login' },
  authPhoneLogin: { zh: '手机登录', en: 'Phone Login' },
  authWechat: { zh: '微信登录', en: 'WeChat' },
  authForgot: { zh: '忘记密码', en: 'Forgot Password' },
  authResetPwd: { zh: '重置密码', en: 'Reset Password' },
  authNewPwd: { zh: '新密码', en: 'New Password' },
  authConfirmPwd: { zh: '确认密码', en: 'Confirm Password' },
  authDelete: { zh: '注销账号', en: 'Delete Account' },
  authDeleteConfirm: { zh: '确定要注销账号吗？此操作不可撤销。', en: 'Are you sure? This action cannot be undone.' },
  authPwdStrength: { zh: '密码强度', en: 'Password Strength' },
  authWeak: { zh: '弱', en: 'Weak' },
  authMedium: { zh: '中', en: 'Medium' },
  authStrong: { zh: '强', en: 'Strong' },

  // Profile
  profileTitle: { zh: '个人中心', en: 'Profile' },
  profileAvatar: { zh: '头像', en: 'Avatar' },
  profileName: { zh: '昵称', en: 'Name' },
  profileBio: { zh: '个人简介', en: 'Bio' },
  profileSave: { zh: '保存', en: 'Save' },
  profileSaved: { zh: '已保存', en: 'Saved' },
  profileMyWorks: { zh: '我的作品', en: 'My Works' },
  profileMyCollections: { zh: '我的收藏', en: 'Collections' },
  profileMyComments: { zh: '我的评论', en: 'Comments' },
  profileDrafts: { zh: '草稿箱', en: 'Drafts' },
  profileSettings: { zh: '账号设置', en: 'Settings' },
  profileLogout: { zh: '退出登录', en: 'Log Out' },
  profileChangePwd: { zh: '修改密码', en: 'Change Password' },
  profileDelete: { zh: '注销账号', en: 'Delete Account' },

  // Creator
  creatorLoginPrompt: { zh: '请先登录后开始创作', en: 'Please log in to start creating' },
  creatorMyWorks: { zh: '我的作品', en: 'My Works' },
  creatorNoWorks: { zh: '还没有作品，开始创作吧', en: 'No works yet. Start creating!' },
  creatorStoryTitlePlaceholder: { zh: '给你的故事取一个名字…', en: 'Name your story...' },
  creatorContentPlaceholder: { zh: '开始书写你的故事…', en: 'Start writing your story...' },
  creatorSave: { zh: '保存草稿', en: 'Save Draft' },
  creatorPreview: { zh: '预览', en: 'Preview' },
  creatorPublish: { zh: '发布作品', en: 'Publish' },
  creatorSaved: { zh: '草稿已保存', en: 'Draft saved' },

  tipsTitle: { zh: '创作灵感', en: 'Creative Tips' },
  tip1Title: { zh: '塑造令人心动的角色', en: 'Crafting Compelling Characters' },
  tip1Desc: { zh: '角色的魅力是故事的核心。深入了解角色背景故事的构建方法。', en: 'Characters are the heart of story. Learn to build layered characters.' },
  tip2Title: { zh: '叙事结构的艺术', en: 'The Art of Narrative Structure' },
  tip2Desc: { zh: '分支叙事、好感度系统、多结局设计——探索乙女游戏独特的叙事机制。', en: 'Branching narratives, affection systems, multiple endings.' },
  tip3Title: { zh: '视觉与音乐的力量', en: 'The Power of Visuals & Music' },
  tip3Desc: { zh: '美术风格与音乐配乐决定了游戏的氛围与情感基调。', en: 'Art style and music set the emotional tone.' },
  aboutLink: { zh: '了解更多关于本站 →', en: 'Learn more about us →' },
  creatorsTagline: { zh: '每一位女性都是天生的叙事者。你的笔触，值得被看见。', en: 'Every woman is a born storyteller. Your voice deserves to be heard.' },

  // Story detail
  creatorResource1Title: { zh: '自由创作', en: 'Write Freely' },
  creatorResource1Desc: { zh: '支持分支叙事、多结局、插画嵌入。', en: 'Branching narratives, multiple endings.' },
  creatorResource2Title: { zh: '版权保护', en: 'Rights Protected' },
  creatorResource2Desc: { zh: '基于区块链的内容存证。', en: 'Blockchain-based verification.' },
  creatorResource3Title: { zh: '读者共创', en: 'Co-create' },
  creatorResource3Desc: { zh: '开放读者参与剧情走向投票。', en: 'Let readers vote on plot directions.' },
  creatorResource4Title: { zh: '创作联系', en: 'Connect' },
  creatorResource4Desc: { zh: '加入她叙创作者社群。', en: 'Join the creator community.' },
  storyFilterAll: { zh: '全部', en: 'All' },
  storyFilterOriginal: { zh: '原创', en: 'Original' },
  storyFilterFanwork: { zh: '同人', en: 'Fanwork' },
  storyFilterRomance: { zh: '浪漫', en: 'Romance' },
  storyFilterFantasy: { zh: '奇幻', en: 'Fantasy' },
  storyFilterModern: { zh: '现代', en: 'Modern' },
  storyFilterHistorical: { zh: '古风', en: 'Historical' },
  storyFilterHealing: { zh: '治愈', en: 'Healing' },
  storyUpdated: { zh: '更新于', en: 'Updated' },
  gameTitle: { zh: '热门乙女游戏', en: 'Popular Otome Games' },
  gameSubtitle: { zh: '收录市面主流乙女游戏作品', en: 'A collection of popular otome games' },
  gameCatCN: { zh: '国产', en: 'Chinese' },
  gameCatJP: { zh: '日本', en: 'Japanese' },
  gameCatKR: { zh: '韩国', en: 'Korean' },
  gameCatEN: { zh: '欧美', en: 'Western' },
  moodAll: { zh: '全部情绪', en: 'All Moods' },
  moodLonging: { zh: '眷恋', en: 'Longing' },
  moodObsession: { zh: '执念', en: 'Obsession' },
  moodTragedy: { zh: '悲剧', en: 'Tragedy' },
  moodComfort: { zh: '治愈', en: 'Comfort' },
  moodDanger: { zh: '危险', en: 'Danger' },
  moodNostalgia: { zh: '怀旧', en: 'Nostalgia' },
  moodMelancholy: { zh: '忧郁', en: 'Melancholy' },
  moodIntimacy: { zh: '亲密', en: 'Intimacy' },
  moodYearning: { zh: '渴望', en: 'Yearning' },
}

const t = (key) => tr[key]?.[locale.value] || key

provide('locale', locale)
provide('t', t)
provide('toggleLang', toggleLang)
</script>

<style scoped>
.app{--bg:#F5F0EC;--bg2:#EDE6E0;--cw:#FAF8F6;--p:#C4A49C;--p2:#B49088;--pp:#D4C0B8;--r:#B48078;--t:#D8C8C0;--tx:#2A2220;--ts:#8A7A74;--tm:#B0A29C;--bd:#DCD2CC;--accent:#8A4A42;--accent-dim:#B48078;--ss:0 1px 8px rgba(42,34,32,.03);--sm:0 4px 20px rgba(42,34,32,.05);--sl:0 8px 32px rgba(42,34,32,.07);--tr:.5s cubic-bezier(.3,.5,.2,1);max-width:100%;overflow-x:hidden;min-height:100vh;display:flex;flex-direction:column}
.main{flex:1}
</style>
