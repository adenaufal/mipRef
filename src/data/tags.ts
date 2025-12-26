// NovelAI V4.5 Compatible Tag Database
// Based on Danbooru tag conventions

export interface Tag {
  name: string
  aliases?: string[]
  category?: string
  nsfw?: boolean
}

// Gender / Character Count
export const genderTags: Tag[] = [
  { name: '1girl' },
  { name: '1boy' },
  { name: '1other' },
  { name: '2girls' },
  { name: '2boys' },
  { name: 'multiple girls' },
  { name: 'multiple boys' },
  { name: 'solo' },
  { name: 'couple' },
  { name: 'group' },
]

// Body Types
export const bodyTypeTags: Tag[] = [
  { name: 'slim' },
  { name: 'slender' },
  { name: 'petite' },
  { name: 'curvy' },
  { name: 'muscular' },
  { name: 'athletic' },
  { name: 'tall' },
  { name: 'short' },
  { name: 'mature female' },
  { name: 'young woman' },
  { name: 'mature male' },
  { name: 'young man' },
]

// Species
export const speciesTags: Tag[] = [
  { name: 'human' },
  { name: 'elf' },
  { name: 'pointy ears' },
  { name: 'kemonomimi' },
  { name: 'cat ears' },
  { name: 'fox ears' },
  { name: 'wolf ears' },
  { name: 'rabbit ears' },
  { name: 'dog ears' },
  { name: 'demon girl' },
  { name: 'angel' },
  { name: 'vampire' },
  { name: 'dragon girl' },
  { name: 'mermaid' },
  { name: 'fairy' },
  { name: 'ghost' },
  { name: 'android' },
  { name: 'robot' },
]

// Hair Colors
export const hairColorTags: Tag[] = [
  { name: 'black hair' },
  { name: 'brown hair' },
  { name: 'blonde hair' },
  { name: 'silver hair' },
  { name: 'white hair' },
  { name: 'grey hair' },
  { name: 'red hair' },
  { name: 'orange hair' },
  { name: 'pink hair' },
  { name: 'purple hair' },
  { name: 'blue hair' },
  { name: 'green hair' },
  { name: 'multicolored hair' },
  { name: 'gradient hair' },
  { name: 'streaked hair' },
  { name: 'two-tone hair' },
]

// Hair Lengths
export const hairLengthTags: Tag[] = [
  { name: 'very short hair' },
  { name: 'short hair' },
  { name: 'medium hair' },
  { name: 'long hair' },
  { name: 'very long hair' },
  { name: 'absurdly long hair' },
]

// Hair Styles
export const hairStyleTags: Tag[] = [
  { name: 'straight hair' },
  { name: 'wavy hair' },
  { name: 'curly hair' },
  { name: 'messy hair' },
  { name: 'ponytail' },
  { name: 'twintails' },
  { name: 'twin braids' },
  { name: 'braid' },
  { name: 'side braid' },
  { name: 'french braid' },
  { name: 'bun' },
  { name: 'double bun' },
  { name: 'hair up' },
  { name: 'hair down' },
  { name: 'side ponytail' },
  { name: 'low ponytail' },
  { name: 'high ponytail' },
  { name: 'bob cut' },
  { name: 'pixie cut' },
  { name: 'hime cut' },
  { name: 'bangs' },
  { name: 'blunt bangs' },
  { name: 'swept bangs' },
  { name: 'side bangs' },
  { name: 'parted bangs' },
  { name: 'hair over one eye' },
  { name: 'hair between eyes' },
  { name: 'ahoge' },
  { name: 'sidelocks' },
  { name: 'hair ornament' },
  { name: 'hairclip' },
  { name: 'hair ribbon' },
  { name: 'hair flower' },
]

// Eye Colors
export const eyeColorTags: Tag[] = [
  { name: 'black eyes' },
  { name: 'brown eyes' },
  { name: 'amber eyes' },
  { name: 'red eyes' },
  { name: 'orange eyes' },
  { name: 'yellow eyes' },
  { name: 'green eyes' },
  { name: 'blue eyes' },
  { name: 'purple eyes' },
  { name: 'pink eyes' },
  { name: 'grey eyes' },
  { name: 'white eyes' },
  { name: 'heterochromia' },
  { name: 'multicolored eyes' },
  { name: 'gradient eyes' },
]

// Eye Styles
export const eyeStyleTags: Tag[] = [
  { name: 'detailed eyes' },
  { name: 'sparkling eyes' },
  { name: 'glowing eyes' },
  { name: 'half-closed eyes' },
  { name: 'closed eyes' },
  { name: 'one eye closed' },
  { name: 'wink' },
  { name: 'slit pupils' },
  { name: 'heart-shaped pupils', nsfw: true },
  { name: 'symbol-shaped pupils' },
]

// Skin / Body Details
export const skinTags: Tag[] = [
  { name: 'pale skin' },
  { name: 'fair skin' },
  { name: 'light skin' },
  { name: 'tan' },
  { name: 'dark skin' },
  { name: 'freckles' },
  { name: 'mole' },
  { name: 'beauty mark' },
  { name: 'scar' },
  { name: 'tattoo' },
  { name: 'body markings' },
]

// Clothing Styles
export const clothingStyleTags: Tag[] = [
  { name: 'dress' },
  { name: 'long dress' },
  { name: 'short dress' },
  { name: 'gown' },
  { name: 'wedding dress' },
  { name: 'sundress' },
  { name: 'uniform' },
  { name: 'school uniform' },
  { name: 'military uniform' },
  { name: 'maid outfit' },
  { name: 'suit' },
  { name: 'tuxedo' },
  { name: 'casual clothes' },
  { name: 't-shirt' },
  { name: 'jacket' },
  { name: 'hoodie' },
  { name: 'sweater' },
  { name: 'coat' },
  { name: 'cape' },
  { name: 'cloak' },
  { name: 'robe' },
  { name: 'kimono' },
  { name: 'yukata' },
  { name: 'chinese dress' },
  { name: 'hanbok' },
  { name: 'armor' },
  { name: 'fantasy armor' },
  { name: 'plate armor' },
  { name: 'leather armor' },
  { name: 'swimsuit' },
  { name: 'bikini' },
  { name: 'one-piece swimsuit' },
  { name: 'bodysuit' },
  { name: 'leotard' },
]

// Outfit Details
export const outfitDetailTags: Tag[] = [
  { name: 'frills' },
  { name: 'lace' },
  { name: 'ribbon' },
  { name: 'bow' },
  { name: 'buttons' },
  { name: 'zipper' },
  { name: 'belt' },
  { name: 'ornate' },
  { name: 'simple' },
  { name: 'elegant' },
  { name: 'detailed clothing' },
  { name: 'revealing clothes', nsfw: true },
]

// Accessories
export const accessoryTags: Tag[] = [
  { name: 'glasses' },
  { name: 'sunglasses' },
  { name: 'hat' },
  { name: 'crown' },
  { name: 'tiara' },
  { name: 'headband' },
  { name: 'headpiece' },
  { name: 'earrings' },
  { name: 'necklace' },
  { name: 'choker' },
  { name: 'collar' },
  { name: 'bracelet' },
  { name: 'ring' },
  { name: 'gloves' },
  { name: 'fingerless gloves' },
  { name: 'thigh highs' },
  { name: 'stockings' },
  { name: 'boots' },
  { name: 'high heels' },
  { name: 'wings' },
  { name: 'halo' },
  { name: 'horns' },
  { name: 'tail' },
]

// Weapons / Items
export const weaponTags: Tag[] = [
  { name: 'sword' },
  { name: 'katana' },
  { name: 'rapier' },
  { name: 'dagger' },
  { name: 'spear' },
  { name: 'staff' },
  { name: 'wand' },
  { name: 'bow (weapon)' },
  { name: 'gun' },
  { name: 'shield' },
  { name: 'scythe' },
  { name: 'axe' },
  { name: 'hammer' },
  { name: 'holding weapon' },
  { name: 'holding sword' },
  { name: 'magic' },
  { name: 'casting spell' },
  { name: 'magic circle' },
]

// Poses - Standing
export const standingPoseTags: Tag[] = [
  { name: 'standing' },
  { name: 'standing on one leg' },
  { name: 'leaning forward' },
  { name: 'leaning back' },
  { name: 'hands on hips' },
  { name: 'arms crossed' },
  { name: 'arms behind back' },
  { name: 'arm up' },
  { name: 'arms up' },
  { name: 'hand on hip' },
  { name: 'hand on chest' },
  { name: 'hand to own mouth' },
  { name: 'finger to cheek' },
  { name: 'peace sign' },
  { name: 'waving' },
  { name: 'salute' },
  { name: 'dynamic pose' },
  { name: 'action pose' },
  { name: 'fighting stance' },
  { name: 'confident pose' },
  { name: 'relaxed pose' },
]

// Poses - Sitting
export const sittingPoseTags: Tag[] = [
  { name: 'sitting' },
  { name: 'sitting on chair' },
  { name: 'sitting on throne' },
  { name: 'sitting on ground' },
  { name: 'sitting on bed' },
  { name: 'seiza' },
  { name: 'indian style' },
  { name: 'crossed legs' },
  { name: 'legs together' },
  { name: 'kneeling' },
  { name: 'squatting' },
  { name: 'hugging knees' },
]

// Poses - Lying
export const lyingPoseTags: Tag[] = [
  { name: 'lying' },
  { name: 'lying on back' },
  { name: 'lying on side' },
  { name: 'lying on stomach' },
  { name: 'reclining' },
  { name: 'on bed' },
  { name: 'on floor' },
  { name: 'on grass' },
]

// Expressions
export const expressionTags: Tag[] = [
  { name: 'smile' },
  { name: 'grin' },
  { name: 'smirk' },
  { name: 'slight smile' },
  { name: 'gentle smile' },
  { name: 'happy' },
  { name: 'laughing' },
  { name: 'serious' },
  { name: 'stoic' },
  { name: 'neutral expression' },
  { name: 'sad' },
  { name: 'crying' },
  { name: 'angry' },
  { name: 'annoyed' },
  { name: 'embarrassed' },
  { name: 'blushing' },
  { name: 'shy' },
  { name: 'flustered' },
  { name: 'surprised' },
  { name: 'shocked' },
  { name: 'scared' },
  { name: 'confused' },
  { name: 'thinking' },
  { name: 'pensive' },
  { name: 'determined' },
  { name: 'confident' },
  { name: 'smug' },
  { name: 'sleepy' },
  { name: 'tired' },
  { name: 'seductive', nsfw: true },
  { name: 'bedroom eyes', nsfw: true },
  { name: 'open mouth' },
  { name: 'closed mouth' },
  { name: 'parted lips' },
]

// Looking Direction
export const lookingTags: Tag[] = [
  { name: 'looking at viewer' },
  { name: 'looking away' },
  { name: 'looking to the side' },
  { name: 'looking up' },
  { name: 'looking down' },
  { name: 'looking back' },
  { name: 'eye contact' },
  { name: 'staring' },
  { name: 'glancing' },
]

// Camera / Composition
export const compositionTags: Tag[] = [
  { name: 'portrait' },
  { name: 'face focus' },
  { name: 'upper body' },
  { name: 'bust' },
  { name: 'cowboy shot' },
  { name: 'full body' },
  { name: 'wide shot' },
  { name: 'close-up' },
  { name: 'extreme close-up' },
  { name: 'from above' },
  { name: 'from below' },
  { name: 'from side' },
  { name: 'from behind' },
  { name: 'front view' },
  { name: 'three-quarter view' },
  { name: 'side view' },
  { name: 'back view' },
  { name: 'dutch angle' },
  { name: 'profile' },
]

// Indoor Locations
export const indoorLocationTags: Tag[] = [
  { name: 'indoors' },
  { name: 'bedroom' },
  { name: 'living room' },
  { name: 'kitchen' },
  { name: 'bathroom' },
  { name: 'hallway' },
  { name: 'office' },
  { name: 'library' },
  { name: 'classroom' },
  { name: 'cafe' },
  { name: 'restaurant' },
  { name: 'bar' },
  { name: 'throne room' },
  { name: 'castle interior' },
  { name: 'temple' },
  { name: 'church' },
  { name: 'laboratory' },
  { name: 'spaceship interior' },
]

// Outdoor Locations
export const outdoorLocationTags: Tag[] = [
  { name: 'outdoors' },
  { name: 'city' },
  { name: 'street' },
  { name: 'rooftop' },
  { name: 'balcony' },
  { name: 'garden' },
  { name: 'park' },
  { name: 'forest' },
  { name: 'mountain' },
  { name: 'beach' },
  { name: 'ocean' },
  { name: 'river' },
  { name: 'lake' },
  { name: 'waterfall' },
  { name: 'desert' },
  { name: 'snow' },
  { name: 'field' },
  { name: 'meadow' },
  { name: 'sky' },
  { name: 'clouds' },
  { name: 'ruins' },
  { name: 'castle' },
  { name: 'fantasy setting' },
  { name: 'sci-fi setting' },
]

// Time of Day
export const timeTags: Tag[] = [
  { name: 'day' },
  { name: 'morning' },
  { name: 'noon' },
  { name: 'afternoon' },
  { name: 'evening' },
  { name: 'sunset' },
  { name: 'sunrise' },
  { name: 'dusk' },
  { name: 'dawn' },
  { name: 'night' },
  { name: 'midnight' },
  { name: 'twilight' },
]

// Weather / Atmosphere
export const weatherTags: Tag[] = [
  { name: 'sunny' },
  { name: 'cloudy' },
  { name: 'overcast' },
  { name: 'rain' },
  { name: 'snow' },
  { name: 'fog' },
  { name: 'mist' },
  { name: 'storm' },
  { name: 'wind' },
  { name: 'windy' },
]

// Lighting
export const lightingTags: Tag[] = [
  { name: 'natural lighting' },
  { name: 'sunlight' },
  { name: 'soft lighting' },
  { name: 'dramatic lighting' },
  { name: 'backlighting' },
  { name: 'rim lighting' },
  { name: 'volumetric lighting' },
  { name: 'god rays' },
  { name: 'lens flare' },
  { name: 'glow' },
  { name: 'neon lights' },
  { name: 'candlelight' },
  { name: 'firelight' },
  { name: 'moonlight' },
  { name: 'starlight' },
  { name: 'spotlight' },
  { name: 'cinematic lighting' },
  { name: 'studio lighting' },
  { name: 'high contrast' },
  { name: 'low key lighting' },
  { name: 'high key lighting' },
  { name: 'chiaroscuro' },
]

// Visual Effects
export const effectTags: Tag[] = [
  { name: 'particles' },
  { name: 'sparkles' },
  { name: 'petals' },
  { name: 'cherry blossoms' },
  { name: 'falling leaves' },
  { name: 'bubbles' },
  { name: 'water droplets' },
  { name: 'fire' },
  { name: 'flames' },
  { name: 'smoke' },
  { name: 'lightning' },
  { name: 'electricity' },
  { name: 'aura' },
  { name: 'energy' },
  { name: 'motion blur' },
  { name: 'depth of field' },
  { name: 'bokeh' },
  { name: 'bloom' },
  { name: 'wind effect' },
  { name: 'hair blowing' },
  { name: 'clothes blowing' },
]

// Art Style Tags
export const artStyleTags: Tag[] = [
  { name: 'detailed' },
  { name: 'highly detailed' },
  { name: 'intricate' },
  { name: 'ornate' },
  { name: 'realistic' },
  { name: 'semi-realistic' },
  { name: 'anime style' },
  { name: 'manga style' },
  { name: 'painterly' },
  { name: 'illustration' },
  { name: 'digital art' },
  { name: 'concept art' },
  { name: 'sketch' },
  { name: 'lineart' },
  { name: 'watercolor' },
  { name: 'oil painting' },
  { name: 'cel shading' },
  { name: 'flat color' },
  { name: 'gradient' },
]

// Year Tags (for art style era)
export const yearTags: Tag[] = [
  { name: 'year 2010' },
  { name: 'year 2012' },
  { name: 'year 2014' },
  { name: 'year 2016' },
  { name: 'year 2018' },
  { name: 'year 2020' },
  { name: 'year 2022' },
  { name: 'year 2024' },
]

// Quality Tags (NovelAI V4.5 specific)
export const qualityTags: Tag[] = [
  { name: 'masterpiece' },
  { name: 'very aesthetic' },
  { name: 'aesthetic' },
  { name: 'best quality' },
  { name: 'absurdres' },
  { name: 'highres' },
  { name: 'extremely detailed' },
  { name: 'no text' },
]

// NSFW Tags - Body
export const nsfwBodyTags: Tag[] = [
  { name: 'large breasts', nsfw: true },
  { name: 'medium breasts', nsfw: true },
  { name: 'small breasts', nsfw: true },
  { name: 'huge breasts', nsfw: true },
  { name: 'cleavage', nsfw: true },
  { name: 'sideboob', nsfw: true },
  { name: 'underboob', nsfw: true },
  { name: 'wide hips', nsfw: true },
  { name: 'thick thighs', nsfw: true },
  { name: 'bare shoulders', nsfw: true },
  { name: 'bare back', nsfw: true },
  { name: 'bare legs', nsfw: true },
  { name: 'midriff', nsfw: true },
  { name: 'navel', nsfw: true },
]

// NSFW Tags - Clothing States
export const nsfwClothingTags: Tag[] = [
  { name: 'revealing clothes', nsfw: true },
  { name: 'see-through', nsfw: true },
  { name: 'skimpy', nsfw: true },
  { name: 'underwear', nsfw: true },
  { name: 'lingerie', nsfw: true },
  { name: 'bra', nsfw: true },
  { name: 'panties', nsfw: true },
  { name: 'topless', nsfw: true },
  { name: 'nude', nsfw: true },
  { name: 'naked', nsfw: true },
  { name: 'partially clothed', nsfw: true },
  { name: 'undressing', nsfw: true },
  { name: 'clothes lift', nsfw: true },
  { name: 'shirt lift', nsfw: true },
  { name: 'skirt lift', nsfw: true },
]

// NSFW Tags - Poses
export const nsfwPoseTags: Tag[] = [
  { name: 'lying on bed', nsfw: true },
  { name: 'spread legs', nsfw: true },
  { name: 'on all fours', nsfw: true },
  { name: 'bent over', nsfw: true },
  { name: 'arched back', nsfw: true },
  { name: 'sensual', nsfw: true },
  { name: 'provocative', nsfw: true },
  { name: 'presenting', nsfw: true },
]

// NSFW Tags - Ratings
export const ratingTags: Tag[] = [
  { name: 'rating:general' },
  { name: 'rating:sensitive' },
  { name: 'rating:questionable', nsfw: true },
  { name: 'rating:explicit', nsfw: true },
]

// Dataset Tags (V4.5)
export const datasetTags: Tag[] = [
  { name: 'fur dataset,' },
  { name: 'background dataset,' },
]

// HSR/Hoyoverse Style Presets
export const hsrStyleTags: Tag[] = [
  { name: 'honkai: star rail' },
  { name: 'genshin impact' },
  { name: 'honkai impact 3rd' },
  { name: 'anime style' },
  { name: 'game cg' },
  { name: 'official art' },
  { name: 'promotional art' },
  { name: 'key visual' },
  { name: 'splash art' },
]

// Combined export for easy access
export const allTags = {
  gender: genderTags,
  bodyType: bodyTypeTags,
  species: speciesTags,
  hairColor: hairColorTags,
  hairLength: hairLengthTags,
  hairStyle: hairStyleTags,
  eyeColor: eyeColorTags,
  eyeStyle: eyeStyleTags,
  skin: skinTags,
  clothingStyle: clothingStyleTags,
  outfitDetail: outfitDetailTags,
  accessory: accessoryTags,
  weapon: weaponTags,
  standingPose: standingPoseTags,
  sittingPose: sittingPoseTags,
  lyingPose: lyingPoseTags,
  expression: expressionTags,
  looking: lookingTags,
  composition: compositionTags,
  indoorLocation: indoorLocationTags,
  outdoorLocation: outdoorLocationTags,
  time: timeTags,
  weather: weatherTags,
  lighting: lightingTags,
  effect: effectTags,
  artStyle: artStyleTags,
  year: yearTags,
  quality: qualityTags,
  nsfwBody: nsfwBodyTags,
  nsfwClothing: nsfwClothingTags,
  nsfwPose: nsfwPoseTags,
  rating: ratingTags,
  dataset: datasetTags,
  hsrStyle: hsrStyleTags,
}
