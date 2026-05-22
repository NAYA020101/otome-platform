<template>
  <div class="page">
    <!-- ====== HERO ====== -->
    <section class="hero">
      <div class="hero-inner reveal">
        <div class="hero-brand">
          <span class="hero-brand-zh">她叙</span>
          <span class="hero-brand-en">Her Tale</span>
        </div>
        <div class="hero-divider"></div>
        <p class="hero-intro">{{ locale==='zh' ? '一场专属于女性的浪漫叙事栖居地' : 'A romantic narrative haven for women' }}</p>
        <p class="hero-title">{{ t('heroTitle') }}</p>
        <p class="hero-sub">{{ t('heroSubtitle') }}</p>
        <router-link to="/stories" class="hero-btn">{{ locale==='zh' ? '探索剧情库' : 'Explore Archive' }}</router-link>
      </div>
    </section>

    <!-- ====== LITERARY INTRO ====== -->
    <section class="literary reveal">
      <div class="literary-body">
        <p>{{ locale==='zh' ? '世间万千心动，皆可落笔成叙。本平台以"女性叙事、浪漫创作、温柔共生"为核心，聚焦乙女文化与原创故事创作，为每一位热爱心动剧情、偏爱温柔叙事的创作者与爱好者，打造一片纯粹、自由、治愈的文字天地与同好角落。' : 'Every heartbeat can become a story. This platform centers on feminine narrative, romantic creation, and gentle coexistence.' }}</p>
        <p>{{ locale==='zh' ? '在这里，你可以翻阅全网优质乙女游戏世界观、人物设定与剧情篇章，邂逅跨越次元的心动与温柔。我们收录各类经典与新晋乙女作品，梳理细腻剧情脉络与人物魅力，让每一份被打动的情愫都有处可寻，每一场难忘的邂逅都被妥善珍藏。' : 'Here you can explore otome game worlds, characters, and stories from across the web.' }}</p>
        <p>{{ locale==='zh' ? '不止于阅览，更在于创造。她叙鼓励每一位心怀灵感的创作者自由落笔，记录遐想、续写剧情、原创故事、描摹心动。不必拘泥框架，无需受限规则，所有温柔的思绪、浪漫的想象、私人的情愫，都可以在此生根、绽放、被看见。每一段文字，都是独属于你的专属叙事。' : 'Beyond reading, we celebrate creation. Every gentle thought, romantic imagination, and personal feeling can take root and bloom here.' }}</p>
        <p class="literary-quote">{{ locale==='zh' ? '以她之名，叙她所想。愿你在此，读尽世间温柔，写尽心中浪漫，与同频之人相伴，岁岁叙心动，字字皆深情。' : 'In her name, tell her stories. May you find all the tenderness in the world here.' }}</p>
      </div>
    </section>

    <!-- ====== STATS ====== -->
    <section class="stats reveal">
      <div class="stat-item"><span class="stat-n">217</span><span class="stat-l">{{ locale==='zh' ? '作品收录' : 'Games' }}</span></div>
      <div class="stat-item"><span class="stat-n">1,483</span><span class="stat-l">{{ locale==='zh' ? '角色收录' : 'Characters' }}</span></div>
      <div class="stat-item"><span class="stat-n">523</span><span class="stat-l">{{ locale==='zh' ? '情绪标签' : 'Emotions' }}</span></div>
      <div class="stat-item"><span class="stat-n">89</span><span class="stat-l">{{ locale==='zh' ? '活跃创作者' : 'Creators' }}</span></div>
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

    <!-- ====== ACTIVITY ====== -->
    <section class="activity reveal">
      <div class="activity-h">{{ locale==='zh' ? '最近动态' : 'Recent' }}</div>
      <div class="activity-list">
        <div class="activity-item"><span class="activity-dot"></span><span class="activity-text">{{ locale==='zh' ? '鹿饮溪 发布了新故事《月光航线》' : 'Deer Creek published a story' }}</span><span class="activity-time">2h</span></div>
        <div class="activity-item"><span class="activity-dot"></span><span class="activity-text">{{ locale==='zh' ? '青黛 在社区发起了新讨论' : 'Indigo started a discussion' }}</span><span class="activity-time">5h</span></div>
        <div class="activity-item"><span class="activity-dot"></span><span class="activity-text">{{ locale==='zh' ? '月下独白 保存了一篇草稿' : 'Monologue saved a draft' }}</span><span class="activity-time">1d</span></div>
      </div>
    </section>

    <!-- ====== ABOUT LINK ====== -->
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

/* ====== HERO ====== */
.hero{min-height:70vh;display:flex;align-items:center;justify-content:center;padding:110px 0 40px}
.hero-inner{text-align:center;max-width:640px;width:100%}
.hero-brand{margin-bottom:20px}
.hero-brand-zh{display:block;font-family:'Noto Serif SC',serif;font-size:48px;font-weight:700;color:var(--tx);letter-spacing:8px;margin-bottom:6px}
.hero-brand-en{font-family:'Georgia',serif;font-size:16px;font-style:italic;color:var(--gold);letter-spacing:4px}
.hero-divider{width:60px;height:1px;background:var(--gold);margin:24px auto}
.hero-intro{font-size:15px;color:var(--ts);line-height:1.8;letter-spacing:.5px;max-width:500px;margin:0 auto 28px;font-style:italic}
.hero-title{font-family:'Noto Serif SC','Georgia',serif;font-size:clamp(26px,3.5vw,42px);font-weight:700;color:var(--tx);line-height:1.4;letter-spacing:4px;margin-bottom:16px;max-width:600px;margin-left:auto;margin-right:auto}
.en .hero-title{font-family:'Playfair Display','Georgia',serif}
.hero-sub{font-size:14px;color:var(--ts);line-height:1.7;letter-spacing:.5px;max-width:400px;margin:0 auto 36px}
.hero-btn{display:inline-block;padding:12px 40px;background:var(--accent);color:var(--gold);border:1px solid var(--gold);font-size:12px;letter-spacing:3px;transition:all var(--tr)}.hero-btn:hover{background:var(--gold);color:var(--tx);transform:translateY(-1px);box-shadow:var(--sm)}

/* ====== LITERARY INTRO ====== */
.literary{padding:20px 40px 48px;max-width:680px;margin:0 auto}
.literary-body p{font-size:14px;color:var(--ts);line-height:2.1;letter-spacing:.5px;margin-bottom:20px;text-indent:2em}
.literary-quote{font-family:'Noto Serif SC','Georgia',serif;font-size:15px;color:var(--accent);line-height:2.1;letter-spacing:.5px;text-indent:2em;font-style:italic;margin-top:28px;padding-top:20px;border-top:1px solid var(--bd)}

/* ====== STATS ====== */
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--bd);margin-bottom:36px}
.stat-item{background:var(--bg);padding:24px 12px;text-align:center;transition:all var(--tr);border:1px solid transparent}.stat-item:hover{background:var(--cw);border-color:var(--gold)}
.stat-n{display:block;font-family:'Georgia',serif;font-size:28px;font-weight:400;color:var(--accent);letter-spacing:1px;margin-bottom:4px}
.stat-l{font-size:11px;color:var(--tm);letter-spacing:2px;text-transform:uppercase}

/* ====== ENTRY GRID ====== */
.grid-sxn{padding:0 0 48px}
.entry-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--bd)}
.entry-card{display:flex;align-items:center;gap:16px;padding:36px 32px;background:var(--bg);transition:all var(--tr);border:1px solid transparent}.entry-card:hover{background:var(--cw);border-color:var(--gold)}
.entry-num{font-family:'Georgia',serif;font-size:12px;font-style:italic;color:var(--gold);letter-spacing:2px;flex-shrink:0;width:24px}
.entry-body{flex:1}
.entry-t{font-family:'Noto Serif SC','Georgia',serif;font-size:clamp(17px,1.5vw,21px);font-weight:600;color:var(--tx);letter-spacing:2px;margin-bottom:5px}.en .entry-t{font-family:'Playfair Display',serif}
.entry-d{font-size:12px;color:var(--ts);line-height:1.6;letter-spacing:.3px;max-width:240px}
.entry-arrow{font-size:14px;color:var(--gold);transition:all var(--tr);flex-shrink:0}.entry-card:hover .entry-arrow{color:var(--accent);transform:translateX(6px)}

/* ====== ACTIVITY ====== */
.activity{padding:0 0 36px}
.activity-h{font-size:14px;font-weight:500;color:var(--tx);letter-spacing:1.5px;margin-bottom:16px;padding-bottom:10px;border-bottom:1px solid var(--gold)}
.activity-list{display:flex;flex-direction:column}
.activity-item{display:flex;align-items:center;gap:12px;padding:12px 16px;background:var(--cw);border-bottom:1px solid var(--bg2);transition:all var(--tr)}.activity-item:last-child{border-bottom:none}.activity-item:hover{background:var(--bg)}
.activity-dot{width:6px;height:6px;background:var(--gold);flex-shrink:0}
.activity-text{font-size:12px;color:var(--ts);flex:1;line-height:1.4}
.activity-time{font-size:10px;color:var(--tm);flex-shrink:0}

/* ====== ABOUT LINK ====== */
.about-sxn{text-align:center;padding:24px 0 100px}
.about-link{font-size:12px;color:var(--tm);letter-spacing:2px;border-bottom:1px solid var(--bd);padding-bottom:3px;transition:all var(--tr)}.about-link:hover{color:var(--accent);border-color:var(--gold)}

@media(max-width:768px){
  .hero{min-height:auto;padding:100px 0 28px}.hero-brand-zh{font-size:36px}.stats{grid-template-columns:repeat(2,1fr)}.entry-grid{grid-template-columns:1fr}.entry-card{padding:28px 24px}.literary{padding:12px 20px 32px}.about-sxn{padding:16px 0 70px}
}
@media(max-width:640px){
  .hero{padding:90px 0 20px}.hero-brand-zh{font-size:30px}.literary-body p{font-size:13px}.stat-n{font-size:24px}.entry-card{padding:24px 18px}
}
</style>
