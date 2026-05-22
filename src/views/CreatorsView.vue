<template>
  <div class="pg">
    <div class="ch reveal">
      <div class="ch-bc"><router-link to="/" class="pg-bcl">{{ t('navHome') }}</router-link><span class="pg-bs">/</span><span class="pg-bcc">{{ t('navCreate') }}</span></div>
      <h1 class="ch-t">{{ t('creatorTitle') }}</h1>
      <p class="ch-s">{{ t('creatorsTagline') }}</p>
    </div>
    <div class="stats reveal">
      <div class="stat-item"><span class="stat-n">217</span><span class="stat-l">{{ locale==='zh' ? '作品' : 'Games' }}</span></div>
      <div class="stat-item"><span class="stat-n">1,483</span><span class="stat-l">{{ locale==='zh' ? '角色' : 'Characters' }}</span></div>
      <div class="stat-item"><span class="stat-n">523</span><span class="stat-l">{{ locale==='zh' ? '情绪' : 'Emotions' }}</span></div>
      <div class="stat-item"><span class="stat-n">89</span><span class="stat-l">{{ locale==='zh' ? '创作者' : 'Creators' }}</span></div>
    </div>
    <div class="rc-grid reveal-s">
      <router-link v-for="(r,i) in resources" :key="i" :to="'/creators/'+(i+1)" class="rc-card">
        <div class="rc-icon" :class="'ricon-'+i"></div><h3 class="rc-t">{{ t(r.titleKey) }}</h3><p class="rc-d">{{ t(r.descKey) }}</p><span class="rc-arrow">→</span>
      </router-link>
    </div>
    <div class="section-h reveal"><h2 class="section-title">{{ locale==='zh' ? '创作空间' : 'Creative Space' }}</h2></div>
    <div v-if="!userStore.currentUser" class="login-prompt reveal">
      <p class="login-prompt-text">{{ t('creatorLoginPrompt') }}</p>
      <button class="hero-btn" @click="userStore.showAuthModal = true">{{ t('authLogin') }}</button>
    </div>
    <div v-else class="profile-layout reveal">
      <div class="profile-card">
        <div class="pc-avatar-wrap" @click="triggerAvatar"><img v-if="avatarDataUrl" :src="avatarDataUrl" class="pc-avatar-img" /><div v-else class="pc-avatar-letter">{{ editName[0] || userStore.currentUser.name[0] }}</div><div class="pc-avatar-overlay">{{ locale==='zh' ? '更换' : 'Edit' }}</div></div>
        <input ref="avatarInput" type="file" accept="image/*" class="hidden-input" @change="handleAvatar" />
        <div class="pc-fields"><label class="pc-label">{{ locale==='zh' ? '昵称' : 'Name' }}</label><input v-model="editName" class="pc-input" :placeholder="userStore.currentUser.name" /></div>
        <div class="pc-fields"><label class="pc-label">{{ locale==='zh' ? '简介' : 'Bio' }}</label><textarea v-model="editBio" class="pc-textarea" rows="2" :placeholder="locale==='zh' ? '写一段介绍…' : 'Write something...'"></textarea></div>
        <div class="pc-actions"><button class="pc-save-btn" @click="saveProfile">{{ locale==='zh' ? '保存' : 'Save' }}</button><span v-if="savedProfile" class="pc-saved">{{ locale==='zh' ? '已保存' : 'Saved' }}</span></div>
      </div>
      <div class="editor-wrap">
        <div class="editor-title-fld"><input v-model="storyTitle" :placeholder="t('creatorStoryTitlePlaceholder')" class="et-input" /></div>
        <div class="editor-body-fld"><textarea v-model="storyContent" :placeholder="t('creatorContentPlaceholder')" class="ec-textarea"></textarea></div>
        <div class="editor-actions">
          <button class="ea-btn" @click="saveDraft">{{ t('creatorSave') }}</button>
          <button class="ea-btn" @click="showPreview = !showPreview">{{ t('creatorPreview') }}</button>
          <button class="ea-btn ea-primary" @click="publish">{{ t('creatorPublish') }}</button>
        </div>
        <p v-if="savedMsg" class="save-msg">{{ savedMsg }}</p>
        <div v-if="showPreview && (storyTitle || storyContent)" class="preview">
          <div class="preview-h"><h3 class="preview-title">{{ storyTitle || t('creatorStoryTitlePlaceholder') }}</h3><span class="preview-author">{{ editName || userStore.currentUser.name }}</span></div>
          <div class="preview-body"><p class="preview-text">{{ storyContent || t('creatorContentPlaceholder') }}</p></div>
        </div>
      </div>
    </div>
    <div v-if="userStore.currentUser && myWorks.length > 0" class="reveal">
      <div class="section-h"><h2 class="section-title">{{ t('creatorMyWorks') }}</h2></div>
      <div class="drafts-grid"><div v-for="(w,i) in myWorks.slice(0,4)" :key="i" class="draft-card"><div class="draft-title">{{ w.title }}</div><div class="draft-meta"><span class="draft-status" :class="{pub:w.status==='已发布'}">{{ w.status }}</span><span class="draft-time">{{ new Date(w.time).toLocaleDateString().replace(/\//g,'.') }}</span></div></div></div>
    </div>

    <!-- ====== EMOTION ARCHIVE ====== -->
    <div class="reveal">
      <div class="section-h"><h2 class="section-title">{{ locale==='zh' ? '情绪档案' : 'Emotion Archive' }}</h2></div>
      <div class="ea-frame">
        <div class="ea-c ea-c-tl"></div><div class="ea-c ea-c-tr"></div>
        <div class="ea-c ea-c-bl"></div><div class="ea-c ea-c-br"></div>
        <div class="ea-ornament">❧</div>
        <div class="ea-cols">
          <div class="ea-col">
            <div class="ea-col-h"><span class="ea-col-icon">♡</span><h3 class="ea-col-t">{{ locale==='zh' ? '心绪记录' : 'Heart Records' }}</h3></div>
            <div class="ea-quote-card" @click="toggleExpand('record')">
              <div class="ea-quote">{{ locale==='zh' ? '「月光落在纸上，心事便有了形状」' : '"Moonlight on paper, feelings take shape."' }}</div>
              <div class="ea-quote-author">—— {{ locale==='zh' ? '鹿饮溪' : 'Deer Creek' }}</div>
              <div v-if="expanded==='record'" class="ea-expand"><p>{{ locale==='zh' ? '记录下的每一段心绪，都是与自己的一次深层对话。在文字中，我们看见自己最真实的模样。' : 'Every recorded feeling is a deep conversation with yourself.' }}</p></div>
            </div>
            <div class="ea-col-tags"><span v-for="(t,i) in heartTags" :key="i" class="ea-tag" :style="{background:t.bg,color:t.fg}">{{ t.label }}</span></div>
          </div>
          <div class="ea-col">
            <div class="ea-col-h"><span class="ea-col-icon">✦</span><h3 class="ea-col-t">{{ locale==='zh' ? '情感特质' : 'Traits' }}</h3></div>
            <div class="ea-spectrum">
              <div class="ea-spec-h">{{ locale==='zh' ? '心境图谱' : 'Spectrum' }}</div>
              <div class="ea-spec-bar"><div v-for="s in spectrum" :key="s.label" class="ea-spec-item" :style="{flex:s.val}"><div class="ea-spec-dot" :style="{background:s.color}"></div><span class="ea-spec-l">{{ s.label }}</span></div></div>
            </div>
            <div class="ea-col-tags"><span v-for="(t,i) in traitTags" :key="i" class="ea-tag" :style="{background:t.bg,color:t.fg}">{{ t.label }}</span></div>
          </div>
          <div class="ea-col">
            <div class="ea-col-h"><span class="ea-col-icon">◈</span><h3 class="ea-col-t">{{ locale==='zh' ? '羁绊回忆' : 'Bonds' }}</h3></div>
            <div class="ea-memory-card" @click="toggleExpand('memory')">
              <div class="ea-memory-icon">❀</div>
              <div class="ea-memory-t">{{ locale==='zh' ? '第一章 · 初遇' : 'Chapter 1' }}</div>
              <div class="ea-memory-d">{{ locale==='zh' ? '那天的风带着花香，你回眸的笑容，是我所有故事的起点。' : 'Your smile was the beginning of every story.' }}</div>
              <div v-if="expanded==='memory'" class="ea-expand"><p>{{ locale==='zh' ? '存档于 2026年春 · 编号 HT-0001' : 'Archived Spring 2026' }}</p></div>
            </div>
          </div>
        </div>
        <div class="ea-divider">— ✦ —</div>
        <div class="ea-tag-cloud"><span v-for="et in emotionTags" :key="et.key" class="ea-cloud-tag">{{ t(et.label) }}</span></div>
      </div>
    </div>

    <div class="reveal">
      <div class="section-h"><h2 class="section-title">{{ t('creatorTipsTitle') }}</h2></div>
      <div class="tip-list"><div v-for="(tip,i) in tips" :key="i" class="tip-item"><div class="tip-num">{{ String(i+1).padStart(2,'0') }}</div><div class="tip-bd"><h3 class="tip-t">{{ t(tip.titleKey) }}</h3><p class="tip-d">{{ t(tip.descKey) }}</p></div></div></div>
    </div>
  </div>
</template>
<script setup>
import { inject,ref,onMounted } from 'vue'
import { userStore } from '../stores/userStore.js'
const t=inject('t');const locale=inject('locale')

const storyTitle=ref('');const storyContent=ref('');const showPreview=ref(false);const savedMsg=ref('');const myWorks=ref([])
const avatarInput=ref(null);const editName=ref('');const editBio=ref('');const avatarDataUrl=ref(null);const savedProfile=ref(false)
const expanded=ref(null)

const heartTags=[
  {label:'眷恋',bg:'rgba(196,154,154,.15)',fg:'#8A5A5A'},{label:'思念',bg:'rgba(212,192,140,.15)',fg:'#8A7A4A'},{label:'期待',bg:'rgba(200,180,200,.15)',fg:'#6A5A7A'}
]
const traitTags=[
  {label:'温柔',bg:'rgba(196,154,154,.12)',fg:'#7A5A5A'},{label:'坚韧',bg:'rgba(212,192,140,.12)',fg:'#7A6A4A'},{label:'细腻',bg:'rgba(200,180,200,.12)',fg:'#6A5A7A'},{label:'浪漫',bg:'rgba(220,200,180,.12)',fg:'#7A6A5A'}
]
const spectrum=[
  {label:locale.value==='zh'?'沉静':'Calm',val:2,color:'#B09888'},{label:locale.value==='zh'?'温柔':'Gentle',val:3,color:'#C4A49C'},{label:locale.value==='zh'?'心动':'Heartfelt',val:4,color:'#D4B0B0'},{label:locale.value==='zh'?'热烈':'Passion',val:2,color:'#C49A9A'}
]

const resources=[{titleKey:'creatorResource1Title',descKey:'creatorResource1Desc'},{titleKey:'creatorResource2Title',descKey:'creatorResource2Desc'},{titleKey:'creatorResource3Title',descKey:'creatorResource3Desc'},{titleKey:'creatorResource4Title',descKey:'creatorResource4Desc'}]
const tips=[{titleKey:'creatorTip1Title',descKey:'creatorTip1Desc'},{titleKey:'creatorTip2Title',descKey:'creatorTip2Desc'},{titleKey:'creatorTip3Title',descKey:'creatorTip3Desc'}]
const emotionTags=[{key:'moodLonging'},{key:'moodObsession'},{key:'moodTragedy'},{key:'moodComfort'},{key:'moodDanger'},{key:'moodNostalgia'},{key:'moodMelancholy'},{key:'moodIntimacy'},{key:'moodYearning'}]

function toggleExpand(k){expanded.value=expanded.value===k?null:k}
function loadProfile(){if(!userStore.currentUser)return;editName.value=userStore.currentUser.name||'';editBio.value=userStore.currentUser.bio||'';avatarDataUrl.value=userStore.currentUser.avatar||null;const s=JSON.parse(localStorage.getItem('ht_drafts_'+userStore.currentUser.id)||'[]');myWorks.value=s.slice(-5).reverse()}
function triggerAvatar(){avatarInput.value?.click()}
function handleAvatar(e){const file=e.target.files[0];if(!file)return;const r=new FileReader();r.onload=(ev)=>{avatarDataUrl.value=ev.target.result};r.readAsDataURL(file)}
function saveProfile(){userStore.updateProfile({name:editName.value.trim()||userStore.currentUser.name,avatar:avatarDataUrl.value,bio:editBio.value.trim()});savedProfile.value=true;setTimeout(()=>{savedProfile.value=false},2000)}
function saveDraft(){if(!storyTitle.value&&!storyContent.value)return;const s=JSON.parse(localStorage.getItem('ht_drafts_'+userStore.currentUser.id)||'[]');s.push({title:storyTitle.value||'无题',content:storyContent.value,status:'草稿',time:Date.now()});localStorage.setItem('ht_drafts_'+userStore.currentUser.id,JSON.stringify(s));myWorks.value=s.slice(-5).reverse();savedMsg.value=t('creatorSaved');setTimeout(()=>{savedMsg.value=''},2000)}
function publish(){if(!storyTitle.value&&!storyContent.value)return;const s=JSON.parse(localStorage.getItem('ht_drafts_'+userStore.currentUser.id)||'[]');s.push({title:storyTitle.value||'无题',content:storyContent.value,status:'已发布',time:Date.now()});localStorage.setItem('ht_drafts_'+userStore.currentUser.id,JSON.stringify(s));myWorks.value=s.slice(-5).reverse();storyTitle.value='';storyContent.value='';showPreview.value=false}

onMounted(()=>{loadProfile();const ro=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view');ro.unobserve(e.target)}})},{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>ro.observe(el))})
</script>
<style scoped>
.pg{max-width:1000px;margin:0 auto;padding:70px 24px 50px}
.ch{text-align:center;margin-bottom:28px}
.ch-bc{font-size:12px;color:var(--tm);margin-bottom:16px;letter-spacing:.3px}
.pg-bcl{color:var(--ts);transition:color .3s}.pg-bcl:hover{color:var(--tx)}
.pg-bs{margin:0 10px;color:var(--bd)}.pg-bcc{color:var(--tx);font-weight:500}
.ch-t{font-family:'Noto Serif SC','Georgia',serif;font-size:clamp(22px,2.5vw,28px);font-weight:600;color:var(--tx);letter-spacing:3px;margin-bottom:8px}
.en .ch-t{font-family:'Playfair Display','Georgia',serif}
.ch-s{font-size:13px;color:var(--ts);letter-spacing:.5px;max-width:400px;margin:0 auto;line-height:1.6}
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--gold);margin-bottom:28px}
.stat-item{background:var(--cw);padding:20px 12px;text-align:center;transition:all var(--tr)}.stat-item:hover{background:var(--bg)}
.stat-n{display:block;font-family:'Georgia',serif;font-size:24px;font-weight:400;color:var(--accent);letter-spacing:1px;margin-bottom:2px}
.stat-l{font-size:11px;color:var(--ts);letter-spacing:2px;text-transform:uppercase}
.rc-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin-bottom:32px}
.rc-card{background:var(--cw);padding:24px 24px;transition:all var(--tr);display:flex;flex-direction:column;border:1px solid var(--bd);position:relative}
.rc-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--gold),var(--accent-dim))}
.rc-card:hover{border-color:var(--gold);transform:translateY(-2px);box-shadow:var(--sm)}
.rc-icon{width:32px;height:32px;margin-bottom:12px;position:relative;background:var(--bg2);display:flex;align-items:center;justify-content:center}
.rc-icon::after{content:'';width:14px;height:14px;background:var(--ts);mask-size:contain;-webkit-mask-size:contain;mask-repeat:no-repeat}
.ricon-0::after{-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'/%3E%3Cpath d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'/%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'/%3E%3Cpath d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'/%3E%3C/svg%3E")}
.ricon-1::after{-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Crect x='3' y='11' width='18' height='11' rx='2' ry='2'/%3E%3Cpath d='M7 11V7a5 5 0 0 1 10 0v4'/%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Crect x='3' y='11' width='18' height='11' rx='2' ry='2'/%3E%3Cpath d='M7 11V7a5 5 0 0 1 10 0v4'/%3E%3C/svg%3E")}
.ricon-2::after{-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='9' cy='7' r='4'/%3E%3Cpath d='M23 21v-2a4 4 0 0 0-3-3.87'/%3E%3Cpath d='M16 3.13a4 4 0 0 1 0 7.75'/%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='9' cy='7' r='4'/%3E%3Cpath d='M23 21v-2a4 4 0 0 0-3-3.87'/%3E%3Cpath d='M16 3.13a4 4 0 0 1 0 7.75'/%3E%3C/svg%3E")}
.ricon-3::after{-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E");mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E")}
.rc-t{font-family:'Noto Serif SC','Georgia',serif;font-size:14px;font-weight:600;color:var(--tx);letter-spacing:.6px;margin-bottom:6px}
.rc-d{font-size:12px;color:var(--ts);line-height:1.5;letter-spacing:.3px;flex:1;margin-bottom:8px}
.rc-arrow{font-size:12px;color:var(--gold);transition:all var(--tr);align-self:flex-end}.rc-card:hover .rc-arrow{color:var(--accent);transform:translateX(4px)}
.section-h{margin-bottom:16px}
.section-title{font-family:'Noto Serif SC','Georgia',serif;font-size:16px;font-weight:600;color:var(--tx);letter-spacing:1.5px;padding-bottom:8px;border-bottom:1px solid var(--gold)}
.login-prompt{text-align:center;padding:36px 24px;background:linear-gradient(135deg,var(--bg2),var(--bg));border:1px solid var(--bd);margin-bottom:32px}
.login-prompt-text{font-size:13px;color:var(--ts);margin-bottom:16px}
.hero-btn{padding:10px 32px;background:var(--accent);color:var(--cw);font-size:11px;letter-spacing:2px;border:1px solid var(--gold);transition:all var(--tr)}.hero-btn:hover{background:var(--gold);color:var(--tx)}
.profile-layout{display:grid;grid-template-columns:240px 1fr;gap:16px;margin-bottom:32px}
.profile-card{background:var(--cw);padding:20px;border:1px solid var(--bd);align-self:start}
.pc-avatar-wrap{width:64px;height:64px;margin:0 auto 16px;position:relative;cursor:pointer;overflow:hidden}
.pc-avatar-letter{width:100%;height:100%;background:var(--bg2);color:var(--ts);display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:500}
.pc-avatar-img{width:100%;height:100%;object-fit:cover}
.pc-avatar-overlay{position:absolute;inset:0;background:rgba(58,42,34,.4);color:#fff;display:flex;align-items:center;justify-content:center;font-size:10px;letter-spacing:1px;opacity:0;transition:opacity .3s}.pc-avatar-wrap:hover .pc-avatar-overlay{opacity:1}
.hidden-input{display:none}
.pc-fields{margin-bottom:12px}
.pc-label{display:block;font-size:10px;color:var(--tm);letter-spacing:1px;text-transform:uppercase;margin-bottom:4px}
.pc-input{width:100%;padding:8px 12px;border:1px solid var(--bd);font-size:13px;color:var(--tx);background:var(--bg);outline:none;box-sizing:border-box;font-family:inherit}.pc-input:focus{border-color:var(--gold)}
.pc-textarea{width:100%;padding:8px 12px;border:1px solid var(--bd);font-size:12px;color:var(--ts);background:var(--bg);outline:none;resize:none;box-sizing:border-box;font-family:inherit;line-height:1.5}.pc-textarea:focus{border-color:var(--gold)}
.pc-actions{display:flex;align-items:center;gap:10px}
.pc-save-btn{padding:6px 18px;background:var(--accent);color:var(--cw);border:none;font-size:11px;letter-spacing:1px;cursor:pointer;font-family:inherit}.pc-save-btn:hover{background:var(--tx)}
.pc-saved{font-size:11px;color:var(--ts)}
.editor-wrap{background:var(--cw);padding:20px;border:1px solid var(--bd)}
.editor-title-fld{margin-bottom:10px}
.et-input{width:100%;padding:10px 14px;border:1px solid var(--bd);font-size:14px;font-family:'Noto Serif SC','Georgia',serif;color:var(--tx);background:var(--bg);outline:none;box-sizing:border-box}.et-input:focus{border-color:var(--gold)}
.et-input::placeholder{color:var(--tm);font-family:'Inter',sans-serif;font-size:13px}
.editor-body-fld{margin-bottom:10px}
.ec-textarea{width:100%;height:180px;padding:12px;border:1px solid var(--bd);font-size:13px;color:var(--tx);background:var(--bg);outline:none;resize:vertical;box-sizing:border-box;font-family:'Inter',sans-serif;line-height:1.8}.ec-textarea:focus{border-color:var(--gold)}
.editor-actions{display:flex;gap:8px;flex-wrap:wrap}
.ea-btn{padding:8px 16px;background:transparent;border:1px solid var(--bd);font-size:11px;color:var(--ts);cursor:pointer;font-family:inherit;transition:all var(--tr)}.ea-btn:hover{border-color:var(--gold);color:var(--tx)}
.ea-primary{background:var(--accent);color:var(--cw);border-color:var(--gold)}.ea-primary:hover{background:var(--gold);color:var(--tx)}
.save-msg{font-size:11px;color:var(--ts);margin-top:8px}
.preview{margin-top:16px;padding:18px;background:var(--bg);border:1px solid var(--bd)}
.preview-h{margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid var(--bd)}
.preview-title{font-family:'Noto Serif SC','Georgia',serif;font-size:15px;font-weight:600;color:var(--tx);letter-spacing:.6px;margin-bottom:3px}
.preview-author{font-size:11px;color:var(--tm)}.preview-body{min-height:24px}.preview-text{font-size:12px;color:var(--ts);line-height:1.7;white-space:pre-wrap}
.drafts-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:32px}
.draft-card{padding:14px 16px;background:var(--cw);border:1px solid var(--bd);transition:all var(--tr)}.draft-card:hover{border-color:var(--gold);transform:translateY(-1px)}
.draft-title{font-size:13px;font-weight:500;color:var(--tx);letter-spacing:.5px;margin-bottom:6px}
.draft-meta{display:flex;justify-content:space-between}.draft-status{font-size:10px;padding:2px 6px;background:var(--bg2);color:var(--tm)}
.draft-status.pub{background:var(--accent-dim);color:var(--cw)}.draft-time{font-size:10px;color:var(--tm)}

/* ====== EMOTION ARCHIVE ====== */
.ea-frame{position:relative;background:var(--cw);border:1px solid var(--gold);padding:32px 28px;margin-bottom:32px;background-image:radial-gradient(ellipse at 20% 30%,rgba(212,192,140,.04) 0%,transparent 50%),radial-gradient(ellipse at 80% 70%,rgba(196,154,154,.03) 0%,transparent 50%)}
.ea-c{position:absolute;width:40px;height:40px;border-color:var(--gold);opacity:.35}
.ea-c-tl{top:8px;left:8px;border-top:1.5px solid;border-left:1.5px solid}
.ea-c-tr{top:8px;right:8px;border-top:1.5px solid;border-right:1.5px solid}
.ea-c-bl{bottom:8px;left:8px;border-bottom:1.5px solid;border-left:1.5px solid}
.ea-c-br{bottom:8px;right:8px;border-bottom:1.5px solid;border-right:1.5px solid}
.ea-ornament{text-align:center;font-size:20px;color:var(--gold);opacity:.35;margin-bottom:24px;font-family:'Georgia',serif}
.ea-cols{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px}
.ea-col{display:flex;flex-direction:column;gap:12px}
.ea-col-h{display:flex;align-items:center;gap:8px;padding-bottom:8px;border-bottom:1px solid var(--bd)}
.ea-col-icon{font-size:16px;color:var(--gold);opacity:.6}
.ea-col-t{font-family:'Noto Serif SC','Georgia',serif;font-size:14px;font-weight:600;color:var(--tx);letter-spacing:1px}
.ea-quote-card{background:var(--bg);padding:16px;cursor:pointer;transition:all var(--tr);position:relative}
.ea-quote-card:hover{background:var(--bg2);box-shadow:0 2px 12px rgba(212,192,140,.12)}
.ea-quote{font-size:12px;color:var(--ts);line-height:1.7;letter-spacing:.5px;font-style:italic;margin-bottom:6px}
.ea-quote-author{font-size:10px;color:var(--tm);letter-spacing:.5px;text-align:right}
.ea-expand{padding-top:10px;margin-top:10px;border-top:1px solid var(--bd);animation:fadeIn .3s}
.ea-expand p{font-size:11px;color:var(--ts);line-height:1.6;letter-spacing:.3px}
@keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
.ea-col-tags{display:flex;flex-wrap:wrap;gap:4px}
.ea-tag{font-size:10px;padding:4px 10px;letter-spacing:.5px;border-radius:2px;display:inline-block}

.ea-spectrum{background:var(--bg);padding:14px;margin-bottom:4px}
.ea-spec-h{font-size:10px;color:var(--tm);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:10px}
.ea-spec-bar{display:flex;gap:6px;align-items:flex-end;height:48px}
.ea-spec-item{display:flex;flex-direction:column;align-items:center;gap:4px;min-width:40px}
.ea-spec-dot{width:20px;height:20px;border-radius:50%;transition:all var(--tr)}.ea-spec-item:hover .ea-spec-dot{transform:scale(1.3)}
.ea-spec-l{font-size:9px;color:var(--tm);letter-spacing:.5px;white-space:nowrap}

.ea-memory-card{background:var(--bg);padding:16px;cursor:pointer;transition:all var(--tr);text-align:center}
.ea-memory-card:hover{background:var(--bg2);box-shadow:0 2px 12px rgba(212,192,140,.12)}
.ea-memory-icon{font-size:24px;color:var(--gold);opacity:.4;margin-bottom:8px}
.ea-memory-t{font-family:'Noto Serif SC','Georgia',serif;font-size:13px;font-weight:600;color:var(--tx);letter-spacing:.8px;margin-bottom:6px}
.ea-memory-d{font-size:11px;color:var(--ts);line-height:1.5;letter-spacing:.3px;font-style:italic}
.ea-divider{text-align:center;font-size:12px;color:var(--gold);letter-spacing:6px;opacity:.4;margin:16px 0}
.ea-tag-cloud{display:flex;flex-wrap:wrap;gap:6px;justify-content:center}
.ea-cloud-tag{padding:6px 16px;background:var(--bg);border:1px solid var(--bd);font-size:11px;color:var(--ts);letter-spacing:.5px;transition:all var(--tr);cursor:default}
.ea-cloud-tag:hover{border-color:var(--gold);color:var(--accent);background:var(--cw)}

/* Tips */
.tip-list{display:flex;flex-direction:column;gap:8px;margin-bottom:32px}
.tip-item{display:flex;gap:14px;padding:16px 18px;background:var(--cw);border:1px solid var(--bd);transition:all var(--tr);align-items:flex-start}
.tip-item:hover{border-color:var(--gold);transform:translateY(-1px)}
.tip-item:nth-child(1){border-left:3px solid var(--gold)}.tip-item:nth-child(2){border-left:3px solid var(--accent-dim)}.tip-item:nth-child(3){border-left:3px solid var(--accent)}
.tip-num{font-size:14px;font-weight:300;color:var(--tm);line-height:1;flex-shrink:0;width:24px}
.tip-bd{flex:1}
.tip-t{font-family:'Noto Serif SC','Georgia',serif;font-size:13px;font-weight:600;color:var(--tx);letter-spacing:.5px;margin-bottom:4px}
.tip-d{font-size:12px;color:var(--ts);line-height:1.5;letter-spacing:.3px}

@media(max-width:968px){
  .profile-layout{grid-template-columns:1fr}.ea-cols{grid-template-columns:1fr}.ea-frame{padding:24px 16px}
}
@media(max-width:640px){
  .pg{padding:60px 16px 36px}.stats{grid-template-columns:repeat(2,1fr)}.rc-grid{grid-template-columns:1fr}.drafts-grid{grid-template-columns:1fr}.ea-frame{padding:20px 12px}.ea-c{width:24px;height:24px}
}
</style>
