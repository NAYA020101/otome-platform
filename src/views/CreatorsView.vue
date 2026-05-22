<template>
  <div class="pg">
    <!-- Breadcrumb -->
    <div class="pg-bc reveal">
      <router-link to="/" class="pg-bcl">{{ t('navHome') }}</router-link>
      <span class="pg-bs">/</span>
      <span class="pg-bcc">{{ t('navCreate') }}</span>
    </div>

    <div class="pg-h reveal">
      <h1 class="pg-t">{{ t('creatorTitle') }}</h1>
      <p class="pg-s">{{ t('creatorsTagline') }}</p>
    </div>

    <!-- ====== Resources ====== -->
    <div class="rc-grid reveal-s">
      <router-link v-for="(r, i) in resources" :key="i" :to="'/creators/'+(i+1)" class="rc-card">
        <div class="rc-icon" :class="'ricon-'+i"></div>
        <h3 class="rc-t">{{ t(r.titleKey) }}</h3>
        <p class="rc-d">{{ t(r.descKey) }}</p>
      </router-link>
    </div>
  </div>

  <!-- ====== Tips ====== -->
  <div class="pg">
    <div class="pg-h reveal">
      <h2 class="pg-t">{{ t('creatorTipsTitle') }}</h2>
    </div>

    <div class="tip-list">
      <div v-for="(tip, i) in tips" :key="i" class="tip-item reveal-s">
        <div class="tip-num">{{ String(i+1).padStart(2, '0') }}</div>
        <div class="tip-bd">
          <h3 class="tip-t">{{ t(tip.titleKey) }}</h3>
          <p class="tip-d">{{ t(tip.descKey) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
const t = inject('t')

const resources = [
  { titleKey: 'creatorResource1Title', descKey: 'creatorResource1Desc' },
  { titleKey: 'creatorResource2Title', descKey: 'creatorResource2Desc' },
  { titleKey: 'creatorResource3Title', descKey: 'creatorResource3Desc' },
  { titleKey: 'creatorResource4Title', descKey: 'creatorResource4Desc' },
]

const tips = [
  { titleKey: 'creatorTip1Title', descKey: 'creatorTip1Desc' },
  { titleKey: 'creatorTip2Title', descKey: 'creatorTip2Desc' },
  { titleKey: 'creatorTip3Title', descKey: 'creatorTip3Desc' },
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
.pg{max-width:1000px;margin:0 auto;padding:48px 24px 100px}
.pg:first-of-type{padding-top:140px}
.pg-bc{font-size:12px;color:var(--tm);margin-bottom:48px;letter-spacing:.3px}
.pg-bcl{color:var(--ts);transition:color .3s}.pg-bcl:hover{color:var(--tx)}
.pg-bs{margin:0 10px;color:var(--bd)}.pg-bcc{color:var(--tx);font-weight:500}
.pg-h{text-align:center;margin-bottom:64px}
.pg-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:clamp(24px,3vw,32px);font-weight:600;color:var(--tx);letter-spacing:2px;margin-bottom:12px}
.en .pg-t{font-family:'Playfair Display','Noto Serif SC',serif}
.pg-s{font-size:14px;color:var(--ts);letter-spacing:.5px;max-width:500px;margin:0 auto;line-height:1.8}

/* Resources */
.rc-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1px;background:var(--bd)}
.rc-card{background:var(--bg);padding:40px 32px;transition:all var(--tr);display:flex;flex-direction:column}
.rc-card:hover{background:var(--cw)}
.rc-icon{width:36px;height:36px;margin-bottom:20px;position:relative;background:var(--accent3)}
.rc-icon::after{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:16px;height:16px;background:var(--ts);mask-size:contain;-webkit-mask-size:contain;mask-repeat:no-repeat;-webkit-mask-repeat:no-repeat}
.ricon-0::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'/%3E%3Cpath d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'/%3E%3Cpath d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'/%3E%3C/svg%3E")}
.ricon-1::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Crect x='3' y='11' width='18' height='11' rx='2' ry='2'/%3E%3Cpath d='M7 11V7a5 5 0 0 1 10 0v4'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Crect x='3' y='11' width='18' height='11' rx='2' ry='2'/%3E%3Cpath d='M7 11V7a5 5 0 0 1 10 0v4'/%3E%3C/svg%3E")}
.ricon-2::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='9' cy='7' r='4'/%3E%3Cpath d='M23 21v-2a4 4 0 0 0-3-3.87'/%3E%3Cpath d='M16 3.13a4 4 0 0 1 0 7.75'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='9' cy='7' r='4'/%3E%3Cpath d='M23 21v-2a4 4 0 0 0-3-3.87'/%3E%3Cpath d='M16 3.13a4 4 0 0 1 0 7.75'/%3E%3C/svg%3E")}
.ricon-3::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E")}

.rc-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:16px;font-weight:600;color:var(--tx);letter-spacing:.8px;margin-bottom:8px}
.rc-d{font-size:13px;color:var(--ts);line-height:1.7;letter-spacing:.3px}

/* Tips */
.tip-list{display:flex;flex-direction:column;gap:0}
.tip-item{display:flex;gap:24px;padding:32px 0;border-bottom:1px solid var(--bd);align-items:flex-start}
.tip-item:last-child{border-bottom:none}
.tip-num{font-family:'Inter',sans-serif;font-size:24px;font-weight:300;color:var(--tm);line-height:1;flex-shrink:0;width:48px}
.tip-bd{flex:1}
.tip-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:16px;font-weight:600;color:var(--tx);letter-spacing:.5px;margin-bottom:8px}
.tip-d{font-size:13px;color:var(--ts);line-height:1.7;letter-spacing:.3px}

@media(max-width:968px){
  .pg:first-of-type{padding-top:110px}
  .rc-grid{grid-template-columns:1fr}
}
@media(max-width:640px){
  .pg{padding:32px 16px 60px}
  .rc-card{padding:28px 24px}
  .tip-item{gap:16px;padding:24px 0}
  .tip-num{font-size:24px;width:32px}
}
</style>
