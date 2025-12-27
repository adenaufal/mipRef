<script setup lang="ts">
import { ref, computed } from 'vue'
import type { EnhancementSettings, RepetitionLevel, PromptChange } from '@/types/enhancer'
import { qualityPresets } from '@/composables/usePromptEnhancer'

const props = defineProps<{
  settings: EnhancementSettings
  changes?: PromptChange[]
  originalPrompt?: string
  enhancedPrompt?: string
}>()

const emit = defineEmits<{
  (e: 'update:settings', settings: EnhancementSettings): void
  (e: 'apply-enhancements'): void
}>()

// Local expanded states
const showAdvanced = ref(false)
const showChanges = ref(false)

// Quality preset options
const qualityPresetOptions = computed(() => {
  return Object.values(qualityPresets)
})

// Repetition level options
const repetitionLevels: { value: RepetitionLevel; label: string; description: string }[] = [
  { value: 'none', label: 'None', description: 'No repetition' },
  { value: 'light', label: 'Light', description: '1 variation per concept' },
  { value: 'medium', label: 'Medium', description: '2 variations per concept' },
  { value: 'strong', label: 'Strong', description: '3 variations per concept' }
]

// Update individual setting
function updateSetting<K extends keyof EnhancementSettings>(key: K, value: EnhancementSettings[K]) {
  emit('update:settings', {
    ...props.settings,
    [key]: value
  })
}

// Update repetition sub-setting
function updateRepetitionSetting(key: keyof EnhancementSettings['smartRepetition'], value: boolean | RepetitionLevel) {
  emit('update:settings', {
    ...props.settings,
    smartRepetition: {
      ...props.settings.smartRepetition,
      [key]: value
    }
  })
}

// Format emphasis multiplier for display
function formatEmphasis(value: number): string {
  return `${value.toFixed(1)}x`
}

// Count changes by type
const changesSummary = computed(() => {
  if (!props.changes) return {}
  return props.changes.reduce((acc, change) => {
    acc[change.type] = (acc[change.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)
})
</script>

<template>
  <div class="prompt-enhancer-panel bg-surface-850 rounded-xl border border-surface-700">
    <!-- Header -->
    <div class="p-4 border-b border-surface-700">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-lg">✨</span>
          <h3 class="font-medium text-surface-200">Prompt Enhancements</h3>
        </div>
        <button
          @click="$emit('apply-enhancements')"
          class="btn-primary text-xs px-3 py-1.5"
        >
          Apply
        </button>
      </div>
    </div>

    <!-- Quick Toggles -->
    <div class="p-4 space-y-3">
      <!-- Auto-Weight Toggle -->
      <label class="flex items-center justify-between cursor-pointer group">
        <div class="flex items-center gap-2">
          <span class="text-sm text-surface-400 group-hover:text-surface-300">Auto-weight critical tags</span>
          <span class="text-xs text-surface-600">{keyword}</span>
        </div>
        <div class="relative">
          <input
            type="checkbox"
            :checked="settings.autoWeight"
            @change="updateSetting('autoWeight', ($event.target as HTMLInputElement).checked)"
            class="sr-only peer"
          />
          <div class="w-9 h-5 bg-surface-700 rounded-full peer peer-checked:bg-chrient-gold transition-colors"></div>
          <div class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
        </div>
      </label>

      <!-- Smart Repetition Toggle -->
      <label class="flex items-center justify-between cursor-pointer group">
        <div class="flex items-center gap-2">
          <span class="text-sm text-surface-400 group-hover:text-surface-300">Smart repetition</span>
          <span class="text-xs text-surface-600">{{ settings.smartRepetition.level }}</span>
        </div>
        <div class="relative">
          <input
            type="checkbox"
            :checked="settings.smartRepetition.level !== 'none'"
            @change="updateRepetitionSetting('level', ($event.target as HTMLInputElement).checked ? 'light' : 'none')"
            class="sr-only peer"
          />
          <div class="w-9 h-5 bg-surface-700 rounded-full peer peer-checked:bg-chrient-gold transition-colors"></div>
          <div class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
        </div>
      </label>

      <!-- Auto-Negative Toggle -->
      <label class="flex items-center justify-between cursor-pointer group">
        <span class="text-sm text-surface-400 group-hover:text-surface-300">Auto-generate negatives</span>
        <div class="relative">
          <input
            type="checkbox"
            :checked="settings.autoNegatives"
            @change="updateSetting('autoNegatives', ($event.target as HTMLInputElement).checked)"
            class="sr-only peer"
          />
          <div class="w-9 h-5 bg-surface-700 rounded-full peer peer-checked:bg-chrient-gold transition-colors"></div>
          <div class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
        </div>
      </label>

      <!-- Booru Normalization Toggle -->
      <label class="flex items-center justify-between cursor-pointer group">
        <span class="text-sm text-surface-400 group-hover:text-surface-300">Booru tag normalization</span>
        <div class="relative">
          <input
            type="checkbox"
            :checked="settings.booruNormalization"
            @change="updateSetting('booruNormalization', ($event.target as HTMLInputElement).checked)"
            class="sr-only peer"
          />
          <div class="w-9 h-5 bg-surface-700 rounded-full peer peer-checked:bg-chrient-gold transition-colors"></div>
          <div class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
        </div>
      </label>
    </div>

    <!-- Repetition Level Slider -->
    <div v-if="settings.smartRepetition.level !== 'none'" class="px-4 pb-4">
      <div class="text-xs text-surface-500 mb-2">Repetition Level</div>
      <div class="flex gap-1">
        <button
          v-for="level in repetitionLevels.filter(l => l.value !== 'none')"
          :key="level.value"
          @click="updateRepetitionSetting('level', level.value)"
          :class="[
            'flex-1 px-2 py-1.5 text-xs rounded-lg transition-colors',
            settings.smartRepetition.level === level.value
              ? 'bg-chrient-gold text-surface-900 font-medium'
              : 'bg-surface-700 text-surface-400 hover:bg-surface-600'
          ]"
        >
          {{ level.label }}
        </button>
      </div>

      <!-- Repetition Categories -->
      <div class="grid grid-cols-2 gap-2 mt-3">
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            :checked="settings.smartRepetition.repeatHair"
            @change="updateRepetitionSetting('repeatHair', ($event.target as HTMLInputElement).checked)"
            class="w-3.5 h-3.5 rounded border-surface-600 bg-surface-700 text-chrient-gold focus:ring-chrient-gold/50"
          />
          <span class="text-xs text-surface-400">Hair</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            :checked="settings.smartRepetition.repeatBody"
            @change="updateRepetitionSetting('repeatBody', ($event.target as HTMLInputElement).checked)"
            class="w-3.5 h-3.5 rounded border-surface-600 bg-surface-700 text-chrient-gold focus:ring-chrient-gold/50"
          />
          <span class="text-xs text-surface-400">Body</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            :checked="settings.smartRepetition.repeatClothing"
            @change="updateRepetitionSetting('repeatClothing', ($event.target as HTMLInputElement).checked)"
            class="w-3.5 h-3.5 rounded border-surface-600 bg-surface-700 text-chrient-gold focus:ring-chrient-gold/50"
          />
          <span class="text-xs text-surface-400">Clothing</span>
        </label>
        <label class="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            :checked="settings.smartRepetition.repeatPose"
            @change="updateRepetitionSetting('repeatPose', ($event.target as HTMLInputElement).checked)"
            class="w-3.5 h-3.5 rounded border-surface-600 bg-surface-700 text-chrient-gold focus:ring-chrient-gold/50"
          />
          <span class="text-xs text-surface-400">Pose</span>
        </label>
      </div>
    </div>

    <!-- Emphasis Slider -->
    <div v-if="settings.autoWeight" class="px-4 pb-4">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs text-surface-500">Emphasis Multiplier</span>
        <span class="text-xs font-mono text-chrient-gold">{{ formatEmphasis(settings.autoWeightLevel) }}</span>
      </div>
      <input
        type="range"
        :value="settings.autoWeightLevel"
        @input="updateSetting('autoWeightLevel', parseFloat(($event.target as HTMLInputElement).value))"
        min="0.8"
        max="1.5"
        step="0.1"
        class="w-full h-2 bg-surface-700 rounded-lg appearance-none cursor-pointer accent-chrient-gold"
      />
      <div class="flex justify-between text-xs text-surface-600 mt-1">
        <span>0.8x</span>
        <span>1.0x</span>
        <span>1.5x</span>
      </div>
    </div>

    <!-- Quality Preset Selector -->
    <div class="px-4 pb-4">
      <div class="text-xs text-surface-500 mb-2">Quality Preset</div>
      <div class="grid grid-cols-2 gap-2">
        <button
          v-for="preset in qualityPresetOptions"
          :key="preset.id"
          @click="updateSetting('qualityPreset', preset.id)"
          :class="[
            'px-3 py-2 text-xs rounded-lg border transition-all text-left',
            settings.qualityPreset === preset.id
              ? 'bg-chrient-gold/10 border-chrient-gold text-chrient-gold'
              : 'bg-surface-800 border-surface-700 text-surface-400 hover:border-surface-600'
          ]"
        >
          <div class="font-medium">{{ preset.name }}</div>
        </button>
      </div>
    </div>

    <!-- Advanced Toggle -->
    <button
      @click="showAdvanced = !showAdvanced"
      class="w-full px-4 py-2 flex items-center justify-between text-xs text-surface-500 hover:text-surface-400 border-t border-surface-700"
    >
      <span>Advanced Options</span>
      <svg
        :class="['w-4 h-4 transition-transform', showAdvanced && 'rotate-180']"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Advanced Options -->
    <div v-if="showAdvanced" class="px-4 pb-4 space-y-3">
      <!-- Before/After Preview Toggle -->
      <label class="flex items-center justify-between cursor-pointer group">
        <span class="text-sm text-surface-400 group-hover:text-surface-300">Show before/after preview</span>
        <div class="relative">
          <input
            type="checkbox"
            :checked="settings.showBeforeAfter"
            @change="updateSetting('showBeforeAfter', ($event.target as HTMLInputElement).checked)"
            class="sr-only peer"
          />
          <div class="w-9 h-5 bg-surface-700 rounded-full peer peer-checked:bg-chrient-gold transition-colors"></div>
          <div class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
        </div>
      </label>
    </div>

    <!-- Changes List -->
    <div v-if="changes && changes.length > 0" class="border-t border-surface-700">
      <button
        @click="showChanges = !showChanges"
        class="w-full px-4 py-2 flex items-center justify-between text-xs hover:bg-surface-800/50"
      >
        <div class="flex items-center gap-2">
          <span class="text-chrient-gold">{{ changes.length }} changes</span>
          <div class="flex gap-1">
            <span v-if="changesSummary.weight" class="px-1.5 py-0.5 bg-purple-500/20 text-purple-400 rounded text-xs">
              {{ changesSummary.weight }} weight
            </span>
            <span v-if="changesSummary.repeat" class="px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs">
              {{ changesSummary.repeat }} repeat
            </span>
            <span v-if="changesSummary.normalize" class="px-1.5 py-0.5 bg-green-500/20 text-green-400 rounded text-xs">
              {{ changesSummary.normalize }} normalize
            </span>
          </div>
        </div>
        <svg
          :class="['w-4 h-4 text-surface-500 transition-transform', showChanges && 'rotate-180']"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div v-if="showChanges" class="px-4 pb-4 space-y-2 max-h-48 overflow-y-auto">
        <div
          v-for="(change, index) in changes"
          :key="index"
          class="text-xs p-2 rounded bg-surface-800"
        >
          <div class="flex items-center gap-2 mb-1">
            <span
              :class="[
                'px-1.5 py-0.5 rounded text-xs font-medium',
                {
                  'bg-purple-500/20 text-purple-400': change.type === 'weight',
                  'bg-blue-500/20 text-blue-400': change.type === 'repeat',
                  'bg-green-500/20 text-green-400': change.type === 'normalize',
                  'bg-orange-500/20 text-orange-400': change.type === 'reorder',
                  'bg-red-500/20 text-red-400': change.type === 'negative'
                }
              ]"
            >
              {{ change.type }}
            </span>
            <span class="text-surface-500">{{ change.reason }}</span>
          </div>
          <div v-if="change.original && change.type !== 'negative'" class="font-mono">
            <span class="text-surface-500">{{ change.original }}</span>
            <span class="text-surface-600 mx-1">→</span>
            <span class="text-chrient-gold">{{ change.result }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Before/After Preview -->
    <div v-if="settings.showBeforeAfter && originalPrompt && enhancedPrompt && originalPrompt !== enhancedPrompt" class="border-t border-surface-700 p-4">
      <div class="text-xs text-surface-500 mb-2">Before → After</div>
      <div class="space-y-2">
        <div class="p-2 rounded bg-surface-800/50 border border-surface-700">
          <div class="text-xs text-surface-500 mb-1">Before:</div>
          <div class="text-xs font-mono text-surface-400 break-words">
            {{ originalPrompt.slice(0, 100) }}{{ originalPrompt.length > 100 ? '...' : '' }}
          </div>
        </div>
        <div class="p-2 rounded bg-chrient-gold/5 border border-chrient-gold/20">
          <div class="text-xs text-chrient-gold mb-1">After:</div>
          <div class="text-xs font-mono text-surface-300 break-words">
            {{ enhancedPrompt.slice(0, 100) }}{{ enhancedPrompt.length > 100 ? '...' : '' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg-surface-850 {
  background-color: rgb(20 20 20);
}
</style>
