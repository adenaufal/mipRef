<script setup lang="ts">
defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  confirm: []
  cancel: []
}>()
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="show"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        @click.self="emit('cancel')"
      >
        <div class="w-full max-w-sm bg-surface-900 rounded-2xl overflow-hidden border border-red-500/30">
          <!-- Header -->
          <div class="p-6 text-center">
            <div class="text-4xl mb-4">🔞</div>
            <h2 class="text-xl font-bold mb-2">Enable NSFW Mode?</h2>
            <p class="text-sm text-surface-400 leading-relaxed">
              This will unlock adult content options including explicit tags and poses.
              Only enable if you are 18+ and in a private environment.
            </p>
          </div>

          <!-- Actions -->
          <div class="p-4 border-t border-surface-800 flex gap-2">
            <button
              @click="emit('cancel')"
              class="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              @click="emit('confirm')"
              class="flex-1 px-4 py-3 bg-red-500 text-white font-semibold rounded-xl active:scale-95 transition-all"
            >
              I'm 18+, Enable
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
