<template>
  <div class="page">
    <!-- ====== BAROQUE HERO BANNER ====== -->
    <section class="hero">
      <!-- Decorative corner elements -->
      <div class="hero-corner hero-corner-tl"></div>
      <div class="hero-corner hero-corner-tr"></div>
      <div class="hero-corner hero-corner-bl"></div>
      <div class="hero-corner hero-corner-br"></div>

      <div class="hero-inner reveal">
        <!-- Decorative top scroll -->
        <div class="hero-scroll-top">⌇ ⌇ ⌇</div>

        <div class="hero-brand">
          <span class="hero-brand-zh">她叙</span>
          <span class="hero-brand-en">Her Tale</span>
        </div>

        <!-- Ornate divider -->
        <div class="hero-ornament">❧</div>

        <!-- Main slogan -->
        <h1 class="hero-title">{{ locale==='zh' ? '鎏金织穹，繁复成诗' : 'Gilded skies, poetry in detail' }}</h1>
        <p class="hero-sub">{{ locale==='zh' ? '巴洛克，复刻一场盛世浪漫' : 'Baroque — a timeless romance reborn' }}</p>

        <!-- Ornate divider -->
        <div class="hero-ornament-small">— ✦ —</div>

        <!-- Secondary subtitle -->
        <p class="hero-quote">{{ locale==='zh' ? '曲线雕琢时光，金纹镌刻永恒典雅' : 'Curves carve time, gold inscribes eternity' }}</p>

        <div class="hero-actions">
          <router-link to="/stories" class="btn-gold">{{ locale==='zh' ? '探索叙事' : 'Explore' }}</router-link>
          <router-link to="/about" class="btn-outline">{{ locale==='zh' ? '了解她叙' : 'About' }}</router-link>
        </div>
      </div>
    </section>

    <!-- ====== GOLD DIVIDER ====== -->
    <div class="section-divider">
      <span class="divider-ornament">❦</span>
    </div>

    <!-- ====== STATS ====== -->
    <section class="stats reveal">
      <div class="stat-item"><span class="stat-n">217</span><span class="stat-l">{{ locale==='zh' ? '作品' : 'Games' }}</span></div>
      <div class="stat-item"><span class="stat-n">1,483</span><span class="stat-l">{{ locale==='zh' ? '角色' : 'Characters' }}</span></div>
      <div class="stat-item"><span class="stat-n">523</span><span class="stat-l">{{ locale==='zh' ? '情绪' : 'Emotions' }}</span></div>
      <div class="stat-item"><span class="stat-n">89</span><span class="stat-l">{{ locale==='zh' ? '创作者' : 'Creators' }}</span></div>
    </section>

    <!-- ====== ENTRY GRID ====== -->
    <section class="grid-sxn">
      <div class="entry-grid">
        <router-link to="/stories" class="entry-card">
          <span class="entry-num">01</span>
          <div class="entry-body"><h2 class="entry-t">{{ t('navStories') }}</h2><p class="entry-d">{{ t('storiesSubtitle') }}</p></div>
          <span class="entry-arrow">→</span>
        </router-link>
        <router-link to="/creators" class="entry-card">
          <span class="entry-num">02</span>
          <div class="entry-body"><h2 class="entry-t">{{ t('navCreate') }}</h2><p class="entry-d">{{ t('creatorsTagline') }}</p></div>
          <span class="entry-arrow">→</span>
        </router-link>
        <router-link to="/ai" class="entry-card">
          <span class="entry-num">03</span>
          <div class="entry-body"><h2 class="entry-t">{{ t('navAI') }}</h2><p class="entry-d">{{ t('aiSubtitle') }}</p></div>
          <span class="entry-arrow">→</span>
        </router-link>
        <router-link to="/community" class="entry-card">
          <span class="entry-num">04</span>
          <div class="entry-body"><h2 class="entry-t">{{ t('navCommunity') }}</h2><p class="entry-d">{{ t('communitySubtitle') }}</p></div>
          <span class="entry-arrow">→</span>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
const t = inject('t');const locale = inject('locale')
onMounted(() => {
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); ro.unobserve(e.target) } })
  }, { threshold: 0.1 })
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el))
})
</script>

<style scoped>
.page{max-width:100%;padding:0;overflow:hidden}

/* ====== HERO ====== */
.hero{position:relative;min-height:85vh;display:flex;align-items:center;justify-content:center;
  background:linear-gradient(170deg,#2A1A14 0%,#3A2A1A 25%,#2A3A2A 55%,#1A2A1A 100%);
  padding:100px 24px 60px;overflow:hidden}
.hero::before{content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse at 50% 30%,rgba(201,168,76,.08) 0%,transparent 60%),
    repeating-linear-gradient(0deg,transparent,transparent 40px,rgba(201,168,76,.02) 40px,rgba(201,168,76,.02) 41px);
  pointer-events:none}

/* Decorative corners */
.hero-corner{position:absolute;width:80px;height:80px;border-color:var(--gold);opacity:.25}
.hero-corner-tl{top:20px;left:20px;border-top:2px solid;border-left:2px solid}
.hero-corner-tr{top:20px;right:20px;border-top:2px solid;border-right:2px solid}
.hero-corner-bl{bottom:20px;left:20px;border-bottom:2px solid;border-left:2px solid}
.hero-corner-br{bottom:20px;right:20px;border-bottom:2px solid;border-right:2px solid}

.hero-scroll-top{text-align:center;font-size:16px;color:var(--gold);letter-spacing:12px;opacity:.4;margin-bottom:16px}

.hero-inner{text-align:center;max-width:720px;width:100%;position:relative;z-index:1}
.hero-brand{margin-bottom:8px}
.hero-brand-zh{font-family:'Noto Serif SC',serif;font-size:46px;font-weight:700;
  background:linear-gradient(180deg,var(--gold-light) 0%,var(--gold) 50%,var(--gold-dim) 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  letter-spacing:10px;text-shadow:none;margin-bottom:6px;display:block}
.hero-brand-en{font-family:'Georgia',serif;font-size:14px;font-style:italic;
  color:var(--gold);letter-spacing:4px;opacity:.7}
.hero-ornament{font-size:28px;color:var(--gold);opacity:.4;margin:16px 0;font-family:'Georgia',serif}
.hero-title{font-family:'Noto Serif SC','Georgia',serif;
  font-size:clamp(28px,4vw,48px);font-weight:700;
  background:linear-gradient(180deg,#FFF8E0 0%,var(--gold-light) 40%,var(--gold) 70%,var(--gold-dim) 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  line-height:1.3;letter-spacing:6px;margin:0 auto 12px;max-width:700px}
.en .hero-title{font-family:'Playfair Display','Georgia',serif}
.hero-sub{font-size:clamp(16px,2vw,22px);color:var(--gold);opacity:.8;letter-spacing:8px;margin-bottom:12px;
  font-family:'Noto Serif SC','Georgia',serif;font-weight:400}
.hero-ornament-small{font-size:12px;color:var(--gold);letter-spacing:6px;opacity:.5;margin:12px 0}
.hero-quote{font-size:14px;color:var(--gold);opacity:.55;letter-spacing:4px;margin-bottom:40px;
  font-family:'Georgia',serif;font-style:italic}
.hero-actions{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}

/* ====== DIVIDER ====== */
.section-divider{text-align:center;padding:24px 0 16px;background:var(--green)}
.divider-ornament{font-size:24px;color:var(--gold);opacity:.4;font-family:'Georgia',serif}

/* ====== STATS ====== */
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--gold);margin:0 20px 32px}
.stat-item{background:var(--green);padding:24px 12px;text-align:center;transition:all var(--tr)}.stat-item:hover{background:#2A4A2A}
.stat-n{display:block;font-family:'Georgia',serif;font-size:28px;font-weight:400;
  background:linear-gradient(180deg,var(--gold-light),var(--gold));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;
  letter-spacing:1px;margin-bottom:3px}
.stat-l{font-size:11px;color:var(--gold);opacity:.7;letter-spacing:2px;text-transform:uppercase}

/* ====== ENTRY GRID ====== */
.grid-sxn{padding:0 20px 60px}
.entry-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.entry-card{display:flex;align-items:center;gap:16px;padding:32px 28px;
  background:var(--cw);border:1px solid var(--gold);border-radius:var(--rs);
  transition:all var(--tr);box-shadow:0 2px 8px rgba(201,168,76,.1)}
.entry-card:hover{background:linear-gradient(135deg,var(--cw),#F5EDE0);border-color:var(--gold-light);
  transform:translateY(-3px);box-shadow:0 6px 24px rgba(201,168,76,.2)}
.entry-num{font-family:'Georgia',serif;font-size:13px;font-style:italic;color:var(--gold);letter-spacing:2px;flex-shrink:0;width:28px}
.entry-body{flex:1}
.entry-t{font-family:'Noto Serif SC','Georgia',serif;font-size:clamp(16px,1.5vw,20px);font-weight:600;
  color:var(--tx);letter-spacing:2px;margin-bottom:4px}.en .entry-t{font-family:'Playfair Display',serif}
.entry-d{font-size:12px;color:var(--ts);line-height:1.5;letter-spacing:.3px;max-width:220px}
.entry-arrow{font-size:16px;color:var(--gold);transition:all var(--tr);flex-shrink:0}.entry-card:hover .entry-arrow{color:var(--accent);transform:translateX(8px)}

@media(max-width:768px){
  .hero{min-height:auto;padding:90px 20px 40px}.hero-brand-zh{font-size:34px}.hero-title{font-size:clamp(22px,4vw,32px);letter-spacing:4px}
  .hero-sub{font-size:14px;letter-spacing:6px}.hero-quote{font-size:12px}
  .stats{grid-template-columns:repeat(2,1fr);margin:0 12px 24px}.entry-grid{grid-template-columns:1fr}.entry-card{padding:26px 22px}
  .hero-corner{width:40px;height:40px}
}
@media(max-width:640px){
  .hero{padding:80px 16px 30px}.hero-brand-zh{font-size:28px;letter-spacing:6px}
  .hero-actions{flex-direction:column;align-items:center}.stat-n{font-size:24px}.entry-card{padding:22px 18px;gap:12px}
  .hero-ornament{font-size:20px}.hero-scroll-top{font-size:12px}
}
</style>
