<template>
  <header class="navbar" :class="{ scrolled }">
    <div class="nav-inner">
      <router-link to="/" class="logo">
        <img src="/logo.png" alt="Her Tale" class="logo-img" />
        <span class="logo-text">Her Tale</span>
      </router-link>
      <nav class="nav-links" :class="{ open: navOpen }">
        <router-link to="/" class="nav-link" @click="navOpen=false">{{ t('navHome') }}</router-link>
        <router-link to="/stories" class="nav-link" @click="navOpen=false">{{ t('navStories') }}</router-link>
        <router-link to="/creators" class="nav-link" @click="navOpen=false">{{ t('navCreate') }}</router-link>
        <router-link to="/ai" class="nav-link" @click="navOpen=false">{{ t('navAI') }}</router-link>
        <router-link to="/community" class="nav-link" @click="navOpen=false">{{ t('navCommunity') }}</router-link>
        <router-link to="/about" class="nav-link" @click="navOpen=false">{{ t('navAbout') }}</router-link>
      </nav>
      <div class="nav-right">
        <button v-if="userStore.currentUser" class="nav-user" @click="showMenu=!showMenu">
          <span class="nav-avatar">{{ userStore.currentUser.name[0] }}</span>
          <span class="nav-uname">{{ userStore.currentUser.name }}</span>
        </button>
        <template v-else>
          <button class="btn-lang" @click="toggleLang">{{ locale === 'zh' ? 'EN' : '中文' }}</button>
          <button class="btn-login" @click="openLogin">{{ t('authLogin') }}</button>
        </template>
        <button class="ham" :class="{active:navOpen}" @click="navOpen=!navOpen" aria-label="Menu">
          <span></span><span></span>
        </button>
      </div>
      <!-- User dropdown -->
      <div v-if="userStore.currentUser && showMenu" class="user-dropdown" @click.self="showMenu=false">
        <div class="ud-inner">
          <div class="ud-name">{{ userStore.currentUser.name }}</div>
          <button class="btn-logout" @click="doLogout">{{ t('authLogout') }}</button>
        </div>
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
const showMenu = ref(false)

function openLogin() {
  userStore.showAuthModal = true
  navOpen.value = false
}

function doLogout() {
  userStore.logout()
  showMenu.value = false
}

function onScroll() { scrolled.value = window.scrollY > 40 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar{position:fixed;top:0;left:0;right:0;z-index:100;padding:0 32px;transition:all var(--tr)}
.navbar.scrolled{background:rgba(248,246,245,.92);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
.nav-inner{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:64px;position:relative}
.logo{display:flex;align-items:center;gap:10px;flex-shrink:0}
.logo-img{width:26px;height:26px;border-radius:5px;object-fit:cover}
.logo-text{font-size:14px;font-weight:500;color:var(--tx);letter-spacing:.5px}
.nav-links{display:flex;align-items:center;gap:28px;margin:0 auto;padding:0 24px}
.nav-link{font-size:13px;font-weight:400;color:var(--ts);letter-spacing:.3px;transition:color var(--tr);position:relative;padding:3px 0}
.nav-link::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--tx);transition:width var(--tr)}
.nav-link:hover{color:var(--tx)}
.nav-link:hover::after{width:100%}
.nav-link.router-link-exact-active{color:var(--tx)}
.nav-link.router-link-exact-active::after{width:100%}
.nav-right{display:flex;align-items:center;gap:10px;flex-shrink:0}
.btn-lang{padding:5px 14px;border:1px solid var(--bd);font-size:11px;color:var(--ts);letter-spacing:.5px;cursor:pointer;background:transparent;font-family:inherit;transition:all var(--tr)}
.btn-lang:hover{border-color:var(--ts);color:var(--tx)}
.btn-login{padding:6px 18px;background:var(--tx);color:#fff;font-size:11px;font-weight:500;letter-spacing:.5px;cursor:pointer;border:none;font-family:inherit;transition:all var(--tr)}
.btn-login:hover{background:#4A3A36}
.nav-user{display:flex;align-items:center;gap:6px;cursor:pointer;background:none;border:none;padding:3px 10px;font-family:inherit;transition:background .3s;border-radius:0}
.nav-user:hover{background:var(--bg2)}
.nav-avatar{width:26px;height:26px;border-radius:0;background:var(--t);color:var(--ts);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:500}
.nav-uname{font-size:12px;color:var(--tx);max-width:60px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.user-dropdown{position:absolute;top:100%;right:0;z-index:101;padding-top:8px}
.ud-inner{background:#fff;border:1px solid var(--bd);padding:16px 20px;min-width:140px}
.ud-name{font-size:13px;color:var(--tx);margin-bottom:12px;font-weight:500}
.btn-logout{padding:6px 14px;background:none;border:1px solid var(--bd);font-size:11px;color:var(--ts);cursor:pointer;font-family:inherit;transition:all var(--tr);width:100%;text-align:center}
.btn-logout:hover{border-color:var(--ts);color:var(--tx)}
.ham{display:none;flex-direction:column;justify-content:center;align-items:center;width:28px;height:28px;gap:4px;cursor:pointer;background:none;border:none;padding:0}
.ham span{display:block;width:18px;height:1.5px;background:var(--tx);transition:all .3s;border-radius:0}
.ham.active span:nth-child(1){transform:translateY(5.5px)rotate(45deg)}
.ham.active span:nth-child(2){transform:translateY(-5.5px)rotate(-45deg)}
@media(max-width:968px){
  .navbar{padding:0 20px}
  .nav-links{position:fixed;top:64px;left:0;right:0;background:rgba(248,246,245,.98);backdrop-filter:blur(20px);flex-direction:column;padding:28px 24px;gap:18px;transform:translateY(-100%);opacity:0;pointer-events:none;transition:all .4s;border-bottom:1px solid var(--bd)}
  .nav-links.open{transform:translateY(0);opacity:1;pointer-events:all}
  .nav-link{font-size:15px}
  .ham{display:flex}
  .btn-lang{border:none;padding:4px 8px}
}
</style>
