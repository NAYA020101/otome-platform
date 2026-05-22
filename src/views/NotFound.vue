<template>
  <div class="nf">
    <div class="nf-inner reveal">
      <div class="nf-code">404</div>
      <h1 class="nf-t">{{ locale==='zh' ? '未找到页面' : 'Page Not Found' }}</h1>
      <p class="nf-d">
        {{ locale==='zh' ? '你寻找的故事或许已经飘散在风中…' : 'The story you seek may have drifted away in the wind...' }}
      </p>
      <router-link to="/" class="nf-btn">{{ locale==='zh' ? '回到首页' : 'Back Home' }}</router-link>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
const locale = inject('locale')
onMounted(() => {
  const ro = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); ro.unobserve(e.target) } })
  }, { threshold: 0.1 })
  document.querySelectorAll('.reveal').forEach(el => ro.observe(el))
})
</script>

<style scoped>
.nf{min-height:80vh;display:flex;align-items:center;justify-content:center;padding:120px 24px}
.nf-inner{text-align:center;max-width:480px}
.nf-code{font-family:'Playfair Display',serif;font-size:96px;font-weight:400;color:var(--t);line-height:1;margin-bottom:16px;letter-spacing:8px}
.nf-t{font-family:'Noto Serif SC','Playfair Display',serif;font-size:24px;font-weight:600;color:var(--tx);letter-spacing:2px;margin-bottom:16px}
.nf-d{font-size:14px;color:var(--ts);line-height:1.7;margin-bottom:36px;font-style:italic}
.nf-btn{display:inline-block;padding:12px 36px;background:var(--accent);color:var(--cw);font-size:11px;letter-spacing:3px;text-transform:uppercase;transition:all var(--tr)}
.nf-btn:hover{background:var(--tx);transform:translateY(-1px)}
</style>
