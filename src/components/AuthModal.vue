<template>
  <Teleport to="body">
    <div v-if="userStore.showAuthModal" class="mm" @click.self="userStore.showAuthModal = false">
      <div class="mp ap" @click.stop>
        <button class="mc" @click="userStore.showAuthModal = false">✕</button>
        <div class="atabs">
          <button :class="['tab',{active:userStore.authMode==='login'}]" @click="userStore.authMode='login'">{{ t2('authLogin') }}</button>
          <button :class="['tab',{active:userStore.authMode==='register'}]" @click="userStore.authMode='register'">{{ t2('authRegister') }}</button>
        </div>

        <form v-if="userStore.authMode==='login'" class="af" @submit.prevent="handleLogin">
          <p class="ag">{{ locale==='zh'?'欢迎回来 🌸':'Welcome back 🌸' }}</p>
          <div class="fld"><input v-model="loginName" type="text" :placeholder="locale==='zh'?'用户名':'Username'" required /></div>
          <div class="fld"><input v-model="loginPwd" type="password" :placeholder="locale==='zh'?'密码':'Password'" required /></div>
          <p v-if="loginErr" class="aerr">{{ loginErr }}</p>
          <button type="submit" class="btn-p abtn">{{ t2('authLoginBtn') }}</button>
        </form>

        <form v-else class="af" @submit.prevent="handleRegister">
          <p class="ag">{{ locale==='zh'?'加入她叙，书写你的故事 ✨':'Join Her Tale, write your story ✨' }}</p>
          <div class="fld"><input v-model="regName" type="text" :placeholder="locale==='zh'?'给自己取一个温柔的名字':'Choose a gentle name'" required /></div>
          <div class="fld"><input v-model="regPwd" type="password" :placeholder="locale==='zh'?'设置密码（至少4位）':'Password (min 4 chars)'" required /></div>
          <div class="fld"><input v-model="regPwd2" type="password" :placeholder="locale==='zh'?'再次确认密码':'Confirm password'" required /></div>
          <p v-if="regErr" class="aerr">{{ regErr }}</p>
          <button type="submit" class="btn-p abtn">{{ t2('authRegisterBtn') }}</button>
          <p class="anote">{{ locale==='zh'?'注册即表示你同意遵守社区准则：互相尊重、温柔表达 🌷':'By registering you agree to our guidelines: mutual respect, gentle words 🌷' }}</p>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, inject } from 'vue'
import { userStore } from '../stores/userStore.js'

const t = inject('t')
const locale = inject('locale')
const t2 = (k) => ({authLogin:{zh:'登录',en:'Log In'},authRegister:{zh:'注册',en:'Register'},authLoginBtn:{zh:'登录',en:'Log In'},authRegisterBtn:{zh:'创建账号',en:'Create Account'}})[k]?.[locale.value]||k

const loginName=ref('');const loginPwd=ref('');const loginErr=ref('')
const regName=ref('');const regPwd=ref('');const regPwd2=ref('');const regErr=ref('')

function handleLogin(){
  loginErr.value=''
  const r=userStore.login(loginName.value,loginPwd.value)
  if(r.ok){userStore.showAuthModal=false;loginName.value='';loginPwd.value=''}
  else loginErr.value=r.msg[locale.value]
}
function handleRegister(){
  regErr.value=''
  if(regPwd.value!==regPwd2.value){regErr.value=locale.value==='zh'?'两次密码不一致':'Passwords do not match';return}
  const r=userStore.register(regName.value,regPwd.value)
  if(r.ok){
    userStore.authMode='login'
    loginName.value=regName.value;loginPwd.value=regPwd.value
    handleLogin()
    regName.value='';regPwd.value='';regPwd2.value=''
  } else regErr.value=r.msg[locale.value]
}
</script>

<style scoped>
.mm{position:fixed;inset:0;background:rgba(74,68,83,.35);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;z-index:200;padding:20px;animation:fI .3s ease}
@keyframes fI{from{opacity:0}to{opacity:1}}
.mp{background:#fff;border-radius:20px;width:100%;max-width:420px;padding:40px 36px;position:relative;box-shadow:0 24px 64px rgba(74,68,83,.12);animation:sU .35s cubic-bezier(.25,.46,.45,.94)}
@keyframes sU{from{opacity:0;transform:translateY(24px)scale(.97)}to{opacity:1;transform:translateY(0)scale(1)}}
.mc{position:absolute;top:16px;right:20px;font-size:18px;color:var(--tm);background:none;border:none;cursor:pointer;transition:color .3s;padding:4px;line-height:1}
.mc:hover{color:var(--tx)}
.atabs{display:flex;gap:8px;margin-bottom:28px}
.tab{flex:1;padding:10px 0;border:none;background:var(--bg);border-radius:10px;font-size:14px;font-weight:500;color:var(--ts);cursor:pointer;transition:all .3s;font-family:inherit;letter-spacing:.5px}
.tab.active{background:var(--tx);color:#fff}
.ag{font-size:15px;color:var(--ts);margin-bottom:24px;text-align:center;letter-spacing:.3px}
.fld{margin-bottom:16px}
.fld input{width:100%;padding:14px 16px;border:1.5px solid var(--bd);border-radius:12px;font-size:14px;font-family:inherit;color:var(--tx);background:var(--bg);outline:none;transition:border-color .3s;box-sizing:border-box}
.fld input:focus{border-color:var(--p)}
.fld input::placeholder{color:var(--tm)}
.aerr{color:var(--r);font-size:13px;margin-bottom:12px;text-align:center}
.abtn{width:100%;margin-top:4px}
.anote{font-size:11px;color:var(--tm);text-align:center;margin-top:20px;line-height:1.6}
</style>
