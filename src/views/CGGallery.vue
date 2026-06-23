<template>
  <div class="page">
    <div class="page-inner">
      <nav class="breadcrumb wash-in"><router-link to="/">{{ t("navHome") }}</router-link><span class="sep"> / </span><span class="cur">{{ t("navGallery") }}</span></nav>
      <h1 class="page-title wash-in">CG画廊</h1>
      <p class="page-sub font-en wash-in">CG Collection</p>
      <p class="page-sub wash-in">整合全网乙游标志性剧情CG、约会插画、主线名场面、节日限定绘、结局插画，按题材国别分类归档。每一张经典插画配套剧情注解、对话原文、故事背景，解析美术画风、镜头立意、情感内核，留存乙游美学与浪漫剧情瞬间。</p>
      <div class="filter-bar wash-in">
        <button v-for="f in cgFilters" :key="f" :class="{active: activeCG===f}" @click="activeCG=f">{{ f }}</button>
      </div>
      <div class="gallery-grid wash-in-stagger">
        <div v-for="(cg,i) in cgList" :key="i" class="gallery-card card-vintage">
          <div class="gallery-img"><svg viewBox="0 0 200 260" width="100%" height="100%"><rect width="200" height="260" fill="#F0EAE2"/><text x="100" y="130" text-anchor="middle" fill="#B8A8A0" font-size="10">{{ cg.game }}</text></svg></div>
          <div class="gallery-body">
            <h3 class="gallery-title">{{ cg.title }}</h3>
            <p class="gallery-game font-en">{{ cg.game }}</p>
            <p class="gallery-desc">{{ cg.desc }}</p>
            <div class="gallery-footer"><span class="tag-hand">{{ cg.tag }}</span><span class="gallery-line font-en">&ldquo;{{ cg.line }}&rdquo;</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject, ref, computed } from "vue"
const t = inject("t"); const locale = inject("locale")
const activeCG = ref("全部")
const cgFilters = ["全部","主线剧情","甜蜜约会","节日限定","悲情结局","番外短篇"]
const cgList = [
  {title:"初遇·星空下",game:"恋与制作人",desc:"李泽言与玩家在星空下的初次正式约定，满屏的银河与他的蓝宝石眼眸相映。这张CG以深蓝与暖金为主色调，镜头仰拍突出人物的高大与安全感。",line:"从今以后，你的星空由我来守护。",tag:"主线剧情"},
  {title:"赛车手的告白",game:"光与夜之恋",desc:"萧逸在赛道终点摘下头盔，汗水与夕阳交织。赛车服的硬朗轮廓与温柔眼神形成反差，背景的赛道延长线象征着他为爱减速的人生转折。",line:"我赢了比赛，但输给了你。",tag:"甜蜜约会"},
  {title:"法庭上的对视",game:"未定事件簿",desc:"左然在法庭辩护席上转身看向旁听席的玩家，阳光从高窗洒落。光影构图致敬经典法庭剧，他微微扬起的嘴角暗示胜诉的信心。",line:"这场辩护，我只为你。",tag:"主线剧情"},
  {title:"圣诞夜的惊喜",game:"恋与制作人",desc:"圣诞节限定卡面，四位男主各自准备了不同的圣诞礼物。手绘水彩风格的雪花与暖黄灯光交织，节日氛围浓厚，每一帧都是壁纸级别。",line:"圣诞快乐，今年也是和你一起真是太好了。",tag:"节日限定"},
  {title:"异世界的重逢",game:"时空中的绘旅人",desc:"现代与异世界的时空交错，艾因在城堡露台伸手邀约。背后的双月与玫瑰园构成梦幻背景，西幻浪漫氛围拉满。",line:"无论在哪个世界，我都会找到你。",tag:"番外短篇"},
  {title:"雨中的约定",game:"光与夜之恋",desc:"陆沉撑伞在雨中等候，灰色调的雨景与他深蓝的西装形成优雅对比。雨滴打在伞面的细节拉满，氛围感极强。",line:"就算淋湿全世界，我也不会让你淋到一滴雨。",tag:"甜蜜约会"},
  {title:"樱花树下的离别",game:"薄樱鬼",desc:"冲田总司在樱花雨中微笑告别，花瓣纷飞与夕阳余晖交织。和风复古色调，意境悲美。这是薄樱鬼中最令人心碎的场景之一。",line:"如果还有来生，我想做一个普通人，和你一起看樱花。",tag:"悲情结局"},
  {title:"新年祈福",game:"未定事件簿",desc:"新年和服限定卡面，四位男主身着不同纹样的和服在神社祈福。背景的初日之光与满开红梅象征新年希望，是每年春节最受期待的主题CG。",line:"新的一年，请继续和我一起走下去。",tag:"节日限定"},
]
</script>
<style scoped>
.gallery-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
.gallery-card{overflow:hidden}
.gallery-img{width:100%;aspect-ratio:200/260;overflow:hidden;display:flex;align-items:center;justify-content:center;background:var(--cream-dim)}
.gallery-body{padding:16px}
.gallery-title{font-family:var(--font-cn-title);font-size:16px;color:var(--tea-brown);margin-bottom:2px}
.gallery-game{font-size:11px;color:var(--fog-blue);margin-bottom:8px}
.gallery-desc{font-size:12px;color:var(--text-light);line-height:1.7;margin-bottom:8px}
.gallery-footer{display:flex;flex-wrap:wrap;gap:8px;align-items:center}
.gallery-line{font-size:11px;color:var(--rose-dim);font-style:italic;line-height:1.4}
@media(max-width:768px){.gallery-grid{grid-template-columns:1fr}}
</style>
