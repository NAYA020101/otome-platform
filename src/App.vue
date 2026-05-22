<template>
  <div class="app" :class="locale">
    <NavBar />
    <main class="main"><router-view /></main>
    <FooterBar />
    <AuthModal />
    <ToastBar :toasts="toasts" />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
import AuthModal from './components/AuthModal.vue'
import ToastBar from './components/ToastBar.vue'
import { useToast } from './stores/toast.js'

const locale = ref('zh')
const toggleLang = () => { locale.value = locale.value === 'zh' ? 'en' : 'zh' }

const { toasts } = useToast()
provide('locale', locale)
provide('toggleLang', toggleLang)

const tr = {
  navHome: { zh: '首页', en: 'Home' },
  navStories: { zh: '剧情库', en: 'Stories' },
  navCreate: { zh: '创作者中心', en: 'Creators' },
  navAI: { zh: 'AI 陪伴', en: 'AI' },
  navCommunity: { zh: '社区', en: 'Community' },
  navAbout: { zh: '关于', en: 'About' },
  heroTitle: { zh: '她写故事，她做定义，她自心动', en: 'She writes, she defines, she feels.' },
  heroSubtitle: { zh: '在乙女的世界里，她永远是主角', en: 'In every story, she is the protagonist.' },
  storiesTitle: { zh: '精选剧情', en: 'Featured Stories' },
  storiesSubtitle: { zh: '每一段叙事，都是一次心灵的共振', en: 'Every narrative resonates with the soul.' },
  storyCard1Tag: { zh: '反套路·奇幻', en: 'Anti-trope Fantasy' },
  storyCard1Title: { zh: '月光航线', en: 'Moonlight Voyage' },
  storyCard1Author: { zh: '鹿饮溪', en: 'Deer Creek' },
  storyCard1Desc: { zh: '她是船长，他是星际海盗。当权力天平倾斜，爱情不再是唯一的答案。', en: 'She is the captain. He is the pirate. Love is not the only answer.' },
  storyCard2Tag: { zh: '治愈·现代', en: 'Healing Modern' },
  storyCard2Title: { zh: '不存在的恋人', en: 'The Lover Who Never Was' },
  storyCard2Author: { zh: '月下独白', en: 'Monologue' },
  storyCard2Desc: { zh: '一段AI与人类的感情实验。当程序有了心跳，她选择转身走向现实。', en: 'An AI-human romance experiment. When the program learns to feel.' },
  storyCard3Tag: { zh: '古风·权谋', en: 'Historical Strategy' },
  storyCard3Title: { zh: '她的王朝', en: 'Her Dynasty' },
  storyCard3Author: { zh: '青黛', en: 'Indigo' },
  storyCard3Desc: { zh: '她不是等待拯救的公主，而是执棋之人。江山与挚爱，皆为棋子。', en: 'No princess waiting to be saved. She plays the game.' },
  storyMore: { zh: '阅读更多 →', en: 'Read More →' },
  creatorTitle: { zh: '创作者中心', en: 'Creator Center' },
  creatorsTagline: { zh: '每一位女性都是天生的叙事者。你的笔触，值得被看见。', en: 'Every woman is a born storyteller.' },
  aiTitle: { zh: 'AI 情感陪伴', en: 'AI Companion' },
  aiSubtitle: { zh: '不止于对话。她理解你的每一个情绪。', en: 'Beyond conversation. She understands.' },
  communityTitle: { zh: '社区共鸣', en: 'Community' },
  communitySubtitle: { zh: '和志同道合的灵魂相遇，让叙事的力量在此汇聚', en: 'Meet kindred spirits here.' },
  aboutLink: { zh: '了解更多关于本站 →', en: 'Learn more →' },
  authLogin: { zh: '登录', en: 'Log In' },
  authLoginTitle: { zh: '欢迎回来', en: 'Welcome Back' },
  authPhone: { zh: '手机号', en: 'Phone' },
  authCode: { zh: '验证码', en: 'Code' },
  authGetCode: { zh: '获取验证码', en: 'Get Code' },
  authCodeSent: { zh: '已发送', en: 'Sent' },
  authLoginBtn: { zh: '登录', en: 'Log In' },
  authAgreement: { zh: '我已阅读并同意', en: 'I agree to' },
  authUserAgreement: { zh: '《用户协议》', en: ' User Agreement' },
  authPrivacy: { zh: '《隐私政策》', en: ' Privacy Policy' },
  authAnd: { zh: '和', en: ' and ' },
  authRequired: { zh: '请勾选同意用户协议和隐私政策', en: 'Please agree to the terms' },
  authPhoneRequired: { zh: '请输入手机号', en: 'Enter phone number' },
  authCodeRequired: { zh: '请输入验证码', en: 'Enter code' },
  authLogout: { zh: '退出登录', en: 'Log Out' },
  profileTitle: { zh: '个人中心', en: 'Profile' },
  profileSave: { zh: '保存', en: 'Save' },
  profileSaved: { zh: '已保存', en: 'Saved' },
  profileMyWorks: { zh: '我的作品', en: 'My Works' },
  profileMyCollections: { zh: '我的收藏', en: 'Collections' },
  profileMyComments: { zh: '我的评论', en: 'Comments' },
  profileDrafts: { zh: '草稿箱', en: 'Drafts' },
  profileSettings: { zh: '账号设置', en: 'Settings' },
  profileLogout: { zh: '退出登录', en: 'Log Out' },
  profileDelete: { zh: '注销账号', en: 'Delete Account' },
  creatorLoginPrompt: { zh: '请先登录后开始创作', en: 'Log in to create' },
  creatorMyWorks: { zh: '我的作品', en: 'My Works' },
  creatorStoryTitlePlaceholder: { zh: '给你的故事取一个名字…', en: 'Name your story...' },
  creatorContentPlaceholder: { zh: '开始书写你的故事…', en: 'Start writing...' },
  creatorSave: { zh: '保存草稿', en: 'Save Draft' },
  creatorPreview: { zh: '预览', en: 'Preview' },
  creatorPublish: { zh: '发布作品', en: 'Publish' },
  creatorSaved: { zh: '草稿已保存', en: 'Saved' },
  storyFilterAll: { zh: '全部', en: 'All' },
  storyFilterOriginal: { zh: '原创', en: 'Original' },
  storyFilterFanwork: { zh: '同人', en: 'Fanwork' },
  storyFilterRomance: { zh: '浪漫', en: 'Romance' },
  storyFilterFantasy: { zh: '奇幻', en: 'Fantasy' },
  storyFilterModern: { zh: '现代', en: 'Modern' },
  storyFilterHistorical: { zh: '古风', en: 'Historical' },
  storyFilterHealing: { zh: '治愈', en: 'Healing' },
  storyUpdated: { zh: '更新', en: 'Updated' },
  gameTitle: { zh: '热门乙女游戏', en: 'Popular Games' },
  gameSubtitle: { zh: '收录市面主流乙女游戏作品', en: 'A collection of otome games' },
  gameCatCN: { zh: '国产', en: 'Chinese' },
  gameCatJP: { zh: '日本', en: 'Japanese' },
  gameCatKR: { zh: '韩国', en: 'Korean' },
  gameCatEN: { zh: '欧美', en: 'Western' },
  moodAll: { zh: '全部情绪', en: 'All Moods' },
  moodLonging: { zh: '眷恋', en: 'Yearning' },
  moodObsession: { zh: '执念', en: 'Obsession' },
  moodTragedy: { zh: '悲剧', en: 'Tragedy' },
  moodComfort: { zh: '治愈', en: 'Comfort' },
  moodDanger: { zh: '危险', en: 'Danger' },
  moodNostalgia: { zh: '怀旧', en: 'Nostalgia' },
  moodMelancholy: { zh: '忧郁', en: 'Melancholy' },
  moodIntimacy: { zh: '亲密', en: 'Intimacy' },
  moodYearning: { zh: '渴望', en: 'Yearning' },
  tipsTitle: { zh: '创作灵感', en: 'Tips' },
}

const t = (key) => tr[key]?.[locale.value] || key
provide('t', t)
provide('showToast', (msg) => { toasts.value.push({ id: Date.now(), message: msg, type: 'success' }); setTimeout(() => { toasts.value.shift() }, 2500) })
</script>
<style scoped>
.app{max-width:100%;overflow-x:hidden;min-height:100vh;display:flex;flex-direction:column}
.main{flex:1}
</style>
