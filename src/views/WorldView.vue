<template>
  <div class="page">
    <div class="page-inner">
      <nav class="breadcrumb wash-in"><router-link to="/">{{ t("navHome") }}</router-link><span class="sep"> / </span><span class="cur">{{ t("navWorld") }}</span></nav>
      <h1 class="page-title wash-in">{{ t("navWorld") }}</h1>
      <p class="page-sub wash-in">{{ locale==="zh" ? "探索乙女游戏的宏大世界观" : "Worldbuilding" }}</p>
      <div class="world-grid wash-in-stagger">
        <div v-for="w in worlds" :key="w.t" class="world-card card-vintage">
          <div class="world-icon">
            <svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="none" stroke="#D8B4B8" stroke-width="1" opacity="0.5"/><circle cx="20" cy="20" r="6" fill="none" stroke="#D8B4B8" stroke-width="1" opacity="0.3"/></svg>
          </div>
          <h2 class="world-title">{{ w.t }}</h2>
          <p class="world-desc">{{ w.d }}</p>
          <div class="world-tags"><span v-for="tag in w.tags" :key="tag" class="tag-hand">{{ tag }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject } from "vue"
const t = inject("t"); const locale = inject("locale")
const worlds = [
  {t:"Modern City", d:"Romance in the modern city.", tags:["Modern", "Romance"]},
  {t:"Fantasy World", d:"A fantasy world of magic.", tags:["Fantasy", "Adventure"]},
  {t:"Historical", d:"Court intrigue and romance.", tags:["Historical", "Drama"]},
  {t:"Sci-Fi Future", d:"Love in the future.", tags:["Sci-Fi", "AI"]},
  {t:"Campus Youth", d:"Youthful romance on campus.", tags:["Campus", "Youth"]},
  {t:"Dark Mystery", d:"Love and mystery entwined.", tags:["Mystery", "Dark"]},
]
</script>
<style scoped>
.world-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.world-card{padding:28px 20px;text-align:center}
.world-icon{margin-bottom:12px;display:flex;justify-content:center}
.world-title{font-family:"ZCOOL XiaoWei",serif;font-size:17px;color:var(--ink);margin-bottom:8px}
.world-desc{font-size:12px;color:var(--ink-light);line-height:1.6;margin-bottom:12px}
.world-tags{display:flex;gap:6px;justify-content:center;flex-wrap:wrap}
@media(max-width:768px){.world-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:480px){.world-grid{grid-template-columns:1fr}}
</style>