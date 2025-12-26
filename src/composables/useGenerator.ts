import { ref, computed } from 'vue'
import type { PromptConfig, GeneratedPrompt, HistoryEntry } from '@/types'
import { defaultPromptConfig } from '@/types'
import { undesiredPresets, modelOptions } from '@/data/presets'
import { allTags } from '@/data/tags'
import { useHistory } from './useStorage'

// Generate unique ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

// Random selection from array
function randomFrom<T>(arr: T[], count: number = 1): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

// Get random tag name
function getRandomTag(category: keyof typeof allTags, nsfw: boolean = false): string {
  const tags = allTags[category].filter(t => nsfw || !t.nsfw)
  if (tags.length === 0) return ''
  return randomFrom(tags, 1)[0].name
}

// Get multiple random tags
function getRandomTags(category: keyof typeof allTags, count: number, nsfw: boolean = false): string[] {
  const tags = allTags[category].filter(t => nsfw || !t.nsfw)
  return randomFrom(tags, count).map(t => t.name)
}

export function useGenerator() {
  const config = ref<PromptConfig>({ ...defaultPromptConfig })
  const { addToHistory } = useHistory()

  // Build the main prompt from config
  const buildPrompt = computed(() => {
    const parts: string[] = []

    // Dataset prefix (always first)
    if (config.value.datasetPrefix) {
      parts.push(config.value.datasetPrefix)
    }

    // Character basics
    parts.push(...config.value.gender)
    parts.push(...config.value.bodyType)
    parts.push(...config.value.species)

    // Hair
    parts.push(...config.value.hairColor)
    parts.push(...config.value.hairLength)
    parts.push(...config.value.hairStyle)

    // Eyes
    parts.push(...config.value.eyeColor)
    parts.push(...config.value.eyeStyle)

    // Skin
    parts.push(...config.value.skin)

    // NSFW body (if applicable)
    parts.push(...config.value.nsfwBody)

    // Outfit
    parts.push(...config.value.clothingStyle)
    parts.push(...config.value.outfitDetail)
    parts.push(...config.value.nsfwClothing)
    parts.push(...config.value.accessory)
    parts.push(...config.value.weapon)

    // Pose
    parts.push(...config.value.pose)
    parts.push(...config.value.nsfwPose)
    parts.push(...config.value.expression)
    parts.push(...config.value.looking)

    // Composition
    parts.push(...config.value.composition)

    // Background/Setting
    parts.push(...config.value.location)
    parts.push(...config.value.time)
    parts.push(...config.value.weather)

    // Style
    parts.push(...config.value.lighting)
    parts.push(...config.value.effect)
    parts.push(...config.value.artStyle)

    // Year tag
    if (config.value.yearTag) {
      parts.push(config.value.yearTag)
    }

    // Quality tags
    parts.push(...config.value.quality)

    // Rating
    if (config.value.rating) {
      parts.push(config.value.rating)
    }

    // Custom tags
    if (config.value.customTags.trim()) {
      parts.push(config.value.customTags.trim())
    }

    // Filter empty and join
    return parts.filter(p => p.trim()).join(', ')
  })

  // Get undesired content based on preset
  const undesiredContent = computed(() => {
    const preset = undesiredPresets.find(p => p.id === config.value.undesiredPreset)
    let content = preset?.tags || ''

    // Add custom undesired
    if (config.value.customUndesired.trim()) {
      content = content
        ? `${content}, ${config.value.customUndesired.trim()}`
        : config.value.customUndesired.trim()
    }

    return content
  })

  // Get model settings
  const modelSettings = computed(() => {
    const model = modelOptions.find(m => m.id === config.value.model) || modelOptions[0]
    return {
      model: model.name,
      guidance: model.recommendedGuidance.default,
      steps: model.recommendedSteps.default
    }
  })

  // Generate the full prompt object
  const generatePrompt = (): GeneratedPrompt => {
    return {
      id: generateId(),
      timestamp: Date.now(),
      config: { ...config.value },
      mainPrompt: buildPrompt.value,
      undesiredContent: undesiredContent.value,
      modelSettings: modelSettings.value
    }
  }

  // Reset config to defaults
  const resetConfig = () => {
    config.value = { ...defaultPromptConfig }
  }

  // Update a specific category
  const updateCategory = (category: keyof PromptConfig, value: unknown) => {
    (config.value as Record<string, unknown>)[category] = value
  }

  // Toggle a tag in a category
  const toggleTag = (category: keyof PromptConfig, tag: string) => {
    const arr = config.value[category] as string[]
    if (Array.isArray(arr)) {
      const index = arr.indexOf(tag)
      if (index >= 0) {
        arr.splice(index, 1)
      } else {
        arr.push(tag)
      }
    }
  }

  // Randomize specific categories
  const randomizeCategories = (categories: string[], nsfw: boolean = false) => {
    for (const cat of categories) {
      const key = cat as keyof typeof allTags
      if (allTags[key]) {
        const tagArray = config.value[key as keyof PromptConfig]
        if (Array.isArray(tagArray)) {
          const numTags: number = Math.ceil(Math.random() * 2) // 1-2 random tags
          const newTags = getRandomTags(key, numTags, nsfw);
          (config.value as Record<string, unknown>)[key] = newTags
        }
      }
    }
  }

  // Full random generation
  const generateFullRandom = (nsfw: boolean = false) => {
    // Reset first
    resetConfig()

    // Gender (always pick one)
    config.value.gender = [getRandomTag('gender', nsfw)]

    // Sometimes add body type
    if (Math.random() > 0.5) {
      config.value.bodyType = [getRandomTag('bodyType', nsfw)]
    }

    // Sometimes add species
    if (Math.random() > 0.7) {
      config.value.species = [getRandomTag('species', nsfw)]
    }

    // Hair
    config.value.hairColor = [getRandomTag('hairColor', nsfw)]
    config.value.hairLength = [getRandomTag('hairLength', nsfw)]
    if (Math.random() > 0.5) {
      config.value.hairStyle = [getRandomTag('hairStyle', nsfw)]
    }

    // Eyes
    config.value.eyeColor = [getRandomTag('eyeColor', nsfw)]

    // Outfit
    config.value.clothingStyle = getRandomTags('clothingStyle', Math.ceil(Math.random() * 2), nsfw)
    if (Math.random() > 0.6) {
      config.value.accessory = getRandomTags('accessory', Math.ceil(Math.random() * 2), nsfw)
    }

    // Pose
    const poseType = Math.random()
    if (poseType < 0.6) {
      config.value.pose = [getRandomTag('standingPose', nsfw)]
    } else if (poseType < 0.85) {
      config.value.pose = [getRandomTag('sittingPose', nsfw)]
    } else {
      config.value.pose = [getRandomTag('lyingPose', nsfw)]
    }

    // Expression
    config.value.expression = [getRandomTag('expression', nsfw)]

    // Looking direction
    config.value.looking = [getRandomTag('looking', nsfw)]

    // Composition
    config.value.composition = [getRandomTag('composition', nsfw)]

    // Location
    const isIndoor = Math.random() > 0.5
    config.value.location = [getRandomTag(isIndoor ? 'indoorLocation' : 'outdoorLocation', nsfw)]

    // Time/Weather (sometimes)
    if (Math.random() > 0.6) {
      config.value.time = [getRandomTag('time', nsfw)]
    }
    if (Math.random() > 0.8) {
      config.value.weather = [getRandomTag('weather', nsfw)]
    }

    // Lighting
    config.value.lighting = getRandomTags('lighting', Math.ceil(Math.random() * 2), nsfw)

    // Effects (sometimes)
    if (Math.random() > 0.7) {
      config.value.effect = [getRandomTag('effect', nsfw)]
    }

    // Art style (sometimes)
    if (Math.random() > 0.5) {
      config.value.artStyle = [getRandomTag('artStyle', nsfw)]
    }

    // Quality tags (always)
    config.value.quality = ['masterpiece', 'very aesthetic']

    // NSFW specific
    if (nsfw) {
      config.value.nsfwBody = getRandomTags('nsfwBody', Math.ceil(Math.random() * 2), true)
      if (Math.random() > 0.5) {
        config.value.nsfwClothing = [getRandomTag('nsfwClothing', true)]
      }
      config.value.rating = Math.random() > 0.5 ? 'rating:explicit' : 'rating:questionable'
      config.value.undesiredPreset = 'nsfw-heavy'
    }
  }

  // Save current to history
  const saveToHistory = () => {
    const prompt = generatePrompt()
    const entry: HistoryEntry = {
      id: prompt.id,
      prompt,
      timestamp: Date.now(),
      favorite: false
    }
    addToHistory(entry)
    return prompt
  }

  // Estimate token count (rough approximation)
  const estimatedTokens = computed(() => {
    // NovelAI uses T5 tokenizer, roughly 1 token per 4 chars + commas
    const prompt = buildPrompt.value
    const words = prompt.split(/[\s,]+/).filter(w => w)
    return Math.ceil(words.length * 1.3) // Rough estimate
  })

  return {
    config,
    buildPrompt,
    undesiredContent,
    modelSettings,
    generatePrompt,
    resetConfig,
    updateCategory,
    toggleTag,
    randomizeCategories,
    generateFullRandom,
    saveToHistory,
    estimatedTokens
  }
}
