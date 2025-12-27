// Booru-style Tag Normalization Database
// Maps natural language and common variations to standardized tags

import type { TagMapping, SemanticVariation } from '@/types/enhancer'

// Tag normalization mappings
export const tagMappings: TagMapping[] = [
  // Anatomy normalization
  { input: ['big boobs', 'huge tits', 'oppai', 'busty'], output: 'large breasts', category: 'body' },
  { input: ['flat chested', 'no boobs', 'flat'], output: 'flat chest', category: 'body' },
  { input: ['thick thighs', 'thicc thighs'], output: 'thick thighs', category: 'body' },
  { input: ['wide hips', 'childbearing hips'], output: 'wide hips', category: 'body' },
  { input: ['slim', 'skinny', 'thin'], output: 'slender', category: 'body' },
  { input: ['fat', 'chubby', 'plump', 'thicc'], output: 'curvy', category: 'body' },
  { input: ['tall girl', 'amazon'], output: 'tall female', category: 'body' },
  { input: ['short girl', 'shortstack'], output: 'short female', category: 'body' },
  { input: ['big ass', 'huge ass', 'thicc ass'], output: 'large ass', category: 'body' },

  // Hair color normalization
  { input: ['grey hair', 'gray hair'], output: 'grey hair', category: 'hair' },
  { input: ['platinum hair', 'platinum blonde'], output: 'platinum blonde hair', category: 'hair' },
  { input: ['ginger', 'ginger hair'], output: 'orange hair', category: 'hair' },
  { input: ['brunette'], output: 'brown hair', category: 'hair' },
  { input: ['raven hair', 'jet black hair'], output: 'black hair', category: 'hair' },
  { input: ['strawberry blonde'], output: 'light orange hair', category: 'hair' },
  { input: ['dirty blonde', 'dark blonde'], output: 'dark blonde hair', category: 'hair' },

  // Hair style normalization
  { input: ['ponytail', 'pony tail'], output: 'ponytail', category: 'hair' },
  { input: ['twin tails', 'twintail', 'pigtails'], output: 'twintails', category: 'hair' },
  { input: ['messy hair', 'bed head', 'bedhead'], output: 'messy hair', category: 'hair' },
  { input: ['straight hair'], output: 'straight hair', category: 'hair' },
  { input: ['wavy hair', 'waves'], output: 'wavy hair', category: 'hair' },
  { input: ['curly hair', 'curls'], output: 'curly hair', category: 'hair' },
  { input: ['bob cut', 'bob haircut'], output: 'bob cut', category: 'hair' },
  { input: ['pixie cut', 'pixie haircut'], output: 'pixie cut', category: 'hair' },
  { input: ['braided', 'braid'], output: 'braid', category: 'hair' },

  // Hair length
  { input: ['super long hair', 'floor length hair'], output: 'absurdly long hair', category: 'hair' },
  { input: ['ass length hair', 'hip length hair'], output: 'very long hair', category: 'hair' },
  { input: ['shoulder length hair', 'mid length hair'], output: 'medium hair', category: 'hair' },
  { input: ['neck length hair', 'chin length hair'], output: 'short hair', category: 'hair' },

  // Eye normalization
  { input: ['crimson eyes', 'blood red eyes'], output: 'red eyes', category: 'eyes' },
  { input: ['golden eyes', 'gold eyes'], output: 'yellow eyes', category: 'eyes' },
  { input: ['ice blue eyes', 'sky blue eyes'], output: 'blue eyes', category: 'eyes' },
  { input: ['forest green eyes', 'emerald eyes'], output: 'green eyes', category: 'eyes' },
  { input: ['purple eyes', 'violet eyes'], output: 'purple eyes', category: 'eyes' },
  { input: ['pink eyes', 'rose eyes'], output: 'pink eyes', category: 'eyes' },
  { input: ['odd eyes', 'different colored eyes'], output: 'heterochromia', category: 'eyes' },
  { input: ['glowing eyes', 'glowy eyes'], output: 'glowing eyes', category: 'eyes' },

  // Style normalization
  { input: ['hsr', 'star rail', 'starrail'], output: 'honkai: star rail', category: 'style' },
  { input: ['genshin', 'gi', 'genshin style'], output: 'genshin impact', category: 'style' },
  { input: ['hoyoverse', 'hoyo', 'mihoyo'], output: 'hoyoverse style', category: 'style' },
  { input: ['zzz', 'zenless'], output: 'zenless zone zero', category: 'style' },
  { input: ['hi3', 'honkai 3rd', 'honkai impact'], output: 'honkai impact 3rd', category: 'style' },
  { input: ['anime', 'anime style'], output: 'anime style', category: 'style' },
  { input: ['realistic', 'photorealistic'], output: 'photorealistic', category: 'style' },
  { input: ['semi realistic', 'semirealistic'], output: 'semi-realistic', category: 'style' },

  // Pose normalization
  { input: ['standing up', 'stood up'], output: 'standing', category: 'pose' },
  { input: ['laying down', 'laying', 'lay down'], output: 'lying', category: 'pose' },
  { input: ['sitting down', 'sat down', 'seated'], output: 'sitting', category: 'pose' },
  { input: ['kneeling down', 'on knees'], output: 'kneeling', category: 'pose' },
  { input: ['crouching', 'crouched'], output: 'squatting', category: 'pose' },
  { input: ['leaning forward', 'bending over'], output: 'leaning forward', category: 'pose' },
  { input: ['arms behind back', 'hands behind back'], output: 'arms behind back', category: 'pose' },
  { input: ['crossed arms', 'arms folded'], output: 'crossed arms', category: 'pose' },
  { input: ['looking back', 'glancing back'], output: 'looking back', category: 'pose' },
  { input: ['over shoulder', 'looking over shoulder'], output: 'over shoulder', category: 'pose' },

  // Clothing normalization
  { input: ['hoodie', 'hooded'], output: 'hoodie', category: 'clothing' },
  { input: ['tshirt', 't shirt'], output: 't-shirt', category: 'clothing' },
  { input: ['jeans', 'denim pants'], output: 'jeans', category: 'clothing' },
  { input: ['dress shirt', 'button up shirt'], output: 'dress shirt', category: 'clothing' },
  { input: ['crop top', 'cropped top'], output: 'crop top', category: 'clothing' },
  { input: ['miniskirt', 'mini skirt'], output: 'miniskirt', category: 'clothing' },
  { input: ['thigh highs', 'thighhighs'], output: 'thighhighs', category: 'clothing' },
  { input: ['knee highs', 'kneehighs'], output: 'kneehighs', category: 'clothing' },
  { input: ['bikini armor', 'battle bikini'], output: 'bikini armor', category: 'clothing' },
  { input: ['school uniform', 'seifuku'], output: 'school uniform', category: 'clothing' },
  { input: ['maid outfit', 'maid dress'], output: 'maid', category: 'clothing' },
  { input: ['nurse outfit', 'nurse uniform'], output: 'nurse', category: 'clothing' },
  { input: ['office lady', 'ol'], output: 'office lady', category: 'clothing' },

  // Scene/Location normalization
  { input: ['inside', 'interior'], output: 'indoors', category: 'scene' },
  { input: ['outside', 'exterior'], output: 'outdoors', category: 'scene' },
  { input: ['bedroom', 'bed room'], output: 'bedroom', category: 'scene' },
  { input: ['bathroom', 'bath room'], output: 'bathroom', category: 'scene' },
  { input: ['living room', 'livingroom'], output: 'living room', category: 'scene' },
  { input: ['classroom', 'class room'], output: 'classroom', category: 'scene' },
  { input: ['forest', 'woods'], output: 'forest', category: 'scene' },
  { input: ['beach', 'seaside', 'shore'], output: 'beach', category: 'scene' },
  { input: ['city', 'urban', 'cityscape'], output: 'city', category: 'scene' },
  { input: ['night time', 'nighttime', 'at night'], output: 'night', category: 'scene' },
  { input: ['day time', 'daytime'], output: 'day', category: 'scene' },
  { input: ['sunset', 'dusk'], output: 'sunset', category: 'scene' },
  { input: ['sunrise', 'dawn'], output: 'sunrise', category: 'scene' },

  // Composition normalization
  { input: ['close up', 'closeup', 'close shot'], output: 'close-up', category: 'composition' },
  { input: ['full body', 'fullbody'], output: 'full body', category: 'composition' },
  { input: ['upper body', 'upperbody', 'bust shot'], output: 'upper body', category: 'composition' },
  { input: ['cowboy shot', 'american shot'], output: 'cowboy shot', category: 'composition' },
  { input: ['from above', 'bird eye', 'birds eye'], output: 'from above', category: 'composition' },
  { input: ['from below', 'worms eye', 'low angle'], output: 'from below', category: 'composition' },
  { input: ['side view', 'profile'], output: 'from side', category: 'composition' },
  { input: ['front view', 'facing viewer'], output: 'facing viewer', category: 'composition' },
  { input: ['back view', 'from behind'], output: 'from behind', category: 'composition' },

  // Lighting normalization
  { input: ['backlighting', 'backlit'], output: 'backlighting', category: 'lighting' },
  { input: ['rim light', 'rimlight'], output: 'rim lighting', category: 'lighting' },
  { input: ['dramatic light', 'cinematic light'], output: 'dramatic lighting', category: 'lighting' },
  { input: ['soft light', 'diffused light'], output: 'soft lighting', category: 'lighting' },
  { input: ['harsh light', 'hard light'], output: 'harsh lighting', category: 'lighting' },
  { input: ['natural light', 'sunlight'], output: 'natural lighting', category: 'lighting' },
  { input: ['studio light', 'studio lighting'], output: 'studio lighting', category: 'lighting' },
  { input: ['neon light', 'neon glow'], output: 'neon lighting', category: 'lighting' },

  // Quality normalization
  { input: ['hd', 'high definition'], output: 'highres', category: 'quality' },
  { input: ['4k', 'ultra hd', 'uhd'], output: 'absurdres', category: 'quality' },
  { input: ['detailed', 'high detail'], output: 'detailed', category: 'quality' },
  { input: ['best quality', 'highest quality'], output: 'best quality', category: 'quality' },
  { input: ['official art', 'official artwork'], output: 'official art', category: 'quality' }
]

// Semantic variations for smart repetition
export const semanticVariations: SemanticVariation[] = [
  // Body type variations
  {
    base: 'large breasts',
    variations: ['big breasts', 'huge breasts'],
    category: 'body'
  },
  {
    base: 'small breasts',
    variations: ['petite breasts', 'modest chest'],
    category: 'body'
  },
  {
    base: 'curvy',
    variations: ['voluptuous', 'hourglass figure'],
    category: 'body'
  },
  {
    base: 'slender',
    variations: ['slim', 'lithe'],
    category: 'body'
  },
  {
    base: 'muscular',
    variations: ['athletic', 'toned'],
    category: 'body'
  },
  {
    base: 'thick thighs',
    variations: ['plump thighs', 'thicc thighs'],
    category: 'body'
  },
  {
    base: 'wide hips',
    variations: ['broad hips', 'curvy hips'],
    category: 'body'
  },

  // Hair length variations
  {
    base: 'long hair',
    variations: ['very long hair', 'flowing hair'],
    category: 'hair'
  },
  {
    base: 'short hair',
    variations: ['cropped hair', 'short cut'],
    category: 'hair'
  },
  {
    base: 'medium hair',
    variations: ['shoulder length hair', 'mid-length hair'],
    category: 'hair'
  },

  // Hair color variations
  {
    base: 'silver hair',
    variations: ['grey hair', 'white hair'],
    category: 'hair'
  },
  {
    base: 'blonde hair',
    variations: ['golden hair', 'light hair'],
    category: 'hair'
  },
  {
    base: 'black hair',
    variations: ['dark hair', 'raven hair'],
    category: 'hair'
  },
  {
    base: 'red hair',
    variations: ['crimson hair', 'scarlet hair'],
    category: 'hair'
  },
  {
    base: 'blue hair',
    variations: ['azure hair', 'cobalt hair'],
    category: 'hair'
  },
  {
    base: 'pink hair',
    variations: ['rose hair', 'magenta hair'],
    category: 'hair'
  },
  {
    base: 'purple hair',
    variations: ['violet hair', 'lavender hair'],
    category: 'hair'
  },

  // Eye variations
  {
    base: 'red eyes',
    variations: ['crimson eyes', 'ruby eyes'],
    category: 'eyes'
  },
  {
    base: 'blue eyes',
    variations: ['azure eyes', 'sapphire eyes'],
    category: 'eyes'
  },
  {
    base: 'green eyes',
    variations: ['emerald eyes', 'jade eyes'],
    category: 'eyes'
  },
  {
    base: 'yellow eyes',
    variations: ['golden eyes', 'amber eyes'],
    category: 'eyes'
  },
  {
    base: 'purple eyes',
    variations: ['violet eyes', 'amethyst eyes'],
    category: 'eyes'
  },

  // Pose variations
  {
    base: 'standing',
    variations: ['standing up', 'upright'],
    category: 'pose'
  },
  {
    base: 'sitting',
    variations: ['seated', 'sitting down'],
    category: 'pose'
  },
  {
    base: 'lying',
    variations: ['lying down', 'recumbent'],
    category: 'pose'
  },

  // Clothing variations
  {
    base: 'dress',
    variations: ['gown', 'frock'],
    category: 'clothing'
  },
  {
    base: 'armor',
    variations: ['plate armor', 'armored'],
    category: 'clothing'
  },
  {
    base: 'bikini',
    variations: ['swimsuit', 'two-piece'],
    category: 'clothing'
  }
]

// Tag suggestions based on input
export const tagSuggestions: Record<string, string[]> = {
  'silver hair': ['grey hair', 'white hair', 'platinum blonde hair'],
  'long hair': ['very long hair', 'waist-length hair', 'flowing hair'],
  'short hair': ['bob cut', 'pixie cut', 'cropped hair'],
  'blue eyes': ['light blue eyes', 'aqua eyes', 'azure eyes'],
  'red eyes': ['crimson eyes', 'ruby eyes', 'glowing red eyes'],
  'large breasts': ['big breasts', 'huge breasts', 'busty'],
  'armor': ['plate armor', 'fantasy armor', 'battle armor'],
  'dress': ['long dress', 'elegant dress', 'flowing dress'],
  'standing': ['standing up', 'full body', 'upright pose'],
  'sitting': ['seated', 'sitting down', 'relaxed pose']
}

// Normalize a single tag
export function normalizeTag(tag: string): string {
  const lowerTag = tag.toLowerCase().trim()

  for (const mapping of tagMappings) {
    if (mapping.input.includes(lowerTag)) {
      return mapping.output
    }
  }

  return tag.trim()
}

// Normalize all tags in a prompt string
export function normalizeTags(prompt: string): { normalized: string; changes: Array<{ from: string; to: string }> } {
  const tags = prompt.split(',').map(t => t.trim()).filter(Boolean)
  const changes: Array<{ from: string; to: string }> = []

  const normalized = tags.map(tag => {
    const normalizedTag = normalizeTag(tag)
    if (normalizedTag !== tag.trim()) {
      changes.push({ from: tag.trim(), to: normalizedTag })
    }
    return normalizedTag
  })

  return {
    normalized: normalized.join(', '),
    changes
  }
}

// Get suggestions for a tag
export function getSuggestions(tag: string): string[] {
  const lowerTag = tag.toLowerCase().trim()
  return tagSuggestions[lowerTag] || []
}

// Get semantic variations for a tag
export function getVariations(tag: string): string[] {
  const lowerTag = tag.toLowerCase().trim()

  for (const variation of semanticVariations) {
    if (variation.base === lowerTag || variation.variations.includes(lowerTag)) {
      return [variation.base, ...variation.variations].filter(v => v !== lowerTag)
    }
  }

  return []
}
