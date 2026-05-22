<template>
  <div class="pg">
    <div class="pg-bc reveal">
      <router-link to="/" class="pg-bcl">{{ t('navHome') }}</router-link>
      <span class="pg-bs">/</span>
      <router-link to="/stories" class="pg-bcl">{{ t('navStories') }}</router-link>
      <span class="pg-bs">/</span>
      <span class="pg-bcc">{{ t(game.titleKey) }}</span>
    </div>

    <div v-if="game" class="game-detail">
      <!-- Header -->
      <div class="gd-header reveal">
        <div class="gd-cover" :class="{ 'no-img': !game.img }" :style="game.img ? '' : 'background:'+game.bg">
          <img v-if="game.img" :src="'/card/' + game.img" :alt="t(game.titleKey)" />
          <span v-else class="gd-placeholder">{{ game.initials }}</span>
        </div>
        <div class="gd-info">
          <div class="gd-tags">
            <span class="gd-country">{{ t(game.countryKey) }}</span>
            <span class="gd-rating">★ {{ game.rating }}</span>
          </div>
          <h1 class="gd-title">{{ t(game.titleKey) }}</h1>
          <p class="gd-en">{{ game.en }}</p>
          <div class="gd-genres">
            <span v-for="g in game.genres" :key="g" class="gd-genre">{{ g }}</span>
          </div>
          <p class="gd-desc">{{ t(game.titleKey + 'Desc') }}</p>
          <p class="gd-release">{{ locale==='zh' ? '发行时间' : 'Release' }}: {{ game.release }}</p>
        </div>
      </div>

      <!-- Characters -->
      <div class="gd-section reveal">
        <h2 class="gd-section-t">{{ locale==='zh' ? '角色介绍' : 'Characters' }}</h2>
        <div class="gd-chars">
          <div v-for="(ch, i) in game.characters" :key="i" class="gd-char">
            <div class="gd-char-avatar" :style="{ background: ch.color }">{{ ch.name[0] }}</div>
            <div class="gd-char-info">
              <div class="gd-char-name">{{ ch.name }}</div>
              <div class="gd-char-role">{{ ch.role }}</div>
              <div class="gd-char-desc">{{ ch.desc }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Story -->
      <div class="gd-section reveal">
        <h2 class="gd-section-t">{{ locale==='zh' ? '剧情简介' : 'Story' }}</h2>
        <p class="gd-story">{{ game.story }}</p>
      </div>
    </div>

    <div v-else class="gd-notfound">
      <p>{{ locale==='zh' ? '未找到该游戏' : 'Game not found' }}</p>
    </div>
  </div>
</template>

<script setup>
import { inject, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const t = inject('t')
const locale = inject('locale')

const props = defineProps({ id: String })
const router = useRouter()

const allGames = {
  'game1': { titleKey: 'game1', en: 'Love & Producer', img: '恋与制作.png', countryKey: 'gameCatCN', rating: '9.2', release: '2017.12', genres: ['现代', '浪漫', '卡牌'], story: '玩家扮演一名影视制作公司的年轻负责人，在追逐梦想的过程中邂逅四位性格迥异的男性角色。游戏以精美的Live2D立绘、全程配音和沉浸式剧情著称，是中国乙女游戏的里程碑之作。',
    characters: [
      { name: '李泽言', role: '霸道总裁', desc: '华锐总裁，表面冷漠内心温柔', color: '#2C3E50' },
      { name: '白起', role: '特遣署警官', desc: '正义感强烈的特遣署精英', color: '#34495E' },
      { name: '许墨', role: '天才科学家', desc: '神秘而温柔的神经科学专家', color: '#5D6D7E' },
      { name: '周棋洛', role: '超级巨星', desc: '阳光开朗的人气偶像', color: '#7F8C8D' },
    ]
  },
  'game2': { titleKey: 'game2', en: 'Light & Night', img: '光夜.png', countryKey: 'gameCatCN', rating: '9.0', release: '2021.06', genres: ['现代', '浪漫', '互动叙事'], story: '玩家以一名刚刚进入时尚行业的设计师身份，在职场与生活中与多位性格各异的男主角相遇。游戏以电影级画面表现、豪华声优阵容和深刻剧情选择著称。',
    characters: [
      { name: '萧逸', role: '赛车手', desc: '桀骜不驯的职业赛车手', color: '#2C3E50' },
      { name: '陆沉', role: 'CEO', desc: '优雅而深不可测的企业家', color: '#34495E' },
      { name: '齐司礼', role: '设计师', desc: '才华横溢的傲娇设计师', color: '#5D6D7E' },
      { name: '查理苏', role: '医生', desc: '温柔体贴的心外科医生', color: '#7F8C8D' },
    ]
  },
  'game3': { titleKey: 'game3', en: 'Tears of Themis', img: '未定.png', countryKey: 'gameCatCN', rating: '8.8', release: '2020.07', genres: ['律政', '推理', '浪漫'], story: '玩家扮演一名初出茅庐的律师，在调查案件的过程中与四位男主角携手追寻真相。游戏将法庭辩论、线索搜集与角色养成巧妙融合。',
    characters: [
      { name: '左然', role: '资深律师', desc: '冷静专业的王牌律师', color: '#2C3E50' },
      { name: '陆景和', role: '艺术生', desc: '自由奔放的艺术系学生', color: '#34495E' },
      { name: '夏彦', role: '侦探', desc: '敏锐而温柔的私家侦探', color: '#5D6D7E' },
      { name: '莫弈', role: '心理学教授', desc: '神秘迷人的心理学教授', color: '#7F8C8D' },
    ]
  },
  'game4': { titleKey: 'game4', en: 'Lovebrush Chronicles', img: '时空.png', countryKey: 'gameCatCN', rating: '8.7', release: '2020.10', genres: ['奇幻', '平行宇宙', '浪漫'], story: '玩家是一名美术学院学生，意外穿越到异世界，运用绘画能力改变命运。游戏以其精美的美术风格和多世界线叙事广受好评。',
    characters: [
      { name: '艾因', role: '王子', desc: '冷傲而孤独的王子', color: '#2C3E50' },
      { name: '罗夏', role: '商人', desc: '精明而热情的大商人', color: '#34495E' },
      { name: '司岚', role: '学者', desc: '理性睿智的大学者', color: '#5D6D7E' },
      { name: '叶瑄', role: '导师', desc: '温柔而疏离的神秘导师', color: '#7F8C8D' },
    ]
  },
}

const game = computed(() => {
  const g = allGames[props.id]
  if (!g) return null
  return g
})

onMounted(() => {
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); ro.unobserve(e.target) } })
  }, { threshold: 0.1 })
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el))
})
</script>

<style scoped>
.pg{max-width:900px;margin:0 auto;padding:110px 24px 80px}
.pg-bc{font-size:12px;color:var(--tm);margin-bottom:36px;letter-spacing:.3px}
.pg-bcl{color:var(--ts);transition:color .3s}.pg-bcl:hover{color:var(--tx)}
.pg-bs{margin:0 10px;color:var(--bd)}.pg-bcc{color:var(--tx);font-weight:500}

.gd-header{display:grid;grid-template-columns:280px 1fr;gap:32px;margin-bottom:48px}
.gd-cover{height:360px;overflow:hidden;background:var(--bg2);display:flex;align-items:center;justify-content:center}
.gd-cover img{width:100%;height:100%;object-fit:cover}
.gd-cover.no-img{display:flex;align-items:center;justify-content:center}
.gd-placeholder{font-size:48px;font-weight:700;color:rgba(255,255,255,.15)}
.gd-tags{display:flex;gap:10px;margin-bottom:14px;flex-wrap:wrap}
.gd-country{font-size:10px;padding:4px 12px;background:var(--t);color:var(--ts);letter-spacing:.5px}
.gd-rating{font-size:12px;color:var(--accent);letter-spacing:.5px}
.gd-title{font-family:'Noto Serif SC','Playfair Display',serif;font-size:clamp(22px,3vw,28px);font-weight:700;color:var(--tx);letter-spacing:2px;margin-bottom:4px}
.gd-en{font-size:13px;color:var(--tm);letter-spacing:.5px;margin-bottom:14px}
.gd-genres{display:flex;gap:6px;margin-bottom:16px;flex-wrap:wrap}
.gd-genre{font-size:10px;padding:3px 10px;background:var(--bg2);color:var(--ts);letter-spacing:.5px}
.gd-desc{font-size:13px;color:var(--ts);line-height:1.8;letter-spacing:.3px;margin-bottom:16px}
.gd-release{font-size:11px;color:var(--tm);letter-spacing:.5px}

.gd-section{margin-bottom:40px}
.gd-section-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:16px;font-weight:600;color:var(--tx);letter-spacing:1.5px;padding-bottom:10px;border-bottom:1px solid var(--bd);margin-bottom:20px}

.gd-chars{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}
.gd-char{display:flex;gap:14px;padding:16px;background:var(--cw);border:1px solid var(--bd);transition:all var(--tr)}
.gd-char:hover{box-shadow:var(--sm);transform:translateY(-1px)}
.gd-char-avatar{width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:600;color:rgba(255,255,255,.85);flex-shrink:0}
.gd-char-info{flex:1}
.gd-char-name{font-size:14px;font-weight:600;color:var(--tx);letter-spacing:.5px;margin-bottom:2px}
.gd-char-role{font-size:11px;color:var(--tm);letter-spacing:.3px;margin-bottom:4px}
.gd-char-desc{font-size:12px;color:var(--ts);line-height:1.5;letter-spacing:.3px}

.gd-story{font-size:14px;color:var(--ts);line-height:2;letter-spacing:.5px}
.gd-notfound{text-align:center;padding:60px;color:var(--tm);font-size:14px}

@media(max-width:768px){
  .gd-header{grid-template-columns:1fr;gap:20px}
  .gd-cover{height:240px}
  .gd-chars{grid-template-columns:1fr}
  .pg{padding:90px 16px 60px}
}
</style>
