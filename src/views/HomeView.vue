<template>
  <div class="page">
    <section class="hero">
      <div class="hero-inner reveal">
        <div class="hero-brand">
          <span class="hero-brand-zh">她叙</span>
          <span class="hero-brand-en">Her Tale</span>
        </div>
        <div class="baroque-divider">✦ ✦ ✦</div>
        <h1 class="hero-title">{{ t('heroTitle') }}</h1>
        <p class="hero-sub">{{ locale==='zh' ? 'She writes the story, she defines the rules, she follows her heart.' : '她写故事，她做定义，她自心动' }}</p>
        <div class="hero-actions">
          <router-link to="/stories" class="hero-btn">{{ locale==='zh' ? '探索剧情库' : 'Explore' }}</router-link>
          <router-link to="/about" class="hero-btn-outline">{{ locale==='zh' ? '了解她叙' : 'About' }}</router-link>
        </div>
      </div>
    </section>

    <section class="stats reveal">
      <div class="stat-item"><span class="stat-n">217</span><span class="stat-l">{{ locale==='zh' ? '作品' : 'Games' }}</span></div>
      <div class="stat-item"><span class="stat-n">1,483</span><span class="stat-l">{{ locale==='zh' ? '角色' : 'Characters' }}</span></div>
      <div class="stat-item"><span class="stat-n">523</span><span class="stat-l">{{ locale==='zh' ? '情绪标签' : 'Emotions' }}</span></div>
      <div class="stat-item"><span class="stat-n">89</span><span class="stat-l">{{ locale==='zh' ? '创作者' : 'Creators' }}</span></div>
    </section>

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
.page{max-width:960px;margin:0 auto;padding:0 20px}

.hero{min-height:70vh;display:flex;align-items:center;justify-content:center;padding:100px 0 36px}
.hero-inner{text-align:center;max-width:640px;width:100%}
.hero-brand{margin-bottom:16px}
.hero-brand-zh{display:block;font-family:'Noto Serif SC',serif;font-size:44px;font-weight:700;color:var(--tx);letter-spacing:8px;margin-bottom:4px}
.hero-brand-en{font-family:'Georgia',serif;font-size:15px;font-style:italic;color:var(--gold);letter-spacing:4px}
.hero-title{font-family:'Noto Serif SC','Georgia',serif;font-size:clamp(22px,3vw,36px);font-weight:700;color:var(--tx);line-height:1.3;letter-spacing:3px;margin:0 auto 12px;max-width:600px;white-space:nowrap}
.en .hero-title{font-family:'Playfair Display','Georgia',serif}
.hero-sub{font-size:13px;color:var(--ts);line-height:1.6;letter-spacing:.5px;max-width:460px;margin:0 auto 32px}
.hero-actions{display:flex;gap:16px;justify-content:center}
.hero-btn{display:inline-block;padding:12px 36px;background:var(--accent);color:var(--gold);border:1px solid var(--gold);font-size:12px;letter-spacing:3px;transition:all var(--tr)}.hero-btn:hover{background:var(--gold);color:var(--tx);transform:translateY(-1px)}
.hero-btn-outline{display:inline-block;padding:12px 36px;background:transparent;color:var(--ts);border:1px solid var(--bd);font-size:12px;letter-spacing:2px;transition:all var(--tr)}.hero-btn-outline:hover{border-color:var(--gold);color:var(--accent);transform:translateY(-1px)}

.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--bd);margin-bottom:32px}
.stat-item{background:var(--bg);padding:20px 12px;text-align:center;transition:all var(--tr)}.stat-item:hover{background:var(--cw);border:1px solid var(--gold);margin:-1px}
.stat-n{display:block;font-family:'Georgia',serif;font-size:26px;font-weight:400;color:var(--accent);letter-spacing:1px;margin-bottom:3px}
.stat-l{font-size:11px;color:var(--tm);letter-spacing:2px;text-transform:uppercase}

.grid-sxn{padding:0 0 60px}
.entry-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--bd)}
.entry-card{display:flex;align-items:center;gap:16px;padding:32px 28px;background:var(--bg);transition:all var(--tr)}.entry-card:hover{background:var(--cw);border:1px solid var(--gold);margin:-1px}
.entry-num{font-family:'Georgia',serif;font-size:12px;font-style:italic;color:var(--gold);letter-spacing:2px;flex-shrink:0;width:24px}
.entry-body{flex:1}
.entry-t{font-family:'Noto Serif SC','Georgia',serif;font-size:clamp(16px,1.5vw,20px);font-weight:600;color:var(--tx);letter-spacing:2px;margin-bottom:4px}.en .entry-t{font-family:'Playfair Display',serif}
.entry-d{font-size:12px;color:var(--ts);line-height:1.5;letter-spacing:.3px;max-width:220px}
.entry-arrow{font-size:14px;color:var(--gold);transition:all var(--tr);flex-shrink:0}.entry-card:hover .entry-arrow{color:var(--accent);transform:translateX(6px)}

@media(max-width:768px){
  .hero{min-height:auto;padding:90px 0 24px}.hero-brand-zh{font-size:34px}.hero-title{white-space:normal}.stats{grid-template-columns:repeat(2,1fr)}.entry-grid{grid-template-columns:1fr}.entry-card{padding:26px 22px}
}
@media(max-width:640px){
  .hero{padding:80px 0 16px}.hero-brand-zh{font-size:28px}.hero-actions{flex-direction:column;align-items:center}.stat-n{font-size:22px}.entry-card{padding:22px 16px}
}
</style>
