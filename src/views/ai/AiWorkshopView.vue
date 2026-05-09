<template>
  <div class="ai-page">
    <div class="bcrumb"><router-link to="/ai" class="bcl">{{ locale==='zh'?'AI 叙事陪伴':'AI Companion' }}</router-link><span class="bcsep">/</span><span class="bcc">{{ locale==='zh'?'剧情共创工坊':'Story Workshop' }}</span></div>

    <div class="ap-h">
      <h1 class="ap-t">{{ locale==='zh'?'剧情共创工坊':'Story Co-creation Workshop' }}</h1>
      <p class="ap-s">{{ locale==='zh'?'和AI一起打磨你的故事——共创剧情、润色对白、反套路改写。每一次创作，都是你叙事力量的见证。':'Co-craft your story with AI — co-create plots, polish dialogue, rewrite tropes. Every creation is a testament to your narrative power.' }}</p>
    </div>

    <!-- Tabs -->
    <div class="ws-tabs">
      <button v-for="tab in tabs" :key="tab.id" :class="['ws-tab',{active:activeTab===tab.id}]" @click="activeTab=tab.id;output='';warn=''">{{ locale==='zh'?tab.zh:tab.en }}</button>
    </div>

    <!-- Input -->
    <div class="ws-card">
      <h3 class="ws-ct">{{ locale==='zh'?inputLabels[activeTab]?.zh:inputLabels[activeTab]?.en }}</h3>
      <div class="fld"><textarea v-model="inputText" :placeholder="locale==='zh'?placeholders[activeTab]?.zh:placeholders[activeTab]?.en" rows="5"></textarea></div>
      <div class="ws-act"><button class="btn-p" @click="generate">{{ locale==='zh'?'生成':'Generate' }}</button></div>
      <p v-if="warn" class="ws-warn">{{ warn }}</p>
      <div v-if="output" class="ws-out"><div class="ws-out-b">{{ output }}</div><button class="ws-save" @click="saveOutput">{{ locale==='zh'?'💾 保存':'💾 Save' }}</button></div>
      <p v-if="saveNote" class="ws-note">{{ saveNote }}</p>
    </div>

    <!-- History -->
    <div v-if="history.length" class="ws-history">
      <h3 class="ws-ht">{{ locale==='zh'?'创作记录':'Creation History' }}</h3>
      <div v-for="(item,i) in history" :key="i" class="ws-hi">
        <p class="ws-hp">{{ item.slice(0,120) }}{{ item.length>120?'…':'' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { getWorkshopSuggestion } from './aiResponses.js'

const locale = inject('locale')
const activeTab = ref('co-create')
const inputText = ref('')
const output = ref('')
const warn = ref('')
const saveNote = ref('')

const history = ref(JSON.parse(localStorage.getItem('ht_ai_workshop') || '[]'))

const tabs = [
  { id:'co-create', zh:'共创剧情', en:'Co-create Plot' },
  { id:'polish', zh:'对白打磨', en:'Polish Dialogue' },
  { id:'rewrite', zh:'反套路改写', en:'Anti-trope Rewrite' },
]

const inputLabels = {
  'co-create': { zh:'写下你的剧情灵感或片段', en:'Write your plot idea or snippet' },
  'polish': { zh:'粘贴需要打磨的对白', en:'Paste the dialogue to polish' },
  'rewrite': { zh:'描述你想要改写的常见套路', en:'Describe the common trope to rewrite' },
}

const placeholders = {
  'co-create': { zh:'比如：一个女剑客在末世中遇到了会说话的古剑……', en:'e.g. A female swordsman meets a talking ancient sword in the apocalypse...' },
  'polish': { zh:'粘贴你的对白原文……', en:'Paste your original dialogue...' },
  'rewrite': { zh:'比如：霸道总裁爱上傻白甜', en:'e.g. Arrogant CEO falls for naive girl' },
}

function generate() {
  warn.value = ''; output.value = ''
  if (!inputText.value.trim()) {
    warn.value = locale.value === 'zh' ? '请先输入内容 🌸' : 'Please enter some content first 🌸'
    return
  }
  output.value = getWorkshopSuggestion(activeTab.value, inputText.value.trim(), locale.value)
}

function saveOutput() {
  if (!output.value) return
  history.value.unshift(output.value)
  if (history.value.length > 20) history.value = history.value.slice(0, 20)
  localStorage.setItem('ht_ai_workshop', JSON.stringify(history.value))
  saveNote.value = locale.value === 'zh' ? '✅ 已保存到创作记录' : '✅ Saved to history'
  setTimeout(() => { saveNote.value = '' }, 2000)
}
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
.ws-tabs{display:flex;gap:8px;margin-bottom:24px;justify-content:center}
.ws-tab{padding:10px 24px;border:1.5px solid var(--bd);border-radius:20px;background:transparent;font-size:14px;font-weight:400;color:var(--ts);cursor:pointer;transition:all .3s;font-family:inherit;letter-spacing:.5px}
.ws-tab:hover{border-color:var(--p);color:var(--tx)}
.ws-tab.active{background:var(--tx);color:#fff;border-color:var(--tx)}
.ws-card{background:var(--cw);border-radius:var(--rm);padding:32px;box-shadow:var(--ss);margin-bottom:32px}
.ws-ct{font-family:'Noto Serif SC','Playfair Display',serif;font-size:16px;font-weight:600;color:var(--tx);letter-spacing:.5px;margin-bottom:16px}
.fld{margin-bottom:16px}
.fld textarea{width:100%;padding:14px 16px;border:1.5px solid var(--bd);border-radius:12px;font-size:14px;font-family:inherit;color:var(--tx);background:var(--bg);outline:none;transition:border-color .3s;resize:vertical;box-sizing:border-box;line-height:1.7}
.fld textarea:focus{border-color:var(--p)}
.fld textarea::placeholder{color:var(--tm)}
.ws-act{margin-bottom:12px}
.ws-warn{font-size:13px;color:var(--t);margin-bottom:12px}
.ws-out{background:var(--bg);border-radius:12px;padding:20px;margin-top:16px;position:relative}
.ws-out-b{font-size:14px;line-height:1.8;color:var(--tx);letter-spacing:.3px;white-space:pre-wrap;margin-bottom:12px}
.ws-save{font-size:13px;color:var(--ts);cursor:pointer;transition:color .3s;background:none;border:none;font-family:inherit}
.ws-save:hover{color:var(--tx)}
.ws-note{font-size:12px;color:var(--p);margin-top:8px;text-align:center}
.ws-history{border-top:1px solid var(--bd);padding-top:24px}
.ws-ht{font-family:'Noto Serif SC','Playfair Display',serif;font-size:15px;font-weight:600;color:var(--tx);letter-spacing:.5px;margin-bottom:16px}
.ws-hi{padding:14px 0;border-bottom:1px solid var(--bd)}
.ws-hi:last-child{border-bottom:none}
.ws-hp{font-size:13px;color:var(--ts);line-height:1.6;letter-spacing:.3px}
@media(max-width:640px){
  .ai-page{padding:100px 16px 60px}
  .ws-card{padding:24px 20px}
  .ws-tabs{gap:6px}
  .ws-tab{font-size:13px;padding:8px 16px}
}
</style>
