<script setup lang="ts">
import { computed } from 'vue'
import { useHistory } from '@/composables/useStorage'
import { useClipboard } from '@/composables/useClipboard'

const { history, removeFromHistory, toggleFavorite, clearHistory } = useHistory()
const { copyToClipboard, copied } = useClipboard()

const sortedHistory = computed(() => {
  return [...history.value].sort((a, b) => b.timestamp - a.timestamp)
})

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  if (diff < 60000) return 'Just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return date.toLocaleDateString()
}

const handleCopy = async (prompt: string) => {
  await copyToClipboard(prompt)
}
</script>

<template>
  <div class="px-4 pt-4">
    <!-- Header -->
    <header class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold">History</h1>
        <p class="text-sm text-surface-400">{{ history.length }} prompts saved</p>
      </div>
      <button
        v-if="history.length > 0"
        @click="clearHistory"
        class="btn-ghost text-red-400 text-sm"
      >
        Clear All
      </button>
    </header>

    <!-- Empty State -->
    <div
      v-if="history.length === 0"
      class="flex flex-col items-center justify-center py-20 text-center"
    >
      <div class="text-5xl mb-4">📋</div>
      <h2 class="text-lg font-semibold mb-2">No History Yet</h2>
      <p class="text-sm text-surface-400">
        Generated prompts will appear here
      </p>
    </div>

    <!-- History List -->
    <div v-else class="space-y-3">
      <div
        v-for="entry in sortedHistory"
        :key="entry.id"
        class="card"
      >
        <div class="flex items-start justify-between mb-2">
          <div class="flex items-center gap-2">
            <span class="text-xs text-surface-500">{{ formatDate(entry.timestamp) }}</span>
            <span
              v-if="entry.favorite"
              class="text-chrient-gold"
            >⭐</span>
          </div>
          <div class="flex gap-1">
            <button
              @click="toggleFavorite(entry.id)"
              class="btn-ghost p-1.5 text-sm"
            >
              {{ entry.favorite ? '⭐' : '☆' }}
            </button>
            <button
              @click="handleCopy(entry.prompt.mainPrompt)"
              class="btn-ghost p-1.5 text-sm"
            >
              {{ copied ? '✓' : '📋' }}
            </button>
            <button
              @click="removeFromHistory(entry.id)"
              class="btn-ghost p-1.5 text-sm text-red-400"
            >
              🗑️
            </button>
          </div>
        </div>

        <p class="text-sm text-surface-300 line-clamp-3 font-mono">
          {{ entry.prompt.mainPrompt }}
        </p>

        <div class="flex items-center gap-2 mt-3 pt-3 border-t border-surface-800">
          <span class="text-xs px-2 py-0.5 bg-surface-800 rounded text-surface-400">
            {{ entry.prompt.modelSettings.model }}
          </span>
          <span class="text-xs text-surface-500">
            G: {{ entry.prompt.modelSettings.guidance }}
          </span>
          <span class="text-xs text-surface-500">
            S: {{ entry.prompt.modelSettings.steps }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
