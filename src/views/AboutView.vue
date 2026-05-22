<template>
  <div class="pg">
    <!-- Breadcrumb -->
    <div class="pg-bc reveal">
      <router-link to="/" class="pg-bcl">{{ t('navHome') }}</router-link>
      <span class="pg-bs">/</span>
      <span class="pg-bcc">{{ t('navAbout') }}</span>
    </div>

    <div class="pg-h reveal">
      <h1 class="pg-t">{{ t('aboutTitle') }}</h1>
    </div>

    <div class="about-body">
      <p class="about-p reveal">{{ t('aboutDesc1') }}</p>
      <p class="about-p reveal reveal-delay-1">{{ t('aboutDesc2') }}</p>
      <p class="about-p reveal reveal-delay-2">{{ t('aboutDesc3') }}</p>
    </div>
  </div>

  <div class="pg">
    <div class="pg-h reveal">
      <h2 class="pg-t" style="font-size:clamp(20px,2.5vw,26px)">{{ t('values') || 'Values' }}</h2>
    </div>

    <div class="values-grid">
      <div v-for="(v, i) in values" :key="i" class="value-card reveal-s">
        <div class="value-icon" :class="'vicon-'+i"></div>
        <h3 class="value-t">{{ t(v.titleKey) }}</h3>
        <p class="value-d">{{ t(v.descKey) }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
const t = inject('t')

const values = [
  { titleKey: 'aboutMission1Title', descKey: 'aboutMission1Desc' },
  { titleKey: 'aboutMission2Title', descKey: 'aboutMission2Desc' },
  { titleKey: 'aboutMission3Title', descKey: 'aboutMission3Desc' },
]

onMounted(() => {
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); ro.unobserve(e.target) } })
  }, { threshold: 0.12 })
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el))
  document.querySelectorAll('.reveal-s > *').forEach(el => ro.observe(el))
})
</script>

<style scoped>
.pg{max-width:720px;margin:0 auto;padding:40px 20px 80px}
.pg:first-of-type{padding-top:120px}
.pg-bc{font-size:13px;color:var(--tm);margin-bottom:36px;letter-spacing:.3px}
.pg-bcl{color:var(--ts);transition:color .3s}.pg-bcl:hover{color:var(--tx)}
.pg-bs{margin:0 10px;color:var(--bd)}.pg-bcc{color:var(--tx);font-weight:500}
.pg-h{text-align:center;margin-bottom:56px}
.pg-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:clamp(26px,3.5vw,34px);font-weight:600;color:var(--tx);letter-spacing:1.5px;margin-bottom:14px}
.en .pg-t{font-family:'Playfair Display','Noto Serif SC',serif}

.about-body{max-width:600px;margin:0 auto}
.about-p{font-size:15px;color:var(--ts);line-height:2;letter-spacing:.5px;margin-bottom:24px}
.about-p:last-child{margin-bottom:0}

.values-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.value-card{background:var(--cw);border-radius:16px;padding:36px 28px;transition:all var(--tr);box-shadow:var(--ss);text-align:center}
.value-card:hover{box-shadow:var(--sm);transform:translateY(-3px)}
.value-icon{width:48px;height:48px;border-radius:14px;margin:0 auto 20px;position:relative;background:var(--bg2)}
.value-icon::after{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:22px;height:22px;background:var(--ts);mask-size:contain;-webkit-mask-size:contain;mask-repeat:no-repeat;-webkit-mask-repeat:no-repeat}
.vicon-0::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'/%3E%3C/svg%3E")}
.vicon-1::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'/%3E%3Cpath d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'/%3E%3Cpath d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'/%3E%3C/svg%3E")}
.vicon-2::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='9' cy='7' r='4'/%3E%3Cpath d='M23 21v-2a4 4 0 0 0-3-3.87'/%3E%3Cpath d='M16 3.13a4 4 0 0 1 0 7.75'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='9' cy='7' r='4'/%3E%3Cpath d='M23 21v-2a4 4 0 0 0-3-3.87'/%3E%3Cpath d='M16 3.13a4 4 0 0 1 0 7.75'/%3E%3C/svg%3E")}

.value-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:17px;font-weight:600;color:var(--tx);letter-spacing:.8px;margin-bottom:10px}
.value-d{font-size:14px;color:var(--ts);line-height:1.7;letter-spacing:.3px}

@media(max-width:968px){
  .pg:first-of-type{padding-top:100px}
  .values-grid{grid-template-columns:1fr;gap:16px}
  .value-card{padding:28px 24px}
}
@media(max-width:640px){
  .pg{padding:24px 16px 60px}
  .about-p{font-size:14px}
}
</style>
