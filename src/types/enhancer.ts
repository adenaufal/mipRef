// Advanced Prompt Engineering Types

// Parsed prompt structure
export interface ParsedPrompt {
  quality: string[]
  subject: string[]
  features: string[]
  details: string[]
  pose: string[]
  scene: string[]
  composition: string[]
  style: string[]
  custom: string[]
}

// Weight levels for keyword emphasis
export type WeightLevel = 'critical' | 'strong' | 'normal' | 'weak'

export interface WeightedTag {
  tag: string
  weight: WeightLevel
  customWeight?: number
}

// Repetition settings
export type RepetitionLevel = 'none' | 'light' | 'medium' | 'strong'

export interface RepetitionSettings {
  level: RepetitionLevel
  repeatHair: boolean
  repeatBody: boolean
  repeatClothing: boolean
  repeatPose: boolean
}

// Token budget status
export type TokenStatus = 'optimal' | 'good' | 'warning' | 'danger'

export interface TokenBudget {
  count: number
  status: TokenStatus
  breakdown: {
    quality: number
    subject: number
    features: number
    details: number
    pose: number
    scene: number
    composition: number
    style: number
  }
}

// Enhancement settings
export interface EnhancementSettings {
  autoWeight: boolean
  autoWeightLevel: number // 0.8 - 1.5 multiplier
  smartRepetition: RepetitionSettings
  autoNegatives: boolean
  booruNormalization: boolean
  qualityPreset: QualityPreset
  showBeforeAfter: boolean
}

// Quality presets
export type QualityPreset = 'balanced' | 'artistic' | 'photorealistic' | 'anime' | 'hoyoverse'

export interface QualityPresetConfig {
  id: QualityPreset
  name: string
  tags: string[]
  description: string
}

// Tag normalization mapping
export interface TagMapping {
  input: string[]
  output: string
  category?: string
}

// Semantic variations for repetition
export interface SemanticVariation {
  base: string
  variations: string[]
  category: string
}

// Enhanced prompt result
export interface EnhancedPrompt {
  original: string
  enhanced: string
  tokens: TokenBudget
  changes: PromptChange[]
  negatives: string[]
}

// Track what changes were made
export interface PromptChange {
  type: 'weight' | 'repeat' | 'normalize' | 'reorder' | 'negative'
  original: string
  result: string
  reason: string
}

// Default enhancement settings
export const defaultEnhancementSettings: EnhancementSettings = {
  autoWeight: true,
  autoWeightLevel: 1.0,
  smartRepetition: {
    level: 'light',
    repeatHair: true,
    repeatBody: true,
    repeatClothing: false,
    repeatPose: false
  },
  autoNegatives: true,
  booruNormalization: true,
  qualityPreset: 'hoyoverse',
  showBeforeAfter: true
}
