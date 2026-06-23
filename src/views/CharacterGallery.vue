<template>
  <div class="page">
    <div class="page-inner">
      <nav class="breadcrumb wash-in"><router-link to="/">{{ t("navHome") }}</router-link><span class="sep"> / </span><span class="cur">{{ t("navChars") }}</span></nav>
      <h1 class="page-title wash-in">角色图鉴</h1>
      <p class="page-sub font-en wash-in">Character Gallery</p>
      <p class="page-sub wash-in">收录全网主流乙女游戏全部可攻略男主、专属配角档案，涵盖人设身世、性格特质、羁绊宿命、高光台词、恋爱偏好，区分国乙、日乙、韩乙、欧美乙四大人设体系，整理全品类乙游人物美学，方便玩家对照喜好、入坑甄选。</p>
      <div class="filter-bar wash-in">
        <button v-for="f in filters" :key="f.key" :class="{active: activeFilter===f.key}" @click="activeFilter=f.key">{{ f.label }}</button>
      </div>
      <div class="char-grid wash-in-stagger">
        <div v-for="c in filteredChars" :key="c.n" class="char-card card-vintage">
          <div class="char-avatar" :style="{background:c.color}">{{ c.n[0] }}</div>
          <div class="char-body">
            <h3 class="char-name">{{ c.n }}</h3>
            <p class="char-game font-en">{{ c.game }}</p>
            <div class="char-tags"><span v-for="t in c.tags" :key="t" class="tag-hand">{{ t }}</span></div>
            <p class="char-intro">{{ c.intro }}</p>
            <p class="char-line font-en">&ldquo;{{ c.line }}&rdquo;</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject, ref, computed } from "vue"
const t = inject("t"); const locale = inject("locale")
const activeFilter = ref("all")
const filters = [
  {key:"all",label:"全部"},{key:"cn",label:"国乙顶流"},{key:"cn-classic",label:"古风乙游"},{key:"cn-indie",label:"小众独立"},{key:"jp",label:"日系主机"},{key:"kr",label:"韩系"},{key:"en",label:"欧美"},
]
const chars = [
  {n:"李泽言",game:"恋与制作人",tags:["CEO","外冷内热","总裁"],intro:"华锐集团总裁，商业天才，表面冷漠不近人情，实则内心温柔细腻。不善表达感情，却用行动默默守护。",line:"我所做的一切，不过是想让你在我的世界里，永远自由。",color:"#2C3E50"},
  {n:"白起",game:"恋与制作人",tags:["特遣署","正义","守护"],intro:"特遣署精英警官，正义感极强，行事果决。对认定的目标和人永远忠诚，是玩家最坚实的后盾。",line:"只要你在的地方，就算是地狱，我也能闯进来带你走。",color:"#34495E"},
  {n:"许墨",game:"恋与制作人",tags:["科学家","神秘","温柔"],intro:"天才神经科学专家，身份神秘，举止温柔优雅。在理性与感性之间挣扎，他的温柔背后藏着不为人知的秘密。",line:"如果理智是我唯一的枷锁，那我愿意为你打破它。",color:"#5D6D7E"},
  {n:"周棋洛",game:"恋与制作人",tags:["巨星","阳光","元气"],intro:"超人气偶像巨星，表面阳光开朗、元气满满，实则心思细腻敏锐。用笑容治愈他人，却将自己的孤独藏于舞台灯光之外。",line:"我的光芒如果能照亮你，那就是它存在的意义。",color:"#7F8C8D"},
  {n:"萧逸",game:"光与夜之恋",tags:["赛车手","桀骜","率性"],intro:"职业赛车手，桀骜不驯、率性自由。赛道上的王者，却愿意为一个人放慢速度。他的人生信条——要么赢，要么输得漂亮。",line:"我这一生只认两样东西——赛道的终点，和你的笑容。",color:"#2C3E50"},
  {n:"陆沉",game:"光与夜之恋",tags:["CEO","优雅","神秘"],intro:"万甄集团CEO，优雅从容、深不可测。在商界叱咤风云，却在你面前卸下所有防备。他的温柔是克制的，却也是深沉的。",line:"在这个世界上，没有什么比你的安全更重要。",color:"#34495E"},
  {n:"齐司礼",game:"光与夜之恋",tags:["设计师","傲娇","才华"],intro:"天才服装设计师，毒舌傲娇、才华横溢。嘴上从不饶人，却总在细节处展现笨拙的关心。对美有极致追求，对你有无限包容。",line:"这件衣服不适合你……但如果你喜欢，我可以改到适合为止。",color:"#5D6D7E"},
  {n:"查理苏",game:"光与夜之恋",tags:["医生","温柔","体贴"],intro:"心外科医生，温润如玉、体贴入微。手术刀下是冷静的医者，面对你是笨拙的恋人。他的爱像春风，不疾不徐却无处不在。",line:"作为医生，我见过太多心跳。但你的是唯一让我自己也心跳加速的。",color:"#7F8C8D"},
  {n:"左然",game:"未定事件簿",tags:["律师","理性","严谨"],intro:"王牌律师，冷静理性、逻辑缜密。法庭上所向披靡，私下却有着不为人知的细腻与柔软。他是你最可靠的盟友，也是最温柔的恋人。",line:"我为你辩护，不是因为案件，而是因为我相信你。",color:"#2C3E50"},
  {n:"陆景和",game:"未定事件簿",tags:["艺术生","洒脱","自由"],intro:"自由奔放的艺术系学生，洒脱不羁、才华横溢。用画笔描绘世界，用心感受情感。看似玩世不恭，实则比谁都认真。",line:"如果我的画里都是你，那我的世界也全是你了。",color:"#34495E"},
  {n:"夏彦",game:"未定事件簿",tags:["侦探","敏锐","温柔"],intro:"私家侦探，敏锐细腻、温柔可靠。总是默默守护在侧，用他的方式保护着重要的人。他的温柔藏在每一个细节里。",line:"真相很重要，但你的笑容比真相更重要。",color:"#5D6D7E"},
]
const filteredChars = computed(() => {
  if (activeFilter.value === "all") return chars
  return chars.filter(c => c.tags.includes(activeFilter.value))
})
</script>
<style scoped>
.char-grid{display:grid;grid-template-columns:1fr;gap:16px;max-width:700px;margin:0 auto}
.char-card{display:flex;gap:20px;padding:22px}
.char-avatar{width:56px;height:56px;display:flex;align-items:center;justify-content:center;font-size:22px;color:rgba(255,255,255,.9);flex-shrink:0;font-family:var(--font-cn-title);border-radius:var(--card-radius)}
.char-body{flex:1}
.char-name{font-family:var(--font-cn-title);font-size:18px;color:var(--tea-brown);margin-bottom:2px}
.char-game{font-size:11px;color:var(--fog-blue);margin-bottom:8px;font-style:italic}
.char-tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px}
.char-intro{font-size:13px;color:var(--text-light);line-height:1.7;margin-bottom:6px}
.char-line{font-size:12px;color:var(--rose-dim);font-style:italic;line-height:1.5;padding-left:12px;border-left:2px solid var(--rose-light)}
@media(max-width:640px){.char-card{flex-direction:column;gap:12px;padding:18px}.char-avatar{width:44px;height:44px;font-size:18px}}
</style>
