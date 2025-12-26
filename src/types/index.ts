// Core Types for mipRef

export interface PromptConfig {
  // Model settings
  model: 'v45-full' | 'v45-curated'
  mode: 'guided' | 'random' | 'nsfw'

  // Dataset prefix
  datasetPrefix: string | null // 'fur dataset,' or 'background dataset,' or null

  // Character
  gender: string[]
  bodyType: string[]
  species: string[]

  // Hair
  hairColor: string[]
  hairLength: string[]
  hairStyle: string[]

  // Eyes
  eyeColor: string[]
  eyeStyle: string[]

  // Skin/Body
  skin: string[]

  // Outfit
  clothingStyle: string[]
  outfitDetail: string[]
  accessory: string[]
  weapon: string[]

  // Pose
  pose: string[]
  expression: string[]
  looking: string[]

  // Composition
  composition: string[]

  // Background
  location: string[]
  time: string[]
  weather: string[]

  // Style
  lighting: string[]
  effect: string[]
  artStyle: string[]
  yearTag: string | null

  // Quality
  quality: string[]

  // NSFW
  nsfwBody: string[]
  nsfwClothing: string[]
  nsfwPose: string[]
  rating: string | null

  // Undesired content
  undesiredPreset: string
  customUndesired: string

  // Additional
  customTags: string
}

export interface GeneratedPrompt {
  id: string
  timestamp: number
  config: PromptConfig
  mainPrompt: string
  undesiredContent: string
  modelSettings: {
    model: string
    guidance: number
    steps: number
  }
}

export interface SavedTemplate {
  id: string
  name: string
  description: string
  config: Partial<PromptConfig>
  createdAt: number
  updatedAt: number
}

export interface HistoryEntry {
  id: string
  prompt: GeneratedPrompt
  timestamp: number
  favorite: boolean
}

export interface AppSettings {
  nsfwEnabled: boolean
  nsfwConfirmed: boolean
  defaultModel: 'v45-full' | 'v45-curated'
  defaultUndesiredPreset: string
  defaultGuidance: number
  defaultSteps: number
  showTokenCount: boolean
  compactMode: boolean
}

// Default empty config
export const defaultPromptConfig: PromptConfig = {
  model: 'v45-full',
  mode: 'guided',
  datasetPrefix: null,
  gender: [],
  bodyType: [],
  species: [],
  hairColor: [],
  hairLength: [],
  hairStyle: [],
  eyeColor: [],
  eyeStyle: [],
  skin: [],
  clothingStyle: [],
  outfitDetail: [],
  accessory: [],
  weapon: [],
  pose: [],
  expression: [],
  looking: [],
  composition: [],
  location: [],
  time: [],
  weather: [],
  lighting: [],
  effect: [],
  artStyle: [],
  yearTag: null,
  quality: ['masterpiece', 'very aesthetic'],
  nsfwBody: [],
  nsfwClothing: [],
  nsfwPose: [],
  rating: null,
  undesiredPreset: 'heavy',
  customUndesired: '',
  customTags: ''
}

export const defaultAppSettings: AppSettings = {
  nsfwEnabled: false,
  nsfwConfirmed: false,
  defaultModel: 'v45-full',
  defaultUndesiredPreset: 'heavy',
  defaultGuidance: 5,
  defaultSteps: 28,
  showTokenCount: true,
  compactMode: false
}
