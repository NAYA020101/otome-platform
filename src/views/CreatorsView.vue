<template>
  <div class="pg">
    <div class="pg-bc reveal">
      <router-link to="/" class="pg-bcl">{{ t('navHome') }}</router-link>
      <span class="pg-bs">/</span>
      <span class="pg-bcc">{{ t('navCreate') }}</span>
    </div>

    <div class="pg-h reveal">
      <h1 class="pg-t">{{ t('creatorTitle') }}</h1>
      <p class="pg-s">{{ t('creatorsTagline') }}</p>
    </div>

    <!-- ====== Resources ====== -->
    <div class="rc-grid reveal-s">
      <router-link v-for="(r, i) in resources" :key="i" :to="'/creators/'+(i+1)" class="rc-card">
        <div class="rc-icon" :class="'ricon-'+i"></div>
        <h3 class="rc-t">{{ t(r.titleKey) }}</h3>
        <p class="rc-d">{{ t(r.descKey) }}</p>
      </router-link>
    </div>
  </div>

  <!-- ====== START CREATING ====== -->
  <div class="pg">
    <div class="pg-h reveal">
      <h2 class="pg-t">{{ t('creatorStartTitle') }}</h2>
    </div>

    <!-- Not logged in -->
    <div v-if="!userStore.currentUser" class="login-prompt reveal">
      <p class="login-prompt-text">{{ t('creatorLoginPrompt') }}</p>
      <button class="btn-login-prompt" @click="userStore.showAuthModal = true">{{ t('authLogin') }}</button>
    </div>

    <!-- Editor -->
    <div v-else class="editor reveal">
      <div class="editor-title">
        <input v-model="storyTitle" :placeholder="t('creatorStoryTitlePlaceholder')" class="et-input" />
      </div>
      <div class="editor-body">
        <textarea v-model="storyContent" :placeholder="t('creatorContentPlaceholder')" class="ec-textarea"></textarea>
      </div>
      <div class="editor-actions">
        <button class="ea-btn" @click="saveDraft">{{ t('creatorSave') }}</button>
        <button class="ea-btn" @click="showPreview = !showPreview">{{ t('creatorPreview') }}</button>
        <button class="ea-btn ea-primary" @click="publish">{{ t('creatorPublish') }}</button>
      </div>

      <!-- Save feedback -->
      <p v-if="savedMsg" class="save-msg">{{ savedMsg }}</p>

      <!-- Preview -->
      <div v-if="showPreview" class="preview">
        <div class="preview-h">
          <h3 class="preview-title">{{ storyTitle || (t('creatorStoryTitlePlaceholder')) }}</h3>
          <span class="preview-author">{{ userStore.currentUser.name }}</span>
        </div>
        <div class="preview-body">
          <p class="preview-text">{{ storyContent || t('creatorContentPlaceholder') }}</p>
        </div>
      </div>

      <!-- My works -->
      <div class="my-works">
        <h3 class="mw-title">{{ t('creatorMyWorks') }}</h3>
        <div v-if="myWorks.length === 0" class="mw-empty">{{ t('creatorNoWorks') }}</div>
        <div v-for="(w, i) in myWorks" :key="i" class="mw-item">
          <span class="mw-name">{{ w.title }}</span>
          <span class="mw-status">{{ w.status }}</span>
        </div>
      </div>
    </div>
  </div>

  <!-- ====== Tips ====== -->
  <div class="pg">
    <div class="pg-h reveal">
      <h2 class="pg-t">{{ t('creatorTipsTitle') }}</h2>
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
</template>

<script setup>
import { inject, ref, onMounted, computed } from 'vue'
import { userStore } from '../stores/userStore.js'
const t = inject('t')

const storyTitle = ref('')
const storyContent = ref('')
const showPreview = ref(false)
const savedMsg = ref('')
const myWorks = ref([])

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

function saveDraft() {
  if (!storyTitle.value && !storyContent.value) return
  const saved = JSON.parse(localStorage.getItem('ht_drafts_' + userStore.currentUser.id) || '[]')
  saved.push({ title: storyTitle.value || '无题', content: storyContent.value, status: '草稿', time: Date.now() })
  localStorage.setItem('ht_drafts_' + userStore.currentUser.id, JSON.stringify(saved))
  myWorks.value = saved.slice(-5).reverse()
  savedMsg.value = t('creatorSaved')
  setTimeout(() => { savedMsg.value = '' }, 2000)
}

function publish() {
  if (!storyTitle.value && !storyContent.value) return
  const saved = JSON.parse(localStorage.getItem('ht_drafts_' + userStore.currentUser.id) || '[]')
  saved.push({ title: storyTitle.value || '无题', content: storyContent.value, status: '已发布', time: Date.now() })
  localStorage.setItem('ht_drafts_' + userStore.currentUser.id, JSON.stringify(saved))
  myWorks.value = saved.slice(-5).reverse()
  storyTitle.value = ''
  storyContent.value = ''
  showPreview.value = false
}

onMounted(() => {
  if (userStore.currentUser) {
    const saved = JSON.parse(localStorage.getItem('ht_drafts_' + userStore.currentUser.id) || '[]')
    myWorks.value = saved.slice(-5).reverse()
  }
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); ro.unobserve(e.target) } })
  }, { threshold: 0.1 })
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el))
})
</script>

<style scoped>
.pg{max-width:1000px;margin:0 auto;padding:48px 24px 100px}
.pg:first-of-type{padding-top:130px}
.pg-bc{font-size:12px;color:var(--tm);margin-bottom:40px;letter-spacing:.3px}
.pg-bcl{color:var(--ts);transition:color .3s}.pg-bcl:hover{color:var(--tx)}
.pg-bs{margin:0 10px;color:var(--bd)}.pg-bcc{color:var(--tx);font-weight:500}
.pg-h{text-align:center;margin-bottom:48px}
.pg-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:clamp(24px,3vw,32px);font-weight:600;color:var(--tx);letter-spacing:2px;margin-bottom:12px}
.en .pg-t{font-family:'Playfair Display','Noto Serif SC',serif}
.pg-s{font-size:14px;color:var(--ts);letter-spacing:.5px;max-width:500px;margin:0 auto;line-height:1.8}

/* Resources */
.rc-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--bd)}
.rc-card{background:var(--bg);padding:40px 32px;transition:all var(--tr);display:flex;flex-direction:column}
.rc-card:hover{background:var(--cw)}
.rc-icon{width:36px;height:36px;margin-bottom:20px;position:relative;background:var(--t)}
.rc-icon::after{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:16px;height:16px;background:var(--ts);mask-size:contain;-webkit-mask-size:contain;mask-repeat:no-repeat;-webkit-mask-repeat:no-repeat}
.ricon-0::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'/%3E%3Cpath d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'/%3E%3Cpath d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'/%3E%3C/svg%3E")}
.ricon-1::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Crect x='3' y='11' width='18' height='11' rx='2' ry='2'/%3E%3Cpath d='M7 11V7a5 5 0 0 1 10 0v4'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Crect x='3' y='11' width='18' height='11' rx='2' ry='2'/%3E%3Cpath d='M7 11V7a5 5 0 0 1 10 0v4'/%3E%3C/svg%3E")}
.ricon-2::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='9' cy='7' r='4'/%3E%3Cpath d='M23 21v-2a4 4 0 0 0-3-3.87'/%3E%3Cpath d='M16 3.13a4 4 0 0 1 0 7.75'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='9' cy='7' r='4'/%3E%3Cpath d='M23 21v-2a4 4 0 0 0-3-3.87'/%3E%3Cpath d='M16 3.13a4 4 0 0 1 0 7.75'/%3E%3C/svg%3E")}
.ricon-3::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E")}
.rc-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:16px;font-weight:600;color:var(--tx);letter-spacing:.8px;margin-bottom:8px}
.rc-d{font-size:13px;color:var(--ts);line-height:1.7;letter-spacing:.3px}

/* Login Prompt */
.login-prompt{text-align:center;padding:60px 24px;background:var(--bg);border:1px solid var(--bd)}
.login-prompt-text{font-size:14px;color:var(--ts);margin-bottom:20px}
.btn-login-prompt{padding:10px 32px;background:var(--tx);color:#fff;border:none;font-size:12px;font-weight:500;letter-spacing:1px;cursor:pointer;font-family:inherit;transition:background .3s}
.btn-login-prompt:hover{background:#4A3A36}

/* Editor */
.editor{max-width:680px;margin:0 auto}
.editor-title{margin-bottom:16px}
.et-input{width:100%;padding:14px 16px;border:1px solid var(--bd);font-size:16px;font-family:'Noto Serif SC','Playfair Display',serif;color:var(--tx);background:var(--bg);outline:none;transition:border-color .3s;box-sizing:border-box}
.et-input:focus{border-color:var(--ts)}
.et-input::placeholder{color:var(--tm);font-family:'Inter',sans-serif;font-size:14px}
.editor-body{margin-bottom:16px}
.ec-textarea{width:100%;height:280px;padding:16px;border:1px solid var(--bd);font-size:14px;font-family:'Inter',sans-serif;color:var(--tx);background:var(--bg);outline:none;transition:border-color .3s;resize:vertical;box-sizing:border-box;line-height:1.9}
.ec-textarea:focus{border-color:var(--ts)}
.ec-textarea::placeholder{color:var(--tm)}
.editor-actions{display:flex;gap:10px;flex-wrap:wrap}
.ea-btn{padding:10px 24px;background:transparent;border:1px solid var(--bd);font-size:12px;color:var(--ts);cursor:pointer;font-family:inherit;transition:all var(--tr);letter-spacing:.5px}
.ea-btn:hover{border-color:var(--ts);color:var(--tx)}
.ea-primary{background:var(--tx);color:#fff;border-color:var(--tx)}
.ea-primary:hover{background:#4A3A36;border-color:#4A3A36;color:#fff}
.save-msg{font-size:12px;color:var(--ts);margin-top:12px}

/* Preview */
.preview{margin-top:24px;padding:32px;background:var(--bg);border:1px solid var(--bd)}
.preview-h{margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid var(--bd)}
.preview-title{font-family:'Noto Serif SC','Playfair Display',serif;font-size:20px;font-weight:600;color:var(--tx);letter-spacing:1px;margin-bottom:6px}
.preview-author{font-size:12px;color:var(--tm)}
.preview-body{min-height:60px}
.preview-text{font-size:14px;color:var(--ts);line-height:1.9;letter-spacing:.3px;white-space:pre-wrap}

/* My works */
.my-works{margin-top:40px}
.mw-title{font-size:14px;font-weight:500;color:var(--tx);margin-bottom:16px;letter-spacing:.5px}
.mw-empty{font-size:13px;color:var(--tm);padding:24px;text-align:center;background:var(--bg);border:1px solid var(--bd)}
.mw-item{display:flex;justify-content:space-between;align-items:center;padding:12px 16px;border-bottom:1px solid var(--bd)}
.mw-item:last-child{border-bottom:none}
.mw-name{font-size:13px;color:var(--ts)}
.mw-status{font-size:11px;color:var(--tm)}

/* Tips */
.tip-list{display:flex;flex-direction:column;gap:0}
.tip-item{display:flex;gap:24px;padding:32px 0;border-bottom:1px solid var(--bd);align-items:flex-start}
.tip-item:last-child{border-bottom:none}
.tip-num{font-family:'Inter',sans-serif;font-size:24px;font-weight:300;color:var(--tm);line-height:1;flex-shrink:0;width:48px}
.tip-bd{flex:1}
.tip-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:16px;font-weight:600;color:var(--tx);letter-spacing:.5px;margin-bottom:8px}
.tip-d{font-size:13px;color:var(--ts);line-height:1.7;letter-spacing:.3px}

@media(max-width:968px){
  .pg:first-of-type{padding-top:110px}
  .rc-grid{grid-template-columns:1fr}
}
@media(max-width:640px){
  .pg{padding:32px 16px 60px}
  .rc-card{padding:28px 24px}
  .ec-textarea{height:200px}
  .editor-actions{gap:8px}
  .ea-btn{flex:1;text-align:center;padding:10px 12px;font-size:11px}
  .tip-item{gap:16px;padding:24px 0}
  .tip-num{font-size:20px;width:36px}
}
</style>
