<template>
  <div class="pg">
    <div class="pg-h reveal">
      <h2 class="pg-t">{{ t('communityTitle') }}</h2>
      <p class="pg-s">{{ t('communitySubtitle') }}</p>
    </div>

    <div class="bd-grid reveal-s">
      <router-link v-for="b in boards" :key="b.id" :to="'/community/'+b.id" class="bd-c">
        <div class="bd-ic" :class="'bdi-'+b.id"></div>
        <h3 class="bd-n">{{ locale==='zh'?b.zh:b.en }}</h3>
        <p class="bd-d">{{ descs[b.id]?.[locale==='zh'?'zh':'en'] || '' }}</p>
      </router-link>
    </div>

    <div class="pg-b reveal">
      <router-link to="/" class="pg-bl">&larr; {{ locale==='zh'?'返回首页':'Back Home' }}</router-link>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
import { boards } from '../stores/communityStore.js'

const t = inject('t')
const locale = inject('locale')

const descs = {
  story: { zh: '讨论你喜欢的乙女游戏剧情，分享感动与思考', en: 'Discuss otome game stories, share feelings and thoughts' },
  characters: { zh: '分享你心动的角色，聊聊那些让你难忘的瞬间', en: 'Share your beloved characters and unforgettable moments' },
  mechanics: { zh: '评测游戏系统、UI、玩法，为姐妹们排雷', en: 'Review game systems, UI, gameplay' },
  recommend: { zh: '推荐值得一玩的新作，互相安利优质乙女游戏', en: 'Recommend new otome games worth playing' },
  creation: { zh: '发布你的乙女同人创作、插画、同人小说', en: 'Share your otome fan works and illustrations' },
  feelings: { zh: '分享日常心情，这里是温暖的情感树洞', en: 'Share your daily feelings — a warm emotional haven' },
  female: { zh: '推荐真正以女性为主角、尊重女性视角的优秀作品', en: 'Recommend works that center female perspectives' },
  'anti-trope': { zh: '讨论反套路剧情、女性主义叙事、打破刻板印象', en: 'Discuss anti-trope plots, feminist narratives' },
}

onMounted(() => {
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); ro.unobserve(e.target) } })
  }, { threshold: 0.12 })
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el))
  document.querySelectorAll('.reveal-s > *').forEach(el => ro.observe(el))
})
</script>

<style scoped>
.pg{max-width:960px;margin:0 auto;padding:120px 20px 80px}
.pg-h{text-align:center;margin-bottom:56px}
.pg-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:clamp(26px,3.5vw,34px);font-weight:600;color:var(--tx);letter-spacing:1.5px;margin-bottom:14px}
.en .pg-t{font-family:'Playfair Display','Noto Serif SC',serif}
.pg-s{font-size:14px;color:var(--ts);letter-spacing:.5px;max-width:440px;margin:0 auto;line-height:1.8}
.bd-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}
.bd-c{background:var(--cw);border-radius:20px;padding:28px 20px;box-shadow:var(--ss);transition:all var(--tr);text-align:center;display:block}
.bd-c:hover{transform:translateY(-4px);box-shadow:var(--sm)}
.bd-ic{width:44px;height:44px;border-radius:50%;margin:0 auto 14px;position:relative}
.bd-ic::before{content:'';position:absolute;inset:0;border-radius:50%;opacity:.2}
.bd-ic::after{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:18px;height:18px;background:var(--tx);mask-size:contain;-webkit-mask-size:contain;mask-repeat:no-repeat;-webkit-mask-repeat:no-repeat}
.bdi-story{background:rgba(245,214,214,.25)}.bdi-story::before{background:var(--p)}.bdi-story::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20'/%3E%3Cpath d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20'/%3E%3Cpath d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z'/%3E%3C/svg%3E")}
.bdi-characters{background:rgba(232,213,232,.25)}.bdi-characters::before{background:var(--pp)}.bdi-characters::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'/%3E%3C/svg%3E")}
.bdi-mechanics{background:rgba(245,214,214,.25)}.bdi-mechanics::before{background:var(--p)}.bdi-mechanics::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Crect x='2' y='3' width='20' height='14' rx='2' ry='2'/%3E%3Cline x1='8' y1='21' x2='16' y2='21'/%3E%3Cline x1='12' y1='17' x2='12' y2='21'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Crect x='2' y='3' width='20' height='14' rx='2' ry='2'/%3E%3Cline x1='8' y1='21' x2='16' y2='21'/%3E%3Cline x1='12' y1='17' x2='12' y2='21'/%3E%3C/svg%3E")}
.bdi-recommend{background:rgba(232,213,232,.25)}.bdi-recommend::before{background:var(--pp)}.bdi-recommend::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpolygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpolygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/%3E%3C/svg%3E")}
.bdi-creation{background:rgba(245,214,214,.25)}.bdi-creation::before{background:var(--p)}.bdi-creation::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'/%3E%3Cpath d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'/%3E%3Cpath d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'/%3E%3C/svg%3E")}
.bdi-feelings{background:rgba(232,213,232,.25)}.bdi-feelings::before{background:var(--pp)}.bdi-feelings::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E")}
.bdi-female{background:rgba(245,214,214,.25)}.bdi-female::before{background:var(--p)}.bdi-female::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M12 5v14'/%3E%3Cpath d='M8 9l4-4 4 4'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M12 5v14'/%3E%3Cpath d='M8 9l4-4 4 4'/%3E%3C/svg%3E")}
.bdi-anti-trope{background:rgba(232,213,232,.25)}.bdi-anti-trope::before{background:var(--pp)}.bdi-anti-trope::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M16 8l-8 8'/%3E%3Cpath d='M8 8l8 8'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3Cpath d='M16 8l-8 8'/%3E%3Cpath d='M8 8l8 8'/%3E%3Csvg%3E")}
.bd-n{font-family:'Noto Serif SC','Playfair Display',serif;font-size:15px;font-weight:600;color:var(--tx);letter-spacing:.5px;margin-bottom:8px}
.bd-d{font-size:12px;color:var(--ts);line-height:1.6;letter-spacing:.3px}
.pg-b{text-align:center;margin-top:48px}
.pg-bl{font-size:14px;color:var(--ts);letter-spacing:.5px;transition:color .3s}
.pg-bl:hover{color:var(--tx)}
@media(max-width:968px){.bd-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){.pg{padding:100px 16px 60px}.bd-grid{grid-template-columns:1fr}.bd-c{padding:24px 18px}}
</style>
