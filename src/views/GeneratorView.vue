<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useGenerator } from '@/composables/useGenerator'
import { useClipboard } from '@/composables/useClipboard'
import { useSettings, useEnhancementSettings } from '@/composables/useStorage'
import { useKeyboardShortcuts, createGeneratorShortcuts } from '@/composables/useKeyboardShortcuts'
import { useUndoRedo } from '@/composables/useUndoRedo'
import { usePromptEnhancer } from '@/composables/usePromptEnhancer'
import { modelOptions, undesiredPresets, randomPresets } from '@/data/presets'
import ModelSelector from '@/components/ModelSelector.vue'
import TagSection from '@/components/TagSection.vue'
import PromptPreview from '@/components/PromptPreview.vue'
import RandomModal from '@/components/RandomModal.vue'
import NsfwConfirmModal from '@/components/NsfwConfirmModal.vue'
import TagBrowser from '@/components/TagBrowser.vue'
import PromptBuilder from '@/components/PromptBuilder.vue'
import LivePreview from '@/components/LivePreview.vue'
import CommandPalette from '@/components/CommandPalette.vue'
import PromptEnhancerPanel from '@/components/PromptEnhancerPanel.vue'
import type { Command } from '@/components/CommandPalette.vue'
import type { EnhancedPrompt } from '@/types/enhancer'
import { allTags } from '@/data/tags'

const {
  config,
  buildPrompt,
  undesiredContent,
  modelSettings,
  resetConfig,
  toggleTag,
  randomizeCategories,
  generateFullRandom,
  saveToHistory,
  estimatedTokens
} = useGenerator()

const { copyToClipboard, copyPromptWithSettings, copied } = useClipboard()
const { settings, enableNsfw } = useSettings()
const { enhancementSettings, updateEnhancementSettings } = useEnhancementSettings()

// Prompt enhancer
const {
  settings: enhancerSettings,
  enhancePrompt
} = usePromptEnhancer()

// Sync enhancement settings from storage to enhancer
watch(enhancementSettings, (newSettings) => {
  Object.assign(enhancerSettings.value, newSettings)
}, { immediate: true, deep: true })

// Enhanced prompt state
const enhancedPromptData = ref<EnhancedPrompt | null>(null)
const showEnhanced = ref(true)
const showEnhancerPanel = ref(true)

// Compute enhanced prompt when buildPrompt changes
const computeEnhancedPrompt = () => {
  if (buildPrompt.value) {
    enhancedPromptData.value = enhancePrompt(buildPrompt.value, settings.value.nsfwEnabled)
  } else {
    enhancedPromptData.value = null
  }
}

// Watch for prompt changes and re-enhance
watch(buildPrompt, computeEnhancedPrompt, { immediate: true })
watch(() => enhancerSettings.value, computeEnhancedPrompt, { deep: true })

// Get the prompt to use for copying (enhanced or original based on toggle)
const promptToUse = computed(() => {
  if (showEnhanced.value && enhancedPromptData.value) {
    return enhancedPromptData.value.enhanced
  }
  return buildPrompt.value
})

// Get enhanced undesired content
const enhancedUndesiredContent = computed(() => {
  let content = undesiredContent.value
  if (enhancedPromptData.value && enhancerSettings.value.autoNegatives) {
    const autoNegatives = enhancedPromptData.value.negatives.join(', ')
    if (autoNegatives) {
      content = content ? `${content}, ${autoNegatives}` : autoNegatives
    }
  }
  return content
})

// Undo/Redo for config
const { canUndo, canRedo, undo, redo } = useUndoRedo(config, { debounceMs: 500 })

// Modals
const showRandomModal = ref(false)
const showNsfwConfirm = ref(false)
const showPromptPreview = ref(false)
const showCommandPalette = ref(false)
const isShaking = ref(false)

// Desktop layout state
const isDesktop = ref(false)
const tagBrowserCollapsed = ref(false)

// Check screen size
const checkScreenSize = () => {
  isDesktop.value = window.innerWidth >= 1024
}

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})

// Handle NSFW toggle
const handleNsfwToggle = () => {
  if (!settings.value.nsfwEnabled) {
    if (!settings.value.nsfwConfirmed) {
      showNsfwConfirm.value = true
    } else {
      settings.value.nsfwEnabled = true
      config.value.mode = 'nsfw'
    }
  } else {
    settings.value.nsfwEnabled = false
    config.value.mode = 'guided'
  }
}

const confirmNsfw = () => {
  enableNsfw()
  config.value.mode = 'nsfw'
  showNsfwConfirm.value = false
}

// Quick random
const handleSurpriseMe = () => {
  isShaking.value = true
  generateFullRandom(settings.value.nsfwEnabled)
  setTimeout(() => {
    isShaking.value = false
    showPromptPreview.value = true
  }, 500)
}

// Copy handlers - use enhanced prompt when available
const handleCopy = async () => {
  await copyToClipboard(promptToUse.value)
  saveToHistory()
}

const handleCopyWithUC = async () => {
  const text = `Prompt:\n${promptToUse.value}\n\nUndesired Content:\n${enhancedUndesiredContent.value}`
  await copyToClipboard(text)
  saveToHistory()
}

const handleCopyAll = async () => {
  await copyPromptWithSettings(
    promptToUse.value,
    enhancedUndesiredContent.value,
    modelSettings.value.model,
    modelSettings.value.guidance,
    modelSettings.value.steps
  )
  saveToHistory()
}

// Toggle enhanced view
const handleToggleEnhanced = () => {
  showEnhanced.value = !showEnhanced.value
}

// Handle enhancement settings update
const handleEnhancementSettingsUpdate = (newSettings: typeof enhancerSettings.value) => {
  Object.assign(enhancerSettings.value, newSettings)
  updateEnhancementSettings(newSettings)
}

// Show preview
const handlePreview = () => {
  showPromptPreview.value = true
}

// Tag sections configuration (for mobile view)
const sfwSections = computed(() => [
  {
    id: 'character',
    title: 'Character',
    subsections: [
      { key: 'gender', title: 'Gender', tags: allTags.gender },
      { key: 'bodyType', title: 'Body Type', tags: allTags.bodyType },
      { key: 'species', title: 'Species', tags: allTags.species }
    ]
  },
  {
    id: 'hair',
    title: 'Hair',
    subsections: [
      { key: 'hairColor', title: 'Color', tags: allTags.hairColor },
      { key: 'hairLength', title: 'Length', tags: allTags.hairLength },
      { key: 'hairStyle', title: 'Style', tags: allTags.hairStyle }
    ]
  },
  {
    id: 'eyes',
    title: 'Eyes',
    subsections: [
      { key: 'eyeColor', title: 'Color', tags: allTags.eyeColor },
      { key: 'eyeStyle', title: 'Style', tags: allTags.eyeStyle }
    ]
  },
  {
    id: 'outfit',
    title: 'Outfit',
    subsections: [
      { key: 'clothingStyle', title: 'Clothing', tags: allTags.clothingStyle },
      { key: 'outfitDetail', title: 'Details', tags: allTags.outfitDetail },
      { key: 'accessory', title: 'Accessories', tags: allTags.accessory },
      { key: 'weapon', title: 'Weapons', tags: allTags.weapon }
    ]
  },
  {
    id: 'pose',
    title: 'Pose & Expression',
    subsections: [
      { key: 'standingPose', title: 'Standing', tags: allTags.standingPose, poseKey: 'pose' },
      { key: 'sittingPose', title: 'Sitting', tags: allTags.sittingPose, poseKey: 'pose' },
      { key: 'expression', title: 'Expression', tags: allTags.expression },
      { key: 'looking', title: 'Looking', tags: allTags.looking }
    ]
  },
  {
    id: 'composition',
    title: 'Composition',
    subsections: [
      { key: 'composition', title: 'Shot Type', tags: allTags.composition }
    ]
  },
  {
    id: 'background',
    title: 'Background',
    subsections: [
      { key: 'indoorLocation', title: 'Indoor', tags: allTags.indoorLocation, locationKey: 'location' },
      { key: 'outdoorLocation', title: 'Outdoor', tags: allTags.outdoorLocation, locationKey: 'location' },
      { key: 'time', title: 'Time', tags: allTags.time },
      { key: 'weather', title: 'Weather', tags: allTags.weather }
    ]
  },
  {
    id: 'style',
    title: 'Style & Lighting',
    subsections: [
      { key: 'lighting', title: 'Lighting', tags: allTags.lighting },
      { key: 'effect', title: 'Effects', tags: allTags.effect },
      { key: 'artStyle', title: 'Art Style', tags: allTags.artStyle }
    ]
  },
  {
    id: 'quality',
    title: 'Quality',
    subsections: [
      { key: 'quality', title: 'Quality Tags', tags: allTags.quality },
      { key: 'year', title: 'Year', tags: allTags.year, singleSelect: true, yearKey: 'yearTag' }
    ]
  }
])

const nsfwSections = computed(() => [
  {
    id: 'nsfw-body',
    title: 'Body (NSFW)',
    subsections: [
      { key: 'nsfwBody', title: 'Body Details', tags: allTags.nsfwBody }
    ]
  },
  {
    id: 'nsfw-clothing',
    title: 'Clothing State (NSFW)',
    subsections: [
      { key: 'nsfwClothing', title: 'Clothing', tags: allTags.nsfwClothing },
      { key: 'nsfwPose', title: 'Poses', tags: allTags.nsfwPose }
    ]
  },
  {
    id: 'nsfw-rating',
    title: 'Rating',
    subsections: [
      { key: 'rating', title: 'Content Rating', tags: allTags.rating.filter(t => t.nsfw), singleSelect: true, ratingKey: 'rating' }
    ]
  }
])

// Handle tag toggle based on section configuration
const handleTagToggle = (sectionKey: string, tag: string, subsection: Record<string, unknown>) => {
  const targetKey = (subsection.poseKey || subsection.locationKey || subsection.yearKey || subsection.ratingKey || sectionKey) as string

  if (subsection.singleSelect) {
    if (targetKey === 'yearTag' || targetKey === 'rating') {
      const currentVal = config.value[targetKey as keyof typeof config.value]
      if (currentVal === tag) {
        (config.value as Record<string, unknown>)[targetKey] = null
      } else {
        (config.value as Record<string, unknown>)[targetKey] = tag
      }
    }
  } else if (subsection.poseKey || subsection.locationKey) {
    toggleTag(targetKey as keyof typeof config.value, tag)
  } else {
    toggleTag(sectionKey as keyof typeof config.value, tag)
  }
}

// Check if tag is selected
const isTagSelected = (sectionKey: string, tag: string, subsection: Record<string, unknown>): boolean => {
  const targetKey = (subsection.poseKey || subsection.locationKey || subsection.yearKey || subsection.ratingKey || sectionKey) as string

  if (subsection.singleSelect) {
    return config.value[targetKey as keyof typeof config.value] === tag
  }

  const arr = config.value[targetKey as keyof typeof config.value]
  return Array.isArray(arr) && arr.includes(tag)
}

// Get all selected tags for TagBrowser
const allSelectedTags = computed(() => {
  const tags: string[] = []

  // Collect all tags from config arrays
  const arrayKeys = [
    'gender', 'bodyType', 'species', 'hairColor', 'hairLength', 'hairStyle',
    'eyeColor', 'eyeStyle', 'skin', 'clothingStyle', 'outfitDetail', 'accessory',
    'weapon', 'pose', 'expression', 'looking', 'composition', 'location',
    'time', 'weather', 'lighting', 'effect', 'artStyle', 'quality',
    'nsfwBody', 'nsfwClothing', 'nsfwPose'
  ]

  for (const key of arrayKeys) {
    const value = config.value[key as keyof typeof config.value]
    if (Array.isArray(value)) {
      tags.push(...value)
    }
  }

  // Add single-select values
  if (config.value.yearTag) tags.push(config.value.yearTag)
  if (config.value.rating) tags.push(config.value.rating)

  return tags
})

// Handle tag from TagBrowser
const handleBrowserTagToggle = (tag: string) => {
  // Find which category this tag belongs to and toggle it
  for (const section of [...sfwSections.value, ...nsfwSections.value]) {
    for (const sub of section.subsections) {
      const found = sub.tags.find((t: { name: string }) => t.name === tag)
      if (found) {
        handleTagToggle(sub.key, tag, sub)
        return
      }
    }
  }

  // If not found in predefined categories, add to custom tags
  const customTags = config.value.customTags.trim()
  if (customTags.includes(tag)) {
    // Remove from custom tags
    config.value.customTags = customTags
      .split(',')
      .map(t => t.trim())
      .filter(t => t !== tag)
      .join(', ')
  } else {
    // Add to custom tags
    config.value.customTags = customTags ? `${customTags}, ${tag}` : tag
  }
}

// Handle randomize section from PromptBuilder
const handleRandomizeSection = (categories: string[]) => {
  randomizeCategories(categories, settings.value.nsfwEnabled)
}

// Handle clear section from PromptBuilder
const handleClearSection = (category: string) => {
  const value = config.value[category as keyof typeof config.value]
  if (Array.isArray(value)) {
    (config.value as Record<string, unknown>)[category] = []
  }
}

// Command palette commands
const commands = computed<Command[]>(() => [
  {
    id: 'random-all',
    name: 'Randomize All',
    description: 'Generate a completely random prompt',
    icon: '🎲',
    category: 'Generation',
    action: handleSurpriseMe
  },
  {
    id: 'random-character',
    name: 'Randomize Character',
    description: 'Randomize character traits only',
    icon: '👤',
    category: 'Generation',
    action: () => randomizeCategories(['gender', 'bodyType', 'species'], settings.value.nsfwEnabled)
  },
  {
    id: 'random-appearance',
    name: 'Randomize Appearance',
    description: 'Randomize hair, eyes, and clothing',
    icon: '👗',
    category: 'Generation',
    action: () => randomizeCategories(['hairColor', 'hairLength', 'hairStyle', 'eyeColor', 'clothingStyle'], settings.value.nsfwEnabled)
  },
  {
    id: 'random-scene',
    name: 'Randomize Scene',
    description: 'Randomize background, time, and weather',
    icon: '🏞️',
    category: 'Generation',
    action: () => randomizeCategories(['indoorLocation', 'outdoorLocation', 'time', 'weather'], settings.value.nsfwEnabled)
  },
  {
    id: 'copy',
    name: 'Copy Prompt',
    description: 'Copy the current prompt to clipboard',
    icon: '📋',
    category: 'Clipboard',
    action: handleCopy
  },
  {
    id: 'copy-uc',
    name: 'Copy with Undesired Content',
    description: 'Copy prompt and undesired content',
    icon: '📋',
    category: 'Clipboard',
    action: handleCopyWithUC
  },
  {
    id: 'copy-all',
    name: 'Copy All',
    description: 'Copy prompt, UC, and settings',
    icon: '📋',
    category: 'Clipboard',
    action: handleCopyAll
  },
  {
    id: 'preview',
    name: 'Preview Prompt',
    description: 'Open the prompt preview modal',
    icon: '👁️',
    category: 'View',
    action: handlePreview
  },
  {
    id: 'reset',
    name: 'Reset All',
    description: 'Clear all tags and reset to defaults',
    icon: '🗑️',
    category: 'Edit',
    action: resetConfig
  },
  {
    id: 'undo',
    name: 'Undo',
    description: 'Undo last change',
    icon: '↩️',
    category: 'Edit',
    action: undo
  },
  {
    id: 'redo',
    name: 'Redo',
    description: 'Redo last undone change',
    icon: '↪️',
    category: 'Edit',
    action: redo
  },
  {
    id: 'toggle-nsfw',
    name: settings.value.nsfwEnabled ? 'Disable NSFW Mode' : 'Enable NSFW Mode',
    description: 'Toggle NSFW content',
    icon: settings.value.nsfwEnabled ? '🔒' : '🔞',
    category: 'Settings',
    action: handleNsfwToggle
  }
])

// Search input ref for focusing
const searchInputRef = ref<HTMLInputElement | null>(null)

// Keyboard shortcuts
const shortcuts = createGeneratorShortcuts({
  copy: handleCopy,
  copyWithUC: handleCopyWithUC,
  copyAll: handleCopyAll,
  random: handleSurpriseMe,
  reset: resetConfig,
  undo,
  redo,
  save: () => {
    // TODO: Implement save to template
    console.log('Save to template')
  },
  openSearch: () => {
    searchInputRef.value?.focus()
  },
  openCommandPalette: () => {
    showCommandPalette.value = true
  },
  toggleNsfw: handleNsfwToggle,
  preview: handlePreview
})

useKeyboardShortcuts(shortcuts)
</script>

<template>
  <!-- Desktop Layout (3-panel) -->
  <div v-if="isDesktop" class="desktop-layout h-[calc(100vh-64px)] flex overflow-hidden">
    <!-- Left Panel: Tag Browser -->
    <aside
      :class="[
        'flex-shrink-0 transition-all duration-300',
        tagBrowserCollapsed ? 'w-12' : 'w-72'
      ]"
    >
      <div v-if="!tagBrowserCollapsed" class="h-full">
        <TagBrowser
          :selected-tags="allSelectedTags"
          :nsfw-enabled="settings.nsfwEnabled"
          @toggle-tag="handleBrowserTagToggle"
          @add-tag="(tag) => config.customTags = config.customTags ? `${config.customTags}, ${tag}` : tag"
          @remove-tag="handleBrowserTagToggle"
        />
      </div>
      <button
        @click="tagBrowserCollapsed = !tagBrowserCollapsed"
        class="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-surface-800 border border-surface-700
               rounded-r-lg p-1 text-surface-400 hover:text-white hover:bg-surface-700 transition-colors"
        :style="{ left: tagBrowserCollapsed ? '0' : '286px' }"
      >
        {{ tagBrowserCollapsed ? '▶' : '◀' }}
      </button>
    </aside>

    <!-- Center Panel: Prompt Builder -->
    <main class="flex-1 min-w-0 border-x border-surface-800">
      <!-- Header -->
      <header class="flex items-center justify-between px-4 py-3 border-b border-surface-800 bg-surface-900/50">
        <div class="flex items-center gap-4">
          <div>
            <h1 class="text-xl font-bold text-chrient-gold">mipRef</h1>
            <p class="text-xs text-surface-500">Seed your imagination</p>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <!-- Model Selector -->
          <select
            :value="config.model"
            @change="config.model = ($event.target as HTMLSelectElement).value as 'v45-full' | 'v45-curated'"
            class="text-sm bg-surface-800 border border-surface-700 rounded-lg px-3 py-1.5 text-surface-300
                   focus:outline-none focus:border-chrient-gold cursor-pointer"
          >
            <option v-for="model in modelOptions" :key="model.id" :value="model.id">
              {{ model.name }}
            </option>
          </select>

          <!-- NSFW Toggle -->
          <button
            @click="handleNsfwToggle"
            :class="[
              'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
              settings.nsfwEnabled
                ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                : 'bg-surface-800 text-surface-400 border border-surface-700'
            ]"
          >
            {{ settings.nsfwEnabled ? '🔞 NSFW' : 'SFW 🔒' }}
          </button>

          <!-- Settings/Help -->
          <button
            @click="showCommandPalette = true"
            class="btn-icon text-sm"
            title="Command Palette (/)"
          >
            ⌘
          </button>
        </div>
      </header>

      <!-- Quick Actions -->
      <div class="flex items-center gap-2 px-4 py-2 border-b border-surface-800 bg-surface-950">
        <button
          @click="handleSurpriseMe"
          :class="['btn-primary text-sm py-2 px-4', isShaking && 'animate-shake']"
        >
          🎲 Surprise Me
        </button>
        <button
          @click="showRandomModal = true"
          class="btn-secondary text-sm py-2 px-4"
        >
          🎯 Partial Random
        </button>
        <div class="flex-1" />
        <button
          @click="undo"
          :disabled="!canUndo"
          class="btn-ghost text-sm py-2 px-3 disabled:opacity-30"
          title="Undo (Ctrl+Z)"
        >
          ↩️
        </button>
        <button
          @click="redo"
          :disabled="!canRedo"
          class="btn-ghost text-sm py-2 px-3 disabled:opacity-30"
          title="Redo (Ctrl+Y)"
        >
          ↪️
        </button>
        <button
          @click="resetConfig"
          class="btn-ghost text-sm py-2 px-3"
          title="Reset"
        >
          🗑️
        </button>
      </div>

      <!-- Prompt Builder -->
      <div class="h-[calc(100%-120px)] overflow-hidden">
        <PromptBuilder
          :config="config"
          :nsfw-enabled="settings.nsfwEnabled"
          @update:config="(c) => Object.assign(config, c)"
          @toggle-tag="(cat, tag) => toggleTag(cat as keyof typeof config, tag)"
          @randomize-section="handleRandomizeSection"
          @clear-section="handleClearSection"
        />
      </div>
    </main>

    <!-- Right Panel: Live Preview + Enhancer -->
    <aside class="w-80 flex-shrink-0 flex flex-col overflow-hidden">
      <!-- Enhancer Panel Toggle -->
      <div class="flex-shrink-0 p-2 border-b border-surface-800 bg-surface-900">
        <button
          @click="showEnhancerPanel = !showEnhancerPanel"
          class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm bg-surface-800 hover:bg-surface-700 transition-colors"
        >
          <div class="flex items-center gap-2">
            <span>✨</span>
            <span class="text-surface-300">Prompt Enhancer</span>
            <span v-if="enhancedPromptData?.changes?.length" class="text-xs text-chrient-gold">
              ({{ enhancedPromptData.changes.length }})
            </span>
          </div>
          <svg
            :class="['w-4 h-4 text-surface-500 transition-transform', showEnhancerPanel && 'rotate-180']"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <!-- Enhancer Panel (Collapsible) -->
      <div v-if="showEnhancerPanel" class="flex-shrink-0 max-h-[50%] overflow-y-auto">
        <PromptEnhancerPanel
          :settings="enhancerSettings"
          :changes="enhancedPromptData?.changes"
          :original-prompt="buildPrompt"
          :enhanced-prompt="enhancedPromptData?.enhanced"
          @update:settings="handleEnhancementSettingsUpdate"
          @apply-enhancements="computeEnhancedPrompt"
        />
      </div>

      <!-- Live Preview -->
      <div class="flex-1 min-h-0 overflow-hidden">
        <LivePreview
          :prompt="buildPrompt"
          :undesired-preset="config.undesiredPreset"
          :custom-undesired="config.customUndesired"
          :model="modelSettings.model"
          :guidance="modelSettings.guidance"
          :steps="modelSettings.steps"
          :estimated-tokens="estimatedTokens"
          :copied="copied"
          :token-budget="enhancedPromptData?.tokens"
          :enhanced-prompt="enhancedPromptData?.enhanced"
          :show-enhanced="showEnhanced"
          :changes-count="enhancedPromptData?.changes?.length"
          @copy="handleCopy"
          @copy-with-uc="handleCopyWithUC"
          @copy-all="handleCopyAll"
          @update-preset="(preset) => config.undesiredPreset = preset"
          @toggle-enhanced="handleToggleEnhanced"
        />
      </div>
    </aside>
  </div>

  <!-- Mobile Layout (original) -->
  <div v-else class="px-4 pt-4">
    <!-- Header -->
    <header class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-chrient-gold">mipRef</h1>
        <p class="text-sm text-surface-400">Seed your imagination</p>
      </div>
      <div class="flex items-center gap-2">
        <!-- Token counter with status -->
        <div
          :class="[
            'text-xs px-2 py-1 rounded flex items-center gap-1',
            enhancedPromptData?.tokens?.status === 'optimal' ? 'bg-green-500/10 text-green-400' :
            enhancedPromptData?.tokens?.status === 'good' ? 'bg-chrient-gold/10 text-chrient-gold' :
            enhancedPromptData?.tokens?.status === 'warning' ? 'bg-orange-500/10 text-orange-400' :
            enhancedPromptData?.tokens?.status === 'danger' ? 'bg-red-500/10 text-red-400' :
            'bg-surface-800 text-surface-500'
          ]"
        >
          <span v-if="enhancedPromptData?.tokens?.status === 'optimal'">🟢</span>
          <span v-else-if="enhancedPromptData?.tokens?.status === 'good'">🟡</span>
          <span v-else-if="enhancedPromptData?.tokens?.status === 'warning'">🟠</span>
          <span v-else-if="enhancedPromptData?.tokens?.status === 'danger'">🔴</span>
          ~{{ enhancedPromptData?.tokens?.count ?? estimatedTokens }}
        </div>
        <!-- Enhancement indicator -->
        <div v-if="enhancedPromptData?.changes?.length" class="text-xs text-chrient-gold bg-chrient-gold/10 px-2 py-1 rounded">
          ✨{{ enhancedPromptData.changes.length }}
        </div>
        <!-- NSFW Toggle -->
        <button
          @click="handleNsfwToggle"
          :class="[
            'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
            settings.nsfwEnabled
              ? 'bg-red-500/20 text-red-400 border border-red-500/50'
              : 'bg-surface-800 text-surface-400 border border-surface-700'
          ]"
        >
          {{ settings.nsfwEnabled ? '🔞 NSFW' : 'SFW' }}
        </button>
      </div>
    </header>

    <!-- Model Selector -->
    <ModelSelector
      :model="config.model"
      :models="modelOptions"
      @update="(val: string) => config.model = val as 'v45-full' | 'v45-curated'"
      class="mb-4"
    />

    <!-- Quick Actions -->
    <div class="flex gap-2 mb-6">
      <button
        @click="handleSurpriseMe"
        :class="[
          'btn-primary flex-1 flex items-center justify-center gap-2',
          isShaking && 'animate-shake'
        ]"
      >
        <span>🎲</span>
        <span>Surprise Me</span>
      </button>
      <button
        @click="showRandomModal = true"
        class="btn-secondary px-4"
      >
        🎯
      </button>
      <button
        @click="resetConfig"
        class="btn-ghost px-4"
      >
        🗑️
      </button>
    </div>

    <!-- Tag Sections -->
    <div class="space-y-4 mb-6">
      <TagSection
        v-for="section in sfwSections"
        :key="section.id"
        :title="section.title"
      >
        <div v-for="sub in section.subsections" :key="sub.key" class="mb-3 last:mb-0">
          <h4 class="text-xs text-surface-500 mb-2">{{ sub.title }}</h4>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="tag in sub.tags"
              :key="tag.name"
              @click="handleTagToggle(sub.key, tag.name, sub)"
              :class="[
                'tag-chip',
                isTagSelected(sub.key, tag.name, sub) && 'selected'
              ]"
            >
              {{ tag.name }}
            </button>
          </div>
        </div>
      </TagSection>

      <!-- NSFW Sections -->
      <template v-if="settings.nsfwEnabled">
        <div class="border-t border-red-500/30 pt-4 mt-4">
          <p class="text-red-400 text-sm mb-4">🔞 NSFW Options</p>
          <TagSection
            v-for="section in nsfwSections"
            :key="section.id"
            :title="section.title"
            variant="nsfw"
          >
            <div v-for="sub in section.subsections" :key="sub.key" class="mb-3 last:mb-0">
              <h4 class="text-xs text-surface-500 mb-2">{{ sub.title }}</h4>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="tag in sub.tags"
                  :key="tag.name"
                  @click="handleTagToggle(sub.key, tag.name, sub)"
                  :class="[
                    'tag-chip',
                    isTagSelected(sub.key, tag.name, sub) && 'selected'
                  ]"
                >
                  {{ tag.name }}
                </button>
              </div>
            </div>
          </TagSection>
        </div>
      </template>
    </div>

    <!-- Undesired Content -->
    <div class="card mb-6">
      <h3 class="section-title mb-3">Undesired Content Preset</h3>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="preset in undesiredPresets.filter(p => !p.nsfw || settings.nsfwEnabled)"
          :key="preset.id"
          @click="config.undesiredPreset = preset.id"
          :class="[
            'tag-chip',
            config.undesiredPreset === preset.id && 'selected'
          ]"
        >
          {{ preset.name }}
        </button>
      </div>
    </div>

    <!-- Custom Tags Input -->
    <div class="card mb-6">
      <h3 class="section-title mb-3">Custom Tags</h3>
      <textarea
        v-model="config.customTags"
        placeholder="Add custom tags, separated by commas..."
        class="input min-h-[80px] resize-none"
      />
    </div>

    <!-- Enhancement Settings (Mobile) -->
    <div class="card mb-6">
      <div class="flex items-center justify-between mb-3">
        <h3 class="section-title">✨ Enhancements</h3>
        <span v-if="enhancedPromptData?.changes?.length" class="text-xs text-chrient-gold">
          {{ enhancedPromptData.changes.length }} applied
        </span>
      </div>
      <div class="space-y-3">
        <!-- Auto-Weight Toggle -->
        <label class="flex items-center justify-between cursor-pointer">
          <span class="text-sm text-surface-400">Auto-weight tags</span>
          <div class="relative">
            <input
              type="checkbox"
              :checked="enhancerSettings.autoWeight"
              @change="handleEnhancementSettingsUpdate({ ...enhancerSettings, autoWeight: ($event.target as HTMLInputElement).checked })"
              class="sr-only peer"
            />
            <div class="w-9 h-5 bg-surface-700 rounded-full peer peer-checked:bg-chrient-gold transition-colors"></div>
            <div class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
          </div>
        </label>
        <!-- Smart Repetition Toggle -->
        <label class="flex items-center justify-between cursor-pointer">
          <span class="text-sm text-surface-400">Smart repetition</span>
          <div class="relative">
            <input
              type="checkbox"
              :checked="enhancerSettings.smartRepetition.level !== 'none'"
              @change="handleEnhancementSettingsUpdate({
                ...enhancerSettings,
                smartRepetition: {
                  ...enhancerSettings.smartRepetition,
                  level: ($event.target as HTMLInputElement).checked ? 'light' : 'none'
                }
              })"
              class="sr-only peer"
            />
            <div class="w-9 h-5 bg-surface-700 rounded-full peer peer-checked:bg-chrient-gold transition-colors"></div>
            <div class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
          </div>
        </label>
        <!-- Auto-Negatives Toggle -->
        <label class="flex items-center justify-between cursor-pointer">
          <span class="text-sm text-surface-400">Auto-generate negatives</span>
          <div class="relative">
            <input
              type="checkbox"
              :checked="enhancerSettings.autoNegatives"
              @change="handleEnhancementSettingsUpdate({ ...enhancerSettings, autoNegatives: ($event.target as HTMLInputElement).checked })"
              class="sr-only peer"
            />
            <div class="w-9 h-5 bg-surface-700 rounded-full peer peer-checked:bg-chrient-gold transition-colors"></div>
            <div class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
          </div>
        </label>
        <!-- Booru Normalization Toggle -->
        <label class="flex items-center justify-between cursor-pointer">
          <span class="text-sm text-surface-400">Booru tag normalization</span>
          <div class="relative">
            <input
              type="checkbox"
              :checked="enhancerSettings.booruNormalization"
              @change="handleEnhancementSettingsUpdate({ ...enhancerSettings, booruNormalization: ($event.target as HTMLInputElement).checked })"
              class="sr-only peer"
            />
            <div class="w-9 h-5 bg-surface-700 rounded-full peer peer-checked:bg-chrient-gold transition-colors"></div>
            <div class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-4"></div>
          </div>
        </label>
      </div>
    </div>

    <!-- Preview & Copy Actions -->
    <div class="sticky bottom-20 bg-surface-950/95 backdrop-blur-sm -mx-4 px-4 py-4 border-t border-surface-800">
      <div class="flex gap-2">
        <button @click="handlePreview" class="btn-secondary flex-1">
          👁️ Preview
        </button>
        <button
          @click="handleCopy"
          class="btn-primary flex-1"
        >
          {{ copied ? '✓ Copied!' : '📋 Copy Prompt' }}
        </button>
      </div>
    </div>
  </div>

  <!-- Modals -->
  <RandomModal
    :show="showRandomModal"
    :presets="randomPresets"
    :nsfw="settings.nsfwEnabled"
    @close="showRandomModal = false"
    @select="(categories) => { randomizeCategories(categories, settings.nsfwEnabled); showRandomModal = false; showPromptPreview = true; }"
  />

  <NsfwConfirmModal
    :show="showNsfwConfirm"
    @confirm="confirmNsfw"
    @cancel="showNsfwConfirm = false"
  />

  <PromptPreview
    :show="showPromptPreview"
    :prompt="promptToUse"
    :undesired="enhancedUndesiredContent"
    :model="modelSettings.model"
    :guidance="modelSettings.guidance"
    :steps="modelSettings.steps"
    @close="showPromptPreview = false"
    @copy="handleCopy"
    @copy-with-settings="handleCopyAll"
  />

  <CommandPalette
    :show="showCommandPalette"
    :commands="commands"
    @close="showCommandPalette = false"
    @execute="(id) => console.log('Executed:', id)"
  />
</template>

<style scoped>
.desktop-layout {
  position: relative;
}
</style>
