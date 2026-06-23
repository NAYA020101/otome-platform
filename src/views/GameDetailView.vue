<template>
  <div class="page">
    <div class="page-inner">
      <nav class="breadcrumb wash-in">
        <router-link to="/">{{ t('navHome') }}</router-link><span class="sep"> / </span>
        <router-link to="/stories">{{ t('navStories') }}</router-link><span class="sep"> / </span>
        <span class="current">{{ t(game.titleKey) }}</span>
      </nav>
      <div v-if="game" class="game-detail">
        <div class="game-header card-handdrawn wash-in">
          <div class="game-cover" :class="{ 'no-img': !game.img }">
            <img v-if="game.img" :src="'/card/' + game.img" :alt="t(game.titleKey)" />
            <span v-else class="game-placeholder">{{ game.initials }}</span>
          </div>
          <div class="game-info">
            <div class="game-tags">
              <span class="tag-handdrawn">{{ t(game.countryKey) }}</span>
              <span class="game-rating">{{ game.rating }}</span>
            </div>
            <h1 class="game-title">{{ t(game.titleKey) }}</h1>
            <p class="game-en">{{ game.en }}</p>
            <div class="game-genres">
              <span v-for="g in game.genres" :key="g" class="tag-handdrawn">{{ g }}</span>
            </div>
            <p class="game-desc">{{ t(game.titleKey + 'Desc') }}</p>
            <p class="game-release">{{ locale==='zh' ? '发行' : 'Release' }}: {{ game.release }}</p>
          </div>
        </div>
        <div class="game-section wash-in">
          <div class="deco-rose-divider"><span>{{ locale==='zh' ? '角色' : 'Characters' }}</span></div>
          <div class="char-grid">
            <div v-for="(ch, i) in game.characters" :key="i" class="char-card card-handdrawn">
              <div class="char-avatar" :style="{ background: ch.color }">{{ ch.name[0] }}</div>
              <div class="char-info">
                <div class="char-name">{{ ch.name }}</div>
                <div class="char-role">{{ ch.role }}</div>
                <div class="char-desc">{{ ch.desc }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="game-section wash-in">
          <div class="deco-rose-divider"><span>{{ locale==='zh' ? '剧情' : 'Story' }}</span></div>
          <div class="story-paper frame-vintage">
            <p class="story-text">{{ game.story }}</p>
          </div>
        </div>
      </div>
      <div v-else class="not-found"><p>{{ locale==='zh' ? '未找到' : 'Not found' }}</p></div>
    </div>
  </div>
</template>

<script setup>
import { inject, computed, onMounted } from 'vue'
const t = inject('t'); const locale = inject('locale')
const props = defineProps({ id: String })
const allGames = {
  game1: { titleKey: 'game1', en: 'Love & Producer', img: '恋与制作.png', countryKey: 'gameCatCN', rating: '9.2', release: '2017.12', genres: ['现代','浪漫','卡牌'], story: '玩家扮演影视制作公司负责人，邂逅四位性格迥异的男性角色。', characters: [{name:'李泽言',role:'总裁',desc:'表面冷漠内心温柔',color:'#2C3E50'},{name:'白起',role:'警官',desc:'正义感强烈的精英',color:'#34495E'},{name:'许墨',role:'科学家',desc:'神秘温柔的神经科学专家',color:'#5D6D7E'},{name:'周棋洛',role:'巨星',desc:'阳光开朗的人气偶像',color:'#7F8C8D'}] },
  game2: { titleKey: 'game2', en: 'Light & Night', img: '光夜.png', countryKey: 'gameCatCN', rating: '9.0', release: '2021.06', genres: ['现代','浪漫','互动叙事'], story: '玩家以时尚设计师身份，与多位男主角相遇。', characters: [{name:'萧逸',role:'赛车手',desc:'桀骜不驯的职业赛车手',color:'#2C3E50'},{name:'陆沉',role:'CEO',desc:'优雅神秘的企业家',color:'#34495E'},{name:'齐司礼',role:'设计师',desc:'才华横溢的傲娇设计师',color:'#5D6D7E'},{name:'查理苏',role:'医生',desc:'温柔体贴的外科医生',color:'#7F8C8D'}] },
  game3: { titleKey: 'game3', en: 'Tears of Themis', img: '未定.png', countryKey: 'gameCatCN', rating: '8.8', release: '2020.07', genres: ['律政','推理','浪漫'], story: '玩家扮演律师，在调查案件中与男主角们追寻真相。', characters: [{name:'左然',role:'律师',desc:'冷静专业的王牌律师',color:'#2C3E50'},{name:'陆景和',role:'艺术生',desc:'自由奔放的艺术系学生',color:'#34495E'},{name:'夏彦',role:'侦探',desc:'敏锐温柔的私家侦探',color:'#5D6D7E'},{name:'莫弈',role:'教授',desc:'神秘迷人的心理学教授',color:'#7F8C8D'}] },
  game4: { titleKey: 'game4', en: 'Lovebrush Chronicles', img: '时空.png', countryKey: 'gameCatCN', rating: '8.7', release: '2020.10', genres: ['奇幻','平行宇宙','浪漫'], story: '美术学生意外穿越异世界，用绘画改变命运。', characters: [{name:'艾因',role:'王子',desc:'冷傲孤独的王子',color:'#2C3E50'},{name:'罗夏',role:'商人',desc:'精明热情的大商人',color:'#34495E'},{name:'司岚',role:'学者',desc:'理性睿智的大学者',color:'#5D6D7E'},{name:'叶瑄',role:'导师',desc:'温柔疏离的神秘导师',color:'#7F8C8D'}] }
}
const game = computed(() => allGames[props.id] || null)
onMounted(() => { const ro = new IntersectionObserver(entries => { entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('wash-in'); ro.unobserve(e.target) } }) }, { threshold: .1 }); document.querySelectorAll('.wash-in').forEach(el => ro.observe(el)) })
</script>

<style scoped>
.game-header{display:grid;grid-template-columns:260px 1fr;gap:28px;padding:24px;margin-bottom:40px}
.game-cover{height:340px;overflow:hidden;background:var(--paper-dim);display:flex;align-items:center;justify-content:center}
.game-cover img{width:100%;height:100%;object-fit:cover}
.game-title{font-size:clamp(20px,2.5vw,26px);font-weight:400;letter-spacing:2px;margin-bottom:4px}
.game-en{font-size:13px;font-style:italic;color:var(--ink-dim)}
.game-genres{display:flex;gap:6px;margin:12px 0;flex-wrap:wrap}
.game-desc{font-size:13px;color:var(--ink-light);line-height:1.8;margin-bottom:12px}
.game-section{margin-bottom:36px}
.char-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.char-card{display:flex;gap:14px;padding:18px}
.char-avatar{width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:16px;color:rgba(255,255,255,.85);flex-shrink:0}
.char-name{font-size:14px;font-weight:400;letter-spacing:.5px;margin-bottom:2px}
.char-role{font-size:11px;font-style:italic;color:var(--ink-dim);margin-bottom:4px}
.char-desc{font-size:12px;color:var(--ink-light)}
.story-paper{padding:28px 24px}
.story-text{font-size:14px;color:var(--ink-light);line-height:2}
@media(max-width:768px){
  .game-header{grid-template-columns:1fr}
  .game-cover{height:220px}
  .char-grid{grid-template-columns:1fr}
}
</style>
