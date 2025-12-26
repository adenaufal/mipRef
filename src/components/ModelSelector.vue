<script setup lang="ts">
import type { ModelOption } from '@/data/presets'

defineProps<{
  model: string
  models: ModelOption[]
}>()

const emit = defineEmits<{
  update: [model: string]
}>()
</script>

<template>
  <div class="card">
    <h3 class="section-title mb-3">Model</h3>
    <div class="grid grid-cols-2 gap-2">
      <button
        v-for="m in models"
        :key="m.id"
        @click="emit('update', m.id)"
        :class="[
          'p-3 rounded-xl text-left transition-all border',
          model === m.id
            ? 'bg-chrient-gold/10 border-chrient-gold text-chrient-gold'
            : 'bg-surface-800 border-surface-700 text-surface-300 hover:border-surface-600'
        ]"
      >
        <div class="font-semibold text-sm">{{ m.name }}</div>
        <div class="text-xs opacity-70 mt-0.5">{{ m.description }}</div>
      </button>
    </div>
  </div>
</template>
