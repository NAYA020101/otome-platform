<template>
  <footer class="footer">
    <div class="fw"></div>
    <div class="fi">
      <div class="fb reveal">
        <div class="flogo">她叙 <span class="flogo-en">Her Tale</span></div>
        <p class="fdesc">{{ locale==='zh' ? '一场专属于女性的浪漫叙事栖居地。以女性叙事、浪漫创作、温柔共生为核心，聚焦乙女文化与原创故事创作。' : 'A romantic narrative haven for women. Centered on feminine storytelling and otome culture.' }}</p>
        <p class="ftag">{{ locale==='zh' ? '以她之名，叙她所想' : 'In her name, tell her stories.' }}</p>
      </div>
      <div class="fl reveal">
        <div class="fc">
          <h4>{{ locale==='zh' ? '浏览' : 'Browse' }}</h4>
          <router-link to="/stories">{{ t('navStories') }}</router-link>
          <router-link to="/creators">{{ t('navCreate') }}</router-link>
          <router-link to="/community">{{ t('navCommunity') }}</router-link>
        </div>
        <div class="fc">
          <h4>{{ locale==='zh' ? '更多' : 'More' }}</h4>
          <router-link to="/about">{{ t('navAbout') }}</router-link>
          <router-link to="/profile">{{ t('profileTitle') }}</router-link>
        </div>
      </div>
    </div>
    <div class="fbot"><p>{{ locale==='zh' ? '© 2026 她叙 · 保留所有权利' : '© 2026 Her Tale · All Rights Reserved' }}</p></div>
  </footer>
</template>

<script setup>
import { inject, onMounted } from 'vue'
const t = inject('t')
const locale = inject('locale')
onMounted(() => {
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); ro.unobserve(e.target) } })
  }, { threshold: 0.12 })
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el))
})
</script>

<style scoped>
.fw{height:2px;background:linear-gradient(90deg,var(--gold),var(--accent-dim),var(--gold));opacity:.4}
.footer{background:var(--bg2);margin-top:60px}
.fi{max-width:1000px;margin:0 auto;padding:60px 24px 40px;display:grid;grid-template-columns:1.5fr 1fr;gap:60px}
.flogo{font-family:'Noto Serif SC',serif;font-size:22px;font-weight:600;color:var(--tx);letter-spacing:4px;margin-bottom:16px}
.flogo-en{font-family:'Georgia',serif;font-size:14px;font-style:italic;color:var(--gold);letter-spacing:2px;margin-left:8px}
.fdesc{font-size:13px;color:var(--ts);line-height:1.8;letter-spacing:.3px;max-width:380px;margin-bottom:14px}
.ftag{font-family:'Noto Serif SC','Georgia',serif;font-size:13px;color:var(--accent);letter-spacing:.5px;font-style:italic}
.fl{display:grid;grid-template-columns:repeat(2,1fr);gap:32px}
.fc h4{font-size:11px;font-weight:500;color:var(--gold);letter-spacing:2px;text-transform:uppercase;margin-bottom:16px}
.fc a{display:block;font-size:13px;color:var(--ts);letter-spacing:.3px;margin-bottom:8px;transition:color var(--tr)}.fc a:hover{color:var(--tx)}
.fbot{border-top:1px solid var(--bd);padding:20px;text-align:center}
.fbot p{font-size:11px;color:var(--tm);letter-spacing:.5px}
@media(max-width:768px){.fi{grid-template-columns:1fr;gap:36px;padding:40px 20px 28px}}
</style>
