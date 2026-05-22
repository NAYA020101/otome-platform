<template>
  <Teleport to="body">
    <div v-if="userStore.showAuthModal" class="mm" @click.self="close">
      <div class="mp" @click.stop>
        <button class="mc" @click="close">✕</button>
        <div class="ah">{{ t('authLoginTitle') }}</div>

        <form class="af" @submit.prevent="handleLogin">
          <div class="fld">
            <input v-model="phone" type="tel" maxlength="11" :placeholder="t('authPhone')" required
              @input="phone=phone.replace(/\D/g,'')" />
          </div>

          <div class="fld fld-row">
            <input v-model="code" type="text" maxlength="6" :placeholder="t('authCode')" required
              class="fld-code" @input="code=code.replace(/\D/g,'')" />
            <button type="button" class="btn-code" :disabled="codeSent" @click="sendCode">
              {{ codeSent ? t('authCodeSent') : t('authGetCode') }}
            </button>
          </div>

          <label class="agree">
            <input type="checkbox" v-model="agreed" />
            <span class="agree-text">
              {{ t('authAgreement') }}
              <a href="#" class="agree-link" @click.prevent="showAgreement=true">{{ t('authUserAgreement') }}</a>
              {{ t('authAnd') }}
              <a href="#" class="agree-link" @click.prevent="showPrivacy=true">{{ t('authPrivacy') }}</a>
            </span>
          </label>

          <p v-if="err" class="aerr">{{ err }}</p>
          <button type="submit" class="btn-submit">{{ t('authLoginBtn') }}</button>
        </form>
      </div>
    </div>

    <!-- User Agreement Modal -->
    <div v-if="showAgreement" class="mm mm-dark" @click.self="showAgreement=false">
      <div class="mp mp-doc" @click.stop>
        <button class="mc" @click="showAgreement=false">✕</button>
        <div class="doc-h">用户协议</div>
        <div class="doc-body">
          <p><strong>欢迎使用 Her Tale（她叙）</strong></p>
          <p>本协议是您（以下简称"用户"）与 Her Tale 平台（以下简称"本平台"）之间关于使用本平台服务所订立的协议。请您仔细阅读以下条款。</p>
          <p><strong>一、账号注册</strong></p>
          <p>1. 用户在使用本平台服务时需注册账号。用户应提供真实、准确的手机号码，并保证所填写信息的真实性、完整性。</p>
          <p>2. 用户注册成功后，将获得账号及验证码登录权限，用户应妥善保管账号信息，因用户原因导致账号被盗用或信息泄露的，由用户自行承担责任。</p>
          <p><strong>二、用户行为规范</strong></p>
          <p>1. 用户在使用本平台服务时，应遵守中华人民共和国相关法律法规，不得利用本平台从事违法违规活动。</p>
          <p>2. 用户不得发布包含以下内容的信息：(1) 违反宪法确定的基本原则的；(2) 危害国家安全、泄露国家秘密的；(3) 损害国家荣誉和利益的；(4) 煽动民族仇恨、民族歧视的；(5) 破坏民族团结的；(6) 散布谣言、扰乱社会秩序的；(7) 散布淫秽、色情、赌博、暴力、凶杀、恐怖信息的；(8) 侮辱或者诽谤他人的；(9) 侵害他人合法权益的。</p>
          <p><strong>三、知识产权</strong></p>
          <p>1. 用户在平台上发布的原创内容，其知识产权归用户所有。用户授权本平台在平台范围内对作品进行展示、推广等非商业性使用。</p>
          <p>2. 未经平台书面许可，任何第三方不得擅自转载、复制或传播平台上的内容。</p>
          <p><strong>四、隐私保护</strong></p>
          <p>本平台重视用户隐私保护，具体内容详见《隐私政策》。平台将采取合理的安全措施保护用户的个人信息安全。</p>
          <p><strong>五、免责声明</strong></p>
          <p>1. 用户因使用本平台服务而产生的一切风险由用户自行承担。</p>
          <p>2. 因不可抗力、系统维护等原因导致的服务中断，本平台不承担责任。</p>
          <p><strong>六、协议修改</strong></p>
          <p>本平台有权根据法律法规的变化和平台运营需要修改本协议，修改后的协议将在平台公布。用户继续使用服务视为接受修改后的协议。</p>
          <p><strong>七、法律适用</strong></p>
          <p>本协议的订立、执行和解释适用中华人民共和国法律。如发生争议，双方应友好协商解决；协商不成的，提交有管辖权的人民法院诉讼解决。</p>
          <p class="doc-foot">Her Tale 平台 · 2026年5月</p>
        </div>
      </div>
    </div>

    <!-- Privacy Policy Modal -->
    <div v-if="showPrivacy" class="mm mm-dark" @click.self="showPrivacy=false">
      <div class="mp mp-doc" @click.stop>
        <button class="mc" @click="showPrivacy=false">✕</button>
        <div class="doc-h">隐私政策</div>
        <div class="doc-body">
          <p><strong>Her Tale（她叙）隐私政策</strong></p>
          <p>本隐私政策说明了 Her Tale 平台（以下简称"本平台"）如何收集、使用、存储和保护用户的个人信息。我们重视您的隐私权，承诺依法保护您的个人信息安全。</p>
          <p><strong>一、信息收集</strong></p>
          <p>1. 账号信息：当您注册账号时，我们收集您的手机号码，用于账号识别和登录验证。</p>
          <p>2. 使用信息：我们收集您在使用本平台服务时产生的信息，包括浏览记录、收藏、点赞、评论等交互数据。</p>
          <p>3. 设备信息：为保障服务安全稳定运行，我们可能收集您的设备型号、操作系统版本、IP地址等基本信息。</p>
          <p><strong>二、信息使用</strong></p>
          <p>1. 提供、维护和改进本平台的服务。</p>
          <p>2. 向您推送您可能感兴趣的内容和活动通知。</p>
          <p>3. 保障账号安全，处理用户反馈和投诉。</p>
          <p>4. 履行法律法规规定的义务。</p>
          <p><strong>三、信息存储与保护</strong></p>
          <p>1. 您的个人信息将存储于中华人民共和国境内的服务器。</p>
          <p>2. 我们采取行业标准的安全措施保护您的个人信息，包括但不限于数据加密、访问控制、安全审计等。</p>
          <p>3. 尽管有上述安全措施，但请理解互联网环境并非绝对安全，我们无法保证信息的绝对安全。</p>
          <p><strong>四、信息共享</strong></p>
          <p>1. 未经您明确同意，我们不会向第三方共享您的个人信息，但以下情况除外：(1) 根据法律法规要求；(2) 为保护本平台或其他用户的合法权益；(3) 实现服务所必需的合作伙伴（如云服务商），且要求其承担保密义务。</p>
          <p><strong>五、用户权利</strong></p>
          <p>您有权查询、更正、删除您的个人信息，有权撤回同意，有权注销账号。您可以通过平台设置或联系我们行使上述权利。</p>
          <p><strong>六、未成年人保护</strong></p>
          <p>未满18周岁的未成年人在使用本平台服务前，应取得其监护人同意。本平台不主动收集未成年人的个人信息。</p>
          <p><strong>七、政策更新</strong></p>
          <p>本平台可能适时更新本隐私政策。更新后的政策将在平台公布，如涉及重大变更，我们将通过显著方式通知您。</p>
          <p><strong>八、联系方式</strong></p>
          <p>如您对本隐私政策有任何疑问或建议，请通过平台内联系渠道与我们沟通。</p>
          <p class="doc-foot">Her Tale 平台 · 2026年5月</p>
        </div>
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
const showAgreement = ref(false)
const showPrivacy = ref(false)

function close() { userStore.showAuthModal = false }

function sendCode() {
  if (!phone.value || phone.value.length < 11) {
    err.value = locale.value === 'zh' ? '请输入有效的11位手机号' : 'Please enter a valid 11-digit phone number'
    return
  }
  err.value = ''
  codeSent.value = true
  code.value = '123456'
  setTimeout(() => { codeSent.value = false }, 30000)
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
  const r = userStore.loginByPhone(phone.value)
  if (r.ok) {
    close()
    phone.value = ''
    code.value = ''
    agreed.value = false
    codeSent.value = false
  }
}
</script>

<style scoped>
.mm{position:fixed;inset:0;background:rgba(44,36,34,.4);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;z-index:200;padding:20px;animation:fI .3s ease}
@keyframes fI{from{opacity:0}to{opacity:1}}
.mm-dark{background:rgba(44,36,34,.55);backdrop-filter:blur(6px);z-index:300}
.mp{background:#fff;width:100%;max-width:380px;padding:40px 32px 32px;position:relative;animation:sU .35s cubic-bezier(.25,.46,.45,.94)}
.mp-doc{max-width:560px;max-height:80vh;display:flex;flex-direction:column;padding:40px 0 0}
@keyframes sU{from{opacity:0;transform:translateY(20px)scale(.98)}to{opacity:1;transform:translateY(0)scale(1)}}
.mc{position:absolute;top:14px;right:18px;font-size:16px;color:var(--tm);background:none;border:none;cursor:pointer;transition:color .3s;padding:4px;line-height:1;z-index:1}
.mc:hover{color:var(--tx)}
.ah{font-size:18px;font-weight:500;color:var(--tx);margin-bottom:28px;letter-spacing:.5px;text-align:center}
.af{display:flex;flex-direction:column;gap:16px}
.fld input{width:100%;padding:12px 14px;border:1px solid var(--bd);font-size:13px;font-family:inherit;color:var(--tx);background:var(--bg);outline:none;transition:border-color .3s;box-sizing:border-box}
.fld input:focus{border-color:var(--ts)}
.fld input::placeholder{color:var(--tm)}
.fld-row{display:flex;gap:10px}
.fld-code{flex:1;min-width:0}
.btn-code{padding:12px 16px;background:var(--tx);color:#fff;border:none;font-size:12px;font-family:inherit;cursor:pointer;white-space:nowrap;transition:opacity .3s;flex-shrink:0}
.btn-code:disabled{opacity:.4;cursor:not-allowed}
.agree{display:flex;align-items:flex-start;gap:8px;cursor:pointer;padding:4px 0}
.agree input[type="checkbox"]{margin-top:3px;accent-color:var(--tx);width:14px;height:14px;flex-shrink:0}
.agree-text{font-size:11px;color:var(--ts);line-height:1.5;letter-spacing:.2px}
.agree-link{color:var(--tx);text-decoration:underline;text-underline-offset:2px;cursor:pointer}
.aerr{font-size:12px;color:#C44;text-align:center;margin:0}
.btn-submit{padding:12px;background:var(--tx);color:#fff;border:none;font-size:12px;font-weight:500;letter-spacing:1px;cursor:pointer;font-family:inherit;transition:background .3s;margin-top:4px}
.btn-submit:hover{background:#4A3A36}

/* Document modals */
.doc-h{font-size:18px;font-weight:600;color:var(--tx);text-align:center;padding:0 32px 20px;border-bottom:1px solid var(--bd);letter-spacing:.5px}
.doc-body{padding:24px 32px 32px;overflow-y:auto;flex:1;font-size:13px;color:var(--ts);line-height:1.9}
.doc-body p{margin-bottom:14px}
.doc-body strong{color:var(--tx);font-weight:600}
.doc-foot{text-align:center;color:var(--tm);font-size:12px;margin-top:20px;padding-top:16px;border-top:1px solid var(--bd)}
</style>
