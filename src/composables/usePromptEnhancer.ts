// Advanced Prompt Engineering Composable
// Provides structured parsing, weighting, repetition, and enhancement features

import { ref } from 'vue'
import type {
  ParsedPrompt,
  WeightLevel,
  WeightedTag,
  RepetitionLevel,
  TokenBudget,
  TokenStatus,
  EnhancementSettings,
  EnhancedPrompt,
  PromptChange,
  QualityPreset,
  QualityPresetConfig
} from '@/types/enhancer'
import { defaultEnhancementSettings } from '@/types/enhancer'
import { normalizeTag, getVariations } from '@/data/tagNormalization'

// Quality preset configurations
export const qualityPresets: Record<QualityPreset, QualityPresetConfig> = {
  balanced: {
    id: 'balanced',
    name: 'Balanced',
    tags: ['masterpiece', 'very aesthetic'],
    description: 'Standard quality tags for consistent results'
  },
  artistic: {
    id: 'artistic',
    name: 'Artistic',
    tags: ['masterpiece', 'very aesthetic', 'absurdres'],
    description: 'Enhanced resolution and artistic quality'
  },
  photorealistic: {
    id: 'photorealistic',
    name: 'Photorealistic',
    tags: ['masterpiece', 'best quality', 'highres', 'ultra-detailed'],
    description: 'Realistic rendering with high detail'
  },
  anime: {
    id: 'anime',
    name: 'Anime',
    tags: ['masterpiece', 'very aesthetic', 'newest', 'anime coloring'],
    description: 'Modern anime art style'
  },
  hoyoverse: {
    id: 'hoyoverse',
    name: 'Hoyoverse',
    tags: ['masterpiece', 'very aesthetic', 'official art'],
    description: 'Chrientmip signature style - HSR/Genshin quality'
  }
}

// Category patterns for parsing
const categoryPatterns = {
  subject: ['1girl', '1boy', '2girls', '2boys', 'multiple girls', 'multiple boys', 'solo', 'couple', 'group'],
  bodyType: ['petite', 'mature', 'muscular', 'slender', 'curvy', 'tall', 'short', 'loli', 'shota'],
  species: ['human', 'elf', 'demon', 'angel', 'fox girl', 'cat girl', 'dragon', 'kemonomimi'],
  hairColor: ['black hair', 'blonde hair', 'brown hair', 'red hair', 'blue hair', 'pink hair', 'white hair', 'silver hair', 'grey hair', 'green hair', 'purple hair', 'orange hair', 'multicolored hair'],
  hairLength: ['long hair', 'short hair', 'medium hair', 'very long hair', 'absurdly long hair'],
  hairStyle: ['ponytail', 'twintails', 'braid', 'bun', 'messy hair', 'straight hair', 'wavy hair', 'curly hair', 'bob cut', 'pixie cut', 'side ponytail', 'drill hair'],
  eyeColor: ['red eyes', 'blue eyes', 'green eyes', 'purple eyes', 'yellow eyes', 'pink eyes', 'brown eyes', 'orange eyes', 'heterochromia', 'glowing eyes'],
  bodyFeatures: ['large breasts', 'medium breasts', 'small breasts', 'flat chest', 'thick thighs', 'wide hips', 'abs', 'muscular'],
  pose: ['standing', 'sitting', 'lying', 'kneeling', 'squatting', 'walking', 'running', 'jumping', 'fighting', 'leaning', 'crossed arms', 'arms up', 'hand on hip'],
  expression: ['smile', 'smiling', 'serious', 'angry', 'sad', 'crying', 'blushing', 'expressionless', 'grin', 'open mouth', 'closed eyes'],
  clothing: ['dress', 'armor', 'uniform', 'casual', 'swimsuit', 'bikini', 'lingerie', 'nude', 'school uniform', 'maid', 'kimono', 'suit'],
  scene: ['indoors', 'outdoors', 'bedroom', 'forest', 'city', 'beach', 'night', 'day', 'sunset', 'rain'],
  composition: ['portrait', 'full body', 'upper body', 'cowboy shot', 'close-up', 'from above', 'from below', 'from side', 'from behind'],
  lighting: ['dramatic lighting', 'soft lighting', 'backlighting', 'rim lighting', 'natural lighting', 'studio lighting', 'neon lighting'],
  style: ['anime style', 'realistic', 'semi-realistic', 'oil painting', 'watercolor', 'sketch', 'official art', 'honkai: star rail', 'genshin impact'],
  quality: ['masterpiece', 'best quality', 'highres', 'absurdres', 'very aesthetic', 'detailed', 'official art']
}

// Auto-weight categories reference (for documentation)
// critical: 'subject', 'bodyType', 'species'
// strong: 'hairColor', 'eyeColor', 'bodyFeatures'
// normal: 'hairLength', 'hairStyle', 'pose', 'expression', 'clothing', 'scene', 'composition'
// weak: 'lighting', 'style'

// Negative prompt patterns
const conditionalNegatives: Record<string, string[]> = {
  'large breasts': ['flat chest', 'small breasts'],
  'small breasts': ['large breasts', 'huge breasts'],
  'flat chest': ['breasts', 'large breasts'],
  'long hair': ['short hair', 'bob cut'],
  'short hair': ['long hair', 'very long hair'],
  'standing': ['lying', 'sitting'],
  'sitting': ['standing', 'lying'],
  'lying': ['standing', 'sitting'],
  'muscular': ['thin', 'skinny'],
  'slender': ['fat', 'overweight'],
  'young': ['old', 'elderly'],
  'smile': ['crying', 'sad'],
  'serious': ['smile', 'happy']
}

const baseNegatives = [
  'lowres',
  'bad anatomy',
  'bad hands',
  'text',
  'error',
  'missing fingers',
  'cropped',
  'worst quality',
  'jpeg artifacts',
  'signature',
  'watermark'
]

const advancedNegatives = {
  character: ['deformed', 'disfigured', 'mutation', 'mutated', 'ugly'],
  anatomy: ['extra limbs', 'fused fingers', 'long neck', 'extra arms', 'extra legs', 'malformed limbs'],
  quality: ['blurry', 'sketch', 'unfinished', 'low quality', 'normal quality'],
  nsfw: ['censored', 'mosaic censoring', 'bar censor']
}

export function usePromptEnhancer() {
  // Enhancement settings
  const settings = ref<EnhancementSettings>({ ...defaultEnhancementSettings })

  // Parse prompt into structured components
  function parsePrompt(prompt: string): ParsedPrompt {
    const tags = prompt.split(',').map(t => t.trim().toLowerCase()).filter(Boolean)
    const result: ParsedPrompt = {
      quality: [],
      subject: [],
      features: [],
      details: [],
      pose: [],
      scene: [],
      composition: [],
      style: [],
      custom: []
    }

    for (const tag of tags) {
      let categorized = false

      // Check quality tags
      if (categoryPatterns.quality.some(p => tag.includes(p))) {
        result.quality.push(tag)
        categorized = true
        continue
      }

      // Check subject tags
      if (categoryPatterns.subject.some(p => tag.includes(p)) ||
          categoryPatterns.bodyType.some(p => tag.includes(p)) ||
          categoryPatterns.species.some(p => tag.includes(p))) {
        result.subject.push(tag)
        categorized = true
        continue
      }

      // Check feature tags (hair, eyes, body)
      if (categoryPatterns.hairColor.some(p => tag.includes(p)) ||
          categoryPatterns.hairLength.some(p => tag.includes(p)) ||
          categoryPatterns.hairStyle.some(p => tag.includes(p)) ||
          categoryPatterns.eyeColor.some(p => tag.includes(p)) ||
          categoryPatterns.bodyFeatures.some(p => tag.includes(p))) {
        result.features.push(tag)
        categorized = true
        continue
      }

      // Check clothing/details
      if (categoryPatterns.clothing.some(p => tag.includes(p))) {
        result.details.push(tag)
        categorized = true
        continue
      }

      // Check pose
      if (categoryPatterns.pose.some(p => tag.includes(p)) ||
          categoryPatterns.expression.some(p => tag.includes(p))) {
        result.pose.push(tag)
        categorized = true
        continue
      }

      // Check scene
      if (categoryPatterns.scene.some(p => tag.includes(p)) ||
          categoryPatterns.lighting.some(p => tag.includes(p))) {
        result.scene.push(tag)
        categorized = true
        continue
      }

      // Check composition
      if (categoryPatterns.composition.some(p => tag.includes(p))) {
        result.composition.push(tag)
        categorized = true
        continue
      }

      // Check style
      if (categoryPatterns.style.some(p => tag.includes(p))) {
        result.style.push(tag)
        categorized = true
        continue
      }

      // Uncategorized goes to custom
      if (!categorized) {
        result.custom.push(tag)
      }
    }

    return result
  }

  // Determine weight level for a tag
  function getTagWeightLevel(tag: string): WeightLevel {
    const lowerTag = tag.toLowerCase()

    // Check critical categories
    for (const pattern of categoryPatterns.subject) {
      if (lowerTag.includes(pattern)) return 'critical'
    }
    for (const pattern of categoryPatterns.bodyType) {
      if (lowerTag.includes(pattern)) return 'critical'
    }

    // Check strong categories
    for (const pattern of categoryPatterns.hairColor) {
      if (lowerTag.includes(pattern)) return 'strong'
    }
    for (const pattern of categoryPatterns.eyeColor) {
      if (lowerTag.includes(pattern)) return 'strong'
    }
    for (const pattern of categoryPatterns.bodyFeatures) {
      if (lowerTag.includes(pattern)) return 'strong'
    }

    // Check weak categories
    for (const pattern of categoryPatterns.lighting) {
      if (lowerTag.includes(pattern)) return 'weak'
    }

    return 'normal'
  }

  // Apply weight syntax to a tag
  function applyWeight(tag: string, level: WeightLevel, multiplier: number = 1.0): string {
    // Already has weight syntax, don't double-wrap
    if (tag.startsWith('{') || tag.startsWith('[') || tag.includes('::')) {
      return tag
    }

    switch (level) {
      case 'critical':
        // Double braces for 1.1025x
        if (multiplier >= 1.2) {
          return `{{${tag}}}`
        }
        return `{${tag}}`

      case 'strong':
        if (multiplier !== 1.0) {
          const weight = (1.2 * multiplier).toFixed(1)
          return `${weight}::${tag}::`
        }
        return `{${tag}}`

      case 'weak':
        return `[${tag}]`

      default:
        return tag
    }
  }

  // Apply auto-weighting to all tags
  function applyAutoWeighting(tags: string[], multiplier: number = 1.0): WeightedTag[] {
    return tags.map(tag => {
      const level = getTagWeightLevel(tag)
      return {
        tag,
        weight: level,
        customWeight: level !== 'normal' ? multiplier : undefined
      }
    })
  }

  // Generate semantic variations for repetition
  function generateRepetitions(
    tags: string[],
    level: RepetitionLevel,
    categories: { hair: boolean; body: boolean; clothing: boolean; pose: boolean }
  ): { original: string; variations: string[] }[] {
    if (level === 'none') return []

    const maxVariations = level === 'light' ? 1 : level === 'medium' ? 2 : 3
    const results: { original: string; variations: string[] }[] = []

    for (const tag of tags) {
      const lowerTag = tag.toLowerCase()
      const variations = getVariations(lowerTag)

      if (variations.length === 0) continue

      // Check category filters
      let shouldRepeat = false

      if (categories.hair) {
        if (categoryPatterns.hairColor.some(p => lowerTag.includes(p)) ||
            categoryPatterns.hairLength.some(p => lowerTag.includes(p))) {
          shouldRepeat = true
        }
      }

      if (categories.body) {
        if (categoryPatterns.bodyFeatures.some(p => lowerTag.includes(p))) {
          shouldRepeat = true
        }
      }

      if (categories.clothing) {
        if (categoryPatterns.clothing.some(p => lowerTag.includes(p))) {
          shouldRepeat = true
        }
      }

      if (categories.pose) {
        if (categoryPatterns.pose.some(p => lowerTag.includes(p))) {
          shouldRepeat = true
        }
      }

      if (shouldRepeat) {
        results.push({
          original: tag,
          variations: variations.slice(0, maxVariations)
        })
      }
    }

    return results
  }

  // Estimate token count
  function estimateTokens(prompt: string): number {
    // NovelAI uses roughly 4 chars per token
    return Math.ceil(prompt.length / 4)
  }

  // Get token status
  function getTokenStatus(count: number): TokenStatus {
    if (count <= 150) return 'optimal'
    if (count <= 225) return 'good'
    if (count <= 350) return 'warning'
    return 'danger'
  }

  // Calculate token breakdown by category
  function calculateTokenBreakdown(parsed: ParsedPrompt): TokenBudget['breakdown'] {
    return {
      quality: estimateTokens(parsed.quality.join(', ')),
      subject: estimateTokens(parsed.subject.join(', ')),
      features: estimateTokens(parsed.features.join(', ')),
      details: estimateTokens(parsed.details.join(', ')),
      pose: estimateTokens(parsed.pose.join(', ')),
      scene: estimateTokens(parsed.scene.join(', ')),
      composition: estimateTokens(parsed.composition.join(', ')),
      style: estimateTokens([...parsed.style, ...parsed.custom].join(', '))
    }
  }

  // Generate conditional negatives based on prompt content
  function generateNegatives(prompt: string, isNsfw: boolean = false): string[] {
    const negatives = [...baseNegatives]
    const lowerPrompt = prompt.toLowerCase()

    // Add conditional negatives
    for (const [trigger, additions] of Object.entries(conditionalNegatives)) {
      if (lowerPrompt.includes(trigger)) {
        negatives.push(...additions)
      }
    }

    // Add advanced negatives
    negatives.push(...advancedNegatives.character)
    negatives.push(...advancedNegatives.anatomy)
    negatives.push(...advancedNegatives.quality)

    // Add NSFW-specific negatives
    if (isNsfw) {
      negatives.push(...advancedNegatives.nsfw)
    }

    // Remove duplicates
    return [...new Set(negatives)]
  }

  // Reorder tags by priority
  function reorderByPriority(parsed: ParsedPrompt, qualityTags: string[]): string[] {
    const ordered: string[] = []

    // 1. Quality tags first
    ordered.push(...qualityTags)

    // 2. Subject (character type)
    ordered.push(...parsed.subject)

    // 3. Key features (hair, eyes, body - most important)
    ordered.push(...parsed.features)

    // 4. Details (clothing, accessories)
    ordered.push(...parsed.details)

    // 5. Pose/action
    ordered.push(...parsed.pose)

    // 6. Scene/background
    ordered.push(...parsed.scene)

    // 7. Composition
    ordered.push(...parsed.composition)

    // 8. Style modifiers
    ordered.push(...parsed.style)

    // 9. Custom tags
    ordered.push(...parsed.custom)

    return ordered
  }

  // Main enhancement function
  function enhancePrompt(
    originalPrompt: string,
    isNsfw: boolean = false
  ): EnhancedPrompt {
    const changes: PromptChange[] = []
    let workingTags = originalPrompt.split(',').map(t => t.trim()).filter(Boolean)

    // Step 1: Normalize tags (if enabled)
    if (settings.value.booruNormalization) {
      workingTags = workingTags.map(tag => {
        const normalized = normalizeTag(tag)
        if (normalized !== tag) {
          changes.push({
            type: 'normalize',
            original: tag,
            result: normalized,
            reason: 'Booru tag normalization'
          })
        }
        return normalized
      })
    }

    // Step 2: Parse into structure
    const parsed = parsePrompt(workingTags.join(', '))

    // Step 3: Get quality preset tags
    const qualityPreset = qualityPresets[settings.value.qualityPreset]
    const qualityTags = qualityPreset.tags.filter(t => !parsed.quality.includes(t))

    // Step 4: Reorder by priority
    const reordered = reorderByPriority(parsed, qualityTags)
    if (reordered.join(', ') !== workingTags.join(', ')) {
      changes.push({
        type: 'reorder',
        original: 'original order',
        result: 'priority order',
        reason: 'Optimized tag ordering for NovelAI'
      })
    }

    // Step 5: Apply auto-weighting (if enabled)
    let finalTags = [...reordered]
    if (settings.value.autoWeight) {
      const weighted = applyAutoWeighting(reordered, settings.value.autoWeightLevel)
      finalTags = weighted.map(wt => {
        if (wt.weight !== 'normal') {
          const weightedTag = applyWeight(wt.tag, wt.weight, wt.customWeight)
          if (weightedTag !== wt.tag) {
            changes.push({
              type: 'weight',
              original: wt.tag,
              result: weightedTag,
              reason: `${wt.weight} emphasis applied`
            })
          }
          return weightedTag
        }
        return wt.tag
      })
    }

    // Step 6: Apply smart repetition (if enabled)
    if (settings.value.smartRepetition.level !== 'none') {
      const allOriginalTags = originalPrompt.split(',').map(t => t.trim().toLowerCase())
      const repetitions = generateRepetitions(
        allOriginalTags,
        settings.value.smartRepetition.level,
        {
          hair: settings.value.smartRepetition.repeatHair,
          body: settings.value.smartRepetition.repeatBody,
          clothing: settings.value.smartRepetition.repeatClothing,
          pose: settings.value.smartRepetition.repeatPose
        }
      )

      for (const rep of repetitions) {
        // Insert variations spread throughout the prompt
        for (const variation of rep.variations) {
          // Check if variation is not already in the prompt
          if (!finalTags.some(t => t.toLowerCase().includes(variation))) {
            finalTags.push(variation)
            changes.push({
              type: 'repeat',
              original: rep.original,
              result: variation,
              reason: 'Smart repetition for reinforcement'
            })
          }
        }
      }
    }

    // Step 7: Generate negatives (if enabled)
    let negatives: string[] = []
    if (settings.value.autoNegatives) {
      negatives = generateNegatives(originalPrompt, isNsfw)
      changes.push({
        type: 'negative',
        original: '',
        result: `${negatives.length} negative tags`,
        reason: 'Auto-generated based on content'
      })
    }

    // Build final prompt
    const enhanced = finalTags.join(', ')
    const tokens = estimateTokens(enhanced)

    // Calculate breakdown
    const breakdown = calculateTokenBreakdown(parsed)

    return {
      original: originalPrompt,
      enhanced,
      tokens: {
        count: tokens,
        status: getTokenStatus(tokens),
        breakdown
      },
      changes,
      negatives
    }
  }

  // Smart truncation when over budget
  function truncatePrompt(prompt: string, targetTokens: number = 225): string {
    const parsed = parsePrompt(prompt)
    let currentTokens = estimateTokens(prompt)

    if (currentTokens <= targetTokens) return prompt

    // Priority order for removal (lowest priority first)
    const removalOrder: (keyof ParsedPrompt)[] = ['custom', 'style', 'scene', 'composition', 'pose', 'details']

    for (const category of removalOrder) {
      while (parsed[category].length > 0 && currentTokens > targetTokens) {
        parsed[category].pop()
        const newPrompt = [
          ...parsed.quality,
          ...parsed.subject,
          ...parsed.features,
          ...parsed.details,
          ...parsed.pose,
          ...parsed.scene,
          ...parsed.composition,
          ...parsed.style,
          ...parsed.custom
        ].join(', ')
        currentTokens = estimateTokens(newPrompt)
      }
    }

    return [
      ...parsed.quality,
      ...parsed.subject,
      ...parsed.features,
      ...parsed.details,
      ...parsed.pose,
      ...parsed.scene,
      ...parsed.composition,
      ...parsed.style,
      ...parsed.custom
    ].join(', ')
  }

  // Update settings
  function updateSettings(newSettings: Partial<EnhancementSettings>) {
    settings.value = { ...settings.value, ...newSettings }
  }

  // Reset settings to defaults
  function resetSettings() {
    settings.value = { ...defaultEnhancementSettings }
  }

  return {
    // State
    settings,
    qualityPresets,

    // Core functions
    parsePrompt,
    enhancePrompt,
    truncatePrompt,

    // Weighting
    getTagWeightLevel,
    applyWeight,
    applyAutoWeighting,

    // Repetition
    generateRepetitions,

    // Tokens
    estimateTokens,
    getTokenStatus,
    calculateTokenBreakdown,

    // Negatives
    generateNegatives,

    // Settings
    updateSettings,
    resetSettings
  }
}
