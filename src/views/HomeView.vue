<template>
  <div class="page">
    <!-- ====== BAROQUE HERO ====== -->
    <section class="hero">
      <div class="hero-corner hero-corner-tl"></div>
      <div class="hero-corner hero-corner-tr"></div>
      <div class="hero-corner hero-corner-bl"></div>
      <div class="hero-corner hero-corner-br"></div>

      <div class="hero-inner reveal">
        <div class="hero-brand">
          <span class="hero-brand-zh">她叙</span>
          <span class="hero-brand-en">Her Tale</span>
        </div>

        <div class="hero-ornament">❧</div>

        <h1 class="hero-title">{{ locale==='zh' ? '她写故事，她做定义，她自心动' : 'She writes, she defines, she feels.' }}</h1>

        <div class="hero-ornament-small">— ✦ —</div>

        <div class="hero-actions">
          <router-link to="/stories" class="btn-gold">{{ locale==='zh' ? '探索剧情库' : 'Stories' }}</router-link>
          <router-link to="/about" class="btn-outline">{{ locale==='zh' ? '了解她叙' : 'About' }}</router-link>
        </div>
      </div>
    </section>

    <!-- ====== DIVIDER ====== -->
    <div class="section-divider"><span class="divider-ornament">❦</span></div>

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
.hero{position:relative;min-height:80vh;display:flex;align-items:center;justify-content:center;
  background:linear-gradient(175deg,#FBF7F0 0%,#F5EFE6 30%,#F0E8DC 60%,#FBF7F0 100%);
  padding:100px 24px 50px;overflow:hidden}
.hero::before{content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse at 50% 40%,rgba(212,192,140,.12) 0%,transparent 60%),
    repeating-linear-gradient(85deg,transparent,transparent 60px,rgba(212,192,140,.03) 60px,rgba(212,192,140,.03) 61px);
  pointer-events:none}
.hero::after{content:'';position:absolute;inset:0;
  background-image:radial-gradient(circle at 20% 30%,rgba(196,154,154,.06) 0%,transparent 40%),
    radial-gradient(circle at 80% 70%,rgba(212,192,140,.06) 0%,transparent 40%);
  pointer-events:none}

/* Corner decorations */
.hero-corner{position:absolute;width:60px;height:60px;border-color:var(--gold);opacity:.3}
.hero-corner-tl{top:24px;left:24px;border-top:1.5px solid;border-left:1.5px solid}
.hero-corner-tr{top:24px;right:24px;border-top:1.5px solid;border-right:1.5px solid}
.hero-corner-bl{bottom:24px;left:24px;border-bottom:1.5px solid;border-left:1.5px solid}
.hero-corner-br{bottom:24px;right:24px;border-bottom:1.5px solid;border-right:1.5px solid}

.hero-inner{text-align:center;max-width:720px;width:100%;position:relative;z-index:1}
.hero-brand{margin-bottom:12px}
.hero-brand-zh{font-family:'Noto Serif SC',serif;font-size:42px;font-weight:700;color:var(--tx);letter-spacing:8px;margin-bottom:4px;display:block}
.hero-brand-en{font-family:'Georgia',serif;font-size:14px;font-style:italic;color:var(--gold);letter-spacing:4px}
.hero-ornament{font-size:24px;color:var(--gold);opacity:.35;margin:14px 0;font-family:'Georgia',serif}

.hero-title{font-family:'Noto Serif SC','Georgia',serif;
  font-size:clamp(28px,4.5vw,52px);font-weight:700;
  color:var(--tx);line-height:1.3;letter-spacing:4px;
  margin:0 auto 20px;max-width:700px;
  text-shadow:0 1px 2px rgba(212,192,140,.2),0 2px 4px rgba(212,192,140,.1)}
.en .hero-title{font-family:'Playfair Display','Georgia',serif}

.hero-ornament-small{font-size:12px;color:var(--gold);letter-spacing:6px;opacity:.4;margin:0 0 36px}

.hero-actions{display:flex;gap:16px;justify-content:center;flex-wrap:wrap}

/* ====== DIVIDER ====== */
.section-divider{text-align:center;padding:20px 0 12px;background:transparent}
.divider-ornament{font-size:22px;color:var(--gold);opacity:.35;font-family:'Georgia',serif}

/* ====== STATS ====== */
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--gold);margin:0 24px 36px}
.stat-item{background:var(--cw);padding:24px 12px;text-align:center;transition:all var(--tr)}.stat-item:hover{background:var(--bg)}
.stat-n{display:block;font-family:'Georgia',serif;font-size:28px;font-weight:400;color:var(--accent);letter-spacing:1px;margin-bottom:3px}
.stat-l{font-size:11px;color:var(--ts);letter-spacing:2px;text-transform:uppercase}

/* ====== ENTRY GRID ====== */
.grid-sxn{padding:0 24px 60px}
.entry-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.entry-card{display:flex;align-items:center;gap:16px;padding:32px 28px;
  background:var(--cw);border:1px solid var(--bd);border-radius:var(--rs);
  transition:all var(--tr)}
.entry-card:hover{background:var(--cw);border-color:var(--gold);transform:translateY(-3px);box-shadow:0 6px 20px rgba(212,192,140,.15)}
.entry-num{font-family:'Georgia',serif;font-size:13px;font-style:italic;color:var(--gold);letter-spacing:2px;flex-shrink:0;width:28px}
.entry-body{flex:1}
.entry-t{font-family:'Noto Serif SC','Georgia',serif;font-size:clamp(16px,1.5vw,20px);font-weight:600;color:var(--tx);letter-spacing:2px;margin-bottom:4px}.en .entry-t{font-family:'Playfair Display',serif}
.entry-d{font-size:12px;color:var(--ts);line-height:1.5;letter-spacing:.3px;max-width:220px}
.entry-arrow{font-size:16px;color:var(--gold);transition:all var(--tr);flex-shrink:0}.entry-card:hover .entry-arrow{color:var(--accent);transform:translateX(8px)}

@media(max-width:768px){
  .hero{min-height:auto;padding:90px 20px 36px}.hero-brand-zh{font-size:32px}.hero-title{font-size:clamp(24px,5vw,36px)}
  .stats{grid-template-columns:repeat(2,1fr);margin:0 16px 28px}.entry-grid{grid-template-columns:1fr}.entry-card{padding:26px 22px}
  .hero-corner{width:40px;height:40px}.hero-corner-tl{top:16px;left:16px}.hero-corner-tr{top:16px;right:16px}.hero-corner-bl{bottom:16px;left:16px}.hero-corner-br{bottom:16px;right:16px}
}
@media(max-width:640px){
  .hero{padding:80px 16px 28px}.hero-brand-zh{font-size:26px}.hero-title{font-size:clamp(20px,5vw,28px);letter-spacing:3px}
  .hero-actions{flex-direction:column;align-items:center}.stat-n{font-size:24px}.entry-card{padding:22px 18px;gap:12px}.grid-sxn{padding:0 16px 40px}
}
</style>
