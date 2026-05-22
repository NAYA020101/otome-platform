<template>
  <div class="pg">
    <div class="pg-bc reveal">
      <router-link to="/" class="pg-bcl">{{ t('navHome') }}</router-link>
      <span class="pg-bs">/</span>
      <router-link to="/creators" class="pg-bcl">{{ t('navCreate') }}</router-link>
      <span class="pg-bs">/</span>
      <span class="pg-bcc">{{ t(detail.titleKey) }}</span>
    </div>

    <div class="detail-header reveal">
      <div class="detail-icon" :class="'dicon-'+id"></div>
      <h1 class="detail-title">{{ t(detail.titleKey) }}</h1>
    </div>

    <div class="detail-body reveal">
      <p v-for="(p, i) in detail.paragraphs" :key="i" class="detail-p">{{ t(p) }}</p>
    </div>
  </div>
</template>

<script setup>
import { inject, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
const t = inject('t')

const props = defineProps({ id: String })
const router = useRouter()

const details = {
  '1': {
    titleKey: 'creatorDetail1Title',
    paragraphs: ['creatorDetail1Content1', 'creatorDetail1Content2', 'creatorDetail1Content3'],
  },
  '2': {
    titleKey: 'creatorDetail2Title',
    paragraphs: ['creatorDetail2Content1', 'creatorDetail2Content2', 'creatorDetail2Content3'],
  },
  '3': {
    titleKey: 'creatorDetail3Title',
    paragraphs: ['creatorDetail3Content1', 'creatorDetail3Content2', 'creatorDetail3Content3'],
  },
  '4': {
    titleKey: 'creatorDetail4Title',
    paragraphs: ['creatorDetail4Content1', 'creatorDetail4Content2', 'creatorDetail4Content3'],
  },
}

const detail = computed(() => {
  const d = details[props.id]
  if (!d) {
    router.replace('/creators')
    return details['1']
  }
  return d
})

onMounted(() => {
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); ro.unobserve(e.target) } })
  }, { threshold: 0.12 })
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el))
})
</script>

<style scoped>
.pg{max-width:720px;margin:0 auto;padding:120px 20px 100px}
.pg-bc{font-size:13px;color:var(--tm);margin-bottom:40px;letter-spacing:.3px}
.pg-bcl{color:var(--ts);transition:color .3s}.pg-bcl:hover{color:var(--tx)}
.pg-bs{margin:0 10px;color:var(--bd)}.pg-bcc{color:var(--tx);font-weight:500}

.detail-header{text-align:center;margin-bottom:48px}
.detail-icon{width:56px;height:56px;border-radius:16px;margin:0 auto 24px;position:relative;background:var(--bg2)}
.detail-icon::after{content:'';position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:26px;height:26px;background:var(--ts);mask-size:contain;-webkit-mask-size:contain;mask-repeat:no-repeat;-webkit-mask-repeat:no-repeat}
.dicon-1::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'/%3E%3Cpath d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'/%3E%3Cpath d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'/%3E%3C/svg%3E")}
.dicon-2::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Crect x='3' y='11' width='18' height='11' rx='2' ry='2'/%3E%3Cpath d='M7 11V7a5 5 0 0 1 10 0v4'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Crect x='3' y='11' width='18' height='11' rx='2' ry='2'/%3E%3Cpath d='M7 11V7a5 5 0 0 1 10 0v4'/%3E%3C/svg%3E")}
.dicon-3::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='9' cy='7' r='4'/%3E%3Cpath d='M23 21v-2a4 4 0 0 0-3-3.87'/%3E%3Cpath d='M16 3.13a4 4 0 0 1 0 7.75'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='9' cy='7' r='4'/%3E%3Cpath d='M23 21v-2a4 4 0 0 0-3-3.87'/%3E%3Cpath d='M16 3.13a4 4 0 0 1 0 7.75'/%3E%3C/svg%3E")}
.dicon-4::after{mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E");-webkit-mask-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'%3E%3Cpath d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'/%3E%3C/svg%3E")}

.detail-title{font-family:'Noto Serif SC','Playfair Display',serif;font-size:clamp(26px,3.5vw,34px);font-weight:700;color:var(--tx);letter-spacing:2px}
.en .detail-title{font-family:'Playfair Display','Noto Serif SC',serif}

.detail-body{max-width:580px;margin:0 auto}
.detail-p{font-size:15px;color:var(--ts);line-height:2.1;letter-spacing:.5px;margin-bottom:24px;text-indent:2em}

@media(max-width:640px){
  .pg{padding:100px 16px 60px}
  .detail-p{font-size:14px}
}
</style>
