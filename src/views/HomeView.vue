<template>
  <div class="page">
    <!-- ====== HERO ====== -->
    <section class="hero">
      <div class="hero-inner reveal">
        <span class="hero-archive">{{ locale==='zh' ? '· 女性叙事档案 ·' : '· Feminine Narrative Archive ·' }}</span>
        <h1 class="hero-title">{{ t('heroTitle') }}</h1>
        <p class="hero-sub">{{ t('heroSubtitle') }}</p>
        <div class="hero-actions">
          <router-link to="/stories" class="hero-btn">{{ locale==='zh' ? '探索剧情库' : 'Explore Archive' }}</router-link>
        </div>
      </div>
    </section>

    <!-- ====== ENTRY GRID ====== -->
    <section class="grid-sxn">
      <div class="entry-grid">
        <router-link to="/stories" class="entry-card">
          <span class="entry-num">01</span>
          <div class="entry-body">
            <h2 class="entry-t">{{ t('navStories') }}</h2>
            <p class="entry-d">{{ t('storiesSubtitle') }}</p>
          </div>
          <span class="entry-arrow">→</span>
        </router-link>

        <router-link to="/creators" class="entry-card">
          <span class="entry-num">02</span>
          <div class="entry-body">
            <h2 class="entry-t">{{ t('navCreate') }}</h2>
            <p class="entry-d">{{ t('creatorsTagline') }}</p>
          </div>
          <span class="entry-arrow">→</span>
        </router-link>

        <router-link to="/ai" class="entry-card">
          <span class="entry-num">03</span>
          <div class="entry-body">
            <h2 class="entry-t">{{ t('navAI') }}</h2>
            <p class="entry-d">{{ t('aiSubtitle') }}</p>
          </div>
          <span class="entry-arrow">→</span>
        </router-link>

        <router-link to="/community" class="entry-card">
          <span class="entry-num">04</span>
          <div class="entry-body">
            <h2 class="entry-t">{{ t('navCommunity') }}</h2>
            <p class="entry-d">{{ t('communitySubtitle') }}</p>
          </div>
          <span class="entry-arrow">→</span>
        </router-link>
      </div>
    </section>

    <!-- ====== ABOUT LINK ====== -->
    <section class="about-sxn reveal">
      <router-link to="/about" class="about-link">
        {{ t('aboutLink') }}
      </router-link>
    </section>
  </div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
const t = inject('t')
const locale = inject('locale')

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
.hero{min-height:85vh;display:flex;align-items:center;justify-content:center;padding:140px 0 60px}
.hero-inner{text-align:center;max-width:700px;width:100%}
.hero-archive{display:block;font-size:11px;font-weight:400;color:var(--tm);letter-spacing:5px;margin-bottom:32px}
.hero-title{
  font-family:'Noto Serif SC','Playfair Display','Georgia',serif;
  font-size:clamp(30px,5vw,56px);
  font-weight:700;
  color:var(--tx);
  line-height:1.35;
  letter-spacing:4px;
  margin-bottom:20px;
}
.en .hero-title{font-family:'Playfair Display','Noto Serif SC',serif}
.hero-sub{font-size:clamp(14px,1.6vw,17px);color:var(--ts);line-height:1.8;letter-spacing:.5px;max-width:460px;margin:0 auto 40px}
.hero-actions{display:flex;gap:16px;justify-content:center}
.hero-btn{padding:14px 40px;background:var(--accent);color:var(--cw);font-size:11px;font-weight:400;letter-spacing:3px;text-transform:uppercase;transition:all var(--tr);border:none;cursor:pointer;font-family:inherit;display:inline-block}
.hero-btn:hover{background:var(--tx);transform:translateY(-1px)}

/* ====== ENTRY GRID ====== */
.grid-sxn{padding:20px 0 60px}
.entry-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--bd)}
.entry-card{
  display:flex;align-items:center;gap:20px;
  padding:44px 36px;background:var(--bg);
  transition:all var(--tr);
}
.entry-card:hover{background:var(--cw)}
.entry-num{font-size:11px;font-weight:400;color:var(--tm);letter-spacing:2px;flex-shrink:0;width:24px}
.entry-body{flex:1}
.entry-t{
  font-family:'Noto Serif SC','Playfair Display',serif;
  font-size:clamp(18px,1.8vw,24px);font-weight:600;
  color:var(--tx);letter-spacing:2px;margin-bottom:6px;
}
.en .entry-t{font-family:'Playfair Display','Noto Serif SC',serif}
.entry-d{font-size:12px;color:var(--ts);line-height:1.6;letter-spacing:.3px;max-width:260px}
.entry-arrow{font-size:14px;color:var(--tm);transition:all var(--tr);flex-shrink:0}
.entry-card:hover .entry-arrow{color:var(--accent);transform:translateX(4px)}

/* ====== ABOUT LINK ====== */
.about-sxn{text-align:center;padding:40px 0 120px}
.about-link{font-size:11px;color:var(--tm);letter-spacing:2px;text-transform:uppercase;border-bottom:1px solid var(--bd);padding-bottom:4px;transition:all var(--tr)}
.about-link:hover{color:var(--accent);border-color:var(--accent-dim)}

@media(max-width:768px){
  .hero{min-height:auto;padding:120px 0 40px}
  .entry-grid{grid-template-columns:1fr}
  .entry-card{padding:36px 24px}
  .about-sxn{padding:24px 0 80px}
}
@media(max-width:640px){
  .hero{padding:100px 0 32px}
  .hero-archive{font-size:10px;letter-spacing:4px;margin-bottom:24px}
  .entry-card{padding:28px 20px}
}
</style>
