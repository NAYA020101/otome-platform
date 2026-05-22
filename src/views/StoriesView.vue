<template>
  <div class="pg">
    <div class="pg-bc reveal">
      <router-link to="/" class="pg-bcl">{{ t('navHome') }}</router-link>
      <span class="pg-bs">/</span>
      <span class="pg-bcc">{{ t('navStories') }}</span>
    </div>

    <div class="pg-h reveal">
      <h1 class="pg-t">{{ t('storiesTitle') }}</h1>
      <p class="pg-s">{{ t('storiesSubtitle') }}</p>
    </div>

    <!-- ====== Filters ====== -->
    <div class="filters reveal">
      <button
        v-for="f in filters"
        :key="f.key"
        :class="['filter-btn', { active: activeFilter === f.key }]"
        @click="activeFilter = f.key"
      >{{ t(f.label) }}</button>
    </div>

    <!-- ====== Story Grid ====== -->
    <div class="sc-grid">
      <router-link
        v-for="(s, i) in filteredStories"
        :key="s.id"
        :to="'/stories/' + s.id"
        class="sc"
        :class="'reveal reveal-delay-' + Math.min((i % 4) + 1, 4)"
      >
        <div class="sc-im" :class="'im-' + (s.colorIdx || (i % 3) + 1)">
          <span class="sc-tag">{{ t(s.tagKey) }}</span>
        </div>
        <div class="sc-bd">
          <h3 class="sc-t">{{ t(s.titleKey) }}</h3>
          <p class="sc-au">{{ t(s.authorKey) }}</p>
          <p class="sc-d">{{ t(s.descKey) }}</p>
          <div class="sc-meta">
            <span class="sc-cat">{{ t(s.catKey) }}</span>
            <span class="sc-time">{{ t('storyUpdated') }} {{ s.updated }}</span>
          </div>
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
      <div v-for="(game, i) in games" :key="game.key" class="game-card">
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
import { inject, computed, ref, onMounted } from 'vue'
const t = inject('t')

const activeFilter = ref('all')

const filters = [
  { key: 'all', label: 'storyFilterAll' },
  { key: 'original', label: 'storyFilterOriginal' },
  { key: 'fanwork', label: 'storyFilterFanwork' },
  { key: 'romance', label: 'storyFilterRomance' },
  { key: 'fantasy', label: 'storyFilterFantasy' },
  { key: 'modern', label: 'storyFilterModern' },
  { key: 'historical', label: 'storyFilterHistorical' },
  { key: 'healing', label: 'storyFilterHealing' },
]

const allStories = [
  { id: '1', titleKey: 'storyCard1Title', authorKey: 'storyCard1Author', tagKey: 'storyCard1Tag', descKey: 'storyCard1Desc', catKey: 'storyFilterFantasy', updated: '2026.05.20', colorIdx: 1 },
  { id: '2', titleKey: 'storyCard2Title', authorKey: 'storyCard2Author', tagKey: 'storyCard2Tag', descKey: 'storyCard2Desc', catKey: 'storyFilterHealing', updated: '2026.05.18', colorIdx: 2 },
  { id: '3', titleKey: 'storyCard3Title', authorKey: 'storyCard3Author', tagKey: 'storyCard3Tag', descKey: 'storyCard3Desc', catKey: 'storyFilterHistorical', updated: '2026.05.15', colorIdx: 3 },
  { id: '4', titleKey: 'extraStory1Title', authorKey: 'extraStory1Author', tagKey: 'extraStory1Tag', descKey: 'extraStory1Desc', catKey: 'storyFilterRomance', updated: '2026.05.12', colorIdx: 1 },
  { id: '5', titleKey: 'extraStory2Title', authorKey: 'extraStory2Author', tagKey: 'extraStory2Tag', descKey: 'extraStory2Desc', catKey: 'storyFilterFantasy', updated: '2026.05.10', colorIdx: 2 },
  { id: '6', titleKey: 'extraStory3Title', authorKey: 'extraStory3Author', tagKey: 'extraStory3Tag', descKey: 'extraStory3Desc', catKey: 'storyFilterModern', updated: '2026.05.08', colorIdx: 3 },
  { id: '7', titleKey: 'extraStory4Title', authorKey: 'extraStory4Author', tagKey: 'extraStory4Tag', descKey: 'extraStory4Desc', catKey: 'storyFilterModern', updated: '2026.05.05', colorIdx: 1 },
  { id: '8', titleKey: 'extraStory5Title', authorKey: 'extraStory5Author', tagKey: 'extraStory5Tag', descKey: 'extraStory5Desc', catKey: 'storyFilterHistorical', updated: '2026.05.01', colorIdx: 2 },
]

const filterMap = {
  all: () => true,
  original: s => ['1','3','4','7'].includes(s.id),
  fanwork: s => ['2','5','6','8'].includes(s.id),
  romance: s => ['1','2','4'].includes(s.id),
  fantasy: s => ['1','5','8'].includes(s.id),
  modern: s => ['2','6','7'].includes(s.id),
  historical: s => ['3','8'].includes(s.id),
  healing: s => ['2'].includes(s.id),
}

const filteredStories = computed(() => {
  const fn = filterMap[activeFilter.value] || filterMap.all
  return allStories.filter(fn)
})

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
  }, { threshold: 0.1 })
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el))
})
</script>

<style scoped>
.pg{max-width:1000px;margin:0 auto;padding:48px 24px 100px}
.pg:first-of-type{padding-top:130px}
.pg-bc{font-size:12px;color:var(--tm);margin-bottom:40px;letter-spacing:.3px}
.pg-bcl{color:var(--ts);transition:color .3s}.pg-bcl:hover{color:var(--tx)}
.pg-bs{margin:0 10px;color:var(--bd)}.pg-bcc{color:var(--tx);font-weight:500}
.pg-h{text-align:center;margin-bottom:48px}
.pg-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:clamp(24px,3vw,32px);font-weight:600;color:var(--tx);letter-spacing:2px;margin-bottom:12px}
.en .pg-t{font-family:'Playfair Display','Noto Serif SC',serif}
.pg-s{font-size:14px;color:var(--ts);letter-spacing:.5px;max-width:440px;margin:0 auto;line-height:1.8}

/* Filters */
.filters{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:40px}
.filter-btn{padding:6px 16px;border:1px solid var(--bd);background:transparent;font-size:12px;color:var(--ts);cursor:pointer;font-family:inherit;transition:all var(--tr);letter-spacing:.3px}
.filter-btn:hover{border-color:var(--ts);color:var(--tx)}
.filter-btn.active{border-color:var(--tx);background:var(--tx);color:#fff}

/* Story Cards */
.sc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--bd)}
.sc{background:var(--bg);padding:28px 24px 24px;transition:all var(--tr);display:flex;flex-direction:column}
.sc:hover{background:var(--cw)}
.sc-im{height:130px;display:flex;align-items:flex-start;padding:14px;margin:-28px -24px 20px;position:relative}
.im-1{background:linear-gradient(135deg,#F0ECEA,var(--t))}
.im-2{background:linear-gradient(135deg,#F0ECEA,#E0D0CC)}
.im-3{background:linear-gradient(135deg,#F0ECEA,var(--p))}
.sc-tag{font-size:9px;font-weight:500;letter-spacing:1px;color:var(--ts);background:rgba(255,255,255,.8);padding:4px 12px;z-index:1}
.sc-bd{flex:1;display:flex;flex-direction:column}
.sc-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:15px;font-weight:600;color:var(--tx);letter-spacing:.8px;margin-bottom:3px}
.en .sc-t{font-family:'Playfair Display','Noto Serif SC',serif}
.sc-au{font-size:11px;color:var(--tm);letter-spacing:.3px;margin-bottom:10px}
.sc-d{font-size:12px;color:var(--ts);line-height:1.7;letter-spacing:.2px;margin-bottom:14px;flex:1}
.sc-meta{display:flex;justify-content:space-between;align-items:center;margin-top:auto;padding-top:10px;border-top:1px solid var(--bd)}
.sc-cat{font-size:10px;color:var(--tm);letter-spacing:.5px}
.sc-time{font-size:10px;color:var(--tm);letter-spacing:.3px}

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
  .sc-grid{grid-template-columns:repeat(2,1fr)}
  .game-grid{grid-template-columns:repeat(2,1fr)}
  .pg:first-of-type{padding-top:110px}
}
@media(max-width:640px){
  .sc-grid{grid-template-columns:1fr}
  .game-grid{grid-template-columns:1fr;max-width:400px;margin-left:auto;margin-right:auto}
  .game-card__img{height:180px}
  .pg{padding:32px 16px 60px}
  .filters{gap:6px;margin-bottom:28px}
  .filter-btn{padding:5px 12px;font-size:11px}
}
</style>
