<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  title: string
  variant?: 'default' | 'nsfw'
}>()

const isExpanded = ref(true)
</script>

<template>
  <div :class="[
    'card overflow-hidden transition-all',
    variant === 'nsfw' && 'border-red-500/30'
  ]">
    <button
      @click="isExpanded = !isExpanded"
      class="w-full flex items-center justify-between -m-4 p-4 hover:bg-surface-800/50 transition-colors"
    >
      <h3 :class="[
        'section-title m-0',
        variant === 'nsfw' && 'text-red-400'
      ]">
        {{ title }}
      </h3>
      <span class="text-surface-500 transition-transform" :class="isExpanded && 'rotate-180'">
        ▼
      </span>
    </button>

    <Transition name="expand">
      <div v-show="isExpanded" class="pt-4 mt-4 border-t border-surface-800">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.2s ease-out;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  margin-top: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 1000px;
}
</style>
