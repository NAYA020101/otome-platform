<template>
  <div class="app" :class="locale">
    <NavBar />
    <main class="main">
      <router-view />
    </main>
    <FooterBar />
    <AuthModal />
    <ProfilePanel />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
import AuthModal from './components/AuthModal.vue'
import ProfilePanel from './components/ProfilePanel.vue'

const locale = ref('zh')
const toggleLang = () => { locale.value = locale.value === 'zh' ? 'en' : 'zh' }

const tr = {
  navHome: { zh: '首页', en: 'Home' },
  navStories: { zh: '剧情库', en: 'Stories' },
  navCreate: { zh: '创作者中心', en: 'For Creators' },
  navAI: { zh: 'AI 陪伴', en: 'AI Companion' },
  navCommunity: { zh: '社区', en: 'Community' },
  heroBrand: { zh: 'Ta・Xu', en: 'Her Tale' },
  heroTitle: { zh: '她写故事，她做定义，她自心动', en: 'She writes the story. She sets the rules. She feels her own heartbeat.' },
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
  footerDesc: { zh: '她叙 · Her Tale 是一个以女性叙事为核心的乙女共创平台。以她为主角，以她的叙事为中心——由她定义，由她主导的浪漫叙事。', en: 'Her Tale is an otome co-creation platform centered on women\'s narratives. She is the protagonist, her story is the center.' },
  footerTagline: { zh: '她写故事，她做定义，她自心动', en: 'She writes the story. She sets the rules. She feels her own heartbeat.' },
  footerAbout: { zh: '关于', en: 'About' },
  footerTerms: { zh: '服务条款', en: 'Terms' },
  footerPrivacy: { zh: '隐私政策', en: 'Privacy' },
  footerFAQ: { zh: '常见问题', en: 'FAQ' },
  footerContact: { zh: '联系我们', en: 'Contact' },
  footerCopyright: { zh: '© 2026 她叙 · Her Tale 保留所有权利', en: '© 2026 Her Tale · All Rights Reserved' },
}

const t = (key) => tr[key]?.[locale.value] || key

provide('locale', locale)
provide('t', t)
provide('toggleLang', toggleLang)
</script>

<style scoped>
.app{--bg:#FFF8F5;--bg2:#FFF0EC;--cw:#fff;--p:#F5D6D6;--p2:#E8B4B4;--pp:#E8D5E8;--r:#E8B4B4;--t:#E8D5E8;--tx:#5C4A5A;--ts:#A890A0;--tm:#CAB8C4;--bd:#F0E4E8;--ss:0 4px 20px rgba(154,120,140,.06);--sm:0 12px 40px rgba(154,120,140,.1);--sl:0 20px 60px rgba(154,120,140,.12);--rs:12px;--rm:20px;--rl:28px;--tr:.5s cubic-bezier(.25,.46,.45,.94);max-width:100%;overflow-x:hidden;min-height:100vh;display:flex;flex-direction:column}
.main{flex:1}
</style>
