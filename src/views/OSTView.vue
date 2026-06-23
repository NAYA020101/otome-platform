<template>
  <div class="page">
    <div class="page-inner">
      <nav class="breadcrumb wash-in"><router-link to="/">{{ t("navHome") }}</router-link><span class="sep"> / </span><span class="cur">{{ t("navOST") }}</span></nav>
      <h1 class="page-title wash-in">{{ t("navOST") }}</h1>
      <p class="page-sub wash-in">{{ locale==="zh" ? "原声OST" : "OST" }}</p>
      <div class="ost-list wash-in-stagger">
        <div v-for="(s,i) in tracks" :key="i" class="ost-card card-vintage">
          <div class="ost-num">{{ String(i+1).padStart(2,"0") }}</div>
          <div class="ost-info">
            <h3 class="ost-title">{{ s.t }}</h3>
            <p class="ost-game">{{ s.g }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject } from "vue"
const t = inject("t"); const locale = inject("locale")
const tracks = [
  {t:"Moonlight Voyage", g:"Love & Producer"},
  {t:"Starlit Promise", g:"Light & Night"},
]
</script>
<style scoped>
.ost-list{display:flex;flex-direction:column;gap:10px;max-width:600px;margin:0 auto}
.ost-card{display:flex;align-items:center;gap:16px;padding:16px 20px}
.ost-num{font-family:"Lora",serif;font-size:14px;color:var(--rose);min-width:30px;font-style:italic}
.ost-info{flex:1}
.ost-title{font-family:"ZCOOL XiaoWei",serif;font-size:15px;color:var(--ink);margin-bottom:2px}
.ost-game{font-size:11px;color:var(--ink-dim)}
.ost-icon{opacity:0.5}
</style>