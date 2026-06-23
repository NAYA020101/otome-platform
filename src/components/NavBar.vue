<template>
  <header class="navbar" :class="{ scrolled }">
    <div class="nav-inner">
      <router-link to="/" class="logo">
        <span class="logo-main">她叙</span>
        <span class="logo-en">Her Tale</span>
      </router-link>
      <nav class="nav-links" :class="{ open: navOpen }">
        <router-link to="/" class="nav-link">{{ t('navHome') }}</router-link>
        <router-link to="/stories" class="nav-link">{{ t('navStories') }}</router-link>
        <router-link to="/characters" class="nav-link">{{ t('navChars') }}</router-link>
        <router-link to="/gallery" class="nav-link">{{ t('navGallery') }}</router-link>
        <router-link to="/world" class="nav-link">{{ t('navWorld') }}</router-link>
        <router-link to="/events" class="nav-link">{{ t('navEvents') }}</router-link>
        <router-link to="/creators" class="nav-link">{{ t('navCreate') }}</router-link>
        <router-link to="/ost" class="nav-link">{{ t('navOST') }}</router-link>
        <router-link to="/community" class="nav-link">{{ t('navCommunity') }}</router-link>
        <router-link to="/about" class="nav-link">{{ t('navAbout') }}</router-link>
      </nav>
      <div class="nav-right">
        <button class="btn-lang" @click="toggleLang">{{ locale==='zh' ? 'EN' : '中文' }}</button>
        <button class="ham" :class="{ active: navOpen }" @click="navOpen = !navOpen">
          <span></span><span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, inject, onMounted, onUnmounted } from 'vue'
const t = inject('t'); const locale = inject('locale'); const toggleLang = inject('toggleLang')
const navOpen = ref(false); const scrolled = ref(false)
function onScroll() { scrolled.value = window.scrollY > 40 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar{position:fixed;top:0;left:0;right:0;z-index:100;padding:0 24px;transition:all var(--tr);background:rgba(249,246,242,.85);backdrop-filter:blur(14px);box-shadow:inset 0 -1px 0 var(--brown-light)}
.nav-inner{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;height:60px}
.logo{display:flex;align-items:baseline;gap:8px;text-decoration:none;transition:opacity var(--tr)}.logo:hover{opacity:.8}
.logo-main{font-family:'ZCOOL XiaoWei',serif;font-size:22px;color:var(--ink);letter-spacing:6px}
.logo-en{font-family:'Lora',serif;font-size:12px;font-style:italic;color:var(--rose);letter-spacing:3px}
.nav-links{display:flex;align-items:center;gap:16px;margin:0 auto}
.nav-link{font-size:12px;font-weight:300;color:var(--ink-light);letter-spacing:.5px;position:relative;text-decoration:none;padding:4px 0;transition:color var(--tr);white-space:nowrap}
.nav-link::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1px;background:var(--rose);transition:width var(--tr)}
.nav-link:hover,.nav-link.router-link-exact-active{color:var(--ink)}
.nav-link:hover::after,.nav-link.router-link-exact-active::after{width:100%}
.nav-right{display:flex;align-items:center;gap:8px}
.btn-lang{padding:2px 10px;font-size:10px;font-family:'Lora',serif;font-style:italic;color:var(--ink-light);cursor:pointer;background:transparent;border:1px dashed var(--brown-light)}
.btn-lang:hover{border-color:var(--rose);color:var(--rose);border-style:solid}
.ham{display:none;flex-direction:column;justify-content:center;align-items:center;width:26px;height:26px;gap:4px;cursor:pointer;background:none;border:none;padding:0}
.ham span{display:block;width:16px;height:1.5px;background:var(--ink);transition:all .3s}
.ham.active span:nth-child(1){transform:translateY(5.5px) rotate(45deg)}
.ham.active span:nth-child(2){transform:translateY(-5.5px) rotate(-45deg)}
@media(max-width:968px){
  .nav-links{position:fixed;top:60px;left:0;right:0;background:rgba(249,246,242,.98);flex-direction:column;padding:20px;gap:12px;transform:translateY(-100%);opacity:0;pointer-events:none;transition:all .4s}
  .nav-links.open{transform:translateY(0);opacity:1;pointer-events:all}.nav-link{font-size:14px}.ham{display:flex}
}
</style>
