<template>
  <footer class="footer">
    <div class="fi">
      <div class="fb reveal">
        <div class="flogo">
          <img src="/logo.png" alt="" class="flogo-img" />
          <span class="flogo-text">Her Tale</span>
        </div>
        <p class="fdesc">{{ t('footerDesc') }}</p>
        <p class="ftag">{{ t('footerTagline') }}</p>
      </div>
      <div class="fl reveal">
        <div class="fc">
          <h4>{{ t('navAbout') || 'About' }}</h4>
          <router-link to="/about">{{ t('navAbout') || '关于' }}</router-link>
          <router-link to="/stories">{{ t('navStories') }}</router-link>
          <router-link to="/creators">{{ t('navCreate') }}</router-link>
        </div>
        <div class="fc">
          <h4>{{ t('navCommunity') }}</h4>
          <router-link to="/community">{{ t('navCommunity') }}</router-link>
          <router-link to="/ai">{{ t('navAI') }}</router-link>
        </div>
      </div>
    </div>
    <div class="fbot"><p>{{ t('footerCopyright') }}</p></div>
  </footer>
</template>

<script setup>
import { inject, onMounted } from 'vue'
const t = inject('t')

onMounted(() => {
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); ro.unobserve(e.target) } })
  }, { threshold: 0.12 })
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el))
})
</script>

<style scoped>
.footer{background:var(--bg2);margin-top:80px}
.fi{max-width:1000px;margin:0 auto;padding:80px 24px 48px;display:grid;grid-template-columns:1.5fr 1fr;gap:80px}
.flogo{display:flex;align-items:center;gap:12px;margin-bottom:20px}
.flogo-img{width:24px;height:24px;border-radius:4px;object-fit:cover}
.flogo-text{font-family:'Inter',sans-serif;font-size:16px;font-weight:500;color:var(--tx);letter-spacing:.5px}
.fdesc{font-size:13px;color:var(--ts);line-height:1.9;letter-spacing:.3px;max-width:380px;margin-bottom:16px}
.ftag{font-family:'Noto Serif SC','Georgia',serif;font-size:13px;color:var(--tm);letter-spacing:.5px;font-style:italic}
.en .ftag{font-family:'Playfair Display','Georgia',serif}
.fl{display:grid;grid-template-columns:repeat(2,1fr);gap:40px}
.fc h4{font-size:11px;font-weight:500;color:var(--ts);letter-spacing:2px;text-transform:uppercase;margin-bottom:20px}
.fc a{display:block;font-size:13px;color:var(--ts);letter-spacing:.3px;margin-bottom:10px;transition:color var(--tr)}
.fc a:hover{color:var(--tx)}
.fbot{border-top:1px solid var(--bd);padding:24px;text-align:center}
.fbot p{font-size:11px;color:var(--tm);letter-spacing:.5px}
@media(max-width:968px){.fi{grid-template-columns:1fr;gap:48px;padding:60px 20px 32px}}
@media(max-width:640px){.fi{padding:48px 16px 24px}.fl{gap:24px}}
</style>
