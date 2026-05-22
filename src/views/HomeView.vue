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

    <!-- ====== ARCHIVE STATS ====== -->
    <section class="stats reveal">
      <div class="stat-item"><span class="stat-n">217</span><span class="stat-l">{{ locale==='zh' ? '作品收录' : 'Archived' }}</span></div>
      <div class="stat-item"><span class="stat-n">1,483</span><span class="stat-l">{{ locale==='zh' ? '角色' : 'Characters' }}</span></div>
      <div class="stat-item"><span class="stat-n">523</span><span class="stat-l">{{ locale==='zh' ? '情绪标签' : 'Emotions' }}</span></div>
      <div class="stat-item"><span class="stat-n">89</span><span class="stat-l">{{ locale==='zh' ? '创作者' : 'Creators' }}</span></div>
    </section>

    <!-- ====== PLATFORM INTRO ====== -->
    <section class="intro reveal">
      <div class="intro-tag">{{ locale==='zh' ? '关于 Her Tale' : 'About Her Tale' }}</div>
      <div class="intro-grid">
        <div class="intro-card">
          <span class="intro-icon">◈</span>
          <h3 class="intro-t">{{ locale==='zh' ? '乙女游戏分享' : 'Otome Archive' }}</h3>
          <p class="intro-d">{{ locale==='zh' ? '收录热门乙女游戏作品信息与简介，发现值得一玩的优质内容。' : 'Discover popular otome games and read introductions.' }}</p>
        </div>
        <div class="intro-card">
          <span class="intro-icon">✦</span>
          <h3 class="intro-t">{{ locale==='zh' ? '原创剧情创作' : 'Story Creation' }}</h3>
          <p class="intro-d">{{ locale==='zh' ? '提供创作工具与展示平台，支持分支叙事、多结局设计。' : 'Create stories with branching narratives and multiple endings.' }}</p>
        </div>
        <div class="intro-card">
          <span class="intro-icon">♢</span>
          <h3 class="intro-t">{{ locale==='zh' ? '玩家交流社区' : 'Community' }}</h3>
          <p class="intro-d">{{ locale==='zh' ? '温和友善的女性向交流空间，讨论剧情、分享创作。' : 'A friendly space for discussions and sharing.' }}</p>
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

    <!-- ====== RECENT ACTIVITY ====== -->
    <section class="activity reveal">
      <div class="activity-h">{{ locale==='zh' ? '最近动态' : 'Recent Activity' }}</div>
      <div class="activity-list">
        <div class="activity-item">
          <span class="activity-dot"></span>
          <span class="activity-text">{{ locale==='zh' ? '鹿饮溪 发布了新故事《月光航线》' : 'Deer Creek published "Moonlight Voyage"' }}</span>
          <span class="activity-time">2h</span>
        </div>
        <div class="activity-item">
          <span class="activity-dot"></span>
          <span class="activity-text">{{ locale==='zh' ? '青黛 在社区发起了新讨论' : 'Indigo started a new discussion' }}</span>
          <span class="activity-time">5h</span>
        </div>
        <div class="activity-item">
          <span class="activity-dot"></span>
          <span class="activity-text">{{ locale==='zh' ? '月下独白 保存了一篇草稿' : 'Monologue saved a draft' }}</span>
          <span class="activity-time">1d</span>
        </div>
        <div class="activity-item">
          <span class="activity-dot"></span>
          <span class="activity-text">{{ locale==='zh' ? '弦音 收藏了《未定事件簿》' : 'Strings favorited Tears of Themis' }}</span>
          <span class="activity-time">2d</span>
        </div>
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
.page{max-width:1000px;margin:0 auto;padding:0 24px}

/* ====== HERO ====== */
.hero{min-height:70vh;display:flex;align-items:center;justify-content:center;padding:130px 0 32px}
.hero-inner{text-align:center;max-width:700px;width:100%}
.hero-archive{display:block;font-size:11px;font-weight:400;color:var(--tm);letter-spacing:5px;margin-bottom:28px}
.hero-title{font-family:'Noto Serif SC','Playfair Display','Georgia',serif;font-size:clamp(28px,4.5vw,50px);font-weight:700;color:var(--tx);line-height:1.35;letter-spacing:4px;margin-bottom:18px;max-width:680px;margin-left:auto;margin-right:auto}
.en .hero-title{font-family:'Playfair Display','Noto Serif SC',serif}
.hero-sub{font-size:clamp(14px,1.5vw,16px);color:var(--ts);line-height:1.8;letter-spacing:.5px;max-width:440px;margin:0 auto 36px}
.hero-btn{display:inline-block;padding:13px 38px;background:var(--accent);color:var(--cw);font-size:11px;letter-spacing:3px;text-transform:uppercase;transition:all var(--tr)}.hero-btn:hover{background:var(--tx);transform:translateY(-1px);box-shadow:var(--sm)}

/* ====== STATS ====== */
.stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--bd);margin-bottom:36px}
.stat-item{background:var(--bg);padding:22px 16px;text-align:center;transition:all var(--tr)}
.stat-item:hover{background:var(--cw)}
.stat-n{display:block;font-family:'Playfair Display',serif;font-size:26px;font-weight:400;color:var(--tx);letter-spacing:1px;margin-bottom:3px}
.stat-l{font-size:11px;color:var(--tm);letter-spacing:1.5px;text-transform:uppercase}

/* ====== INTRO ====== */
.intro{padding:0 0 40px}
.intro-tag{font-size:10px;color:var(--tm);letter-spacing:3px;text-transform:uppercase;text-align:center;margin-bottom:20px}
.intro-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.intro-card{background:var(--cw);padding:28px 22px;transition:all var(--tr);text-align:center}
.intro-card:hover{box-shadow:var(--sl);transform:translateY(-2px)}
.intro-icon{font-size:18px;color:var(--accent-dim);margin-bottom:12px;display:block;opacity:.6}
.intro-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:14px;font-weight:600;color:var(--tx);letter-spacing:1px;margin-bottom:8px}
.en .intro-t{font-family:'Playfair Display','Noto Serif SC',serif}
.intro-d{font-size:12px;color:var(--ts);line-height:1.7;letter-spacing:.3px}

/* ====== ENTRY GRID ====== */
.grid-sxn{padding:0 0 48px}
.entry-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--bd)}
.entry-card{display:flex;align-items:center;gap:18px;padding:38px 32px;background:var(--bg);transition:all var(--tr)}.entry-card:hover{background:var(--cw)}
.entry-num{font-size:11px;color:var(--tm);letter-spacing:2px;flex-shrink:0;width:22px}
.entry-body{flex:1}
.entry-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:clamp(17px,1.6vw,22px);font-weight:600;color:var(--tx);letter-spacing:2px;margin-bottom:5px}
.en .entry-t{font-family:'Playfair Display','Noto Serif SC',serif}
.entry-d{font-size:12px;color:var(--ts);line-height:1.6;letter-spacing:.3px;max-width:240px}
.entry-arrow{font-size:13px;color:var(--tm);transition:all var(--tr);flex-shrink:0}.entry-card:hover .entry-arrow{color:var(--accent);transform:translateX(4px)}

/* ====== ACTIVITY ====== */
.activity{padding:0 0 40px}
.activity-h{font-size:13px;font-weight:500;color:var(--tx);letter-spacing:1px;margin-bottom:16px;padding-bottom:10px;border-bottom:1px solid var(--bd)}
.activity-list{display:flex;flex-direction:column;gap:0}
.activity-item{display:flex;align-items:center;gap:12px;padding:12px 14px;background:var(--cw);border-bottom:1px solid var(--bg2);transition:all var(--tr)}.activity-item:last-child{border-bottom:none}.activity-item:hover{background:var(--bg)}
.activity-dot{width:5px;height:5px;border-radius:50%;background:var(--accent-dim);flex-shrink:0;opacity:.5}
.activity-text{font-size:12px;color:var(--ts);flex:1;line-height:1.4}
.activity-time{font-size:10px;color:var(--tm);flex-shrink:0}

/* ====== ABOUT LINK ====== */
.about-sxn{text-align:center;padding:24px 0 100px}
.about-link{font-size:11px;color:var(--tm);letter-spacing:2px;text-transform:uppercase;border-bottom:1px solid var(--bd);padding-bottom:4px;transition:all var(--tr)}.about-link:hover{color:var(--accent);border-color:var(--accent-dim)}

@media(max-width:768px){
  .hero{min-height:auto;padding:110px 0 20px}.stats{grid-template-columns:repeat(2,1fr)}.intro-grid{grid-template-columns:1fr;gap:12px}.intro{padding:0 0 28px}.entry-grid{grid-template-columns:1fr}.entry-card{padding:30px 22px}.about-sxn{padding:16px 0 70px}.activity{padding:0 0 28px}
}
@media(max-width:640px){
  .hero{padding:90px 0 12px}.hero-archive{font-size:10px;letter-spacing:4px;margin-bottom:20px}.intro-card{padding:22px 18px}.entry-card{padding:24px 18px}.stat-n{font-size:22px}.stat-item{padding:18px 12px}
}
</style>
