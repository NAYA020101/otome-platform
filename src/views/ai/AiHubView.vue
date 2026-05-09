<template>
  <div class="pg">
    <div class="pg-bc"><span class="pg-bcc">{{ locale==='zh'?'AI 叙事陪伴':'AI Narrative Companion' }}</span></div>

    <div class="pg-h">
      <span class="ah-badge">AI · {{ locale==='zh'?'她叙':'Her Tale' }}</span>
      <h1 class="pg-t">{{ locale==='zh'?'AI 叙事陪伴':'AI Narrative Companion' }}</h1>
      <p class="pg-s">{{ locale==='zh'?'在温柔对话中发现自己，在叙事创造中找到力量。AI 不是替代你写作，而是陪你一起，书写属于你的故事。':'Discover yourself in gentle conversations, find strength in narrative creation. AI writes with you, not for you.' }}</p>
    </div>

    <div class="ah-grid reveal-s">
      <router-link v-for="m in modules" :key="m.id" :to="'/ai/'+m.id" class="ah-c">
        <div class="ah-ci" :class="'ahc-'+m.id"></div>
        <h3 class="ah-n">{{ locale==='zh'?m.zh:m.en }}</h3>
        <p class="ah-d">{{ locale==='zh'?m.dZh:m.dEn }}</p>
      </router-link>
    </div>

    <div class="pg-b">
      <p class="ah-p">{{ locale==='zh'?'💜 你的每一次对话、每一段创作，仅保存在你的设备本地。你的故事，只属于你。':'💜 Every conversation stays only on your device. Your stories belong only to you.' }}</p>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
const locale = inject('locale')
const modules = [
  { id:'emotion', zh:'情绪倾听', en:'Emotional Listening', dZh:'AI以温柔的姿态倾听你的每一种情绪，陪你梳理内心的声音', dEn:'AI listens gently to every emotion, helping you find clarity' },
  { id:'workshop', zh:'剧情共创工坊', en:'Story Workshop', dZh:'与AI一起打磨故事情节、润色对白、反套路改写', dEn:'Polish plots, refine dialogue, and rewrite tropes with AI' },
  { id:'character', zh:'角色互动', en:'Character Interaction', dZh:'与AI扮演的独立角色深度对话，探索专属叙事线', dEn:'Deep conversations with AI characters, exploring unique storylines' },
  { id:'healing', zh:'遗憾改写', en:'Healing Rewrite', dZh:'让AI帮你改写那些遗憾的结局，给故事一个温柔的救赎', dEn:'Let AI rewrite regrettable endings with gentle redemption' },
  { id:'inspiration', zh:'灵感生成', en:'Inspiration Generator', dZh:'一键获取剧情设定、角色构想、情节反转的叙事灵感', dEn:'One-click narrative inspiration: premises, characters, twists' },
]
onMounted(() => {
  const ro = new IntersectionObserver(e => { e.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in-view'); ro.unobserve(x.target) } }) }, { threshold: .12 })
  document.querySelectorAll('.reveal-s > *').forEach(el => ro.observe(el))
})
</script>

<style scoped>
.pg{max-width:960px;margin:0 auto;padding:120px 20px 80px}
.pg-bc{font-size:13px;color:var(--tm);margin-bottom:36px;letter-spacing:.3px}
.pg-bcc{color:var(--tx);font-weight:500}
.pg-h{text-align:center;margin-bottom:56px}
.pg-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:clamp(26px,3.5vw,34px);font-weight:600;color:var(--tx);letter-spacing:1.5px;margin-bottom:14px}
.en .pg-t{font-family:'Playfair Display','Noto Serif SC',serif}
.pg-s{font-size:14px;color:var(--ts);letter-spacing:.5px;max-width:500px;margin:0 auto;line-height:1.8}
.ah-badge{display:inline-block;font-family:'Playfair Display',serif;font-size:12px;color:var(--p2);letter-spacing:4px;margin-bottom:14px;text-transform:uppercase}
.ah-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-bottom:48px}
.ah-c{background:var(--cw);border-radius:20px;padding:36px 24px;box-shadow:var(--ss);transition:all var(--tr);text-align:center;display:block}
.ah-c:hover{transform:translateY(-4px);box-shadow:var(--sm)}
.ah-ci{width:48px;height:48px;border-radius:50%;margin:0 auto 16px;position:relative}
.ah-ci::before{content:'';position:absolute;inset:0;border-radius:50%;opacity:.2}
.ah-ci::after{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:20px;height:20px;background:var(--tx);mask-size:contain;-webkit-mask-size:contain;mask-repeat:no-repeat;-webkit-mask-repeat:no-repeat}
.ahc-emotion{background:rgba(245,214,214,.25)}.ahc-emotion::before{background:var(--p)}.ahc-emotion::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E")}
.ahc-workshop{background:rgba(232,213,232,.25)}.ahc-workshop::before{background:var(--pp)}.ahc-workshop::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'/%3E%3Cpath d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'/%3E%3Cpath d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'/%3E%3C/svg%3E")}
.ahc-character{background:rgba(245,214,214,.25)}.ahc-character::before{background:var(--p)}.ahc-character::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E")}
.ahc-healing{background:rgba(232,213,232,.25)}.ahc-healing::before{background:var(--pp)}.ahc-healing::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/%3E%3C/svg%3E")}
.ahc-inspiration{background:rgba(245,214,214,.25)}.ahc-inspiration::before{background:var(--p)}.ahc-inspiration::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpolygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpolygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2'/%3E%3C/svg%3E")}
.ah-n{font-family:'Noto Serif SC','Playfair Display',serif;font-size:16px;font-weight:600;color:var(--tx);letter-spacing:.5px;margin-bottom:8px}
.ah-d{font-size:13px;color:var(--ts);line-height:1.6;letter-spacing:.3px}
.pg-b{text-align:center;max-width:560px;margin:0 auto}
.pg-b p{font-size:12px;color:var(--tm);line-height:1.8;letter-spacing:.3px}
@media(max-width:768px){.ah-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){.pg{padding:100px 16px 60px}.ah-grid{grid-template-columns:1fr}.ah-c{padding:28px 20px}}
</style>
