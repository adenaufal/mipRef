<script setup lang="ts">
import type { RandomPreset } from '@/data/presets'

defineProps<{
  show: boolean
  presets: RandomPreset[]
  nsfw: boolean
}>()

const emit = defineEmits<{
  close: []
  select: [categories: string[]]
}>()
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        @click.self="emit('close')"
      >
        <div class="w-full max-w-sm bg-surface-900 rounded-2xl overflow-hidden">
          <!-- Header -->
          <div class="flex items-center justify-between p-4 border-b border-surface-800">
            <h2 class="text-lg font-semibold">Partial Random</h2>
            <button @click="emit('close')" class="btn-ghost p-2">
              ✕
            </button>
          </div>

          <!-- Content -->
          <div class="p-4 space-y-2">
            <p class="text-sm text-surface-400 mb-4">
              Choose what to randomize while keeping other selections.
            </p>
            <button
              v-for="preset in presets"
              :key="preset.id"
              @click="emit('select', preset.categories)"
              class="w-full flex items-center gap-3 p-4 bg-surface-800 hover:bg-surface-700 rounded-xl transition-colors text-left"
            >
              <span class="text-2xl">{{ preset.icon }}</span>
              <div>
                <div class="font-medium">{{ preset.name }}</div>
                <div class="text-xs text-surface-400">
                  {{ preset.categories.slice(0, 3).join(', ') }}{{ preset.categories.length > 3 ? '...' : '' }}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
