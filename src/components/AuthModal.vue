<template>
  <Teleport to="body">
    <div v-if="userStore.showAuthModal" class="mm" @click.self="userStore.showAuthModal = false">
      <div class="mp" @click.stop>
        <button class="mc" @click="userStore.showAuthModal = false">✕</button>
        <div class="ah">{{ t('authLoginTitle') }}</div>

        <form class="af" @submit.prevent="handleLogin">
          <!-- Phone -->
          <div class="fld">
            <input v-model="phone" type="tel" maxlength="11" :placeholder="t('authPhone')" required
              @input="phone=phone.replace(/\D/g,'')" />
          </div>

          <!-- Code -->
          <div class="fld fld-row">
            <input v-model="code" type="text" maxlength="6" :placeholder="t('authCode')" required
              class="fld-code" @input="code=code.replace(/\D/g,'')" />
            <button type="button" class="btn-code" :disabled="codeSent" @click="sendCode">
              {{ codeSent ? t('authCodeSent') : t('authGetCode') }}
            </button>
          </div>

          <!-- Agreement -->
          <label class="agree">
            <input type="checkbox" v-model="agreed" />
            <span class="agree-text">
              {{ t('authAgreement') }}
              <a href="#" class="agree-link" @click.prevent>{{ t('authUserAgreement') }}</a>
              {{ t('authAnd') }}
              <a href="#" class="agree-link" @click.prevent>{{ t('authPrivacy') }}</a>
            </span>
          </label>

          <p v-if="err" class="aerr">{{ err }}</p>
          <button type="submit" class="btn-submit">{{ t('authLoginBtn') }}</button>
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

const phone = ref('')
const code = ref('')
const agreed = ref(false)
const codeSent = ref(false)
const err = ref('')

function sendCode() {
  if (!phone.value || phone.value.length < 11) {
    err.value = locale.value === 'zh' ? '请输入有效的手机号' : 'Please enter a valid phone number'
    return
  }
  err.value = ''
  codeSent.value = true
  // Simulate code send - in production would call SMS API
  setTimeout(() => { codeSent.value = false }, 60000)
}

function handleLogin() {
  err.value = ''

  if (!phone.value || phone.value.length < 11) {
    err.value = t('authPhoneRequired')
    return
  }
  if (!code.value || code.value.length < 4) {
    err.value = t('authCodeRequired')
    return
  }
  if (!agreed.value) {
    err.value = t('authRequired')
    return
  }

  // Simulate login - use phone as username for demo
  const r = userStore.loginByPhone(phone.value)
  if (r.ok) {
    userStore.showAuthModal = false
    phone.value = ''
    code.value = ''
    agreed.value = false
    codeSent.value = false
  } else {
    err.value = r.msg[locale.value]
  }
}
</script>

<style scoped>
.mm{position:fixed;inset:0;background:rgba(44,36,34,.35);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;z-index:200;padding:20px;animation:fI .3s ease}
@keyframes fI{from{opacity:0}to{opacity:1}}
.mp{background:#fff;width:100%;max-width:380px;padding:40px 32px 32px;position:relative;animation:sU .35s cubic-bezier(.25,.46,.45,.94)}
@keyframes sU{from{opacity:0;transform:translateY(20px)scale(.98)}to{opacity:1;transform:translateY(0)scale(1)}}
.mc{position:absolute;top:14px;right:18px;font-size:16px;color:var(--tm);background:none;border:none;cursor:pointer;transition:color .3s;padding:4px;line-height:1}
.mc:hover{color:var(--tx)}

.ah{font-size:18px;font-weight:500;color:var(--tx);margin-bottom:28px;letter-spacing:.5px;text-align:center}

.af{display:flex;flex-direction:column;gap:16px}
.fld input{width:100%;padding:12px 14px;border:1px solid var(--bd);font-size:13px;font-family:inherit;color:var(--tx);background:var(--bg);outline:none;transition:border-color .3s;box-sizing:border-box;border-radius:0}
.fld input:focus{border-color:var(--ts)}
.fld input::placeholder{color:var(--tm)}

.fld-row{display:flex;gap:10px}
.fld-code{flex:1;min-width:0}
.btn-code{padding:12px 16px;background:var(--tx);color:#fff;border:none;font-size:12px;font-family:inherit;cursor:pointer;white-space:nowrap;transition:opacity .3s;border-radius:0;flex-shrink:0}
.btn-code:disabled{opacity:.4;cursor:not-allowed}

.agree{display:flex;align-items:flex-start;gap:8px;cursor:pointer;padding:4px 0}
.agree input[type="checkbox"]{margin-top:3px;accent-color:var(--tx);width:14px;height:14px;flex-shrink:0}
.agree-text{font-size:11px;color:var(--ts);line-height:1.5;letter-spacing:.2px}
.agree-link{color:var(--tx);text-decoration:underline;text-underline-offset:2px}

.aerr{font-size:12px;color:#C44;text-align:center;margin:0}

.btn-submit{padding:12px;background:var(--tx);color:#fff;border:none;font-size:12px;font-weight:500;letter-spacing:1px;cursor:pointer;font-family:inherit;transition:background .3s;margin-top:4px;border-radius:0}
.btn-submit:hover{background:#4A3A36}
</style>
