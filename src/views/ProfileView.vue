<template>
  <div class="pg">
    <div class="pg-bc reveal">
      <router-link to="/" class="pg-bcl">{{ t('navHome') }}</router-link>
      <span class="pg-bs">/</span>
      <span class="pg-bcc">{{ t('profileTitle') }}</span>
    </div>

    <!-- Not logged in -->
    <div v-if="!userStore.currentUser" class="login-prompt reveal">
      <p class="login-prompt-text">{{ locale==='zh' ? '请先登录后查看个人中心' : 'Please log in first' }}</p>
      <button class="hero-btn" @click="userStore.showAuthModal = true">{{ t('authLogin') }}</button>
    </div>

    <div v-else class="profile-layout">
      <!-- Sidebar -->
      <div class="profile-sidebar reveal">
        <div class="ps-avatar-wrap" @click="triggerAvatar">
          <img v-if="avatarUrl" :src="avatarUrl" class="ps-avatar-img" />
          <div v-else class="ps-avatar-letter">{{ editName[0] || userStore.currentUser.name[0] }}</div>
          <div class="ps-avatar-overlay">{{ locale==='zh' ? '更换头像' : 'Edit' }}</div>
        </div>
        <input ref="avatarInput" type="file" accept="image/*" class="hidden-input" @change="handleAvatar" />
        <div class="ps-name">{{ editName || userStore.currentUser.name }}</div>
        <div class="ps-bio">{{ editBio || userStore.currentUser.bio || (locale==='zh' ? '还没有个人简介' : 'No bio yet') }}</div>

        <nav class="ps-nav">
          <button v-for="tab in tabs" :key="tab.key"
            :class="['ps-nav-btn', { active: activeTab === tab.key }]"
            @click="activeTab = tab.key">
            {{ t(tab.label) }}
          </button>
        </nav>

        <button class="ps-logout" @click="doLogout">{{ t('profileLogout') }}</button>
      </div>

      <!-- Content -->
      <div class="profile-content reveal">
        <!-- Profile Edit -->
        <div v-if="activeTab === 'profile'" class="pc-section">
          <h2 class="pc-section-title">{{ t('profileTitle') }}</h2>
          <div class="pc-field">
            <label class="pc-label">{{ t('profileName') }}</label>
            <input v-model="editName" class="pc-input" :placeholder="userStore.currentUser.name" />
          </div>
          <div class="pc-field">
            <label class="pc-label">{{ t('profileBio') }}</label>
            <textarea v-model="editBio" class="pc-textarea" rows="3"
              :placeholder="locale==='zh' ? '写一段关于你的介绍…' : 'Write about yourself...'"></textarea>
          </div>
          <button class="pc-save" @click="saveProfile">{{ t('profileSave') }}</button>
          <span v-if="savedProfile" class="pc-saved-msg">{{ t('profileSaved') }}</span>
        </div>

        <!-- My Works -->
        <div v-if="activeTab === 'works'" class="pc-section">
          <h2 class="pc-section-title">{{ t('profileMyWorks') }}</h2>
          <div v-if="myWorks.length === 0" class="pc-empty">
            {{ locale==='zh' ? '还没有作品' : 'No works yet' }}
          </div>
          <div v-for="(w, i) in myWorks" :key="i" class="pc-work-item">
            <span class="pc-work-title">{{ w.title }}</span>
            <span class="pc-work-status" :class="{ pub: w.status === '已发布' }">{{ w.status }}</span>
          </div>
        </div>

        <!-- Collections -->
        <div v-if="activeTab === 'collections'" class="pc-section">
          <h2 class="pc-section-title">{{ t('profileMyCollections') }}</h2>
          <div class="pc-empty">{{ locale==='zh' ? '还没有收藏' : 'No collections yet' }}</div>
        </div>

        <!-- Comments -->
        <div v-if="activeTab === 'comments'" class="pc-section">
          <h2 class="pc-section-title">{{ t('profileMyComments') }}</h2>
          <div class="pc-empty">{{ locale==='zh' ? '还没有评论' : 'No comments yet' }}</div>
        </div>

        <!-- Drafts -->
        <div v-if="activeTab === 'drafts'" class="pc-section">
          <h2 class="pc-section-title">{{ t('profileDrafts') }}</h2>
          <div v-if="drafts.length === 0" class="pc-empty">
            {{ locale==='zh' ? '草稿箱为空' : 'No drafts' }}
          </div>
          <div v-for="(d, i) in drafts" :key="i" class="pc-work-item">
            <span class="pc-work-title">{{ d.title }}</span>
            <span class="pc-work-status">{{ d.status }}</span>
          </div>
        </div>

        <!-- Settings -->
        <div v-if="activeTab === 'settings'" class="pc-section">
          <h2 class="pc-section-title">{{ t('profileSettings') }}</h2>
          <div class="pc-field">
            <label class="pc-label">{{ t('authEmail') }}</label>
            <input class="pc-input" :value="userStore.currentUser.phone + '@hertale.com'" disabled />
          </div>
          <div class="pc-danger">
            <button class="pc-danger-btn" @click="showDeleteConfirm = true">{{ t('profileDelete') }}</button>
            <div v-if="showDeleteConfirm" class="delete-confirm">
              <p>{{ t('authDeleteConfirm') }}</p>
              <div class="delete-actions">
                <button class="pc-cancel" @click="showDeleteConfirm = false">{{ locale==='zh' ? '取消' : 'Cancel' }}</button>
                <button class="pc-danger-btn" @click="deleteAccount">{{ locale==='zh' ? '确认注销' : 'Confirm' }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, onMounted } from 'vue'
import { userStore } from '../stores/userStore.js'
import { useRouter } from 'vue-router'
const t = inject('t')
const locale = inject('locale')
const router = useRouter()

const avatarInput = ref(null)
const editName = ref('')
const editBio = ref('')
const avatarUrl = ref(null)
const savedProfile = ref(false)
const activeTab = ref('profile')
const showDeleteConfirm = ref(false)
const myWorks = ref([])
const drafts = ref([])

const tabs = [
  { key: 'profile', label: 'profileTitle' },
  { key: 'works', label: 'profileMyWorks' },
  { key: 'collections', label: 'profileMyCollections' },
  { key: 'comments', label: 'profileMyComments' },
  { key: 'drafts', label: 'profileDrafts' },
  { key: 'settings', label: 'profileSettings' },
]

function loadProfile() {
  if (!userStore.currentUser) return
  editName.value = userStore.currentUser.name || ''
  editBio.value = userStore.currentUser.bio || ''
  avatarUrl.value = userStore.currentUser.avatar || null
  const saved = JSON.parse(localStorage.getItem('ht_drafts_' + userStore.currentUser.id) || '[]')
  drafts.value = saved.filter(d => d.status === '草稿').slice(-10).reverse()
  myWorks.value = saved.filter(d => d.status === '已发布').slice(-10).reverse()
}

function triggerAvatar() { avatarInput.value?.click() }

function handleAvatar(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => { avatarUrl.value = ev.target.result }
  reader.readAsDataURL(file)
}

function saveProfile() {
  userStore.updateProfile({
    name: editName.value.trim() || userStore.currentUser.name,
    avatar: avatarUrl.value,
    bio: editBio.value.trim(),
  })
  savedProfile.value = true
  setTimeout(() => { savedProfile.value = false }, 2000)
}

function doLogout() {
  userStore.logout()
  router.push('/')
}

function deleteAccount() {
  userStore.logout()
  localStorage.removeItem('ht_users')
  localStorage.removeItem('ht_current')
  router.push('/')
}

onMounted(() => {
  loadProfile()
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); ro.unobserve(e.target) } })
  }, { threshold: 0.1 })
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el))
})
</script>

<style scoped>
.pg{max-width:900px;margin:0 auto;padding:110px 24px 80px}
.pg-bc{font-size:12px;color:var(--tm);margin-bottom:36px;letter-spacing:.3px}
.pg-bcl{color:var(--ts);transition:color .3s}.pg-bcl:hover{color:var(--tx)}
.pg-bs{margin:0 10px;color:var(--bd)}.pg-bcc{color:var(--tx);font-weight:500}

.login-prompt{text-align:center;padding:60px 24px;background:linear-gradient(135deg,var(--bg2),var(--bg));border:1px solid var(--bd)}
.login-prompt-text{font-size:14px;color:var(--ts);margin-bottom:20px}
.hero-btn{padding:12px 36px;background:var(--accent);color:var(--cw);font-size:11px;letter-spacing:3px;text-transform:uppercase;transition:all var(--tr);border:none;cursor:pointer;font-family:inherit}
.hero-btn:hover{background:var(--tx)}

.profile-layout{display:grid;grid-template-columns:220px 1fr;gap:24px}

/* Sidebar */
.profile-sidebar{background:var(--cw);padding:28px 20px;border:1px solid var(--bd);align-self:start;text-align:center}
.ps-avatar-wrap{width:72px;height:72px;margin:0 auto 16px;position:relative;cursor:pointer;overflow:hidden}
.ps-avatar-letter{width:100%;height:100%;background:var(--t);color:var(--ts);display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:500}
.ps-avatar-img{width:100%;height:100%;object-fit:cover}
.ps-avatar-overlay{position:absolute;inset:0;background:rgba(42,34,32,.5);color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;letter-spacing:1px;opacity:0;transition:opacity .3s}
.ps-avatar-wrap:hover .ps-avatar-overlay{opacity:1}
.hidden-input{display:none}
.ps-name{font-size:15px;font-weight:500;color:var(--tx);margin-bottom:6px}
.ps-bio{font-size:11px;color:var(--tm);line-height:1.5;margin-bottom:20px}

.ps-nav{display:flex;flex-direction:column;gap:2px;margin-bottom:20px}
.ps-nav-btn{padding:10px 14px;border:none;background:transparent;font-size:13px;color:var(--ts);text-align:left;cursor:pointer;font-family:inherit;transition:all var(--tr);letter-spacing:.3px}
.ps-nav-btn:hover{background:var(--bg2);color:var(--tx)}
.ps-nav-btn.active{background:var(--bg2);color:var(--accent);font-weight:500}
.ps-logout{padding:8px 20px;border:1px solid var(--bd);background:transparent;font-size:11px;color:var(--tm);cursor:pointer;font-family:inherit;transition:all var(--tr);width:100%}
.ps-logout:hover{border-color:var(--ts);color:var(--tx)}

/* Content */
.profile-content{background:var(--cw);padding:32px;border:1px solid var(--bd);min-height:400px}
.pc-section-title{font-family:'Noto Serif SC','Playfair Display',serif;font-size:17px;font-weight:600;color:var(--tx);letter-spacing:1.5px;margin-bottom:24px;padding-bottom:12px;border-bottom:1px solid var(--bd)}
.pc-field{margin-bottom:18px}
.pc-label{display:block;font-size:11px;color:var(--tm);letter-spacing:1px;text-transform:uppercase;margin-bottom:6px}
.pc-input{width:100%;padding:10px 14px;border:1px solid var(--bd);font-size:13px;color:var(--tx);background:var(--bg);outline:none;transition:border-color .3s;box-sizing:border-box;font-family:inherit}
.pc-input:focus{border-color:var(--ts)}
.pc-input:disabled{color:var(--tm);background:var(--bg2)}
.pc-textarea{width:100%;padding:10px 14px;border:1px solid var(--bd);font-size:13px;color:var(--ts);background:var(--bg);outline:none;transition:border-color .3s;resize:none;box-sizing:border-box;line-height:1.6;font-family:inherit}
.pc-textarea:focus{border-color:var(--ts)}
.pc-save{padding:10px 28px;background:var(--accent);color:var(--cw);border:none;font-size:11px;letter-spacing:1.5px;cursor:pointer;font-family:inherit;transition:background .3s}
.pc-save:hover{background:var(--tx)}
.pc-saved-msg{font-size:11px;color:var(--ts);margin-left:12px}

.pc-empty{text-align:center;padding:40px;color:var(--tm);font-size:13px}
.pc-work-item{display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-bottom:1px solid var(--bg2)}
.pc-work-title{font-size:13px;color:var(--ts)}
.pc-work-status{font-size:10px;padding:2px 8px;background:var(--bg2);color:var(--tm)}
.pc-work-status.pub{background:var(--t);color:var(--ts)}

.pc-danger{margin-top:24px;padding-top:20px;border-top:1px solid var(--bd)}
.pc-danger-btn{padding:8px 20px;background:transparent;border:1px solid #C44;color:#C44;font-size:11px;cursor:pointer;font-family:inherit;transition:all .3s}
.pc-danger-btn:hover{background:#C44;color:#fff}
.delete-confirm{margin-top:16px;padding:16px;background:var(--bg);border:1px solid var(--bd)}
.delete-confirm p{font-size:13px;color:var(--ts);margin-bottom:12px}
.delete-actions{display:flex;gap:10px}
.pc-cancel{padding:8px 20px;border:1px solid var(--bd);background:transparent;font-size:11px;color:var(--ts);cursor:pointer;font-family:inherit}

@media(max-width:768px){
  .profile-layout{grid-template-columns:1fr}
  .profile-sidebar{text-align:left}
  .ps-nav{flex-direction:row;flex-wrap:wrap;gap:4px}
  .ps-nav-btn{font-size:12px;padding:8px 12px}
  .pg{padding:90px 16px 60px}
  .profile-content{padding:24px}
}
</style>
