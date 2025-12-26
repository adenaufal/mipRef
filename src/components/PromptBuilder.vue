<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PromptConfig } from '@/types'

const props = defineProps<{
  config: PromptConfig
  nsfwEnabled: boolean
}>()

const emit = defineEmits<{
  (e: 'update:config', config: PromptConfig): void
  (e: 'toggle-tag', category: string, tag: string): void
  (e: 'randomize-section', categories: string[]): void
  (e: 'clear-section', category: string): void
}>()

// Define prompt sections for organized display
interface PromptSection {
  id: string
  title: string
  categories: {
    key: string
    label: string
    getter: () => string[]
  }[]
  randomCategories: string[]
}

const sections = computed<PromptSection[]>(() => [
  {
    id: 'character',
    title: 'Character',
    categories: [
      { key: 'gender', label: 'Gender', getter: () => props.config.gender },
      { key: 'bodyType', label: 'Body Type', getter: () => props.config.bodyType },
      { key: 'species', label: 'Species', getter: () => props.config.species },
    ],
    randomCategories: ['gender', 'bodyType', 'species']
  },
  {
    id: 'hair',
    title: 'Hair',
    categories: [
      { key: 'hairColor', label: 'Color', getter: () => props.config.hairColor },
      { key: 'hairLength', label: 'Length', getter: () => props.config.hairLength },
      { key: 'hairStyle', label: 'Style', getter: () => props.config.hairStyle },
    ],
    randomCategories: ['hairColor', 'hairLength', 'hairStyle']
  },
  {
    id: 'eyes',
    title: 'Eyes',
    categories: [
      { key: 'eyeColor', label: 'Color', getter: () => props.config.eyeColor },
      { key: 'eyeStyle', label: 'Style', getter: () => props.config.eyeStyle },
    ],
    randomCategories: ['eyeColor', 'eyeStyle']
  },
  {
    id: 'appearance',
    title: 'Appearance',
    categories: [
      { key: 'skin', label: 'Skin', getter: () => props.config.skin },
      { key: 'clothingStyle', label: 'Clothing', getter: () => props.config.clothingStyle },
      { key: 'outfitDetail', label: 'Details', getter: () => props.config.outfitDetail },
      { key: 'accessory', label: 'Accessories', getter: () => props.config.accessory },
    ],
    randomCategories: ['skin', 'clothingStyle', 'outfitDetail', 'accessory']
  },
  {
    id: 'pose',
    title: 'Pose & Expression',
    categories: [
      { key: 'pose', label: 'Pose', getter: () => props.config.pose },
      { key: 'expression', label: 'Expression', getter: () => props.config.expression },
      { key: 'looking', label: 'Looking', getter: () => props.config.looking },
    ],
    randomCategories: ['standingPose', 'sittingPose', 'expression', 'looking']
  },
  {
    id: 'setting',
    title: 'Setting',
    categories: [
      { key: 'location', label: 'Location', getter: () => props.config.location },
      { key: 'time', label: 'Time', getter: () => props.config.time },
      { key: 'weather', label: 'Weather', getter: () => props.config.weather },
    ],
    randomCategories: ['indoorLocation', 'outdoorLocation', 'time', 'weather']
  },
  {
    id: 'composition',
    title: 'Composition',
    categories: [
      { key: 'composition', label: 'Shot', getter: () => props.config.composition },
    ],
    randomCategories: ['composition']
  },
  {
    id: 'style',
    title: 'Style',
    categories: [
      { key: 'lighting', label: 'Lighting', getter: () => props.config.lighting },
      { key: 'effect', label: 'Effects', getter: () => props.config.effect },
      { key: 'artStyle', label: 'Art Style', getter: () => props.config.artStyle },
    ],
    randomCategories: ['lighting', 'effect', 'artStyle']
  },
  {
    id: 'quality',
    title: 'Quality',
    categories: [
      { key: 'quality', label: 'Quality', getter: () => props.config.quality },
    ],
    randomCategories: ['quality']
  }
])

// NSFW sections
const nsfwSections = computed<PromptSection[]>(() => [
  {
    id: 'nsfw-body',
    title: 'Body (NSFW)',
    categories: [
      { key: 'nsfwBody', label: 'Body', getter: () => props.config.nsfwBody },
    ],
    randomCategories: ['nsfwBody']
  },
  {
    id: 'nsfw-clothing',
    title: 'Clothing (NSFW)',
    categories: [
      { key: 'nsfwClothing', label: 'Clothing', getter: () => props.config.nsfwClothing },
      { key: 'nsfwPose', label: 'Poses', getter: () => props.config.nsfwPose },
    ],
    randomCategories: ['nsfwClothing', 'nsfwPose']
  }
])

// Expanded sections state
const expandedSections = ref<Set<string>>(new Set(['character', 'hair', 'appearance']))

const toggleSection = (sectionId: string) => {
  if (expandedSections.value.has(sectionId)) {
    expandedSections.value.delete(sectionId)
  } else {
    expandedSections.value.add(sectionId)
  }
}

// Get total tags in a section
const getSectionTagCount = (section: PromptSection): number => {
  return section.categories.reduce((sum, cat) => sum + cat.getter().length, 0)
}

// Remove a tag from a category
const removeTag = (category: string, tag: string) => {
  emit('toggle-tag', category, tag)
}

// Randomize a section
const randomizeSection = (section: PromptSection) => {
  emit('randomize-section', section.randomCategories)
}

// Clear a section
const clearSection = (section: PromptSection) => {
  for (const cat of section.categories) {
    emit('clear-section', cat.key)
  }
}

// Drag and drop support
const draggedTag = ref<{ category: string; tag: string } | null>(null)
const dragOverCategory = ref<string | null>(null)

const handleDragStart = (event: DragEvent, category: string, tag: string) => {
  draggedTag.value = { category, tag }
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', tag)
  }
}

const handleDragOver = (event: DragEvent, category: string) => {
  event.preventDefault()
  dragOverCategory.value = category
}

const handleDragLeave = () => {
  dragOverCategory.value = null
}

const handleDrop = (event: DragEvent, targetCategory: string) => {
  event.preventDefault()
  dragOverCategory.value = null

  if (draggedTag.value && draggedTag.value.category !== targetCategory) {
    // Remove from old category
    emit('toggle-tag', draggedTag.value.category, draggedTag.value.tag)
    // Add to new category (if applicable)
  }
  draggedTag.value = null
}

// All sections combined
const allSections = computed(() => {
  if (props.nsfwEnabled) {
    return [...sections.value, ...nsfwSections.value]
  }
  return sections.value
})
</script>

<template>
  <div class="prompt-builder h-full flex flex-col bg-surface-950 overflow-hidden">
    <!-- Header -->
    <div class="p-3 border-b border-surface-800 flex-shrink-0">
      <h2 class="text-sm font-semibold text-surface-300 uppercase tracking-wider">
        Prompt Builder
      </h2>
    </div>

    <!-- Sections -->
    <div class="flex-1 overflow-y-auto">
      <div class="space-y-1 py-2">
        <div
          v-for="section in allSections"
          :key="section.id"
          class="border-b border-surface-800/50 last:border-b-0"
        >
          <!-- Section Header -->
          <button
            @click="toggleSection(section.id)"
            class="w-full flex items-center justify-between px-3 py-2 hover:bg-surface-800/30 transition-colors group"
          >
            <div class="flex items-center gap-2">
              <span class="text-surface-500 text-xs">
                {{ expandedSections.has(section.id) ? '▼' : '▶' }}
              </span>
              <span
                class="text-sm font-medium"
                :class="section.id.startsWith('nsfw') ? 'text-red-400' : 'text-surface-200'"
              >
                {{ section.title }}
              </span>
              <span
                v-if="getSectionTagCount(section) > 0"
                class="px-1.5 py-0.5 text-xs rounded-full bg-chrient-gold/20 text-chrient-gold"
              >
                {{ getSectionTagCount(section) }}
              </span>
            </div>
            <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                @click.stop="randomizeSection(section)"
                class="p-1 text-surface-500 hover:text-chrient-gold transition-colors"
                title="Randomize section"
              >
                🎲
              </button>
              <button
                v-if="getSectionTagCount(section) > 0"
                @click.stop="clearSection(section)"
                class="p-1 text-surface-500 hover:text-red-400 transition-colors"
                title="Clear section"
              >
                ✕
              </button>
            </div>
          </button>

          <!-- Section Content -->
          <div
            v-if="expandedSections.has(section.id)"
            class="px-3 pb-3"
          >
            <div
              v-for="cat in section.categories"
              :key="cat.key"
              class="mb-2 last:mb-0"
            >
              <div class="text-xs text-surface-500 mb-1.5">{{ cat.label }}</div>
              <div
                class="min-h-[28px] flex flex-wrap gap-1.5 p-2 rounded-lg border border-dashed border-surface-700 bg-surface-900/50"
                :class="{ 'border-chrient-gold/50 bg-chrient-gold/5': dragOverCategory === cat.key }"
                @dragover="handleDragOver($event, cat.key)"
                @dragleave="handleDragLeave"
                @drop="handleDrop($event, cat.key)"
              >
                <TransitionGroup name="tag-list">
                  <div
                    v-for="tag in cat.getter()"
                    :key="tag"
                    class="prompt-tag group"
                    :class="{ 'nsfw': section.id.startsWith('nsfw') }"
                    draggable="true"
                    @dragstart="handleDragStart($event, cat.key, tag)"
                  >
                    <span class="cursor-move">{{ tag }}</span>
                    <button
                      @click="removeTag(cat.key, tag)"
                      class="ml-1 opacity-0 group-hover:opacity-100 transition-opacity text-surface-400 hover:text-red-400"
                    >
                      ✕
                    </button>
                  </div>
                </TransitionGroup>
                <span
                  v-if="cat.getter().length === 0"
                  class="text-xs text-surface-600 italic"
                >
                  Drop tags here or click from browser
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Year Tag (special single-select) -->
      <div class="px-3 py-2 border-t border-surface-800">
        <div class="text-xs text-surface-500 mb-1.5">Year Style</div>
        <div class="text-sm text-surface-300">
          {{ config.yearTag || 'Not set' }}
        </div>
      </div>

      <!-- Custom Tags -->
      <div class="px-3 py-2 border-t border-surface-800">
        <div class="text-xs text-surface-500 mb-1.5">Custom Tags</div>
        <textarea
          :value="config.customTags"
          @input="$emit('update:config', { ...config, customTags: ($event.target as HTMLTextAreaElement).value })"
          placeholder="Add custom tags..."
          class="w-full px-2 py-1.5 bg-surface-800 border border-surface-700 rounded-lg
                 text-white text-sm placeholder-surface-500 focus:outline-none focus:border-chrient-gold
                 resize-none min-h-[60px]"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.prompt-tag {
  @apply inline-flex items-center px-2 py-1 bg-chrient-gold/20 text-chrient-gold text-xs
         rounded-md border border-chrient-gold/30 cursor-grab active:cursor-grabbing;
}

.prompt-tag.nsfw {
  @apply bg-red-500/20 text-red-400 border-red-500/30;
}

.tag-list-enter-active,
.tag-list-leave-active {
  transition: all 0.2s ease;
}

.tag-list-enter-from,
.tag-list-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.tag-list-move {
  transition: transform 0.2s ease;
}
</style>
