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
        <button class="lang-toggle mob-lang" @click="toggleLang">{{ locale === 'zh' ? 'EN' : '中文' }}</button>
      </nav>
      <div class="nav-right">
        <button class="lang-toggle desk-lang" @click="toggleLang">{{ locale === 'zh' ? 'EN' : '中文' }}</button>
        <button class="ham" :class="{active:navOpen}" @click="navOpen=!navOpen" aria-label="Menu">
          <span></span><span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'

const t = inject('t')
const locale = inject('locale')
const toggleLang = inject('toggleLang')

const navOpen = ref(false)
const scrolled = ref(false)

function onScroll() { scrolled.value = window.scrollY > 40 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar{position:fixed;top:0;left:0;right:0;z-index:100;padding:0 32px;transition:all var(--tr)}
.navbar.scrolled{background:rgba(248,246,245,.92);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
.nav-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:68px}
.logo{display:flex;align-items:center;gap:10px}
.logo-img{width:28px;height:28px;border-radius:6px;object-fit:cover}
.logo-text{font-family:'Inter',sans-serif;font-size:15px;font-weight:500;color:var(--tx);letter-spacing:.5px}
.nav-links{display:flex;align-items:center;gap:32px}
.nav-link{font-size:13px;font-weight:400;color:var(--ts);letter-spacing:.5px;transition:color var(--tr);position:relative;padding:4px 0}
.nav-link::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--tx);transition:width var(--tr)}
.nav-link:hover{color:var(--tx)}
.nav-link:hover::after{width:100%}
.nav-link.router-link-exact-active{color:var(--tx)}
.nav-link.router-link-exact-active::after{width:100%}
.nav-right{display:flex;align-items:center;gap:12px}
.lang-toggle{padding:6px 16px;border:1px solid var(--bd);border-radius:0;font-size:11px;font-weight:400;color:var(--ts);letter-spacing:1px;transition:all var(--tr);cursor:pointer;background:transparent;font-family:inherit}
.lang-toggle:hover{border-color:var(--ts);color:var(--tx)}
.ham{display:none;flex-direction:column;justify-content:center;align-items:center;width:32px;height:32px;gap:5px;cursor:pointer;background:none;border:none;padding:0}
.ham span{display:block;width:20px;height:1.5px;background:var(--tx);transition:all .3s;border-radius:0}
.ham.active span:nth-child(1){transform:translateY(6.5px)rotate(45deg)}
.ham.active span:nth-child(2){transform:translateY(-6.5px)rotate(-45deg)}
@media(max-width:968px){
  .navbar{padding:0 20px}
  .nav-links{position:fixed;top:68px;left:0;right:0;background:rgba(248,246,245,.98);backdrop-filter:blur(20px);flex-direction:column;padding:32px 24px;gap:20px;transform:translateY(-100%);opacity:0;pointer-events:none;transition:all .4s;border-bottom:1px solid var(--bd)}
  .nav-links.open{transform:translateY(0);opacity:1;pointer-events:all}
  .nav-link{font-size:15px}
  .ham{display:flex}
  .desk-lang{display:none}
}
</style>
