<template>
  <div class="pg">
    <!-- Breadcrumb -->
    <div class="pg-bc reveal">
      <router-link to="/" class="pg-bcl">{{ t('navHome') }}</router-link>
      <span class="pg-bs">/</span>
      <span class="pg-bcc">{{ t('navStories') }}</span>
    </div>

    <div class="pg-h reveal">
      <h1 class="pg-t">{{ t('storiesTitle') }}</h1>
      <p class="pg-s">{{ t('storiesSubtitle') }}</p>
    </div>

    <!-- ====== ORIGINAL STORY CARDS ====== -->
    <div class="sc-grid reveal-s">
      <router-link v-for="(s,i) in [{k:'storyCard1',id:'1'},{k:'storyCard2',id:'2'},{k:'storyCard3',id:'3'}]" :key="s.k" :to="'/stories/'+s.id" class="sc">
        <div class="sc-im" :class="'im-'+(i+1)"><span class="sc-tag">{{ t(s.k+'Tag') }}</span></div>
        <div class="sc-bd">
          <h3 class="sc-t">{{ t(s.k+'Title') }}</h3>
          <p class="sc-au">{{ t(s.k+'Author') }}</p>
          <p class="sc-d">{{ t(s.k+'Desc') }}</p>
          <span class="sc-lk">{{ t('storyMore') }}</span>
        </div>
      </router-link>
    </div>
  </div>

  <!-- ====== POPULAR OTOME GAMES ====== -->
  <div class="pg">
    <div class="pg-h reveal">
      <h2 class="pg-t">{{ t('gameTitle') }}</h2>
      <p class="pg-s">{{ t('gameSubtitle') }}</p>
    </div>

    <div class="game-grid">
      <div v-for="(game, i) in games" :key="game.key" class="game-card reveal-s">
        <div class="game-card__img">
          <img :src="'/card/' + game.img" :alt="t(game.key)" />
        </div>
        <div class="game-card__bd">
          <h3 class="game-card__t">{{ t(game.key) }}</h3>
          <p class="game-card__en">{{ game.en }}</p>
          <p class="game-card__d">{{ t(game.key + 'Desc') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
const t = inject('t')

const games = [
  { key: 'game1', en: 'Love & Producer', img: '恋与制作.png' },
  { key: 'game2', en: 'Light & Night', img: '光夜.png' },
  { key: 'game3', en: 'Tears of Themis', img: '未定.png' },
  { key: 'game4', en: 'Lovebrush Chronicles', img: '时空.png' },
  { key: 'game5', en: 'Love & Deepspace', img: '恋与.png' },
  { key: 'game6', en: 'Beyond the World', img: '世界.png' },
]

onMounted(() => {
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); ro.unobserve(e.target) } })
  }, { threshold: 0.12 })
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el))
  document.querySelectorAll('.reveal-s > *').forEach(el => ro.observe(el))
})
</script>

<style scoped>
.pg{max-width:960px;margin:0 auto;padding:40px 20px 80px}
.pg:first-of-type{padding-top:120px}
.pg-bc{font-size:13px;color:var(--tm);margin-bottom:36px;letter-spacing:.3px}
.pg-bcl{color:var(--ts);transition:color .3s}.pg-bcl:hover{color:var(--tx)}
.pg-bs{margin:0 10px;color:var(--bd)}.pg-bcc{color:var(--tx);font-weight:500}
.pg-h{text-align:center;margin-bottom:56px}
.pg-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:clamp(26px,3.5vw,34px);font-weight:600;color:var(--tx);letter-spacing:1.5px;margin-bottom:14px}
.en .pg-t{font-family:'Playfair Display','Noto Serif SC',serif}
.pg-s{font-size:14px;color:var(--ts);letter-spacing:.5px;max-width:440px;margin:0 auto;line-height:1.8}

/* Story Cards */
.sc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.sc{background:var(--cw);border-radius:20px;overflow:hidden;transition:all var(--tr);box-shadow:var(--ss);cursor:pointer}
.sc:hover{transform:translateY(-5px);box-shadow:var(--sm)}
.sc-im{height:180px;display:flex;align-items:flex-start;padding:18px;position:relative}
.im-1{background:linear-gradient(135deg,#FDE8E8,var(--p))}
.im-2{background:linear-gradient(135deg,#FCE8F0,var(--pp))}
.im-3{background:linear-gradient(135deg,#FDE8DC,#F5D6D6)}
.sc-tag{font-size:11px;font-weight:500;letter-spacing:.8px;color:var(--ts);background:rgba(255,255,255,.75);backdrop-filter:blur(4px);padding:5px 14px;border-radius:20px;z-index:1}
.sc-bd{padding:22px 24px 24px}
.sc-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:18px;font-weight:600;color:var(--tx);letter-spacing:1px;margin-bottom:4px}
.en .sc-t{font-family:'Playfair Display','Noto Serif SC',serif}
.sc-au{font-size:13px;color:var(--tm);letter-spacing:.5px;margin-bottom:12px}
.sc-d{font-size:14px;color:var(--ts);line-height:1.7;letter-spacing:.3px;margin-bottom:18px}
.sc-lk{font-size:13px;font-weight:500;color:var(--tx);letter-spacing:.5px;transition:all .3s}
.sc-lk:hover{color:var(--p2);letter-spacing:1.5px}

/* Game Grid */
.game-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.game-card{background:var(--cw);border-radius:16px;overflow:hidden;transition:all var(--tr);box-shadow:var(--ss)}
.game-card:hover{transform:translateY(-4px);box-shadow:var(--sm)}
.game-card__img{height:200px;overflow:hidden;background:var(--bg2);display:flex;align-items:center;justify-content:center}
.game-card__img img{width:100%;height:100%;object-fit:cover}
.game-card__bd{padding:16px 18px 20px}
.game-card__t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:16px;font-weight:600;color:var(--tx);letter-spacing:.8px;margin-bottom:2px}
.en .game-card__t{font-family:'Playfair Display','Noto Serif SC',serif}
.game-card__en{font-size:11px;color:var(--tm);letter-spacing:.5px;margin-bottom:8px}
.game-card__d{font-size:13px;color:var(--ts);line-height:1.7;letter-spacing:.3px}

@media(max-width:968px){
  .sc-grid{grid-template-columns:1fr;gap:20px}
  .game-grid{grid-template-columns:repeat(2,1fr);gap:20px}
  .pg:first-of-type{padding-top:100px}
}
@media(max-width:640px){
  .game-grid{grid-template-columns:1fr;max-width:400px;margin-left:auto;margin-right:auto}
  .game-card__img{height:180px}
  .pg{padding:24px 16px 60px}
  .sc-im{height:150px}
}
</style>
