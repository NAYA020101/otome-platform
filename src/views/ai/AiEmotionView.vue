<template>
  <div class="ai-page">
    <div class="bcrumb"><router-link to="/ai" class="bcl">{{ locale==='zh'?'AI 叙事陪伴':'AI Companion' }}</router-link><span class="bcsep">/</span><span class="bcc">{{ locale==='zh'?'情绪倾听':'Emotional Listening' }}</span></div>

    <div class="ap-h">
      <h1 class="ap-t">{{ locale==='zh'?'情绪倾听':'Emotional Listening' }}</h1>
      <p class="ap-s">{{ locale==='zh'?'在这里，每一种情绪都值得被温柔对待。告诉AI你的心事，她只会倾听，不会评判。':'Here, every emotion deserves gentle care. Tell AI your heart — she only listens, never judges.' }}</p>
    </div>

    <!-- Chat area -->
    <div class="chat-wrap">
      <div class="chat-box" ref="chatBox">
        <div v-for="(msg,i) in messages" :key="i" class="msg" :class="msg.role">
          <div class="msg-ava">{{ msg.role==='ai'?'AI':(userStore.currentUser?.name?.[0]||'U') }}</div>
          <div class="msg-b">{{ msg.text }}</div>
        </div>
        <div v-if="messages.length===1" class="chat-hint">{{ locale==='zh'?'在下方输入你想说的话……她在这里倾听你 🌷':'Type below what you want to say... She is here to listen 🌷' }}</div>
      </div>
      <div class="chat-input-wrap">
        <input v-model="inputText" :placeholder="locale==='zh'?'告诉她你的心情……':'Tell her how you feel...'" @keyup.enter="sendMsg" />
        <button class="btn-p chat-send" @click="sendMsg">{{ locale==='zh'?'发送':'Send' }}</button>
      </div>
      <div class="chat-actions">
        <button class="chat-act" @click="saveChat">{{ locale==='zh'?'💾 保存对话':'💾 Save Chat' }}</button>
        <button class="chat-act" @click="clearChat">{{ locale==='zh'?'🗑 清空对话':'🗑 Clear Chat' }}</button>
      </div>
      <p v-if="saveNote" class="chat-note">{{ saveNote }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, nextTick } from 'vue'
import { userStore } from '../../stores/userStore.js'
import { getEmotionResponse } from './aiResponses.js'

const locale = inject('locale')
const chatBox = ref(null)
const inputText = ref('')
const saveNote = ref('')

const messages = ref(JSON.parse(localStorage.getItem('ht_ai_emotion') || '[]'))
if (messages.value.length === 0) {
  const greet = locale.value === 'zh' ? '你好，我是你的AI倾听者。无论你在想什么、感受到什么，都可以告诉我。我在这里，不评判，只陪伴。💜' : 'Hello, I am your AI listener. Whatever you are thinking or feeling, you can tell me. I am here — no judgment, only company. 💜'
  messages.value.push({ role: 'ai', text: greet })
}

function sendMsg() {
  const t = inputText.value.trim()
  if (!t) return
  messages.value.push({ role: 'user', text: t })
  inputText.value = ''
  nextTick(() => { chatBox.value?.scrollTo({ top: chatBox.value.scrollHeight, behavior: 'smooth' }) })
  setTimeout(() => {
    const reply = getEmotionResponse(t, locale.value)
    messages.value.push({ role: 'ai', text: reply })
    saveLocal()
    nextTick(() => { chatBox.value?.scrollTo({ top: chatBox.value.scrollHeight, behavior: 'smooth' }) })
  }, 600 + Math.random() * 400)
}

function saveLocal() {
  localStorage.setItem('ht_ai_emotion', JSON.stringify(messages.value))
}

function saveChat() {
  saveLocal()
  saveNote.value = locale.value === 'zh' ? '✅ 对话已保存到本地' : '✅ Chat saved locally'
  setTimeout(() => { saveNote.value = '' }, 2000)
}

function clearChat() {
  if (confirm(locale.value === 'zh' ? '确定清空所有对话吗？' : 'Clear all messages?')) {
    messages.value = []
    const greet = locale.value === 'zh' ? '你好，我是你的AI倾听者。💜' : 'Hello, I am your AI listener. 💜'
    messages.value.push({ role: 'ai', text: greet })
    saveLocal()
  }
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
.ap-s{font-size:14px;color:var(--ts);line-height:1.7;letter-spacing:.3px;max-width:500px;margin:0 auto}
.chat-wrap{background:var(--cw);border-radius:var(--rm);box-shadow:var(--ss);overflow:hidden}
.chat-box{height:400px;overflow-y:auto;padding:24px;display:flex;flex-direction:column;gap:16px}
.chat-box::-webkit-scrollbar{width:4px}
.chat-box::-webkit-scrollbar-thumb{background:var(--p);border-radius:2px}
.msg{display:flex;gap:12px;max-width:85%}
.msg.ai{align-self:flex-start}
.msg.user{align-self:flex-end;flex-direction:row-reverse}
.msg-ava{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;flex-shrink:0;font-family:'Playfair Display',serif}
.msg.ai .msg-ava{background:var(--p);color:#fff}
.msg.user .msg-ava{background:var(--tx);color:#fff}
.msg-b{padding:14px 18px;border-radius:16px;font-size:14px;line-height:1.7;letter-spacing:.3px;white-space:pre-wrap}
.msg.ai .msg-b{background:var(--bg);color:var(--tx);border-bottom-left-radius:4px}
.msg.user .msg-b{background:var(--tx);color:#fff;border-bottom-right-radius:4px}
.chat-hint{text-align:center;color:var(--tm);font-size:13px;padding:20px 0}
.chat-input-wrap{display:flex;gap:12px;padding:16px 24px;border-top:1px solid var(--bd)}
.chat-input-wrap input{flex:1;padding:14px 16px;border:1.5px solid var(--bd);border-radius:12px;font-size:14px;font-family:inherit;color:var(--tx);background:var(--bg);outline:none;transition:border-color .3s}
.chat-input-wrap input:focus{border-color:var(--p)}
.chat-input-wrap input::placeholder{color:var(--tm)}
.chat-send{padding:14px 28px;font-size:13px}
.chat-actions{display:flex;gap:16px;padding:12px 24px 20px}
.chat-act{font-size:13px;color:var(--ts);cursor:pointer;transition:color .3s;background:none;border:none;font-family:inherit;letter-spacing:.3px}
.chat-act:hover{color:var(--tx)}
.chat-note{text-align:center;font-size:12px;color:var(--p);padding:0 24px 20px}
@media(max-width:640px){
  .ai-page{padding:100px 16px 60px}
  .chat-box{height:320px;padding:16px}
  .chat-input-wrap{padding:12px 16px}
  .msg{max-width:92%}
}
</style>
