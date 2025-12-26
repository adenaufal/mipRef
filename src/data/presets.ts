// NovelAI V4.5 Presets and Undesired Content

export interface UndesiredPreset {
  id: string
  name: string
  description: string
  tags: string
  nsfw?: boolean
}

// Undesired Content Presets for V4.5 Full
export const undesiredPresets: UndesiredPreset[] = [
  {
    id: 'heavy',
    name: 'Heavy',
    description: 'Maximum quality filtering - recommended default',
    tags: 'lowres, artistic error, film grain, scan artifacts, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, dithering, halftone, screentone, multiple views, logo, too many watermarks, negative space, blank page'
  },
  {
    id: 'light',
    name: 'Light',
    description: 'Minimal filtering for artistic styles',
    tags: 'lowres, artistic error, scan artifacts, worst quality, bad quality, jpeg artifacts, multiple views, very displeasing, too many watermarks, negative space, blank page'
  },
  {
    id: 'human-focus',
    name: 'Human Focus',
    description: 'Optimized for character art with anatomy fixes',
    tags: 'lowres, artistic error, film grain, scan artifacts, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, dithering, halftone, screentone, multiple views, logo, too many watermarks, negative space, blank page, @_@, mismatched pupils, glowing eyes, bad anatomy'
  },
  {
    id: 'furry-focus',
    name: 'Furry Focus',
    description: 'Optimized for furry art',
    tags: 'lowres, artistic error, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, multiple views, logo, too many watermarks, negative space, blank page, bad anatomy, wrong anatomy'
  },
  {
    id: 'nsfw-heavy',
    name: 'NSFW Heavy',
    description: 'For explicit content with anatomy focus',
    tags: 'lowres, artistic error, film grain, scan artifacts, worst quality, bad quality, jpeg artifacts, very displeasing, chromatic aberration, multiple views, logo, too many watermarks, bad anatomy, wrong anatomy, extra limbs, missing limbs, bad hands, bad fingers, extra fingers, missing fingers',
    nsfw: true
  },
  {
    id: 'none',
    name: 'None',
    description: 'No undesired content filtering',
    tags: ''
  }
]

// Model Options
export interface ModelOption {
  id: string
  name: string
  description: string
  qualityTags: string
  recommendedGuidance: { min: number; max: number; default: number }
  recommendedSteps: { min: number; max: number; default: number }
}

export const modelOptions: ModelOption[] = [
  {
    id: 'v45-full',
    name: 'V4.5 Full',
    description: 'Comprehensive dataset, more creative freedom',
    qualityTags: 'no text, best quality, very aesthetic, absurdres',
    recommendedGuidance: { min: 2, max: 6, default: 5 },
    recommendedSteps: { min: 20, max: 50, default: 28 }
  },
  {
    id: 'v45-curated',
    name: 'V4.5 Curated',
    description: 'Cleaner dataset, safer outputs',
    qualityTags: 'location, masterpiece, no text, -0.8::feet::, rating:general',
    recommendedGuidance: { min: 2, max: 6, default: 5 },
    recommendedSteps: { min: 20, max: 50, default: 28 }
  }
]

// Generation Modes
export interface GenerationMode {
  id: string
  name: string
  icon: string
  description: string
  nsfw?: boolean
}

export const generationModes: GenerationMode[] = [
  {
    id: 'guided',
    name: 'Guided',
    icon: '✏️',
    description: 'Step by step prompt building'
  },
  {
    id: 'random',
    name: 'Full Random',
    icon: '🎲',
    description: 'Randomize everything'
  },
  {
    id: 'nsfw',
    name: 'NSFW',
    icon: '🔞',
    description: 'Adult content mode',
    nsfw: true
  }
]

// HSR/Hoyoverse Style Quick Presets
export interface StylePreset {
  id: string
  name: string
  tags: string[]
  category: string
}

export const stylePresets: StylePreset[] = [
  {
    id: 'hsr-character',
    name: 'HSR Character',
    tags: ['honkai: star rail', 'anime style', 'official art', 'detailed', 'dramatic lighting'],
    category: 'hoyoverse'
  },
  {
    id: 'genshin-character',
    name: 'Genshin Character',
    tags: ['genshin impact', 'anime style', 'fantasy', 'detailed', 'volumetric lighting'],
    category: 'hoyoverse'
  },
  {
    id: 'fantasy-portrait',
    name: 'Fantasy Portrait',
    tags: ['portrait', 'fantasy', 'detailed', 'dramatic lighting', 'rim lighting'],
    category: 'general'
  },
  {
    id: 'action-scene',
    name: 'Action Scene',
    tags: ['dynamic pose', 'action', 'motion blur', 'dramatic lighting', 'energy'],
    category: 'general'
  },
  {
    id: 'cozy-slice',
    name: 'Cozy Slice of Life',
    tags: ['soft lighting', 'warm colors', 'casual clothes', 'smile', 'relaxed pose'],
    category: 'general'
  },
  {
    id: 'dark-aesthetic',
    name: 'Dark Aesthetic',
    tags: ['dark background', 'dramatic lighting', 'chiaroscuro', 'serious', 'low key lighting'],
    category: 'general'
  }
]

// Quick random presets for "I'm Stuck" feature
export interface RandomPreset {
  id: string
  name: string
  icon: string
  categories: string[] // Which categories to randomize
}

export const randomPresets: RandomPreset[] = [
  {
    id: 'full-random',
    name: 'Full Random',
    icon: '🎲',
    categories: ['gender', 'bodyType', 'hairColor', 'hairLength', 'hairStyle', 'eyeColor', 'expression', 'clothingStyle', 'accessory', 'standingPose', 'composition', 'indoorLocation', 'lighting', 'artStyle', 'quality']
  },
  {
    id: 'character-only',
    name: 'Random Character',
    icon: '👤',
    categories: ['gender', 'bodyType', 'hairColor', 'hairLength', 'hairStyle', 'eyeColor', 'expression']
  },
  {
    id: 'outfit-only',
    name: 'Random Outfit',
    icon: '👗',
    categories: ['clothingStyle', 'outfitDetail', 'accessory']
  },
  {
    id: 'scene-only',
    name: 'Random Scene',
    icon: '🏞️',
    categories: ['indoorLocation', 'outdoorLocation', 'time', 'weather', 'lighting']
  },
  {
    id: 'pose-only',
    name: 'Random Pose',
    icon: '🤸',
    categories: ['standingPose', 'sittingPose', 'expression', 'looking']
  }
]

// Emphasis syntax helpers
export const emphasisExamples = {
  strong: '{{tag}}', // 1.1025x
  medium: '{tag}',   // 1.05x
  weak: '[tag]',     // 0.95x
  numerical: '1.5::tag::', // custom strength
  negative: '-1::tag::' // remove/inverse
}
