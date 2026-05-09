<template>
  <header class="navbar" :class="{ scrolled }">
    <div class="nav-inner">
      <router-link to="/" class="logo">
        <span class="logo-zh">她叙</span>
        <span class="logo-en">Ta・Xu</span>
      </router-link>
      <nav class="nav-links" :class="{ open: navOpen }">
        <router-link to="/" class="nav-link" @click="navOpen=false">{{ t('navHome') }}</router-link>
        <router-link to="/#stories" class="nav-link" @click="navOpen=false">{{ t('navStories') }}</router-link>
        <router-link to="/#creator" class="nav-link" @click="navOpen=false">{{ t('navCreate') }}</router-link>
        <router-link to="/ai" class="nav-link" @click="navOpen=false">{{ t('navAI') }}</router-link>
        <router-link to="/community" class="nav-link" @click="navOpen=false">{{ t('navCommunity') }}</router-link>
        <template v-if="userStore.currentUser">
          <button class="nav-link mob-user" @click="userStore.showProfile = true; navOpen=false">{{ userStore.currentUser.name }}</button>
        </template>
        <template v-else>
          <button class="nav-link mob-auth" @click="userStore.showAuthModal = true; userStore.authMode = 'login'; navOpen=false">{{ locale === 'zh' ? '登录' : 'Log In' }}</button>
        </template>
        <button class="lang-toggle mob-lang" @click="toggleLang">{{ locale === 'zh' ? 'EN' : '中文' }}</button>
      </nav>
      <div class="nav-right">
        <button v-if="userStore.currentUser" class="nav-user" @click="userStore.showProfile = true">
          <span class="nav-ava"><img v-if="userStore.currentUser.avatar" :src="userStore.currentUser.avatar" alt="" /><span v-else>{{ userStore.currentUser.name[0]?.toUpperCase() || '?' }}</span></span>
          <span class="nav-uname">{{ userStore.currentUser.name }}</span>
        </button>
        <button v-else class="lang-toggle desk-auth" @click="userStore.showAuthModal = true; userStore.authMode = 'login'">{{ locale === 'zh' ? '登录' : 'Log In' }}</button>
        <button class="lang-toggle desk-lang" @click="toggleLang">{{ locale === 'zh' ? 'EN' : '中文' }}</button>
        <button class="ham" :class="{active:navOpen}" @click="navOpen=!navOpen" aria-label="Menu"><span></span><span></span><span></span></button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import { userStore } from '../stores/userStore.js'

const t = inject('t')
const locale = inject('locale')
const toggleLang = inject('toggleLang')

const navOpen = ref(false)
const scrolled = ref(false)

function onScroll() { scrolled.value = window.scrollY > 60 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar{position:fixed;top:0;left:0;right:0;z-index:100;transition:background var(--tr),box-shadow var(--tr);padding:0 24px}
.navbar.scrolled{background:rgba(250,247,244,.85);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);box-shadow:0 1px 0 var(--bd)}
.nav-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:72px}
.logo{display:flex;align-items:baseline;gap:8px}
.logo-zh{font-family:'Noto Serif SC',serif;font-size:24px;font-weight:700;color:var(--tx);letter-spacing:4px}
.logo-en{font-family:'Playfair Display',serif;font-size:15px;font-weight:400;color:var(--tm);letter-spacing:3px;text-transform:uppercase}
.nav-links{display:flex;align-items:center;gap:36px}
.nav-link{font-size:14px;font-weight:400;color:var(--ts);letter-spacing:.5px;transition:color var(--tr);position:relative}
.nav-link::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1.5px;background:var(--p);transition:width var(--tr)}
.nav-link:hover{color:var(--tx)}
.nav-link:hover::after{width:100%}
.nav-link.router-link-exact-active{color:var(--tx)}
.nav-link.router-link-exact-active::after{width:100%}
.nav-right{display:flex;align-items:center;gap:12px}
.nav-user{display:flex;align-items:center;gap:8px;background:none;border:none;cursor:pointer;padding:4px 10px;border-radius:20px;transition:background .3s;font-family:inherit}
.nav-user:hover{background:rgba(212,197,217,.15)}
.nav-ava{width:28px;height:28px;border-radius:50%;background:var(--p);color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:600;overflow:hidden;flex-shrink:0}
.nav-ava img{width:100%;height:100%;object-fit:cover}
.nav-uname{font-size:13px;color:var(--tx);font-weight:500;max-width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.lang-toggle{padding:6px 18px;border:1px solid var(--t);border-radius:20px;font-size:12px;font-weight:500;color:var(--ts);letter-spacing:1px;transition:all var(--tr);cursor:pointer;background:transparent;font-family:inherit}
.lang-toggle:hover{border-color:var(--p);color:var(--tx);background:rgba(212,197,217,.15)}
.mob-lang,.mob-auth,.mob-user{display:none}
.ham{display:none;flex-direction:column;justify-content:center;align-items:center;width:32px;height:32px;gap:5px;cursor:pointer}
.ham span{display:block;width:20px;height:1.5px;background:var(--tx);transition:all .3s;border-radius:2px}
.ham.active span:nth-child(1){transform:translateY(6.5px)rotate(45deg)}
.ham.active span:nth-child(2){opacity:0;transform:scaleX(0)}
.ham.active span:nth-child(3){transform:translateY(-6.5px)rotate(-45deg)}
.desk-auth{display:inline-block}
@media(max-width:968px){
  .nav-links{position:fixed;top:72px;left:0;right:0;background:rgba(250,247,244,.98);backdrop-filter:blur(20px);flex-direction:column;padding:32px 24px;gap:24px;transform:translateY(-100%);opacity:0;pointer-events:none;transition:all .4s;border-bottom:1px solid var(--bd)}
  .nav-links.open{transform:translateY(0);opacity:1;pointer-events:all}
  .nav-link{font-size:16px}
  .ham{display:flex}
  .desk-lang,.desk-auth{display:none}
  .mob-lang,.mob-auth,.mob-user{display:inline-block}
  .mob-user{background:none;border:none;font-size:16px;color:var(--ts);cursor:pointer;font-family:inherit;text-align:left;padding:0}
  .mob-lang{margin-top:8px}
}
</style>
