<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTemplates } from '@/composables/useStorage'
import { stylePresets } from '@/data/presets'

const router = useRouter()
const { templates, deleteTemplate } = useTemplates()

const activeTab = ref<'saved' | 'presets'>('presets')

const formatDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString()
}

const usePreset = (preset: typeof stylePresets[0]) => {
  // Navigate to generator with preset tags
  // This would need integration with the generator state
  router.push({
    path: '/',
    query: { preset: preset.id }
  })
}
</script>

<template>
  <div class="px-4 pt-4">
    <!-- Header -->
    <header class="mb-6">
      <h1 class="text-2xl font-bold">Templates</h1>
      <p class="text-sm text-surface-400">Quick start presets & saved templates</p>
    </header>

    <!-- Tabs -->
    <div class="flex gap-2 mb-6">
      <button
        @click="activeTab = 'presets'"
        :class="[
          'flex-1 py-2 rounded-xl font-medium transition-all',
          activeTab === 'presets'
            ? 'bg-chrient-gold text-surface-900'
            : 'bg-surface-800 text-surface-300'
        ]"
      >
        Presets
      </button>
      <button
        @click="activeTab = 'saved'"
        :class="[
          'flex-1 py-2 rounded-xl font-medium transition-all',
          activeTab === 'saved'
            ? 'bg-chrient-gold text-surface-900'
            : 'bg-surface-800 text-surface-300'
        ]"
      >
        Saved ({{ templates.length }})
      </button>
    </div>

    <!-- Presets Tab -->
    <div v-if="activeTab === 'presets'" class="space-y-4">
      <!-- Hoyoverse Style -->
      <div>
        <h3 class="section-title mb-3">Hoyoverse Style</h3>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="preset in stylePresets.filter(p => p.category === 'hoyoverse')"
            :key="preset.id"
            @click="usePreset(preset)"
            class="card text-left hover:border-chrient-gold transition-colors"
          >
            <div class="font-medium mb-1">{{ preset.name }}</div>
            <div class="text-xs text-surface-400 line-clamp-2">
              {{ preset.tags.slice(0, 3).join(', ') }}
            </div>
          </button>
        </div>
      </div>

      <!-- General Presets -->
      <div>
        <h3 class="section-title mb-3">General</h3>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="preset in stylePresets.filter(p => p.category === 'general')"
            :key="preset.id"
            @click="usePreset(preset)"
            class="card text-left hover:border-chrient-gold transition-colors"
          >
            <div class="font-medium mb-1">{{ preset.name }}</div>
            <div class="text-xs text-surface-400 line-clamp-2">
              {{ preset.tags.slice(0, 3).join(', ') }}
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Saved Templates Tab -->
    <div v-else>
      <!-- Empty State -->
      <div
        v-if="templates.length === 0"
        class="flex flex-col items-center justify-center py-20 text-center"
      >
        <div class="text-5xl mb-4">📁</div>
        <h2 class="text-lg font-semibold mb-2">No Saved Templates</h2>
        <p class="text-sm text-surface-400">
          Save your favorite configurations as templates
        </p>
      </div>

      <!-- Templates List -->
      <div v-else class="space-y-3">
        <div
          v-for="template in templates"
          :key="template.id"
          class="card"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h3 class="font-semibold">{{ template.name }}</h3>
              <p class="text-sm text-surface-400 mt-0.5">{{ template.description }}</p>
              <p class="text-xs text-surface-500 mt-2">
                Created: {{ formatDate(template.createdAt) }}
              </p>
            </div>
            <div class="flex gap-1">
              <button class="btn-ghost p-1.5 text-chrient-gold">
                ➔
              </button>
              <button
                @click="deleteTemplate(template.id)"
                class="btn-ghost p-1.5 text-red-400"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
