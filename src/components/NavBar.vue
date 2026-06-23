<template>
  <header class="navbar" :class="{ scrolled }">
    <div class="nav-inner">
      <router-link to="/" class="logo">
        <span class="logo-deco">&#10058;</span>
        <span class="logo-main">她叙</span>
        <span class="logo-en">Her Tale</span>
      </router-link>
      <nav class="nav-links" :class="{ open: navOpen }">
        <router-link to="/" class="nav-link">{{ t('navHome') }}</router-link>
        <router-link to="/stories" class="nav-link">{{ t('navStories') }}</router-link>
        <router-link to="/creators" class="nav-link">{{ t('navCreate') }}</router-link>
        <router-link to="/ai" class="nav-link">{{ t('navAI') }}</router-link>
        <router-link to="/community" class="nav-link">{{ t('navCommunity') }}</router-link>
        <router-link to="/about" class="nav-link">{{ t('navAbout') }}</router-link>
      </nav>
      <div class="nav-right">
        <button class="btn-lang" @click="toggleLang">{{ locale === 'zh' ? 'EN' : '中文' }}</button>
        <router-link v-if="userStore.currentUser" to="/profile" class="nav-user">
          <span class="nav-avatar">{{ userStore.currentUser.name[0] }}</span>
        </router-link>
        <button v-else class="btn-login" @click="openLogin">{{ t('authLogin') }}</button>
        <button class="ham" :class="{ active: navOpen }" @click="navOpen = !navOpen">
          <span></span><span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import { userStore } from '../stores/userStore.js'
const t = inject('t'); const locale = inject('locale'); const toggleLang = inject('toggleLang')
const navOpen = ref(false); const scrolled = ref(false)
function openLogin() { userStore.showAuthModal = true; navOpen.value = false }
function onScroll() { scrolled.value = window.scrollY > 40 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar{position:fixed;top:0;left:0;right:0;z-index:100;padding:0 28px;transition:all var(--tr);box-shadow:inset 0 -1px 0 var(--tea-light)}
.navbar.scrolled{background:rgba(255,248,240,.92);backdrop-filter:blur(16px)}
.nav-inner{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:64px}
.logo{display:flex;align-items:baseline;gap:6px;text-decoration:none}
.logo-deco{font-size:16px;color:var(--rose-light);opacity:.5}
.logo-main{font-size:20px;font-weight:600;color:var(--ink);letter-spacing:4px;font-family:'Noto Serif SC',serif}
.logo-en{font-size:12px;font-style:italic;color:var(--rose);letter-spacing:2px;font-family:'Playfair Display',serif}
.nav-links{display:flex;align-items:center;gap:32px;margin:0 auto;padding:0 20px}
.nav-link{font-size:13px;font-weight:300;color:var(--ink-light);letter-spacing:.8px;position:relative;text-decoration:none;transition:color var(--tr)}
.nav-link::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--rose-light);transition:width var(--tr)}
.nav-link:hover,.nav-link.router-link-exact-active{color:var(--ink)}
.nav-link:hover::after,.nav-link.router-link-exact-active::after{width:100%}
.nav-right{display:flex;align-items:center;gap:10px}
.btn-lang{padding:3px 12px;border:1px dashed var(--tea-light);font-size:11px;font-family:'Crimson Pro',serif;font-style:italic;color:var(--ink-light);cursor:pointer;background:transparent}
.btn-lang:hover{border-color:var(--rose-light);color:var(--rose);border-style:solid}
.btn-login{padding:6px 18px;background:transparent;color:var(--ink-light);font-size:11px;font-family:'Noto Serif SC',serif;cursor:pointer;box-shadow:inset 0 0 0 1px var(--stroke-tea)}
.btn-login:hover{color:var(--rose);box-shadow:inset 0 0 0 1px var(--rose-light)}
.nav-avatar{width:28px;height:28px;background:var(--paper-dim);color:var(--ink-light);display:flex;align-items:center;justify-content:center;font-size:12px;box-shadow:inset 0 0 0 1px var(--stroke-tea)}
.ham{display:none;flex-direction:column;justify-content:center;align-items:center;width:28px;height:28px;gap:5px;cursor:pointer;background:none;border:none}
.ham span{display:block;width:18px;height:1.5px;background:var(--ink);transition:all .3s}
.ham.active span:nth-child(1){transform:translateY(6.5px) rotate(45deg)}
.ham.active span:nth-child(2){transform:translateY(-6.5px) rotate(-45deg)}
@media(max-width:968px){
  .nav-links{position:fixed;top:64px;left:0;right:0;background:rgba(255,248,240,.98);flex-direction:column;padding:24px 20px;gap:16px;transform:translateY(-100%);opacity:0;pointer-events:none;transition:all .4s}
  .nav-links.open{transform:translateY(0);opacity:1;pointer-events:all}
  .ham{display:flex}
}
</style>
