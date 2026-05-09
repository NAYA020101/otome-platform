<template>
  <div class="ai-page">
    <div class="bcrumb"><router-link to="/ai" class="bcl">{{ locale==='zh'?'AI 叙事陪伴':'AI Companion' }}</router-link><span class="bcsep">/</span><span class="bcc">{{ locale==='zh'?'遗憾改写':'Healing Rewrite' }}</span></div>

    <div class="ap-h">
      <h1 class="ap-t">{{ locale==='zh'?'遗憾改写':'Healing Rewrite' }}</h1>
      <p class="ap-s">{{ locale==='zh'?'那些让你耿耿于怀的结局、无法释怀的离别——让AI帮你改写。不是遗忘，而是用另一种方式，给故事一个温柔的救赎。':'Those endings that haunt you, the goodbyes you cannot let go of — let AI rewrite them. Not to forget, but to give your story a gentle redemption.' }}</p>
    </div>

    <div class="hl-card">
      <h3 class="hl-ct">{{ locale==='zh'?'描述你心中的遗憾':'Describe the regret in your heart' }}</h3>
      <div class="fld"><textarea v-model="inputText" :placeholder="locale==='zh'?'写下一个让你遗憾的故事结局、一段未能说出口的话，或一个想要改变的离别……':'Write an ending you regret, words left unsaid, or a goodbye you wish you could change...'" rows="4"></textarea></div>
      <div class="hl-act"><button class="btn-p" @click="rewrite">{{ locale==='zh'?'改写结局':'Rewrite Ending' }}</button></div>
      <p v-if="warn" class="hl-warn">{{ warn }}</p>
      <div v-if="output" class="hl-out">
        <div class="hl-out-b">{{ output }}</div>
        <button class="hl-save" @click="saveRewrite">{{ locale==='zh'?'💾 保存改写':'💾 Save Rewrite' }}</button>
      </div>
      <p v-if="saveNote" class="hl-note">{{ saveNote }}</p>
    </div>

    <div v-if="rewrites.length" class="hl-history">
      <h3 class="hl-ht">{{ locale==='zh'?'改写记录':'Rewrite History' }}</h3>
      <div v-for="(item,i) in rewrites" :key="i" class="hl-hi">
        <p class="hl-hp">{{ item.slice(0,150) }}{{ item.length>150?'…':'' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'
import { getHealingRewrite } from './aiResponses.js'

const locale = inject('locale')
const inputText = ref('')
const output = ref('')
const warn = ref('')
const saveNote = ref('')
const rewrites = ref(JSON.parse(localStorage.getItem('ht_ai_healing') || '[]'))

function rewrite() {
  warn.value = ''; output.value = ''
  if (!inputText.value.trim()) {
    warn.value = locale.value === 'zh' ? '请描述你心中的遗憾 🌸' : 'Please describe the regret in your heart 🌸'
    return
  }
  output.value = getHealingRewrite(inputText.value.trim(), locale.value)
}

function saveRewrite() {
  if (!output.value) return
  rewrites.value.unshift(output.value)
  if (rewrites.value.length > 20) rewrites.value = rewrites.value.slice(0, 20)
  localStorage.setItem('ht_ai_healing', JSON.stringify(rewrites.value))
  saveNote.value = locale.value === 'zh' ? '✅ 改写已保存' : '✅ Rewrite saved'
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
.hl-card{background:var(--cw);border-radius:var(--rm);padding:32px;box-shadow:var(--ss);margin-bottom:32px}
.hl-ct{font-family:'Noto Serif SC','Playfair Display',serif;font-size:16px;font-weight:600;color:var(--tx);letter-spacing:.5px;margin-bottom:16px}
.fld{margin-bottom:16px}
.fld textarea{width:100%;padding:14px 16px;border:1.5px solid var(--bd);border-radius:12px;font-size:14px;font-family:inherit;color:var(--tx);background:var(--bg);outline:none;transition:border-color .3s;resize:vertical;box-sizing:border-box;line-height:1.7}
.fld textarea:focus{border-color:var(--p)}
.fld textarea::placeholder{color:var(--tm)}
.hl-act{margin-bottom:8px}
.hl-warn{font-size:13px;color:var(--t);margin-bottom:12px}
.hl-out{background:var(--bg);border-radius:12px;padding:20px;margin-top:16px}
.hl-out-b{font-size:14px;line-height:1.8;color:var(--tx);letter-spacing:.3px;white-space:pre-wrap;margin-bottom:12px}
.hl-save{font-size:13px;color:var(--ts);cursor:pointer;transition:color .3s;background:none;border:none;font-family:inherit}
.hl-save:hover{color:var(--tx)}
.hl-note{font-size:12px;color:var(--p);margin-top:8px;text-align:center}
.hl-history{border-top:1px solid var(--bd);padding-top:24px}
.hl-ht{font-family:'Noto Serif SC','Playfair Display',serif;font-size:15px;font-weight:600;color:var(--tx);letter-spacing:.5px;margin-bottom:16px}
.hl-hi{padding:14px 0;border-bottom:1px solid var(--bd)}
.hl-hi:last-child{border-bottom:none}
.hl-hp{font-size:13px;color:var(--ts);line-height:1.6;letter-spacing:.3px}
@media(max-width:640px){
  .ai-page{padding:100px 16px 60px}
  .hl-card{padding:24px 20px}
}
</style>
