<template>
  <div class="page">
    <div class="page-inner">
      <nav class="breadcrumb wash-in"><router-link to="/">{{ t("navHome") }}</router-link><span class="sep"> / </span><span class="cur">{{ t("navEvents") }}</span></nav>
      <h1 class="page-title wash-in">活动日历</h1>
      <p class="page-sub font-en wash-in">Event Timeline</p>
      <p class="page-sub wash-in">归档全球乙游历年节日企划、版本更新、新作官宣、同人征集、线下联动、限时番外全活动。以时间轴梳理行业运营节点，记录限定剧情、限定CG、联动福利、限时短篇故事，完整留存乙游行业活动发展史。</p>
      <div class="filter-bar wash-in">
        <button v-for="f in eventFilters" :key="f" :class="{active: activeEvent===f}" @click="activeEvent=f">{{ f }}</button>
      </div>
      <div class="timeline wash-in-stagger">
        <div v-for="(ev,i) in filteredEvents" :key="i" class="tl-item card-vintage">
          <div class="tl-year">{{ ev.year }}</div>
          <div class="tl-body">
            <div class="tl-meta"><span class="tag-hand">{{ ev.tag }}</span><span class="tl-date font-en">{{ ev.month }}</span></div>
            <h3 class="tl-title">{{ ev.title }}</h3>
            <p class="tl-desc">{{ ev.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject, ref, computed } from "vue"
const t = inject("t"); const locale = inject("locale")
const activeEvent = ref("全部")
const eventFilters = ["全部","新作上线","节日活动","限时番外","同人企划","线下联动"]
const events = [
  {year:"1994",month:"September",title:"《安琪莉可》发售",desc:"光荣发行全球首款商业化乙女游戏，开辟女性向游戏赛道。",tag:"新作上线"},
  {year:"2000",month:"June",title:"《遥远时空中》系列首作发售",desc:"光荣Neo Romance系列第二部，日式穿越奇幻题材奠基之作。",tag:"新作上线"},
  {year:"2008",month:"September",title:"《薄樱鬼》首作PS2发售",desc:"Idea Factory发行，幕末历史悲情乙游，后成为全球最知名乙游IP之一。",tag:"新作上线"},
  {year:"2010",month:"August",title:"《失忆症AMNESIA》PSP发售",desc:"时空轮回失忆设定，日系入门必玩经典作品。",tag:"新作上线"},
  {year:"2016",month:"July",title:"《Mystic Messenger》全球上线",desc:"韩系聊天室互动乙游，全球现象级爆款，沉浸式陪伴感革新品类。",tag:"新作上线"},
  {year:"2017",month:"December",title:"《恋与制作人》国服上线",desc:"叠纸发行，引爆国产乙游市场，创造月流水数亿行业神话。",tag:"新作上线"},
  {year:"2020",month:"July",title:"《未定事件簿》全平台上线",desc:"米哈游首款乙游，律政悬疑+Live2D高精度交互。",tag:"新作上线"},
  {year:"2020",month:"October",title:"《时空中的绘旅人》上线",desc:"网易发行，多宇宙平行世界设定，文笔被誉为国产乙游天花板。",tag:"新作上线"},
  {year:"2021",month:"June",title:"《光与夜之恋》全平台上线",desc:"腾讯北极光工作室，都市轻奢时尚乙游，光影美术风格出圈。",tag:"新作上线"},
  {year:"2021",month:"December",title:"恋与制作人四周年庆典",desc:"限定卡池、专属剧情、线下主题展览同步开启。",tag:"节日活动"},
  {year:"2023",month:"January",title:"《恋与深空》全球测试",desc:"叠纸3D写实乙游开启测试，高精度建模引发行业关注。",tag:"新作上线"},
  {year:"2024",month:"January",title:"《恋与深空》全球正式上线",desc:"3D全景写实第一视角，登顶全球多国畅销榜。",tag:"新作上线"},
  {year:"2024",month:"June",title:"光与夜之恋三周年庆典",desc:"大型线下音乐会+限定剧情+联动品牌重磅企划。",tag:"节日活动"},
  {year:"2025",month:"March",title:"全球乙游市场突破百亿",desc:"国产乙游出海加速，日系乙游NS平台全面复苏。",tag:"同人企划"},
  {year:"2025",month:"December",title:"恋与制作人八周年",desc:"跨年特别版本，全线角色番外剧情更新。",tag:"节日活动"},
  {year:"2026",month:"June",title:"Her Tale 她叙 平台上线",desc:"复古手绘风乙女叙事共创平台正式上线。",tag:"新作上线"},
]
const filteredEvents = computed(() => {
  if (activeEvent.value === "全部") return events
  return events.filter(e => e.tag === activeEvent.value)
})
</script>
<style scoped>
.timeline{display:flex;flex-direction:column;gap:14px;max-width:650px;margin:0 auto}
.tl-item{display:flex;gap:20px;padding:20px;position:relative}
.tl-item::before{content:"";position:absolute;left:72px;top:60px;bottom:-16px;width:1px;background:repeating-linear-gradient(0deg,var(--rose-light),var(--rose-light) 3px,transparent 3px,transparent 8px);opacity:.4}
.tl-item:last-child::before{display:none}
.tl-year{font-family:var(--font-en-title);font-size:22px;color:var(--rose-main);min-width:60px;font-style:italic;line-height:1.2}
.tl-body{flex:1}
.tl-meta{display:flex;gap:8px;align-items:center;margin-bottom:6px;flex-wrap:wrap}
.tl-date{font-size:11px;color:var(--fog-blue)}
.tl-title{font-family:var(--font-cn-title);font-size:16px;color:var(--tea-brown);margin-bottom:4px}
.tl-desc{font-size:13px;color:var(--text-light);line-height:1.6}
@media(max-width:640px){.tl-item{flex-direction:column;gap:8px;padding:16px}.tl-item::before{left:18px;top:50px}.tl-year{font-size:18px}}
</style>
