<template>
  <div class="page">
    <!-- ====== HERO ====== -->
    <section class="hz">
      <div class="hz-inner reveal">
        <span class="hz-label">{{ t('heroBrand') }}</span>
        <h1 class="hz-title">{{ t('heroTitle') }}</h1>
        <p class="hz-sub">{{ t('heroSubtitle') }}</p>
      </div>
    </section>

    <!-- ====== ENTRY CARDS ====== -->
    <section class="entry-sxn">
      <div class="entry-grid">
        <router-link to="/stories" class="entry-card reveal reveal-delay-1">
          <div class="entry-icon">◈</div>
          <h2 class="entry-t">{{ t('navStories') }}</h2>
          <p class="entry-d">{{ t('storiesSubtitle') }}</p>
        </router-link>

        <router-link to="/creators" class="entry-card reveal reveal-delay-2">
          <div class="entry-icon">✦</div>
          <h2 class="entry-t">{{ t('navCreate') }}</h2>
          <p class="entry-d">{{ t('creatorsTagline') }}</p>
        </router-link>

        <router-link to="/ai" class="entry-card reveal reveal-delay-3">
          <div class="entry-icon">♡</div>
          <h2 class="entry-t">{{ t('navAI') }}</h2>
          <p class="entry-d">{{ t('aiSubtitle') }}</p>
        </router-link>

        <router-link to="/community" class="entry-card reveal reveal-delay-4">
          <div class="entry-icon">◉</div>
          <h2 class="entry-t">{{ t('navCommunity') }}</h2>
          <p class="entry-d">{{ t('communitySubtitle') }}</p>
        </router-link>
      </div>
    </section>

    <!-- ====== ABOUT LINK ====== -->
    <section class="about-link-sxn reveal">
      <router-link to="/about" class="about-link">{{ t('aboutLink') }}</router-link>
    </section>
  </div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
const t = inject('t')

onMounted(() => {
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); ro.unobserve(e.target) } })
  }, { threshold: 0.12 })
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el))
})
</script>

<style scoped>
.page{max-width:960px;margin:0 auto;padding:0 20px}

/* ====== HERO ====== */
.hz{min-height:80vh;display:flex;align-items:center;justify-content:center;padding:120px 0 60px}
.hz-inner{text-align:center;max-width:660px;width:100%}
.hz-label{display:inline-block;font-family:'Playfair Display',serif;font-size:12px;font-weight:400;color:var(--p2);letter-spacing:4px;text-transform:uppercase;margin-bottom:20px}
.en .hz-label{font-style:italic}
.hz-title{font-family:'Noto Serif SC','Playfair Display',serif;font-size:clamp(30px,5vw,52px);font-weight:700;color:var(--tx);line-height:1.3;letter-spacing:2px;margin-bottom:20px}
.en .hz-title{font-family:'Playfair Display','Noto Serif SC',serif}
.hz-sub{font-size:clamp(15px,2vw,18px);color:var(--ts);line-height:1.8;letter-spacing:.5px;max-width:480px;margin-left:auto;margin-right:auto}

/* ====== ENTRY CARDS ====== */
.entry-sxn{padding:20px 0 48px}
.entry-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
.entry-card{
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:48px 32px;background:var(--cw);border-radius:20px;
  transition:all var(--tr);box-shadow:var(--ss);text-align:center;
  cursor:pointer;
}
.entry-card:hover{transform:translateY(-5px);box-shadow:var(--sm)}
.entry-icon{font-size:28px;margin-bottom:16px;color:var(--p2);opacity:.7}
.entry-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:20px;font-weight:600;color:var(--tx);letter-spacing:1.5px;margin-bottom:10px}
.en .entry-t{font-family:'Playfair Display','Noto Serif SC',serif}
.entry-d{font-size:14px;color:var(--ts);line-height:1.7;letter-spacing:.3px;max-width:280px}

/* ====== ABOUT LINK ====== */
.about-link-sxn{text-align:center;padding:24px 0 100px}
.about-link{font-size:14px;color:var(--tm);letter-spacing:.5px;border-bottom:1px solid var(--bd);padding-bottom:3px;transition:all var(--tr)}
.about-link:hover{color:var(--tx);border-color:var(--p2)}

@media(max-width:768px){
  .hz{min-height:auto;padding:100px 0 40px}
  .entry-grid{grid-template-columns:1fr;gap:16px}
  .entry-card{padding:36px 24px}
  .entry-t{font-size:18px}
  .about-link-sxn{padding:16px 0 80px}
}
@media(max-width:640px){
  .hz{padding:80px 0 32px}
  .entry-sxn{padding:10px 0 32px}
  .entry-card{padding:28px 20px}
}
</style>
