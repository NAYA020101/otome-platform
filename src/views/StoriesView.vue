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

    <!-- Genre Filters -->
    <div class="filters reveal">
      <button v-for="f in filters" :key="f.key"
        :class="['filter-btn', { active: activeFilter === f.key }]"
        @click="activeFilter = f.key">{{ t(f.label) }}</button>
    </div>

    <!-- Mood Filters -->
    <div class="mood-filters reveal">
      <span class="mood-label">{{ locale==='zh' ? '情绪' : 'Mood' }}</span>
      <button v-for="m in moodFilters" :key="m.key"
        :class="['mood-btn', { active: activeMood === m.key }]"
        @click="activeMood = m.key">{{ t(m.label) }}</button>
    </div>

    <!-- Story Grid -->
    <div class="sc-grid">
      <router-link v-for="(s, i) in filteredStories" :key="s.id"
        :to="'/stories/' + s.id" class="sc">
        <div class="sc-im" :class="'im-' + (s.colorIdx || (i % 3) + 1)">
          <span class="sc-tag">{{ t(s.tagKey) }}</span>
        </div>
        <div class="sc-bd">
          <h3 class="sc-t">{{ t(s.titleKey) }}</h3>
          <p class="sc-au">{{ t(s.authorKey) }}</p>
          <p class="sc-d">{{ t(s.descKey) }}</p>
          <div class="sc-mood">
            <span v-for="mk in s.moods" :key="mk" class="sc-mood-tag">{{ t(mk) }}</span>
          </div>
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

    <div class="game-tabs reveal">
      <button v-for="ct in countryTabs" :key="ct.key"
        :class="['game-tab', { active: activeCountry === ct.key }]"
        @click="activeCountry = ct.key">{{ t(ct.label) }}</button>
    </div>

    <div class="game-grid">
      <div v-for="game in filteredGames" :key="game.key" class="game-card">
        <div class="game-card__img" :class="{ 'no-img': !game.img }" :style="game.img ? '' : 'background:'+game.bg">
          <img v-if="game.img" :src="'/card/' + game.img" :alt="t(game.key)" />
          <span v-else class="game-card__placeholder">{{ game.initials }}</span>
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
const locale = inject('locale')

const activeFilter = ref('all')
const activeMood = ref('all')

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

const moodFilters = [
  { key: 'all', label: 'moodAll' },
  { key: 'moodLonging', label: 'moodLonging' },
  { key: 'moodObsession', label: 'moodObsession' },
  { key: 'moodTragedy', label: 'moodTragedy' },
  { key: 'moodComfort', label: 'moodComfort' },
  { key: 'moodDanger', label: 'moodDanger' },
  { key: 'moodNostalgia', label: 'moodNostalgia' },
  { key: 'moodMelancholy', label: 'moodMelancholy' },
  { key: 'moodIntimacy', label: 'moodIntimacy' },
  { key: 'moodYearning', label: 'moodYearning' },
]

const allStories = [
  { id: '1', titleKey: 'storyCard1Title', authorKey: 'storyCard1Author', tagKey: 'storyCard1Tag', descKey: 'storyCard1Desc', catKey: 'storyFilterFantasy', updated: '2026.05.20', colorIdx: 1, moods: ['moodLonging','moodDanger'] },
  { id: '2', titleKey: 'storyCard2Title', authorKey: 'storyCard2Author', tagKey: 'storyCard2Tag', descKey: 'storyCard2Desc', catKey: 'storyFilterHealing', updated: '2026.05.18', colorIdx: 2, moods: ['moodComfort','moodIntimacy'] },
  { id: '3', titleKey: 'storyCard3Title', authorKey: 'storyCard3Author', tagKey: 'storyCard3Tag', descKey: 'storyCard3Desc', catKey: 'storyFilterHistorical', updated: '2026.05.15', colorIdx: 3, moods: ['moodObsession','moodYearning'] },
  { id: '4', titleKey: 'extraStory1Title', authorKey: 'extraStory1Author', tagKey: 'extraStory1Tag', descKey: 'extraStory1Desc', catKey: 'storyFilterRomance', updated: '2026.05.12', colorIdx: 1, moods: ['moodYearning','moodNostalgia'] },
  { id: '5', titleKey: 'extraStory2Title', authorKey: 'extraStory2Author', tagKey: 'extraStory2Tag', descKey: 'extraStory2Desc', catKey: 'storyFilterFantasy', updated: '2026.05.10', colorIdx: 2, moods: ['moodLonging','moodMelancholy'] },
  { id: '6', titleKey: 'extraStory3Title', authorKey: 'extraStory3Author', tagKey: 'extraStory3Tag', descKey: 'extraStory3Desc', catKey: 'storyFilterModern', updated: '2026.05.08', colorIdx: 3, moods: ['moodNostalgia','moodComfort'] },
  { id: '7', titleKey: 'extraStory4Title', authorKey: 'extraStory4Author', tagKey: 'extraStory4Tag', descKey: 'extraStory4Desc', catKey: 'storyFilterModern', updated: '2026.05.05', colorIdx: 1, moods: ['moodMelancholy','moodIntimacy'] },
  { id: '8', titleKey: 'extraStory5Title', authorKey: 'extraStory5Author', tagKey: 'extraStory5Tag', descKey: 'extraStory5Desc', catKey: 'storyFilterHistorical', updated: '2026.05.01', colorIdx: 2, moods: ['moodTragedy','moodObsession'] },
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
  let stories = allStories.filter(filterMap[activeFilter.value] || filterMap.all)
  if (activeMood.value !== 'all') {
    stories = stories.filter(s => s.moods.includes(activeMood.value))
  }
  return stories
})

const activeCountry = ref('cn')

const countryTabs = [
  { key: 'cn', label: 'gameCatCN' },
  { key: 'jp', label: 'gameCatJP' },
  { key: 'kr', label: 'gameCatKR' },
  { key: 'en', label: 'gameCatEN' },
]

const gamesByCountry = {
  cn: [
    { key: 'game1', en: 'Love & Producer', img: '恋与制作.png' },
    { key: 'game2', en: 'Light & Night', img: '光夜.png' },
    { key: 'game3', en: 'Tears of Themis', img: '未定.png' },
    { key: 'game4', en: 'Lovebrush Chronicles', img: '时空.png' },
    { key: 'game5', en: 'Love & Deepspace', img: '恋与.png' },
    { key: 'game6', en: 'Beyond the World', img: '世界.png' },
  ],
  jp: [
    { key: 'gameJP1', en: 'Hakuoki', bg: 'linear-gradient(135deg,#2C1810,#4A2820)', initials: '薄' },
    { key: 'gameJP2', en: 'DIABOLIK LOVERS', bg: 'linear-gradient(135deg,#1A0A0A,#2D0D0D)', initials: 'DL' },
    { key: 'gameJP3', en: 'Ken ga Kimi', bg: 'linear-gradient(135deg,#1A2A1A,#2A3A2A)', initials: '剣' },
  ],
  kr: [
    { key: 'gameKR1', en: 'Mystic Messenger', bg: 'linear-gradient(135deg,#1A1A2E,#2A2A4E)', initials: 'MM' },
    { key: 'gameKR2', en: 'THE SSUM', bg: 'linear-gradient(135deg,#2E1A2E,#4E2A4E)', initials: 'SS' },
    { key: 'gameKR3', en: 'Obey Me!', bg: 'linear-gradient(135deg,#1A0A1A,#2D0D2D)', initials: 'OM' },
  ],
  en: [
    { key: 'gameEN1', en: 'Choices: Stories You Play', bg: 'linear-gradient(135deg,#0A1A2E,#0D2D4E)', initials: 'CH' },
    { key: 'gameEN2', en: 'Episode', bg: 'linear-gradient(135deg,#2E1A0A,#4E2D0D)', initials: 'EP' },
    { key: 'gameEN3', en: 'Love Island', bg: 'linear-gradient(135deg,#0A2E1A,#0D4E2D)', initials: 'LI' },
  ],
}

const filteredGames = computed(() => gamesByCountry[activeCountry.value] || gamesByCountry.cn)

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

/* Genre Filters */
.filters{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:16px}
.filter-btn{padding:6px 16px;border:1px solid var(--bd);background:transparent;font-size:12px;color:var(--ts);cursor:pointer;font-family:inherit;transition:all var(--tr);letter-spacing:.3px}
.filter-btn:hover{border-color:var(--ts);color:var(--tx)}
.filter-btn.active{border-color:var(--accent);background:transparent;color:var(--accent)}

/* Mood Filters */
.mood-filters{display:flex;flex-wrap:wrap;gap:6px;justify-content:center;margin-bottom:36px;align-items:center}
.mood-label{font-size:10px;color:var(--tm);letter-spacing:2px;text-transform:uppercase;margin-right:8px}
.mood-btn{padding:4px 14px;border:none;background:var(--bg2);font-size:11px;color:var(--ts);cursor:pointer;font-family:inherit;transition:all var(--tr);letter-spacing:.5px}
.mood-btn:hover{background:var(--t);color:var(--tx)}
.mood-btn.active{background:var(--accent);color:var(--cw)}

/* Story Cards */
.sc-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--bd)}
.sc{background:var(--bg);padding:28px 24px 24px;transition:all var(--tr);display:flex;flex-direction:column}
.sc:hover{background:var(--cw)}
.sc-im{height:130px;display:flex;align-items:flex-start;padding:14px;margin:-28px -24px 20px;position:relative}
.im-1{background:linear-gradient(135deg,var(--bg2),var(--t))}
.im-2{background:linear-gradient(135deg,var(--bg2),var(--pp))}
.im-3{background:linear-gradient(135deg,var(--bg2),var(--p))}
.sc-tag{font-size:9px;font-weight:500;letter-spacing:1px;color:var(--ts);background:rgba(255,255,255,.8);padding:4px 12px}
.sc-bd{flex:1;display:flex;flex-direction:column}
.sc-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:15px;font-weight:600;color:var(--tx);letter-spacing:.8px;margin-bottom:3px}
.en .sc-t{font-family:'Playfair Display','Noto Serif SC',serif}
.sc-au{font-size:11px;color:var(--tm);letter-spacing:.3px;margin-bottom:10px}
.sc-d{font-size:12px;color:var(--ts);line-height:1.7;letter-spacing:.2px;margin-bottom:12px;flex:1}
.sc-mood{display:flex;flex-wrap:wrap;gap:4px;margin-bottom:10px}
.sc-mood-tag{font-size:9px;padding:2px 8px;background:var(--bg2);color:var(--tm);letter-spacing:.5px}
.sc-meta{display:flex;justify-content:space-between;align-items:center;margin-top:auto;padding-top:10px;border-top:1px solid var(--bd)}
.sc-cat{font-size:10px;color:var(--tm);letter-spacing:.5px}
.sc-time{font-size:10px;color:var(--tm);letter-spacing:.3px}

/* Game Grid */
.game-tabs{display:flex;gap:8px;justify-content:center;margin-bottom:32px;flex-wrap:wrap}
.game-tab{padding:6px 20px;border:1px solid var(--bd);background:transparent;font-size:12px;color:var(--ts);cursor:pointer;font-family:inherit;transition:all var(--tr);letter-spacing:.5px}
.game-tab:hover{border-color:var(--ts);color:var(--tx)}
.game-tab.active{border-color:var(--accent);color:var(--accent)}
.game-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--bd)}
.game-card{background:var(--bg);transition:all var(--tr);display:flex;flex-direction:column}
.game-card:hover{background:var(--cw)}
.game-card__img{height:200px;overflow:hidden;background:var(--bg2);display:flex;align-items:center;justify-content:center}
.game-card__img img{width:100%;height:100%;object-fit:cover;transition:opacity .4s}
.game-card:hover .game-card__img img{opacity:.85}
.game-card__img.no-img{display:flex;align-items:center;justify-content:center}
.game-card__placeholder{font-size:36px;font-weight:700;color:rgba(255,255,255,.15);font-family:'Inter',sans-serif;letter-spacing:2px}
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
  .game-grid{grid-template-columns:1fr;max-width:400px;margin:0 auto}
  .pg{padding:32px 16px 60px}
  .mood-filters{gap:4px}
  .mood-btn{padding:3px 10px;font-size:10px}
  .filter-btn{padding:5px 12px;font-size:11px}
}
</style>
