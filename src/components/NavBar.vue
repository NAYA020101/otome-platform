<template>
  <header class="navbar" :class="{ scrolled }">
    <div class="nav-inner">
      <router-link to="/" class="logo">
        <span class="logo-text">她叙</span>
        <span class="logo-en">Her Tale</span>
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
        <button class="btn-lang" @click="toggleLang">{{ locale === 'zh' ? 'EN' : '中文' }}</button>
        <router-link v-if="userStore.currentUser" to="/profile" class="nav-user">
          <span class="nav-avatar">{{ userStore.currentUser.name[0] }}</span>
        </router-link>
        <button v-else class="btn-login" @click="openLogin">{{ t('authLogin') }}</button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'
import { userStore } from '../stores/userStore.js'
const t=inject('t');const locale=inject('locale');const toggleLang=inject('toggleLang')
const navOpen=ref(false);const scrolled=ref(false)
function openLogin(){userStore.showAuthModal=true;navOpen.value=false}
function onScroll(){scrolled.value=window.scrollY>40}
onMounted(()=>window.addEventListener('scroll',onScroll,{passive:true}))
onUnmounted(()=>window.removeEventListener('scroll',onScroll))
</script>

<style scoped>
.navbar{position:fixed;top:0;left:0;right:0;z-index:100;padding:0 28px;transition:all var(--tr)}
.navbar.scrolled{background:rgba(251,247,240,.92);backdrop-filter:blur(12px);border-bottom:1px solid var(--gold)}
.nav-inner{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:64px}
.logo{display:flex;align-items:baseline;gap:10px}
.logo-text{font-size:20px;font-weight:600;color:var(--tx);letter-spacing:4px;font-family:'Noto Serif SC',serif}
.logo-en{font-size:13px;font-weight:400;color:var(--gold);letter-spacing:2px;font-family:'Georgia',serif;font-style:italic}
.nav-links{display:flex;align-items:center;gap:28px;margin:0 auto;padding:0 20px}
.nav-link{font-size:13px;font-weight:400;color:var(--ts);letter-spacing:.5px;transition:color var(--tr);position:relative;padding:4px 0}
.nav-link::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--gold);transition:width var(--tr)}
.nav-link:hover{color:var(--tx)}.nav-link:hover::after{width:100%}
.nav-link.router-link-exact-active{color:var(--tx)}.nav-link.router-link-exact-active::after{width:100%}
.nav-right{display:flex;align-items:center;gap:10px}
.btn-lang{padding:4px 12px;border:1px solid var(--bd);font-size:11px;color:var(--ts);cursor:pointer;background:transparent;font-family:inherit;transition:all var(--tr)}.btn-lang:hover{border-color:var(--gold);color:var(--tx)}
.btn-login{padding:6px 18px;background:var(--accent);color:var(--cw);font-size:11px;letter-spacing:1px;cursor:pointer;border:1px solid var(--gold);font-family:inherit;transition:all var(--tr);border-radius:var(--rs)}.btn-login:hover{background:var(--gold);color:var(--tx)}
.nav-user{display:flex;align-items:center;cursor:pointer;padding:0;font-family:inherit;transition:opacity .3s}.nav-user:hover{opacity:.7}
.nav-avatar{width:28px;height:28px;background:var(--bg2);color:var(--ts);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:500;transition:all var(--tr);border:1px solid var(--gold);border-radius:var(--rs)}.nav-user:hover .nav-avatar{background:var(--accent);color:var(--cw)}
.ham{display:none;flex-direction:column;justify-content:center;align-items:center;width:26px;height:26px;gap:4px;cursor:pointer;background:none;border:none;padding:0}
.ham span{display:block;width:16px;height:1.5px;background:var(--tx);transition:all .3s;border-radius:1px}
.ham.active span:nth-child(1){transform:translateY(5.5px)rotate(45deg)}.ham.active span:nth-child(2){transform:translateY(-5.5px)rotate(-45deg)}
@media(max-width:968px){
  .navbar{padding:0 16px}
  .nav-links{position:fixed;top:64px;left:0;right:0;background:rgba(251,247,240,.98);backdrop-filter:blur(20px);flex-direction:column;padding:24px 20px;gap:16px;transform:translateY(-100%);opacity:0;pointer-events:none;transition:all .4s;border-bottom:1px solid var(--gold)}
  .nav-links.open{transform:translateY(0);opacity:1;pointer-events:all}.nav-link{font-size:15px}.ham{display:flex}
}
</style>
