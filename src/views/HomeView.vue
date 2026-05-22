<template>
  <div class="page">
    <section class="hero">
      <div class="hero-inner reveal">
        <span class="hero-brand">她叙</span>
        <p class="hero-intro">{{ locale==='zh' ? '一个以女性叙事为核心的乙女共创平台。收录游戏、创作故事、相遇同好——由她定义，由她主导。' : 'An otome co-creation platform centering women\'s narratives.' }}</p>
        <h1 class="hero-title">{{ t('heroTitle') }}</h1>
        <p class="hero-sub">{{ t('heroSubtitle') }}</p>
        <router-link to="/stories" class="hero-btn">{{ locale==='zh' ? '探索剧情库' : 'Explore' }}</router-link>
      </div>
    </section>

    <section class="stats reveal">
      <div class="stat-item"><span class="stat-n">217</span><span class="stat-l">{{ locale==='zh' ? '作品收录' : 'Games' }}</span></div>
      <div class="stat-item"><span class="stat-n">1,483</span><span class="stat-l">{{ locale==='zh' ? '角色收录' : 'Characters' }}</span></div>
      <div class="stat-item"><span class="stat-n">523</span><span class="stat-l">{{ locale==='zh' ? '情绪标签' : 'Emotions' }}</span></div>
      <div class="stat-item"><span class="stat-n">89</span><span class="stat-l">{{ locale==='zh' ? '活跃创作者' : 'Creators' }}</span></div>
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

    <section class="activity reveal">
      <div class="activity-h">{{ locale==='zh' ? '最近动态' : 'Recent' }}</div>
      <div class="activity-list">
        <div class="activity-item"><span class="activity-dot"></span><span class="activity-text">{{ locale==='zh' ? '鹿饮溪 发布了新故事《月光航线》' : 'Deer Creek published a story' }}</span><span class="activity-time">2h</span></div>
        <div class="activity-item"><span class="activity-dot"></span><span class="activity-text">{{ locale==='zh' ? '青黛 在社区发起了新讨论' : 'Indigo started a discussion' }}</span><span class="activity-time">5h</span></div>
        <div class="activity-item"><span class="activity-dot"></span><span class="activity-text">{{ locale==='zh' ? '月下独白 保存了一篇草稿' : 'Monologue saved a draft' }}</span><span class="activity-time">1d</span></div>
      </div>
    </section>

    <section class="about-sxn reveal">
      <router-link to="/about" class="about-link">{{ t('aboutLink') }}</router-link>
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
.page{max-width:960px;margin:0 auto;padding:0 20px}

.hero{min-height:60vh;display:flex;align-items:center;justify-content:center;padding:100px 0 28px}
.hero-inner{text-align:center;max-width:640px;width:100%}
.hero-brand{display:block;font-family:'Noto Serif SC',serif;font-size:36px;font-weight:700;color:var(--tx);letter-spacing:6px;margin-bottom:16px}
.hero-intro{font-size:13px;color:var(--ts);line-height:1.8;letter-spacing:.5px;max-width:460px;margin:0 auto 28px}
.hero-title{font-family:'Noto Serif SC','Georgia',serif;font-size:clamp(24px,3.5vw,40px);font-weight:700;color:var(--tx);line-height:1.4;letter-spacing:3px;margin-bottom:14px;max-width:600px;margin-left:auto;margin-right:auto}
.en .hero-title{font-family:'Playfair Display','Georgia',serif}
.hero-sub{font-size:14px;color:var(--ts);line-height:1.7;letter-spacing:.5px;max-width:400px;margin:0 auto 32px}
.hero-btn{display:inline-block;padding:12px 36px;background:var(--accent);color:var(--cw);font-size:12px;letter-spacing:2px;transition:all var(--tr)}.hero-btn:hover{background:#2A1E2A;transform:translateY(-1px);box-shadow:var(--sm)}

.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--bd);margin-bottom:28px}
.stat-item{background:var(--bg);padding:20px 12px;text-align:center;transition:all var(--tr)}.stat-item:hover{background:var(--cw)}
.stat-n{display:block;font-family:'Inter','Georgia',serif;font-size:24px;font-weight:400;color:var(--tx);letter-spacing:1px;margin-bottom:2px}
.stat-l{font-size:11px;color:var(--tm);letter-spacing:1.5px;text-transform:uppercase}

.grid-sxn{padding:0 0 36px}
.entry-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--bd)}
.entry-card{display:flex;align-items:center;gap:16px;padding:32px 28px;background:var(--bg);transition:all var(--tr)}.entry-card:hover{background:var(--cw)}
.entry-num{font-size:11px;color:var(--tm);letter-spacing:2px;flex-shrink:0;width:20px}
.entry-body{flex:1}
.entry-t{font-family:'Noto Serif SC','Georgia',serif;font-size:clamp(16px,1.5vw,20px);font-weight:600;color:var(--tx);letter-spacing:1.5px;margin-bottom:4px}
.en .entry-t{font-family:'Playfair Display',serif}
.entry-d{font-size:12px;color:var(--ts);line-height:1.5;letter-spacing:.3px;max-width:220px}
.entry-arrow{font-size:13px;color:var(--tm);transition:all var(--tr);flex-shrink:0}.entry-card:hover .entry-arrow{color:var(--accent);transform:translateX(4px)}

.activity{padding:0 0 32px}
.activity-h{font-size:13px;font-weight:500;color:var(--tx);letter-spacing:1px;margin-bottom:14px;padding-bottom:8px;border-bottom:1px solid var(--bd)}
.activity-list{display:flex;flex-direction:column}
.activity-item{display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--cw);border-bottom:1px solid var(--bg2);transition:all var(--tr)}.activity-item:last-child{border-bottom:none}.activity-item:hover{background:var(--bg)}
.activity-dot{width:5px;height:5px;background:var(--p);flex-shrink:0}
.activity-text{font-size:12px;color:var(--ts);flex:1;line-height:1.4}
.activity-time{font-size:10px;color:var(--tm);flex-shrink:0}

.about-sxn{text-align:center;padding:16px 0 80px}
.about-link{font-size:12px;color:var(--tm);letter-spacing:1.5px;border-bottom:1px solid var(--bd);padding-bottom:3px;transition:all var(--tr)}.about-link:hover{color:var(--accent);border-color:var(--accent-dim)}

@media(max-width:768px){
  .hero{min-height:auto;padding:90px 0 20px}.stats{grid-template-columns:repeat(2,1fr)}.entry-grid{grid-template-columns:1fr}.entry-card{padding:26px 20px}.about-sxn{padding:12px 0 60px}
}
@media(max-width:640px){
  .hero{padding:80px 0 12px}.hero-brand{font-size:28px}.stat-n{font-size:20px}.entry-card{padding:22px 16px}
}
</style>
