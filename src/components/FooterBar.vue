<template>
  <footer class="footer">
    <div class="footer-lace">
      <svg width="100%" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
        <path d="M0,4 Q5,0 10,4 T20,4 T30,4 T40,4 T50,4 T60,4 T70,4 T80,4 T90,4 T100,4" fill="none" stroke="#C48A8A" stroke-width="0.5" opacity="0.3"/>
        <path d="M0,4 Q5,8 10,4 T20,4 T30,4 T40,4 T50,4 T60,4 T70,4 T80,4 T90,4 T100,4" fill="none" stroke="#C48A8A" stroke-width="0.3" opacity="0.15"/>
      </svg>
    </div>
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="footer-logo">
          <span class="footer-logo-deco">&#10058;</span>
          <span class="footer-logo-main">她叙</span>
          <span class="footer-logo-en">Her Tale</span>
        </div>
        <p class="footer-desc">{{ locale==='zh' ? '描述' : 'desc' }}</p>
        <p class="footer-tagline">{{ locale==='zh' ? '以她之名' : 'In her name' }}</p>
      </div>
    </div>
    <div class="footer-bottom"><p>&copy; 2026 Her Tale</p></div>
  </footer>
</template>
<script setup>
import { inject } from 'vue'
const t = inject('t'); const locale = inject('locale')
</script>
