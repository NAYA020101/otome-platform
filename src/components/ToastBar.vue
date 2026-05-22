<template>
  <Teleport to="body">
    <div class="toast-container">
      <div v-for="t in toasts" :key="t.id" :class="['toast', 'toast-'+t.type]">
        {{ t.message }}
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { toRef } from 'vue'
const props = defineProps({ toasts: { type: Array, default: () => [] } })
</script>

<style scoped>
.toast-container{position:fixed;top:80px;right:24px;z-index:999;display:flex;flex-direction:column;gap:8px;pointer-events:none}
.toast{padding:12px 24px;font-size:13px;color:#fff;letter-spacing:.5px;animation:tFade .3s ease;max-width:320px;pointer-events:auto}
.toast-success{background:var(--accent)}
.toast-error{background:#8A4A4A}
.toast-info{background:var(--ts)}
@keyframes tFade{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
</style>
