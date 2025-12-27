<script setup lang="ts">
import { computed } from 'vue'
import { undesiredPresets } from '@/data/presets'
import type { TokenBudget, TokenStatus } from '@/types/enhancer'

const props = defineProps<{
  prompt: string
  undesiredPreset: string
  customUndesired: string
  model: string
  guidance: number
  steps: number
  estimatedTokens: number
  copied: boolean
  // New enhancement props
  tokenBudget?: TokenBudget
  enhancedPrompt?: string
  showEnhanced?: boolean
  changesCount?: number
}>()

defineEmits<{
  (e: 'copy'): void
  (e: 'copy-with-uc'): void
  (e: 'copy-all'): void
  (e: 'update-preset', preset: string): void
  (e: 'toggle-enhanced'): void
}>()

// Max tokens for NovelAI
const maxTokens = 512
const optimalTokens = 225

// Token percentage
const tokenPercentage = computed(() => {
  return Math.min((props.estimatedTokens / maxTokens) * 100, 100)
})

// Token status with emoji
const tokenStatus = computed<{ emoji: string; status: TokenStatus; label: string }>(() => {
  const count = props.tokenBudget?.count ?? props.estimatedTokens
  if (count <= 150) return { emoji: '🟢', status: 'optimal', label: 'Optimal' }
  if (count <= 225) return { emoji: '🟡', status: 'good', label: 'Good' }
  if (count <= 350) return { emoji: '🟠', status: 'warning', label: 'Getting long' }
  return { emoji: '🔴', status: 'danger', label: 'Too long' }
})

// Token color based on usage
const tokenColor = computed(() => {
  const status = tokenStatus.value.status
  switch (status) {
    case 'optimal': return 'text-green-400'
    case 'good': return 'text-chrient-gold'
    case 'warning': return 'text-orange-400'
    case 'danger': return 'text-red-400'
    default: return 'text-chrient-gold'
  }
})

// Token bar color
const tokenBarColor = computed(() => {
  const status = tokenStatus.value.status
  switch (status) {
    case 'optimal': return 'bg-green-400'
    case 'good': return 'bg-chrient-gold'
    case 'warning': return 'bg-orange-400'
    case 'danger': return 'bg-red-400'
    default: return 'bg-chrient-gold'
  }
})

// Get undesired content
const undesiredContent = computed(() => {
  const preset = undesiredPresets.find(p => p.id === props.undesiredPreset)
  let content = preset?.tags || ''

  if (props.customUndesired.trim()) {
    content = content
      ? `${content}, ${props.customUndesired.trim()}`
      : props.customUndesired.trim()
  }

  return content
})

// Filtered presets (non-NSFW only shown here)
const availablePresets = computed(() => {
  return undesiredPresets.filter(p => !p.nsfw)
})

// Warnings/tips based on prompt
const warnings = computed(() => {
  const result: { type: 'warning' | 'tip'; message: string }[] = []
  const promptLower = props.prompt.toLowerCase()

  // Check for conflicting tags
  const hairColors = ['blonde', 'black hair', 'brown hair', 'red hair', 'white hair', 'silver hair', 'blue hair', 'pink hair', 'purple hair', 'green hair']
  const selectedHairColors = hairColors.filter(c => promptLower.includes(c))
  if (selectedHairColors.length > 1) {
    result.push({
      type: 'warning',
      message: `Multiple hair colors detected: ${selectedHairColors.join(', ')}. This may cause color bleeding.`
    })
  }

  // Check for multiple characters without proper framing
  if (promptLower.includes('2girls') || promptLower.includes('2boys') || promptLower.includes('multiple')) {
    if (!promptLower.includes('character focus') && !promptLower.includes('solo focus')) {
      result.push({
        type: 'tip',
        message: 'Multiple characters detected. Consider adding "character focus" for better results.'
      })
    }
  }

  // Check token count
  if (props.estimatedTokens > maxTokens * 0.9) {
    result.push({
      type: 'warning',
      message: 'Prompt is near token limit. Some tags may be truncated.'
    })
  }

  // Check for quality tags
  if (!promptLower.includes('masterpiece') && !promptLower.includes('best quality') && !promptLower.includes('very aesthetic')) {
    result.push({
      type: 'tip',
      message: 'Consider adding quality tags like "masterpiece" or "very aesthetic" for better results.'
    })
  }

  return result
})

// Format prompt for display (highlight special syntax)
const formattedPrompt = computed(() => {
  if (!props.prompt) return ''
  return formatPromptDisplay(props.prompt)
})

// Format any prompt string with syntax highlighting
function formatPromptDisplay(prompt: string): string {
  if (!prompt) return ''

  return prompt
    // Numerical weight syntax (e.g., 1.2::tag::)
    .replace(/(\d+\.?\d*)::([^:]+)::/g, '<span class="emphasis-weight">$1::$2::</span>')
    // Double braces (strong emphasis)
    .replace(/\{\{([^}]+)\}\}/g, '<span class="emphasis-strong">{{$1}}</span>')
    // Single braces (medium emphasis)
    .replace(/\{([^}]+)\}/g, '<span class="emphasis-medium">{$1}</span>')
    // Square brackets (weak/de-emphasis)
    .replace(/\[([^\]]+)\]/g, '<span class="emphasis-weak">[$1]</span>')
}
</script>

<template>
  <div class="live-preview h-full flex flex-col bg-surface-900 border-l border-surface-800">
    <!-- Header -->
    <div class="p-3 border-b border-surface-800 flex-shrink-0">
      <h2 class="text-sm font-semibold text-surface-300 uppercase tracking-wider">
        Live Preview
      </h2>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto p-3 space-y-4">
      <!-- Token Counter (Enhanced) -->
      <div class="card-preview">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs text-surface-500">Token Budget</span>
          <div class="flex items-center gap-2">
            <span class="text-lg">{{ tokenStatus.emoji }}</span>
            <span :class="['text-sm font-mono font-medium', tokenColor]">
              {{ tokenBudget?.count ?? estimatedTokens }}/{{ maxTokens }}
            </span>
          </div>
        </div>

        <!-- Token bar with optimal zone indicator -->
        <div class="relative h-3 bg-surface-800 rounded-full overflow-hidden">
          <!-- Optimal zone marker -->
          <div
            class="absolute top-0 bottom-0 w-px bg-green-400/50 z-10"
            :style="{ left: `${(optimalTokens / maxTokens) * 100}%` }"
          />
          <!-- Progress bar -->
          <div
            class="h-full transition-all duration-300 rounded-full"
            :class="tokenBarColor"
            :style="{ width: `${tokenPercentage}%` }"
          />
        </div>

        <!-- Status label -->
        <div class="flex items-center justify-between mt-2">
          <span :class="['text-xs', tokenColor]">{{ tokenStatus.label }}</span>
          <span class="text-xs text-surface-600">Optimal: ~{{ optimalTokens }}</span>
        </div>

        <!-- Token Breakdown (if available) -->
        <div v-if="tokenBudget?.breakdown" class="mt-3 pt-3 border-t border-surface-700/50">
          <div class="text-xs text-surface-500 mb-2">Breakdown</div>
          <div class="grid grid-cols-2 gap-1 text-xs">
            <div v-if="tokenBudget.breakdown.quality > 0" class="flex justify-between">
              <span class="text-surface-500">Quality</span>
              <span class="text-surface-400 font-mono">{{ tokenBudget.breakdown.quality }}</span>
            </div>
            <div v-if="tokenBudget.breakdown.subject > 0" class="flex justify-between">
              <span class="text-surface-500">Subject</span>
              <span class="text-surface-400 font-mono">{{ tokenBudget.breakdown.subject }}</span>
            </div>
            <div v-if="tokenBudget.breakdown.features > 0" class="flex justify-between">
              <span class="text-surface-500">Features</span>
              <span class="text-surface-400 font-mono">{{ tokenBudget.breakdown.features }}</span>
            </div>
            <div v-if="tokenBudget.breakdown.details > 0" class="flex justify-between">
              <span class="text-surface-500">Details</span>
              <span class="text-surface-400 font-mono">{{ tokenBudget.breakdown.details }}</span>
            </div>
            <div v-if="tokenBudget.breakdown.scene > 0" class="flex justify-between">
              <span class="text-surface-500">Scene</span>
              <span class="text-surface-400 font-mono">{{ tokenBudget.breakdown.scene }}</span>
            </div>
            <div v-if="tokenBudget.breakdown.style > 0" class="flex justify-between">
              <span class="text-surface-500">Style</span>
              <span class="text-surface-400 font-mono">{{ tokenBudget.breakdown.style }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Enhancement Indicator -->
      <div v-if="changesCount && changesCount > 0" class="card-preview bg-chrient-gold/5 border-chrient-gold/20">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-chrient-gold">✨</span>
            <span class="text-xs text-chrient-gold">{{ changesCount }} enhancements applied</span>
          </div>
          <button
            @click="$emit('toggle-enhanced')"
            class="text-xs text-chrient-gold-light hover:text-chrient-gold transition-colors"
          >
            {{ showEnhanced ? 'View Original' : 'View Enhanced' }}
          </button>
        </div>
      </div>

      <!-- Estimated Settings -->
      <div class="card-preview">
        <div class="text-xs text-surface-500 mb-2">Recommended Settings</div>
        <div class="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span class="text-surface-500">Steps:</span>
            <span class="text-surface-200 ml-1">{{ steps }}</span>
          </div>
          <div>
            <span class="text-surface-500">Guidance:</span>
            <span class="text-surface-200 ml-1">{{ guidance }}</span>
          </div>
        </div>
      </div>

      <!-- Warnings & Tips -->
      <div v-if="warnings.length > 0" class="space-y-2">
        <div
          v-for="(warning, index) in warnings"
          :key="index"
          :class="[
            'p-2 rounded-lg text-xs',
            warning.type === 'warning'
              ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
              : 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
          ]"
        >
          <span>{{ warning.type === 'warning' ? '⚠️' : '💡' }}</span>
          {{ warning.message }}
        </div>
      </div>

      <!-- Copy Actions -->
      <div class="space-y-2">
        <button
          @click="$emit('copy')"
          class="w-full btn-primary text-sm py-2"
        >
          {{ copied ? '✓ Copied!' : '📋 Copy Prompt' }}
        </button>
        <button
          @click="$emit('copy-with-uc')"
          class="w-full btn-secondary text-sm py-2"
        >
          📋 Copy with UC
        </button>
        <button
          @click="$emit('copy-all')"
          class="w-full btn-ghost text-sm py-2 border border-surface-700"
        >
          📋 Copy All (+ Settings)
        </button>
      </div>

      <!-- Undesired Content -->
      <div class="card-preview">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs text-surface-500">Undesired Content</span>
          <select
            :value="undesiredPreset"
            @change="$emit('update-preset', ($event.target as HTMLSelectElement).value)"
            class="text-xs bg-surface-800 border border-surface-700 rounded px-2 py-1 text-surface-300
                   focus:outline-none focus:border-chrient-gold"
          >
            <option
              v-for="preset in availablePresets"
              :key="preset.id"
              :value="preset.id"
            >
              {{ preset.name }}
            </option>
          </select>
        </div>
        <div class="text-xs text-surface-400 max-h-24 overflow-y-auto">
          {{ undesiredContent || 'No undesired content set' }}
        </div>
      </div>

      <!-- Prompt Preview -->
      <div class="card-preview">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs text-surface-500">
            {{ showEnhanced && enhancedPrompt ? 'Enhanced Prompt' : 'Generated Prompt' }}
          </span>
          <button
            v-if="enhancedPrompt && enhancedPrompt !== prompt"
            @click="$emit('toggle-enhanced')"
            class="text-xs px-2 py-0.5 rounded bg-surface-700 text-surface-400 hover:text-chrient-gold transition-colors"
          >
            {{ showEnhanced ? 'Raw' : 'Enhanced' }}
          </button>
        </div>
        <div
          v-if="showEnhanced && enhancedPrompt"
          class="text-sm text-surface-300 font-mono leading-relaxed break-words"
          v-html="formatPromptDisplay(enhancedPrompt)"
        />
        <div
          v-else-if="prompt"
          class="text-sm text-surface-300 font-mono leading-relaxed break-words"
          v-html="formattedPrompt"
        />
        <div v-else class="text-sm text-surface-600 italic">
          Start adding tags to build your prompt...
        </div>
      </div>
    </div>

    <!-- Keyboard Shortcuts Hint -->
    <div class="p-2 border-t border-surface-800 text-xs text-surface-600 hidden lg:block">
      <div class="flex items-center justify-center gap-4">
        <span><kbd class="kbd">Ctrl+C</kbd> Copy</span>
        <span><kbd class="kbd">Ctrl+R</kbd> Random</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-preview {
  @apply bg-surface-800/50 rounded-lg p-3 border border-surface-700/50;
}

.kbd {
  @apply px-1.5 py-0.5 bg-surface-700 rounded text-surface-400 font-mono;
}

.emphasis-strong {
  @apply text-chrient-gold font-semibold;
}

.emphasis-medium {
  @apply text-chrient-gold-light;
}

.emphasis-weak {
  @apply text-surface-500;
}

.emphasis-weight {
  @apply text-purple-400;
}
</style>
