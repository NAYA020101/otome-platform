<template>
  <div class="page">
    <div class="page-inner">
      <nav class="breadcrumb wash-in"><router-link to="/">{{ t("navHome") }}</router-link><span class="sep"> / </span><span class="cur">{{ t("navEvents") }}</span></nav>
      <h1 class="page-title wash-in">{{ t("navEvents") }}</h1>
      <p class="page-sub wash-in">{{ locale==="zh" ? "乙女游戏活动日历" : "Event Calendar" }}</p>
      <div class="events-list wash-in-stagger">
        <div v-for="e in events" :key="e.d" class="event-card card-vintage">
          <div class="event-date"><span class="event-day">{{ e.d }}</span><span class="event-month">{{ e.m }}</span></div>
          <div class="event-info">
            <h3 class="event-title">{{ e.t }}</h3>
            <p class="event-desc">{{ e.desc }}</p>
            <span class="tag-hand">{{ e.tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject } from "vue"
const t = inject("t"); const locale = inject("locale")
const events = [
  {d:"15", m:"Jun", t:"Summer Festival", desc:"Limited summer stories.", tag:"Limited"},
  {d:"20", m:"Jun", t:"New Character", desc:"New character available.", tag:"New"},
  {d:"01", m:"Jul", t:"Anniversary", desc:"1st anniversary event.", tag:"Special"},
  {d:"10", m:"Jul", t:"Collaboration", desc:"Special collab event.", tag:"Collab"},
]
</script>
<style scoped>
.events-list{display:flex;flex-direction:column;gap:14px;max-width:600px;margin:0 auto}
.event-card{display:flex;gap:20px;padding:20px}
.event-date{display:flex;flex-direction:column;align-items:center;min-width:60px}
.event-day{font-family:"Lora",serif;font-size:28px;color:var(--rose);line-height:1}
.event-month{font-size:11px;color:var(--ink-dim)}
.event-title{font-family:"ZCOOL XiaoWei",serif;font-size:16px;color:var(--ink);margin-bottom:4px}
.event-desc{font-size:12px;color:var(--ink-light);margin-bottom:8px}
</style>