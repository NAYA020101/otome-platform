<template>
  <footer class="footer">
    <div class="fw"></div>
    <div class="fi">
      <div class="fb reveal">
        <div class="flogo"><img src="/logo.png" alt="" class="flogo-img" /> Her Tale</div>
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
.footer{background:var(--bg2);margin-top:40px;position:relative;overflow:hidden}
.fw{height:4px;background:linear-gradient(90deg,var(--p),var(--r),var(--t),var(--p));background-size:300% 100%;animation:wG 6s ease-in-out infinite}
@keyframes wG{0%,100%{background-position:0 50%}50%{background-position:100% 50%}}
.fi{max-width:1200px;margin:0 auto;padding:72px 24px 48px;display:grid;grid-template-columns:1.5fr 1fr;gap:80px}
.flogo{display:flex;align-items:center;gap:12px;font-family:'Noto Serif SC',serif;font-size:22px;font-weight:700;color:var(--tx);letter-spacing:2px;margin-bottom:20px}
.flogo-img{width:28px;height:28px;border-radius:6px;object-fit:cover}
.fdesc{font-size:14px;color:var(--ts);line-height:1.8;letter-spacing:.3px;max-width:400px;margin-bottom:16px}
.ftag{font-family:'Noto Serif SC','Playfair Display',serif;font-size:14px;font-style:italic;color:var(--tm);letter-spacing:.5px}
.en .ftag{font-family:'Playfair Display','Noto Serif SC',serif}
.fl{display:grid;grid-template-columns:repeat(2,1fr);gap:40px}
.fc h4{font-size:13px;font-weight:600;color:var(--tx);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:20px}
.fc a{display:block;font-size:14px;color:var(--ts);letter-spacing:.3px;margin-bottom:12px;transition:color var(--tr)}
.fc a:hover{color:var(--tx)}
.fbot{border-top:1px solid var(--bd);padding:24px;text-align:center}
.fbot p{font-size:12px;color:var(--tm);letter-spacing:.5px}
@media(max-width:968px){.fi{grid-template-columns:1fr;gap:48px}}
@media(max-width:640px){.fi{padding:48px 20px 32px}.fl{gap:24px}}
</style>
