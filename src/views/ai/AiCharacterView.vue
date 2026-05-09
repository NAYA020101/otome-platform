<template>
  <div class="ai-page">
    <div class="bcrumb"><router-link to="/ai" class="bcl">{{ locale==='zh'?'AI 叙事陪伴':'AI Companion' }}</router-link><span class="bcsep">/</span><span class="bcc">{{ locale==='zh'?'角色互动':'Character Interaction' }}</span></div>

    <div class="ap-h">
      <h1 class="ap-t">{{ locale==='zh'?'角色互动':'Character Interaction' }}</h1>
      <p class="ap-s">{{ locale==='zh'?'选择一个角色，进入属于你们的叙事空间。每一次对话，都是独一无二的专属剧情线。':'Choose a character and enter your narrative space. Every conversation is a unique storyline, just for you.' }}</p>
    </div>

    <!-- Character selector -->
    <div class="ch-select">
      <button v-for="c in characters" :key="c.id" :class="['ch-sbtn',{active:activeChar===c.id}]" @click="selectChar(c.id)">
        <span class="ch-sdot" :class="'dot-'+c.id"></span>
        <span>{{ locale==='zh'?c.zh:c.en }}</span>
      </button>
    </div>

    <!-- Chat -->
    <div class="ch-chat">
      <div class="ch-box" ref="chatBox">
        <div v-for="(msg,i) in chat" :key="i" class="msg" :class="msg.role">
          <div class="msg-ava">{{ msg.role==='char'?activeChar[0].toUpperCase():'U' }}</div>
          <div class="msg-b">{{ msg.text }}</div>
        </div>
      </div>
      <div class="ch-input">
        <input v-model="inputText" :placeholder="locale==='zh'?'输入你的回应……':'Type your response...'" @keyup.enter="sendMsg" />
        <button class="btn-p ch-send" @click="sendMsg">{{ locale==='zh'?'发送':'Send' }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, nextTick } from 'vue'
import { getCharacterIntro } from './aiResponses.js'

const locale = inject('locale')
const chatBox = ref(null)
const inputText = ref('')
const activeChar = ref('luna')
const chat = ref([])

const characters = [
  { id:'luna', zh:'露娜 · 星际旅人', en:'Luna · Star Traveler' },
  { id:'lien', zh:'林鸢 · 民国画师', en:'Lien · Republic Era Artist' },
  { id:'sera', zh:'塞拉 · 未来诗者', en:'Sera · Future Poet' },
]

function selectChar(id) {
  activeChar.value = id
  chat.value = []
  const intro = getCharacterIntro(id, locale.value)
  chat.value.push({ role: 'char', text: intro.greet })
  chat.value.push({ role: 'char', text: intro.desc })
  nextTick(() => scrollDown())
}

// Load saved or init default
const saved = localStorage.getItem('ht_ai_char_' + activeChar.value)
if (saved) {
  chat.value = JSON.parse(saved)
} else {
  const intro = getCharacterIntro(activeChar.value, locale.value)
  chat.value.push({ role: 'char', text: intro.greet })
  chat.value.push({ role: 'char', text: intro.desc })
}

function sendMsg() {
  const t = inputText.value.trim()
  if (!t) return
  chat.value.push({ role: 'user', text: t })
  inputText.value = ''
  saveChat()
  nextTick(() => scrollDown())
  setTimeout(() => {
    const replies = locale.value === 'zh'
      ? ['我明白你的意思。让我想想……', '你的话让我想起了很多往事。', '这是一个很有趣的角度。', '你说得对，我一直也是这么想的。', '我会记住你说的每一句话。']
      : ['I understand what you mean. Let me think...', 'Your words remind me of many things.', 'That is a very interesting perspective.', 'You are right. I have always thought so too.', 'I will remember every word you said.']
    chat.value.push({ role: 'char', text: replies[Math.floor(Math.random() * replies.length)] })
    saveChat()
    nextTick(() => scrollDown())
  }, 800)
}

function saveChat() {
  localStorage.setItem('ht_ai_char_' + activeChar.value, JSON.stringify(chat.value))
}

function scrollDown() {
  chatBox.value?.scrollTo({ top: chatBox.value.scrollHeight, behavior: 'smooth' })
}

// Reload watcher handled by init
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
.ch-select{display:flex;gap:10px;justify-content:center;margin-bottom:32px;flex-wrap:wrap}
.ch-sbtn{display:flex;align-items:center;gap:8px;padding:12px 22px;border:1.5px solid var(--bd);border-radius:20px;background:var(--cw);font-size:14px;color:var(--ts);cursor:pointer;transition:all .3s;font-family:inherit;letter-spacing:.3px}
.ch-sbtn:hover{border-color:var(--p);color:var(--tx)}
.ch-sbtn.active{background:var(--tx);color:#fff;border-color:var(--tx)}
.ch-sdot{width:8px;height:8px;border-radius:50%}
.dot-luna{background:var(--p)}.dot-lien{background:var(--r)}.dot-sera{background:var(--t)}
.ch-chat{background:var(--cw);border-radius:var(--rm);box-shadow:var(--ss);overflow:hidden}
.ch-box{height:380px;overflow-y:auto;padding:24px;display:flex;flex-direction:column;gap:16px}
.ch-box::-webkit-scrollbar{width:4px}
.ch-box::-webkit-scrollbar-thumb{background:var(--p);border-radius:2px}
.msg{display:flex;gap:12px;max-width:85%}
.msg.char{align-self:flex-start}
.msg.user{align-self:flex-end;flex-direction:row-reverse}
.msg-ava{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;flex-shrink:0;font-family:'Playfair Display',serif}
.msg.char .msg-ava{background:var(--p);color:#fff}
.msg.user .msg-ava{background:var(--tx);color:#fff}
.msg-b{padding:14px 18px;border-radius:16px;font-size:14px;line-height:1.7;letter-spacing:.3px}
.msg.char .msg-b{background:var(--bg);color:var(--tx);border-bottom-left-radius:4px}
.msg.user .msg-b{background:var(--tx);color:#fff;border-bottom-right-radius:4px}
.ch-input{display:flex;gap:12px;padding:16px 24px;border-top:1px solid var(--bd)}
.ch-input input{flex:1;padding:14px 16px;border:1.5px solid var(--bd);border-radius:12px;font-size:14px;font-family:inherit;color:var(--tx);background:var(--bg);outline:none;transition:border-color .3s}
.ch-input input:focus{border-color:var(--p)}
.ch-input input::placeholder{color:var(--tm)}
.ch-send{padding:14px 28px;font-size:13px}
@media(max-width:640px){
  .ai-page{padding:100px 16px 60px}
  .ch-box{height:320px;padding:16px}
  .ch-input{padding:12px 16px}
  .msg{max-width:92%}
  .ch-sbtn{font-size:13px;padding:10px 16px}
}
</style>
