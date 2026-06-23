<template>
  <div class="page">
    <div class="page-inner">
      <nav class="breadcrumb wash-in"><router-link to="/">{{ t("navHome") }}</router-link><span class="sep"> / </span><span class="cur">{{ t("navChars") }}</span></nav>
      <h1 class="page-title wash-in">{{ t("navChars") }}</h1>
      <p class="page-sub wash-in">{{ locale==="zh" ? "收录乙女游戏中的心动角色" : "Character Archive" }}</p>
      <div class="filter-bar wash-in">
        <button v-for="f in filters" :key="f" :class="['tag-hand', {active: af===f}]" @click="af=f">{{ f }}</button>
      </div>
      <div class="char-grid wash-in-stagger">
        <div v-for="c in items" :key="c.n" class="char-card card-vintage">
          <div class="char-avatar" :style="{background: c.c}"><span>{{ c.n[0] }}</span></div>
          <div class="char-info">
            <h3 class="char-name">{{ c.n }}</h3>
            <span class="tag-hand">{{ c.g }}</span>
            <p class="char-desc">{{ c.d }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject, ref, computed } from "vue"
const t = inject("t"); const locale = inject("locale")
const af = ref("All")
const filters = ["All", "Love & Producer", "Light & Night"]
const list = [
  {n:"Li Zeyan", g:"Love & Producer", d:"CEO, cold outside warm inside", c:"#2C3E50"},
  {n:"Bai Qi", g:"Love & Producer", d:"Police officer, strong justice", c:"#34495E"},
  {n:"Xu Mo", g:"Love & Producer", d:"Genius scientist, gentle", c:"#5D6D7E"},
  {n:"Xiao Yi", g:"Light & Night", d:"Racer, proud and free", c:"#2C3E50"},
  {n:"Lu Chen", g:"Light & Night", d:"CEO, elegant and mysterious", c:"#34495E"},
  {n:"Qi Sili", g:"Light & Night", d:"Designer, brilliant tsundere", c:"#5D6D7E"},
]
const items = computed(() => af.value==="All" ? list : list.filter(x => x.g===af.value))
</script>
<style scoped>
.filter-bar{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:32px}
.filter-bar .tag-hand{cursor:pointer;transition:all var(--tr)}
.filter-bar .tag-hand.active{background:var(--rose);color:var(--cream);box-shadow:inset 0 0 0 1px var(--rose-dim)}
.char-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
.char-card{display:flex;gap:16px;padding:20px}
.char-avatar{width:50px;height:50px;display:flex;align-items:center;justify-content:center;font-size:20px;color:rgba(255,255,255,.85);flex-shrink:0}
.char-info{flex:1}
.char-name{font-family:"ZCOOL XiaoWei",serif;font-size:16px;color:var(--ink);margin-bottom:6px}
.char-desc{font-size:12px;color:var(--ink-light);margin-top:6px;line-height:1.5}
@media(max-width:640px){.char-grid{grid-template-columns:1fr}}
</style>