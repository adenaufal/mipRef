<script setup lang="ts">
import { ref, computed } from 'vue'
import { tagDatabase, searchTags, type TagEntry, type Category } from '@/data/tagDatabase'

const props = defineProps<{
  selectedTags: string[]
  nsfwEnabled: boolean
}>()

const emit = defineEmits<{
  (e: 'add-tag', tag: string): void
  (e: 'remove-tag', tag: string): void
  (e: 'toggle-tag', tag: string): void
}>()

// State
const searchQuery = ref('')
const expandedCategories = ref<Set<string>>(new Set(['character', 'hair']))
const expandedSubcategories = ref<Set<string>>(new Set())
const filterPopular = ref(false)
const recentTags = ref<string[]>([])
const favoriteTags = ref<string[]>([])

// Load recent and favorite tags from localStorage
const loadStoredTags = () => {
  try {
    const stored = localStorage.getItem('mipref_recent_tags')
    if (stored) recentTags.value = JSON.parse(stored)

    const storedFavorites = localStorage.getItem('mipref_favorite_tags')
    if (storedFavorites) favoriteTags.value = JSON.parse(storedFavorites)
  } catch (e) {
    console.error('Failed to load stored tags:', e)
  }
}

loadStoredTags()

// Save recent tags
const addToRecent = (tag: string) => {
  const filtered = recentTags.value.filter(t => t !== tag)
  recentTags.value = [tag, ...filtered].slice(0, 10)
  localStorage.setItem('mipref_recent_tags', JSON.stringify(recentTags.value))
}

// Toggle favorite
const toggleFavorite = (tag: string) => {
  const index = favoriteTags.value.indexOf(tag)
  if (index >= 0) {
    favoriteTags.value.splice(index, 1)
  } else {
    favoriteTags.value.push(tag)
  }
  localStorage.setItem('mipref_favorite_tags', JSON.stringify(favoriteTags.value))
}

// Filtered categories based on NSFW setting
const filteredCategories = computed(() => {
  const categories: Record<string, Category> = {}

  for (const [id, category] of Object.entries(tagDatabase.categories)) {
    if (category.nsfw_category && !props.nsfwEnabled) continue
    categories[id] = category
  }

  return categories
})

// Search results
const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return []

  return searchTags(searchQuery.value, {
    includeNsfw: props.nsfwEnabled,
    minPopularity: filterPopular.value ? 4 : 1,
    limit: 30
  })
})

const isSearching = computed(() => searchQuery.value.trim().length > 0)

// Check if tag is selected
const isSelected = (tag: string) => props.selectedTags.includes(tag)
const isFavorite = (tag: string) => favoriteTags.value.includes(tag)

// Toggle category expansion
const toggleCategory = (categoryId: string) => {
  if (expandedCategories.value.has(categoryId)) {
    expandedCategories.value.delete(categoryId)
  } else {
    expandedCategories.value.add(categoryId)
  }
}

// Toggle subcategory expansion
const toggleSubcategory = (categoryId: string, subcategoryId: string) => {
  const key = `${categoryId}:${subcategoryId}`
  if (expandedSubcategories.value.has(key)) {
    expandedSubcategories.value.delete(key)
  } else {
    expandedSubcategories.value.add(key)
  }
}

const isSubcategoryExpanded = (categoryId: string, subcategoryId: string) => {
  return expandedSubcategories.value.has(`${categoryId}:${subcategoryId}`)
}

// Handle tag click
const handleTagClick = (tag: string) => {
  addToRecent(tag)
  emit('toggle-tag', tag)
}

// Handle tag double click (add with emphasis)
const handleTagDoubleClick = (tag: string) => {
  addToRecent(tag)
  emit('add-tag', `{{${tag}}}`)
}

// Filter tags in subcategory
const getFilteredTags = (tags: TagEntry[]) => {
  return tags.filter(tag => {
    if (tag.nsfw && !props.nsfwEnabled) return false
    if (filterPopular.value && tag.popularity < 4) return false
    return true
  })
}

// Random tag from a category
const randomFromCategory = (categoryId: string) => {
  const category = tagDatabase.categories[categoryId]
  if (!category) return

  const allTags: TagEntry[] = []
  for (const subcategory of Object.values(category.subcategories)) {
    if (subcategory.nsfw_category && !props.nsfwEnabled) continue
    for (const tag of subcategory.tags) {
      if (tag.nsfw && !props.nsfwEnabled) continue
      allTags.push(tag)
    }
  }

  if (allTags.length === 0) return

  const randomTag = allTags[Math.floor(Math.random() * allTags.length)]
  handleTagClick(randomTag.tag)
}

// Clear search
const clearSearch = () => {
  searchQuery.value = ''
}
</script>

<template>
  <div class="tag-browser h-full flex flex-col bg-surface-900 border-r border-surface-800">
    <!-- Header -->
    <div class="p-3 border-b border-surface-800">
      <h2 class="text-sm font-semibold text-surface-300 uppercase tracking-wider mb-3">
        Tag Browser
      </h2>

      <!-- Search -->
      <div class="relative mb-3">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search tags..."
          class="w-full px-3 py-2 pl-9 bg-surface-800 border border-surface-700 rounded-lg
                 text-white text-sm placeholder-surface-500 focus:outline-none focus:border-chrient-gold"
        />
        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
          🔍
        </span>
        <button
          v-if="searchQuery"
          @click="clearSearch"
          class="absolute right-2 top-1/2 -translate-y-1/2 text-surface-500 hover:text-white p-1"
        >
          ✕
        </button>
      </div>

      <!-- Filters -->
      <div class="flex items-center gap-2 text-xs">
        <button
          @click="filterPopular = !filterPopular"
          :class="[
            'px-2 py-1 rounded-md transition-colors',
            filterPopular
              ? 'bg-chrient-gold/20 text-chrient-gold border border-chrient-gold/50'
              : 'bg-surface-800 text-surface-400 border border-surface-700 hover:border-surface-600'
          ]"
        >
          ⭐ Popular
        </button>
        <button
          v-if="!nsfwEnabled"
          class="px-2 py-1 rounded-md bg-surface-800 text-surface-400 border border-surface-700"
        >
          🔒 SFW
        </button>
        <button
          v-else
          class="px-2 py-1 rounded-md bg-red-500/20 text-red-400 border border-red-500/50"
        >
          🔞 NSFW
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto">
      <!-- Search Results -->
      <div v-if="isSearching" class="p-3">
        <div class="text-xs text-surface-500 mb-2">
          {{ searchResults.length }} results for "{{ searchQuery }}"
        </div>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="result in searchResults"
            :key="result.tag"
            @click="handleTagClick(result.tag)"
            @dblclick="handleTagDoubleClick(result.tag)"
            :class="[
              'tag-browser-chip group',
              isSelected(result.tag) && 'selected',
              result.nsfw && 'nsfw'
            ]"
          >
            <span v-if="result.popularity >= 4" class="text-chrient-gold mr-1">●</span>
            {{ result.tag }}
            <button
              @click.stop="toggleFavorite(result.tag)"
              class="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {{ isFavorite(result.tag) ? '⭐' : '☆' }}
            </button>
          </button>
        </div>
      </div>

      <!-- Browse Mode -->
      <div v-else class="pb-4">
        <!-- Recent Tags -->
        <div v-if="recentTags.length > 0" class="p-3 border-b border-surface-800">
          <div class="text-xs text-surface-500 mb-2">Recent</div>
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="tag in recentTags"
              :key="tag"
              @click="handleTagClick(tag)"
              :class="[
                'tag-browser-chip text-xs',
                isSelected(tag) && 'selected'
              ]"
            >
              {{ tag }}
            </button>
          </div>
        </div>

        <!-- Favorite Tags -->
        <div v-if="favoriteTags.length > 0" class="p-3 border-b border-surface-800">
          <div class="text-xs text-surface-500 mb-2">⭐ Favorites</div>
          <div class="flex flex-wrap gap-1.5">
            <button
              v-for="tag in favoriteTags"
              :key="tag"
              @click="handleTagClick(tag)"
              :class="[
                'tag-browser-chip text-xs',
                isSelected(tag) && 'selected'
              ]"
            >
              {{ tag }}
              <span @click.stop="toggleFavorite(tag)" class="ml-1 hover:text-red-400">✕</span>
            </button>
          </div>
        </div>

        <!-- Categories -->
        <div v-for="(category, categoryId) in filteredCategories" :key="categoryId">
          <button
            @click="toggleCategory(categoryId)"
            class="w-full flex items-center justify-between px-3 py-2 hover:bg-surface-800/50 transition-colors"
          >
            <span class="flex items-center gap-2 text-sm font-medium text-surface-200">
              <span>{{ category.icon }}</span>
              <span>{{ category.label }}</span>
            </span>
            <span class="flex items-center gap-2">
              <button
                @click.stop="randomFromCategory(categoryId)"
                class="p-1 text-surface-500 hover:text-chrient-gold transition-colors"
                title="Random tag from category"
              >
                🎲
              </button>
              <span class="text-surface-500 text-xs">
                {{ expandedCategories.has(categoryId) ? '▼' : '▶' }}
              </span>
            </span>
          </button>

          <!-- Subcategories -->
          <div v-if="expandedCategories.has(categoryId)" class="pl-4">
            <div
              v-for="(subcategory, subcategoryId) in category.subcategories"
              :key="subcategoryId"
              class="border-l border-surface-700"
            >
              <!-- Skip NSFW subcategories when disabled -->
              <template v-if="!subcategory.nsfw_category || nsfwEnabled">
                <button
                  @click="toggleSubcategory(categoryId, subcategoryId)"
                  class="w-full flex items-center justify-between px-3 py-1.5 hover:bg-surface-800/30 transition-colors text-sm"
                >
                  <span class="text-surface-400">{{ subcategory.label }}</span>
                  <span class="text-surface-600 text-xs">
                    {{ isSubcategoryExpanded(categoryId, subcategoryId) ? '−' : '+' }}
                  </span>
                </button>

                <!-- Tags -->
                <div
                  v-if="isSubcategoryExpanded(categoryId, subcategoryId)"
                  class="px-3 pb-2 flex flex-wrap gap-1.5"
                >
                  <button
                    v-for="tag in getFilteredTags(subcategory.tags)"
                    :key="tag.tag"
                    @click="handleTagClick(tag.tag)"
                    @dblclick="handleTagDoubleClick(tag.tag)"
                    :class="[
                      'tag-browser-chip group',
                      isSelected(tag.tag) && 'selected',
                      tag.nsfw && 'nsfw'
                    ]"
                  >
                    <span v-if="tag.popularity >= 4" class="text-chrient-gold mr-0.5 text-xs">●</span>
                    {{ tag.tag }}
                  </button>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="p-2 border-t border-surface-800 text-xs text-surface-500 text-center">
      Click to add • Double-click for emphasis
    </div>
  </div>
</template>

<style scoped>
.tag-browser-chip {
  @apply inline-flex items-center px-2 py-1 bg-surface-800 text-surface-300 text-xs
         rounded-md border border-surface-700 hover:border-chrient-gold hover:text-chrient-gold
         transition-colors cursor-pointer;
}

.tag-browser-chip.selected {
  @apply bg-chrient-gold/20 border-chrient-gold text-chrient-gold;
}

.tag-browser-chip.nsfw {
  @apply border-red-500/50;
}

.tag-browser-chip.nsfw.selected {
  @apply bg-red-500/20 border-red-500 text-red-400;
}
</style>
