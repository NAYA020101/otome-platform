<template>
  <div class="page">
    <section class="hero">
      <div class="hero-inner wash-in">
        <div class="hero-brand">
          <span class="hero-brand-zh">她叙</span>
          <span class="hero-brand-en">Her Tale</span>
        </div>
        <div class="hero-rose">
          <svg width="100" height="16" viewBox="0 0 100 16">
            <path d="M8,8 Q12,2 16,8 Q20,14 24,8 Q28,2 32,8 Q36,14 40,8 Q44,2 48,8" fill="none" stroke="#D4A8A8" stroke-width="0.6" opacity="0.4"/>
          </svg>
        </div>
        <h1 class="hero-title">{{ t('heroTitle') }}</h1>
        <div class="hero-actions">
          <router-link to="/stories" class="btn-rose">{{ locale==='zh' ? '探索剧情库' : 'Stories' }}</router-link>
          <router-link to="/about" class="btn-outline">{{ locale==='zh' ? '了解她叙' : 'About' }}</router-link>
        </div>
      </div>
    </section>

    <div class="divider-handdrawn"><span>&#10058;</span></div>

    <section class="stats-section wash-in">
      <div class="stats-bar">
        <div class="stat-cell"><span class="stat-number">217</span><span class="stat-label">{{ locale==='zh' ? '作品' : 'Games' }}</span></div>
        <div class="stat-cell"><span class="stat-number">1,483</span><span class="stat-label">{{ locale==='zh' ? '角色' : 'Characters' }}</span></div>
        <div class="stat-cell"><span class="stat-number">523</span><span class="stat-label">{{ locale==='zh' ? '情绪' : 'Emotions' }}</span></div>
        <div class="stat-cell"><span class="stat-number">89</span><span class="stat-label">{{ locale==='zh' ? '创作者' : 'Creators' }}</span></div>
      </div>
    </section>

    <section class="entry-section">
      <div class="entry-grid wash-in-stagger">
        <router-link to="/stories" class="entry-card card-handdrawn">
          <span class="entry-number">01</span>
          <div class="entry-body"><h2 class="entry-title">{{ t('navStories') }}</h2><p class="entry-desc">{{ t('storiesSubtitle') }}</p></div>
          <span class="entry-arrow">→</span>
        </router-link>
        <router-link to="/creators" class="entry-card card-handdrawn">
          <span class="entry-number">02</span>
          <div class="entry-body"><h2 class="entry-title">{{ t('navCreate') }}</h2><p class="entry-desc">{{ t('creatorsTagline') }}</p></div>
          <span class="entry-arrow">→</span>
        </router-link>
        <router-link to="/ai" class="entry-card card-handdrawn">
          <span class="entry-number">03</span>
          <div class="entry-body"><h2 class="entry-title">{{ t('navAI') }}</h2><p class="entry-desc">{{ t('aiSubtitle') }}</p></div>
          <span class="entry-arrow">→</span>
        </router-link>
        <router-link to="/community" class="entry-card card-handdrawn">
          <span class="entry-number">04</span>
          <div class="entry-body"><h2 class="entry-title">{{ t('navCommunity') }}</h2><p class="entry-desc">{{ t('communitySubtitle') }}</p></div>
          <span class="entry-arrow">→</span>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
const t = inject('t'); const locale = inject('locale')
onMounted(() => {
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('wash-in'); ro.unobserve(e.target) } })
  }, { threshold: 0.1 })
  document.querySelectorAll('.wash-in, .wash-in-stagger').forEach(el => ro.observe(el))
})
</script>

<style scoped>
.page{max-width:100%;overflow:hidden}
.hero{min-height:75vh;display:flex;align-items:center;justify-content:center;background:var(--paper);padding:100px 24px 50px}
.hero-inner{text-align:center;max-width:680px;width:100%}
.hero-brand-zh{font-family:'Noto Serif SC',serif;font-size:40px;font-weight:600;color:var(--ink);letter-spacing:10px;display:block}
.hero-brand-en{font-family:'Playfair Display','Georgia',serif;font-size:13px;font-style:italic;color:var(--rose);letter-spacing:5px}
.hero-title{font-family:'Noto Serif SC','Georgia',serif;font-size:clamp(24px,4vw,42px);font-weight:300;color:var(--ink);letter-spacing:5px;margin:0 auto 24px;max-width:600px}
.hero-actions{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}
.stats-bar{display:grid;grid-template-columns:repeat(4,1fr);margin:0 24px 36px;border:1px solid var(--tea-light);overflow:hidden}
.stat-cell{padding:24px 12px;text-align:center;border-right:1px dashed var(--tea-light)}
.stat-cell:last-child{border-right:none}
.stat-number{display:block;font-family:'Playfair Display',serif;font-size:26px;color:var(--rose)}
.stat-label{font-size:11px;color:var(--ink-light);letter-spacing:2px}
.entry-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px;max-width:960px;margin:0 auto;padding:0 24px 60px}
.entry-card{display:flex;align-items:center;gap:16px;padding:28px 24px;text-decoration:none}
.entry-number{font-family:'Playfair Display',serif;font-size:14px;font-style:italic;color:var(--rose-light)}
.entry-title{font-family:'Noto Serif SC',serif;font-size:18px;letter-spacing:2px;margin-bottom:4px}
.entry-desc{font-size:12px;color:var(--ink-light)}
.entry-arrow{transition:all var(--tr)}
.entry-card:hover .entry-arrow{transform:translateX(8px);color:var(--rose)}
@media(max-width:768px){
  .entry-grid{grid-template-columns:1fr}
  .stats-bar{grid-template-columns:repeat(2,1fr);margin:0 16px 28px}
}
</style>
