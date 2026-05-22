<template>
  <!-- ====== HERO ====== -->
  <div class="ch">
    <div class="ch-inner reveal">
      <div class="ch-bc">
        <router-link to="/" class="pg-bcl">{{ t('navHome') }}</router-link>
        <span class="pg-bs">/</span>
        <span class="pg-bcc">{{ t('navCreate') }}</span>
      </div>
      <h1 class="ch-t">{{ t('creatorTitle') }}</h1>
      <p class="ch-s">{{ t('creatorsTagline') }}</p>
      <p class="ch-d">{{ locale==='zh' ? '在这里创作、存档、分享属于你的乙女叙事' : 'Create, archive, and share your otome stories here' }}</p>
    </div>
  </div>

  <div class="pg">
    <!-- ====== ARCHIVE STATS ====== -->
    <div class="stats reveal">
      <div class="stat-item"><span class="stat-n">217</span><span class="stat-l">{{ locale==='zh' ? '作品收录' : 'Games' }}</span></div>
      <div class="stat-item"><span class="stat-n">1,483</span><span class="stat-l">{{ locale==='zh' ? '角色' : 'Characters' }}</span></div>
      <div class="stat-item"><span class="stat-n">523</span><span class="stat-l">{{ locale==='zh' ? '情绪标签' : 'Emotions' }}</span></div>
      <div class="stat-item"><span class="stat-n">89</span><span class="stat-l">{{ locale==='zh' ? '创作者' : 'Creators' }}</span></div>
    </div>

    <!-- ====== RESOURCES ====== -->
    <div class="rc-grid reveal-s">
      <router-link v-for="(r, i) in resources" :key="i" :to="'/creators/'+(i+1)" class="rc-card">
        <div class="rc-icon" :class="'ricon-'+i"></div>
        <h3 class="rc-t">{{ t(r.titleKey) }}</h3>
        <p class="rc-d">{{ t(r.descKey) }}</p>
        <span class="rc-arrow">→</span>
      </router-link>
    </div>

    <!-- ====== CREATOR PROFILE + EDITOR ====== -->
    <div class="profile-section reveal">
      <div class="profile-h">
        <h2 class="profile-title">{{ locale==='zh' ? '创作空间' : 'Creative Space' }}</h2>
      </div>

      <!-- Not logged in -->
      <div v-if="!userStore.currentUser" class="login-prompt">
        <p class="login-prompt-text">{{ t('creatorLoginPrompt') }}</p>
        <button class="hero-btn" @click="userStore.showAuthModal = true">{{ t('authLogin') }}</button>
      </div>

      <!-- Logged in -->
      <div v-else class="profile-layout">
        <!-- Profile Card -->
        <div class="profile-card">
          <div class="pc-avatar">{{ userStore.currentUser.name[0] }}</div>
          <div class="pc-info">
            <div class="pc-name">{{ userStore.currentUser.name }}</div>
            <div class="pc-meta">
              <span>{{ locale==='zh' ? '存档 ' : 'Archive ' }}{{ myWorks.length }}{{ locale==='zh' ? ' 篇作品' : ' works' }}</span>
            </div>
          </div>
          <div class="pc-tags">
            <span class="pc-tag" v-for="tag in userTags" :key="tag">{{ tag }}</span>
          </div>
        </div>

        <!-- Editor -->
        <div class="editor-wrap">
          <div class="editor-title-fld">
            <input v-model="storyTitle" :placeholder="t('creatorStoryTitlePlaceholder')" class="et-input" />
          </div>
          <div class="editor-body-fld">
            <textarea v-model="storyContent" :placeholder="t('creatorContentPlaceholder')" class="ec-textarea"></textarea>
          </div>
          <div class="editor-actions">
            <button class="ea-btn" @click="saveDraft">{{ t('creatorSave') }}</button>
            <button class="ea-btn" @click="showPreview = !showPreview">{{ t('creatorPreview') }}</button>
            <button class="ea-btn ea-primary" @click="publish">{{ t('creatorPublish') }}</button>
          </div>
          <p v-if="savedMsg" class="save-msg">{{ savedMsg }}</p>

          <!-- Preview -->
          <div v-if="showPreview && (storyTitle || storyContent)" class="preview">
            <div class="preview-h">
              <h3 class="preview-title">{{ storyTitle || t('creatorStoryTitlePlaceholder') }}</h3>
              <span class="preview-author">{{ userStore.currentUser.name }}</span>
            </div>
            <div class="preview-body">
              <p class="preview-text">{{ storyContent || t('creatorContentPlaceholder') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ====== RECENT DRAFTS ====== -->
    <div v-if="userStore.currentUser && myWorks.length > 0" class="drafts-section reveal">
      <div class="profile-h">
        <h2 class="profile-title">{{ t('creatorMyWorks') }}</h2>
      </div>
      <div class="drafts-grid">
        <div v-for="(w, i) in myWorks.slice(0, 4)" :key="i" class="draft-card">
          <div class="draft-title">{{ w.title }}</div>
          <div class="draft-meta">
            <span class="draft-status" :class="{ pub: w.status === '已发布' }">{{ w.status }}</span>
            <span class="draft-time">{{ new Date(w.time).toLocaleDateString().replace(/\//g,'.') }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ====== EMOTIONAL TAGS ====== -->
    <div class="tags-section reveal">
      <div class="profile-h">
        <h2 class="profile-title">{{ locale==='zh' ? '情绪档案' : 'Emotion Archive' }}</h2>
      </div>
      <div class="emotion-tags">
        <span v-for="et in emotionTags" :key="et.key" class="emotion-tag">{{ t(et.label) }}</span>
      </div>
    </div>

    <!-- ====== TIPS ====== -->
    <div class="tips-section reveal">
      <div class="profile-h">
        <h2 class="profile-title">{{ t('creatorTipsTitle') }}</h2>
      </div>
      <div class="tip-list">
        <div v-for="(tip, i) in tips" :key="i" class="tip-item">
          <div class="tip-num">{{ String(i+1).padStart(2, '0') }}</div>
          <div class="tip-bd">
            <h3 class="tip-t">{{ t(tip.titleKey) }}</h3>
            <p class="tip-d">{{ t(tip.descKey) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue'
import { userStore } from '../stores/userStore.js'
const t = inject('t')
const locale = inject('locale')

const storyTitle = ref('')
const storyContent = ref('')
const showPreview = ref(false)
const savedMsg = ref('')
const myWorks = ref([])

const userTags = ['眷恋', '治愈', '古风', '奇幻']

const resources = [
  { titleKey: 'creatorResource1Title', descKey: 'creatorResource1Desc' },
  { titleKey: 'creatorResource2Title', descKey: 'creatorResource2Desc' },
  { titleKey: 'creatorResource3Title', descKey: 'creatorResource3Desc' },
  { titleKey: 'creatorResource4Title', descKey: 'creatorResource4Desc' },
]

const tips = [
  { titleKey: 'creatorTip1Title', descKey: 'creatorTip1Desc' },
  { titleKey: 'creatorTip2Title', descKey: 'creatorTip2Desc' },
  { titleKey: 'creatorTip3Title', descKey: 'creatorTip3Desc' },
]

const emotionTags = [
  { key: 'moodLonging', label: 'moodLonging' },
  { key: 'moodObsession', label: 'moodObsession' },
  { key: 'moodTragedy', label: 'moodTragedy' },
  { key: 'moodComfort', label: 'moodComfort' },
  { key: 'moodDanger', label: 'moodDanger' },
  { key: 'moodNostalgia', label: 'moodNostalgia' },
  { key: 'moodMelancholy', label: 'moodMelancholy' },
  { key: 'moodIntimacy', label: 'moodIntimacy' },
  { key: 'moodYearning', label: 'moodYearning' },
]

function saveDraft() {
  if (!storyTitle.value && !storyContent.value) return
  const saved = JSON.parse(localStorage.getItem('ht_drafts_' + userStore.currentUser.id) || '[]')
  saved.push({ title: storyTitle.value || '无题', content: storyContent.value, status: '草稿', time: Date.now() })
  localStorage.setItem('ht_drafts_' + userStore.currentUser.id, JSON.stringify(saved))
  myWorks.value = saved.slice(-10).reverse()
  savedMsg.value = t('creatorSaved')
  setTimeout(() => { savedMsg.value = '' }, 2000)
}

function publish() {
  if (!storyTitle.value && !storyContent.value) return
  const saved = JSON.parse(localStorage.getItem('ht_drafts_' + userStore.currentUser.id) || '[]')
  saved.push({ title: storyTitle.value || '无题', content: storyContent.value, status: '已发布', time: Date.now() })
  localStorage.setItem('ht_drafts_' + userStore.currentUser.id, JSON.stringify(saved))
  myWorks.value = saved.slice(-10).reverse()
  storyTitle.value = ''
  storyContent.value = ''
  showPreview.value = false
}

onMounted(() => {
  if (userStore.currentUser) {
    const saved = JSON.parse(localStorage.getItem('ht_drafts_' + userStore.currentUser.id) || '[]')
    myWorks.value = saved.slice(-10).reverse()
  }
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); ro.unobserve(e.target) } })
  }, { threshold: 0.1 })
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el))
})
</script>

<style scoped>
/* ====== HERO ====== */
.ch{padding:110px 24px 40px;max-width:1000px;margin:0 auto}
.ch-inner{text-align:center}
.ch-bc{font-size:12px;color:var(--tm);margin-bottom:28px;letter-spacing:.3px}
.pg-bcl{color:var(--ts);transition:color .3s}.pg-bcl:hover{color:var(--tx)}
.pg-bs{margin:0 10px;color:var(--bd)}.pg-bcc{color:var(--tx);font-weight:500}
.ch-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:clamp(26px,3.5vw,36px);font-weight:600;color:var(--tx);letter-spacing:3px;margin-bottom:12px}
.en .ch-t{font-family:'Playfair Display','Noto Serif SC',serif}
.ch-s{font-size:14px;color:var(--ts);letter-spacing:.5px;line-height:1.7;margin-bottom:8px}
.ch-d{font-size:12px;color:var(--tm);letter-spacing:.5px;font-style:italic;max-width:400px;margin:0 auto}

/* ====== PAGE ====== */
.pg{max-width:1000px;margin:0 auto;padding:0 24px 80px}

/* ====== STATS ====== */
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--bd);margin-bottom:40px}
.stat-item{background:var(--bg);padding:28px 16px;text-align:center;transition:background var(--tr)}
.stat-item:hover{background:var(--cw)}
.stat-n{display:block;font-family:'Playfair Display',serif;font-size:28px;font-weight:400;color:var(--tx);letter-spacing:1px;margin-bottom:4px}
.stat-l{font-size:11px;color:var(--tm);letter-spacing:1.5px;text-transform:uppercase}

/* ====== RESOURCES ====== */
.rc-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px;margin-bottom:48px}
.rc-card{background:var(--cw);padding:32px 28px;transition:all var(--tr);display:flex;flex-direction:column;position:relative;overflow:hidden}
.rc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px}
.rc-card:nth-child(1)::before{background:linear-gradient(90deg,#C4A49C,#D4C0B8)}
.rc-card:nth-child(2)::before{background:linear-gradient(90deg,#B49088,#C4A49C)}
.rc-card:nth-child(3)::before{background:linear-gradient(90deg,#A08078,#B49088)}
.rc-card:nth-child(4)::before{background:linear-gradient(90deg,#B4A09C,#C4B4AE)}
.rc-card:hover{box-shadow:var(--sm);transform:translateY(-2px)}
.rc-icon{width:36px;height:36px;margin-bottom:16px;position:relative;display:flex;align-items:center;justify-content:center}
.rc-card:nth-child(1) .rc-icon{background:linear-gradient(135deg,#EDE6E0,#D4C0B8)}
.rc-card:nth-child(2) .rc-icon{background:linear-gradient(135deg,#EDE6E0,#C4A49C)}
.rc-card:nth-child(3) .rc-icon{background:linear-gradient(135deg,#EDE6E0,#B49088)}
.rc-card:nth-child(4) .rc-icon{background:linear-gradient(135deg,#EDE6E0,#C4B4AE)}
.rc-icon::after{content:'';width:16px;height:16px;background:var(--ts);mask-size:contain;-webkit-mask-size:contain;mask-repeat:no-repeat;-webkit-mask-repeat:no-repeat}
.ricon-0::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'/%3E%3Cpath d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'/%3E%3Cpath d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'/%3E%3C/svg%3E")}
.ricon-1::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Crect x='3' y='11' width='18' height='11' rx='2' ry='2'/%3E%3Cpath d='M7 11V7a5 5 0 0 1 10 0v4'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Crect x='3' y='11' width='18' height='11' rx='2' ry='2'/%3E%3Cpath d='M7 11V7a5 5 0 0 1 10 0v4'/%3E%3C/svg%3E")}
.ricon-2::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='9' cy='7' r='4'/%3E%3Cpath d='M23 21v-2a4 4 0 0 0-3-3.87'/%3E%3Cpath d='M16 3.13a4 4 0 0 1 0 7.75'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='9' cy='7' r='4'/%3E%3Cpath d='M23 21v-2a4 4 0 0 0-3-3.87'/%3E%3Cpath d='M16 3.13a4 4 0 0 1 0 7.75'/%3E%3C/svg%3E")}
.ricon-3::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E")}
.rc-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:15px;font-weight:600;color:var(--tx);letter-spacing:.8px;margin-bottom:8px}
.rc-d{font-size:13px;color:var(--ts);line-height:1.7;letter-spacing:.3px;flex:1;margin-bottom:12px}
.rc-arrow{font-size:13px;color:var(--tm);transition:all var(--tr);align-self:flex-end}
.rc-card:hover .rc-arrow{color:var(--accent);transform:translateX(3px)}

/* ====== PROFILE SECTION ====== */
.profile-section{margin-bottom:48px}
.profile-h{margin-bottom:24px}
.profile-title{font-family:'Noto Serif SC','Playfair Display',serif;font-size:18px;font-weight:600;color:var(--tx);letter-spacing:1.5px;padding-bottom:12px;border-bottom:1px solid var(--bd)}

.login-prompt{text-align:center;padding:48px 24px;background:linear-gradient(135deg,var(--bg2),var(--bg));border:1px solid var(--bd)}
.login-prompt-text{font-size:14px;color:var(--ts);margin-bottom:20px}
.hero-btn{padding:12px 36px;background:var(--accent);color:var(--cw);font-size:11px;font-weight:400;letter-spacing:3px;text-transform:uppercase;transition:all var(--tr);border:none;cursor:pointer;font-family:inherit}
.hero-btn:hover{background:var(--tx);transform:translateY(-1px)}

.profile-layout{display:grid;grid-template-columns:280px 1fr;gap:24px}
.profile-card{background:var(--cw);padding:28px 24px;border:1px solid var(--bd)}
.pc-avatar{width:56px;height:56px;background:var(--t);color:var(--ts);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:500;margin-bottom:16px}
.pc-name{font-size:16px;font-weight:500;color:var(--tx);letter-spacing:.5px;margin-bottom:8px}
.pc-meta{font-size:12px;color:var(--tm);letter-spacing:.3px;margin-bottom:16px}
.pc-tags{display:flex;flex-wrap:wrap;gap:6px}
.pc-tag{font-size:10px;padding:4px 10px;background:var(--bg2);color:var(--ts);letter-spacing:.5px}

/* Editor */
.editor-wrap{background:var(--cw);padding:24px;border:1px solid var(--bd)}
.editor-title-fld{margin-bottom:14px}
.et-input{width:100%;padding:12px 14px;border:1px solid var(--bd);font-size:15px;font-family:'Noto Serif SC','Playfair Display',serif;color:var(--tx);background:var(--bg);outline:none;transition:border-color .3s;box-sizing:border-box}
.et-input:focus{border-color:var(--ts)}
.et-input::placeholder{color:var(--tm);font-family:'Inter',sans-serif;font-size:13px}
.editor-body-fld{margin-bottom:14px}
.ec-textarea{width:100%;height:220px;padding:14px;border:1px solid var(--bd);font-size:13px;font-family:'Inter',sans-serif;color:var(--tx);background:var(--bg);outline:none;transition:border-color .3s;resize:vertical;box-sizing:border-box;line-height:1.9}
.ec-textarea:focus{border-color:var(--ts)}
.ec-textarea::placeholder{color:var(--tm)}
.editor-actions{display:flex;gap:10px;flex-wrap:wrap}
.ea-btn{padding:10px 20px;background:transparent;border:1px solid var(--bd);font-size:11px;color:var(--ts);cursor:pointer;font-family:inherit;transition:all var(--tr);letter-spacing:.5px}
.ea-btn:hover{border-color:var(--ts);color:var(--tx)}
.ea-primary{background:var(--accent);color:var(--cw);border-color:var(--accent)}
.ea-primary:hover{background:var(--tx);border-color:var(--tx)}
.save-msg{font-size:12px;color:var(--ts);margin-top:12px}

/* Preview */
.preview{margin-top:20px;padding:24px;background:var(--bg);border:1px solid var(--bd)}
.preview-h{margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--bd)}
.preview-title{font-family:'Noto Serif SC','Playfair Display',serif;font-size:17px;font-weight:600;color:var(--tx);letter-spacing:.8px;margin-bottom:4px}
.preview-author{font-size:12px;color:var(--tm)}
.preview-body{min-height:40px}
.preview-text{font-size:13px;color:var(--ts);line-height:1.8;letter-spacing:.3px;white-space:pre-wrap}

/* ====== DRAFTS ====== */
.drafts-section{margin-bottom:48px}
.drafts-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.draft-card{padding:20px;background:var(--cw);border:1px solid var(--bd);transition:all var(--tr)}
.draft-card:hover{border-color:var(--tm);transform:translateY(-1px)}
.draft-title{font-size:14px;font-weight:500;color:var(--tx);letter-spacing:.5px;margin-bottom:10px}
.draft-meta{display:flex;justify-content:space-between;align-items:center}
.draft-status{font-size:10px;padding:2px 8px;background:var(--bg2);color:var(--tm);letter-spacing:.5px}
.draft-status.pub{background:var(--t);color:var(--ts)}
.draft-time{font-size:10px;color:var(--tm)}

/* ====== EMOTION TAGS ====== */
.tags-section{margin-bottom:48px}
.emotion-tags{display:flex;flex-wrap:wrap;gap:8px}
.emotion-tag{padding:8px 20px;background:var(--cw);border:1px solid var(--bd);font-size:12px;color:var(--ts);letter-spacing:.5px;transition:all var(--tr);cursor:default}
.emotion-tag:hover{border-color:var(--accent-dim);color:var(--accent);background:var(--cw)}

/* ====== TIPS ====== */
.tips-section{margin-bottom:48px}
.tip-list{display:flex;flex-direction:column;gap:12px}
.tip-item{display:flex;gap:20px;padding:24px 24px;background:var(--cw);border:1px solid var(--bd);transition:all var(--tr);align-items:flex-start}
.tip-item:hover{border-color:var(--tm);transform:translateY(-1px)}
.tip-item:nth-child(1){border-left:3px solid var(--p)}
.tip-item:nth-child(2){border-left:3px solid var(--p2)}
.tip-item:nth-child(3){border-left:3px solid var(--accent-dim)}
.tip-num{font-family:'Inter',sans-serif;font-size:18px;font-weight:300;color:var(--tm);line-height:1;flex-shrink:0;width:32px}
.tip-bd{flex:1}
.tip-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:15px;font-weight:600;color:var(--tx);letter-spacing:.5px;margin-bottom:6px}
.tip-d{font-size:13px;color:var(--ts);line-height:1.7;letter-spacing:.3px}

/* ====== RESPONSIVE ====== */
@media(max-width:968px){
  .profile-layout{grid-template-columns:1fr}
  .ch{padding:100px 20px 32px}
}
@media(max-width:640px){
  .stats{grid-template-columns:repeat(2,1fr)}
  .rc-grid{grid-template-columns:1fr}
  .drafts-grid{grid-template-columns:1fr}
  .emotion-tags{gap:6px}
  .emotion-tag{padding:6px 14px;font-size:11px}
  .ch{padding:90px 16px 24px}
  .ch-t{font-size:clamp(22px,5vw,28px)}
  .pg{padding:0 16px 60px}
  .editor-wrap{padding:16px}
  .ec-textarea{height:180px}
  .editor-actions{gap:6px}
  .ea-btn{flex:1;text-align:center;padding:10px 8px;font-size:10px}
  .profile-card{padding:20px}
  .tip-item{padding:20px}
}
</style>
