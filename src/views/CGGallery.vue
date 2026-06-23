<template>
  <div class="page">
    <div class="page-inner">
      <h1 class="page-title wash-in">CG Gallery</h1>
      <div class="gallery-grid wash-in-stagger">
        <div v-for="i in 12" :key="i" class="gallery-card card-vintage">
          <div class="gallery-placeholder">
            <svg viewBox="0 0 200 280"><rect width="200" height="280" fill="#F0EAE2"/><text x="100" y="140" text-anchor="middle" fill="#B8A8A0" font-size="10">CG #{ { i } }</text></svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { inject } from "vue"
const t = inject("t")
</script>
<style scoped>
.gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
.gallery-card{overflow:hidden}
.gallery-placeholder{width:100%;aspect-ratio:200/280;background:var(--cream-dim)}
@media(max-width:768px){.gallery-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:480px){.gallery-grid{grid-template-columns:1fr}}
</style>