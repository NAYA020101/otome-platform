<template>
  <Teleport to="body">
    <div class="toast-container">
      <div v-for="t in toasts" :key="t.id" :class="['toast-item', 'toast-' + t.type]">{{ t.message }}</div>
    </div>
  </Teleport>
</template>
<script setup>
const props = defineProps({ toasts: { type: Array, default: () => [] } })
</script>
