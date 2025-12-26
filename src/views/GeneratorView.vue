<script setup lang="ts">
import { ref, computed } from 'vue'
import { useGenerator } from '@/composables/useGenerator'
import { useClipboard } from '@/composables/useClipboard'
import { useSettings } from '@/composables/useStorage'
import { modelOptions, undesiredPresets, randomPresets } from '@/data/presets'
import ModelSelector from '@/components/ModelSelector.vue'
import TagSection from '@/components/TagSection.vue'
import PromptPreview from '@/components/PromptPreview.vue'
import RandomModal from '@/components/RandomModal.vue'
import NsfwConfirmModal from '@/components/NsfwConfirmModal.vue'
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

const showRandomModal = ref(false)
const showNsfwConfirm = ref(false)
const showPromptPreview = ref(false)
const isShaking = ref(false)

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

// Copy prompt
const handleCopy = async (withSettings: boolean = false) => {
  if (withSettings) {
    await copyPromptWithSettings(
      buildPrompt.value,
      undesiredContent.value,
      modelSettings.value.model,
      modelSettings.value.guidance,
      modelSettings.value.steps
    )
  } else {
    await copyToClipboard(buildPrompt.value)
  }
  saveToHistory()
}

// Show preview
const handlePreview = () => {
  showPromptPreview.value = true
}

// Tag sections configuration
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
    // For single select (year, rating)
    if (targetKey === 'yearTag' || targetKey === 'rating') {
      const currentVal = config.value[targetKey as keyof typeof config.value]
      if (currentVal === tag) {
        (config.value as Record<string, unknown>)[targetKey] = null
      } else {
        (config.value as Record<string, unknown>)[targetKey] = tag
      }
    }
  } else if (subsection.poseKey || subsection.locationKey) {
    // For pose/location, use the common key
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
</script>

<template>
  <div class="px-4 pt-4">
    <!-- Header -->
    <header class="flex items-center justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-chrient-gold">mipRef</h1>
        <p class="text-sm text-surface-400">Seed your imagination</p>
      </div>
      <div class="flex items-center gap-2">
        <!-- Token counter -->
        <div class="text-xs text-surface-500 bg-surface-800 px-2 py-1 rounded">
          ~{{ estimatedTokens }} tokens
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

    <!-- Preview & Copy Actions -->
    <div class="sticky bottom-20 bg-surface-950/95 backdrop-blur-sm -mx-4 px-4 py-4 border-t border-surface-800">
      <div class="flex gap-2">
        <button @click="handlePreview" class="btn-secondary flex-1">
          👁️ Preview
        </button>
        <button
          @click="handleCopy(false)"
          class="btn-primary flex-1"
        >
          {{ copied ? '✓ Copied!' : '📋 Copy Prompt' }}
        </button>
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
      :prompt="buildPrompt"
      :undesired="undesiredContent"
      :model="modelSettings.model"
      :guidance="modelSettings.guidance"
      :steps="modelSettings.steps"
      @close="showPromptPreview = false"
      @copy="handleCopy(false)"
      @copy-with-settings="handleCopy(true)"
    />
  </div>
</template>
