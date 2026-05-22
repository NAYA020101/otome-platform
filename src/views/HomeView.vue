<template>
  <div class="page">
    <!-- ====== HERO ====== -->
    <section class="hero">
      <div class="hero-inner reveal">
        <span class="hero-label">{{ t('heroBrand') }}</span>
        <h1 class="hero-title">
          <span class="hero-line">{{ $slots.default ? '' : t('heroTitle') }}</span>
        </h1>
        <p class="hero-sub">{{ t('heroSubtitle') }}</p>
      </div>
    </section>

    <!-- ====== ENTRY GRID ====== -->
    <section class="grid-sxn">
      <div class="entry-grid">
        <router-link to="/stories" class="entry-card reveal reveal-delay-1">
          <span class="entry-num">01</span>
          <h2 class="entry-t">{{ t('navStories') }}</h2>
          <p class="entry-d">{{ t('storiesSubtitle') }}</p>
          <span class="entry-arrow">→</span>
        </router-link>

        <router-link to="/creators" class="entry-card reveal reveal-delay-2">
          <span class="entry-num">02</span>
          <h2 class="entry-t">{{ t('navCreate') }}</h2>
          <p class="entry-d">{{ t('creatorsTagline') }}</p>
          <span class="entry-arrow">→</span>
        </router-link>

        <router-link to="/ai" class="entry-card reveal reveal-delay-3">
          <span class="entry-num">03</span>
          <h2 class="entry-t">{{ t('navAI') }}</h2>
          <p class="entry-d">{{ t('aiSubtitle') }}</p>
          <span class="entry-arrow">→</span>
        </router-link>

        <router-link to="/community" class="entry-card reveal reveal-delay-4">
          <span class="entry-num">04</span>
          <h2 class="entry-t">{{ t('navCommunity') }}</h2>
          <p class="entry-d">{{ t('communitySubtitle') }}</p>
          <span class="entry-arrow">→</span>
        </router-link>
      </div>
    </section>

    <!-- ====== ABOUT LINK ====== -->
    <section class="about-sxn reveal reveal-delay-5">
      <router-link to="/about" class="about-link">
        {{ t('aboutLink') }}
      </router-link>
    </section>
  </div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
const t = inject('t')

onMounted(() => {
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); ro.unobserve(e.target) } })
  }, { threshold: 0.1 })
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el))
})
</script>

<style scoped>
.page{max-width:1000px;margin:0 auto;padding:0 24px}

/* ====== HERO ====== */
.hero{min-height:80vh;display:flex;align-items:center;justify-content:center;padding:140px 0 60px}
.hero-inner{text-align:center;max-width:800px;width:100%}
.hero-label{display:inline-block;font-size:11px;font-weight:500;color:var(--ts);letter-spacing:5px;text-transform:uppercase;margin-bottom:28px}
.hero-title{
  font-family:'Noto Serif SC','Playfair Display','Georgia',serif;
  font-size:clamp(28px,4.5vw,52px);
  font-weight:700;
  color:var(--tx);
  line-height:1.3;
  letter-spacing:3px;
  margin-bottom:24px;
  white-space:nowrap;
}
.en .hero-title{font-family:'Playfair Display','Noto Serif SC',serif}
.hero-sub{font-size:clamp(14px,1.6vw,17px);color:var(--ts);line-height:1.8;letter-spacing:.5px;max-width:480px;margin-left:auto;margin-right:auto}

/* ====== ENTRY GRID ====== */
.grid-sxn{padding:20px 0 60px}
.entry-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--bd)}
.entry-card{
  display:flex;flex-direction:column;justify-content:center;
  padding:52px 40px;background:var(--bg);
  transition:all var(--tr);position:relative;
  min-height:200px;
}
.entry-card:hover{background:var(--cw)}
.entry-num{
  font-family:'Inter',sans-serif;font-size:11px;font-weight:400;
  color:var(--tm);letter-spacing:2px;margin-bottom:16px;
}
.entry-t{
  font-family:'Noto Serif SC','Playfair Display',serif;
  font-size:clamp(20px,2vw,26px);font-weight:600;
  color:var(--tx);letter-spacing:2px;margin-bottom:10px;
}
.en .entry-t{font-family:'Playfair Display','Noto Serif SC',serif}
.entry-d{font-size:13px;color:var(--ts);line-height:1.7;letter-spacing:.3px;max-width:280px;margin-bottom:16px}
.entry-arrow{font-size:16px;color:var(--tm);transition:all var(--tr)}
.entry-card:hover .entry-arrow{color:var(--tx);transform:translateX(4px)}

/* ====== ABOUT LINK ====== */
.about-sxn{text-align:center;padding:40px 0 120px}
.about-link{font-size:13px;color:var(--tm);letter-spacing:1px;text-transform:uppercase;border-bottom:1px solid var(--bd);padding-bottom:4px;transition:all var(--tr)}
.about-link:hover{color:var(--tx);border-color:var(--ts)}

@media(max-width:768px){
  .hero{min-height:auto;padding:120px 0 40px}
  .hero-title{white-space:normal}
  .entry-grid{grid-template-columns:1fr}
  .entry-card{padding:40px 28px;min-height:auto}
  .about-sxn{padding:24px 0 80px}
}
@media(max-width:640px){
  .hero{padding:100px 0 32px}
  .hero-label{font-size:10px;letter-spacing:4px;margin-bottom:20px}
  .entry-card{padding:32px 24px}
}
</style>
