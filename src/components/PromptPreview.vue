<script setup lang="ts">
defineProps<{
  show: boolean
  prompt: string
  undesired: string
  model: string
  guidance: number
  steps: number
}>()

const emit = defineEmits<{
  close: []
  copy: []
  'copy-with-settings': []
}>()
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
        @click.self="emit('close')"
      >
        <div class="w-full max-w-lg bg-surface-900 rounded-t-3xl max-h-[85vh] flex flex-col animate-slide-up">
          <!-- Header -->
          <div class="flex items-center justify-between p-4 border-b border-surface-800">
            <h2 class="text-lg font-semibold">Prompt Preview</h2>
            <button @click="emit('close')" class="btn-ghost p-2">
              ✕
            </button>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-y-auto p-4 space-y-4">
            <!-- Main Prompt -->
            <div>
              <h3 class="section-title mb-2">Prompt</h3>
              <div class="bg-surface-800 rounded-xl p-4 font-mono text-sm text-surface-200 leading-relaxed">
                {{ prompt || 'No tags selected' }}
              </div>
            </div>

            <!-- Undesired Content -->
            <div v-if="undesired">
              <h3 class="section-title mb-2">Undesired Content</h3>
              <div class="bg-surface-800 rounded-xl p-4 font-mono text-sm text-red-300/80 leading-relaxed">
                {{ undesired }}
              </div>
            </div>

            <!-- Settings -->
            <div>
              <h3 class="section-title mb-2">Recommended Settings</h3>
              <div class="bg-surface-800 rounded-xl p-4 space-y-2">
                <div class="flex justify-between text-sm">
                  <span class="text-surface-400">Model</span>
                  <span class="text-chrient-gold font-medium">{{ model }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-surface-400">Guidance</span>
                  <span class="text-white">{{ guidance }}</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-surface-400">Steps</span>
                  <span class="text-white">{{ steps }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="p-4 border-t border-surface-800 space-y-2 safe-bottom">
            <div class="flex gap-2">
              <button @click="emit('copy')" class="btn-primary flex-1">
                📋 Copy Prompt
              </button>
              <button @click="emit('copy-with-settings')" class="btn-secondary flex-1">
                📑 Copy All
              </button>
            </div>
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

.animate-slide-up {
  animation: slide-up 0.3s ease-out;
}

@keyframes slide-up {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
