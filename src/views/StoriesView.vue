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
.pg{max-width:1000px;margin:0 auto;padding:48px 24px 100px}
.pg:first-of-type{padding-top:140px}
.pg-bc{font-size:12px;color:var(--tm);margin-bottom:48px;letter-spacing:.3px}
.pg-bcl{color:var(--ts);transition:color .3s}.pg-bcl:hover{color:var(--tx)}
.pg-bs{margin:0 10px;color:var(--bd)}.pg-bcc{color:var(--tx);font-weight:500}
.pg-h{text-align:center;margin-bottom:64px}
.pg-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:clamp(24px,3vw,32px);font-weight:600;color:var(--tx);letter-spacing:2px;margin-bottom:12px}
.en .pg-t{font-family:'Playfair Display','Noto Serif SC',serif}
.pg-s{font-size:14px;color:var(--ts);letter-spacing:.5px;max-width:440px;margin:0 auto;line-height:1.8}

/* Story Cards */
.sc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--bd)}
.sc{background:var(--bg);padding:36px 28px;transition:all var(--tr);display:flex;flex-direction:column}
.sc:hover{background:var(--cw)}
.sc-im{height:160px;display:flex;align-items:flex-start;padding:20px;margin:-36px -28px 24px;position:relative}
.im-1{background:linear-gradient(135deg,#F0ECEA,var(--t))}
.im-2{background:linear-gradient(135deg,#F0ECEA,#E0D0CC)}
.im-3{background:linear-gradient(135deg,#F0ECEA,var(--p))}
.sc-tag{font-size:10px;font-weight:500;letter-spacing:1px;color:var(--ts);background:rgba(255,255,255,.8);padding:5px 14px;z-index:1}
.sc-bd{flex:1;display:flex;flex-direction:column}
.sc-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:17px;font-weight:600;color:var(--tx);letter-spacing:1px;margin-bottom:4px}
.en .sc-t{font-family:'Playfair Display','Noto Serif SC',serif}
.sc-au{font-size:12px;color:var(--tm);letter-spacing:.5px;margin-bottom:12px}
.sc-d{font-size:13px;color:var(--ts);line-height:1.7;letter-spacing:.3px;margin-bottom:18px;flex:1}
.sc-lk{font-size:12px;font-weight:400;color:var(--tm);letter-spacing:.5px;transition:all .3s;margin-top:auto}
.sc:hover .sc-lk{color:var(--tx)}

/* Game Grid */
.game-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--bd)}
.game-card{background:var(--bg);transition:all var(--tr);display:flex;flex-direction:column}
.game-card:hover{background:var(--cw)}
.game-card__img{height:200px;overflow:hidden;background:var(--bg2);display:flex;align-items:center;justify-content:center}
.game-card__img img{width:100%;height:100%;object-fit:cover;transition:opacity .4s}
.game-card:hover .game-card__img img{opacity:.9}
.game-card__bd{padding:20px 24px 24px;flex:1;display:flex;flex-direction:column}
.game-card__t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:15px;font-weight:600;color:var(--tx);letter-spacing:.8px;margin-bottom:2px}
.en .game-card__t{font-family:'Playfair Display','Noto Serif SC',serif}
.game-card__en{font-size:11px;color:var(--tm);letter-spacing:.5px;margin-bottom:10px}
.game-card__d{font-size:12px;color:var(--ts);line-height:1.7;letter-spacing:.3px;flex:1}

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
