<template>
  <div class="ai-page">
    <div class="bcrumb"><router-link to="/ai" class="bcl">{{ locale==='zh'?'AI 叙事陪伴':'AI Companion' }}</router-link><span class="bcsep">/</span><span class="bcc">{{ locale==='zh'?'灵感生成':'Inspiration Generator' }}</span></div>

    <div class="ap-h">
      <h1 class="ap-t">{{ locale==='zh'?'灵感生成':'Inspiration Generator' }}</h1>
      <p class="ap-s">{{ locale==='zh'?'当故事不知道如何继续、当角色还没有名字——让AI为你点亮灵感的微光。每次刷新，都是全新的叙事可能。':'When the story gets stuck, when characters have no names — let AI spark a light of inspiration. Every refresh brings brand new narrative possibilities.' }}</p>
    </div>

    <!-- Type selector -->
    <div class="in-tabs">
      <button v-for="tp in types" :key="tp.id" :class="['in-tab',{active:activeType===tp.id}]" @click="activeType=tp.id;refresh()">{{ locale==='zh'?tp.zh:tp.en }}</button>
    </div>

    <!-- Current inspiration -->
    <div class="in-card">
      <div class="in-icon">✧</div>
      <p class="in-text">{{ currentInspiration }}</p>
      <div class="in-actions">
        <button class="btn-p" @click="refresh">{{ locale==='zh'?'🔄 换一个':'🔄 Refresh' }}</button>
        <button class="btn-s" @click="saveInspiration">{{ locale==='zh'?'♡ 收藏':'♡ Save' }}</button>
      </div>
      <p v-if="saveNote" class="in-note">{{ saveNote }}</p>
    </div>

    <!-- Saved -->
    <div v-if="saved.length" class="in-saved">
      <h3 class="in-st">{{ locale==='zh'?'我的灵感收藏':'My Inspiration Collection' }}</h3>
      <div v-for="(item,i) in saved" :key="i" class="in-si">
        <p class="in-sp">{{ item }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { getInspiration } from './aiResponses.js'

const locale = inject('locale')
const activeType = ref('premise')
const currentInspiration = ref('')
const saveNote = ref('')
const saved = ref(JSON.parse(localStorage.getItem('ht_ai_inspiration') || '[]'))

const types = [
  { id:'premise', zh:'剧情设定', en:'Story Premise' },
  { id:'character', zh:'角色构想', en:'Character Concept' },
  { id:'twist', zh:'情节反转', en:'Plot Twist' },
]

function refresh() {
  currentInspiration.value = getInspiration(activeType.value, locale.value)
}

function saveInspiration() {
  if (!currentInspiration.value || saved.value.includes(currentInspiration.value)) return
  saved.value.unshift(currentInspiration.value)
  if (saved.value.length > 30) saved.value = saved.value.slice(0, 30)
  localStorage.setItem('ht_ai_inspiration', JSON.stringify(saved.value))
  saveNote.value = locale.value === 'zh' ? '✅ 已收藏' : '✅ Saved'
  setTimeout(() => { saveNote.value = '' }, 2000)
}

// Initial
refresh()
</script>

<style scoped>
.ai-page{max-width:800px;margin:0 auto;padding:120px 24px 80px}
.bcrumb{font-size:13px;color:var(--tm);margin-bottom:32px;letter-spacing:.3px}
.bcl{color:var(--ts);transition:color .3s}.bcl:hover{color:var(--tx)}
.bcsep{margin:0 10px;color:var(--bd)}.bcc{color:var(--tx);font-weight:500}
.ap-h{margin-bottom:36px;text-align:center}
.ap-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:clamp(24px,3.5vw,32px);font-weight:600;color:var(--tx);letter-spacing:1.5px;margin-bottom:12px}
.en .ap-t{font-family:'Playfair Display','Noto Serif SC',serif}
.ap-s{font-size:14px;color:var(--ts);line-height:1.7;letter-spacing:.3px;max-width:530px;margin:0 auto}
.in-tabs{display:flex;gap:8px;margin-bottom:24px;justify-content:center}
.in-tab{padding:10px 24px;border:1.5px solid var(--bd);border-radius:20px;background:transparent;font-size:14px;font-weight:400;color:var(--ts);cursor:pointer;transition:all .3s;font-family:inherit;letter-spacing:.5px}
.in-tab:hover{border-color:var(--p);color:var(--tx)}
.in-tab.active{background:var(--tx);color:#fff;border-color:var(--tx)}
.in-card{background:var(--cw);border-radius:var(--rm);padding:48px 32px;box-shadow:var(--ss);text-align:center;margin-bottom:32px}
.in-icon{font-size:36px;color:var(--p);margin-bottom:20px}
.in-text{font-size:16px;color:var(--tx);line-height:1.8;letter-spacing:.3px;max-width:560px;margin:0 auto 28px}
.in-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.in-actions .btn-p,.in-actions .btn-s{padding:12px 28px;font-size:13px}
.in-note{font-size:12px;color:var(--p);margin-top:12px}
.in-saved{border-top:1px solid var(--bd);padding-top:24px}
.in-st{font-family:'Noto Serif SC','Playfair Display',serif;font-size:15px;font-weight:600;color:var(--tx);letter-spacing:.5px;margin-bottom:16px}
.in-si{padding:16px 0;border-bottom:1px solid var(--bd)}
.in-si:last-child{border-bottom:none}
.in-sp{font-size:14px;color:var(--ts);line-height:1.7;letter-spacing:.3px}
@media(max-width:640px){
  .ai-page{padding:100px 16px 60px}
  .in-card{padding:32px 24px}
  .in-tabs{gap:6px}
  .in-tab{font-size:13px;padding:8px 16px}
}
</style>
