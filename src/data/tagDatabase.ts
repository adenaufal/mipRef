// Enhanced Tag Database for mipRef v1.1
// Comprehensive tag system with categories, subcategories, aliases, and popularity

export interface TagEntry {
  tag: string
  aliases?: string[]
  popularity: 1 | 2 | 3 | 4 | 5  // 1 = rare, 5 = very popular
  nsfw?: boolean
  description?: string
}

export interface Subcategory {
  label: string
  tags: TagEntry[]
  nsfw_category?: boolean
}

export interface Category {
  label: string
  icon: string
  subcategories: Record<string, Subcategory>
  nsfw_category?: boolean
}

export interface TagDatabase {
  categories: Record<string, Category>
}

export const tagDatabase: TagDatabase = {
  categories: {
    character: {
      label: "Character",
      icon: "👤",
      subcategories: {
        gender: {
          label: "Gender/Count",
          tags: [
            { tag: "1girl", aliases: ["single girl", "one girl"], popularity: 5 },
            { tag: "1boy", aliases: ["single boy", "one boy"], popularity: 5 },
            { tag: "1other", popularity: 3 },
            { tag: "2girls", aliases: ["two girls"], popularity: 4 },
            { tag: "2boys", aliases: ["two boys"], popularity: 3 },
            { tag: "multiple girls", popularity: 4 },
            { tag: "multiple boys", popularity: 3 },
            { tag: "solo", popularity: 5 },
            { tag: "couple", popularity: 3 },
            { tag: "group", popularity: 3 },
          ]
        },
        bodyType: {
          label: "Body Type",
          tags: [
            { tag: "slim", aliases: ["slender"], popularity: 4 },
            { tag: "petite", aliases: ["small"], popularity: 4 },
            { tag: "curvy", aliases: ["voluptuous"], popularity: 4 },
            { tag: "muscular", aliases: ["athletic", "fit"], popularity: 3 },
            { tag: "tall", popularity: 3 },
            { tag: "short", popularity: 3 },
            { tag: "mature female", popularity: 4 },
            { tag: "young woman", popularity: 4 },
            { tag: "mature male", popularity: 3 },
            { tag: "young man", popularity: 3 },
          ]
        },
        species: {
          label: "Species/Race",
          tags: [
            { tag: "human", popularity: 5 },
            { tag: "elf", aliases: ["elven"], popularity: 4 },
            { tag: "pointy ears", popularity: 4 },
            { tag: "kemonomimi", aliases: ["animal ears"], popularity: 4 },
            { tag: "cat ears", aliases: ["nekomimi"], popularity: 5 },
            { tag: "fox ears", aliases: ["kitsune"], popularity: 4 },
            { tag: "wolf ears", popularity: 3 },
            { tag: "rabbit ears", aliases: ["bunny ears"], popularity: 4 },
            { tag: "dog ears", popularity: 3 },
            { tag: "demon girl", popularity: 3 },
            { tag: "angel", popularity: 3 },
            { tag: "vampire", popularity: 3 },
            { tag: "dragon girl", popularity: 3 },
            { tag: "mermaid", popularity: 3 },
            { tag: "fairy", popularity: 3 },
            { tag: "ghost", popularity: 2 },
            { tag: "android", aliases: ["robot girl"], popularity: 3 },
            { tag: "robot", popularity: 2 },
          ]
        }
      }
    },
    hair: {
      label: "Hair",
      icon: "💇",
      subcategories: {
        color: {
          label: "Hair Color",
          tags: [
            { tag: "blonde hair", aliases: ["yellow hair", "golden hair"], popularity: 5 },
            { tag: "black hair", popularity: 5 },
            { tag: "brown hair", popularity: 5 },
            { tag: "red hair", aliases: ["ginger"], popularity: 4 },
            { tag: "white hair", popularity: 5 },
            { tag: "silver hair", popularity: 5 },
            { tag: "grey hair", aliases: ["gray hair"], popularity: 3 },
            { tag: "blue hair", popularity: 4 },
            { tag: "pink hair", popularity: 4 },
            { tag: "purple hair", popularity: 4 },
            { tag: "green hair", popularity: 3 },
            { tag: "orange hair", popularity: 3 },
            { tag: "multicolored hair", popularity: 3 },
            { tag: "gradient hair", popularity: 3 },
            { tag: "two-tone hair", popularity: 3 },
            { tag: "streaked hair", popularity: 2 },
          ]
        },
        length: {
          label: "Hair Length",
          tags: [
            { tag: "very short hair", popularity: 3 },
            { tag: "short hair", popularity: 5 },
            { tag: "medium hair", popularity: 4 },
            { tag: "long hair", popularity: 5 },
            { tag: "very long hair", popularity: 4 },
            { tag: "absurdly long hair", popularity: 3 },
          ]
        },
        style: {
          label: "Hair Style",
          tags: [
            { tag: "straight hair", popularity: 4 },
            { tag: "wavy hair", popularity: 4 },
            { tag: "curly hair", popularity: 3 },
            { tag: "messy hair", popularity: 4 },
            { tag: "ponytail", popularity: 5 },
            { tag: "twintails", aliases: ["twin tails", "pigtails"], popularity: 5 },
            { tag: "braid", aliases: ["braided hair"], popularity: 4 },
            { tag: "side braid", popularity: 3 },
            { tag: "twin braids", popularity: 3 },
            { tag: "french braid", popularity: 2 },
            { tag: "bun", aliases: ["hair bun"], popularity: 4 },
            { tag: "double bun", popularity: 3 },
            { tag: "bob cut", popularity: 4 },
            { tag: "pixie cut", popularity: 3 },
            { tag: "hime cut", popularity: 4 },
            { tag: "ahoge", aliases: ["antenna hair"], popularity: 4 },
            { tag: "sidelocks", popularity: 4 },
            { tag: "hair over one eye", popularity: 4 },
            { tag: "bangs", popularity: 4 },
            { tag: "blunt bangs", popularity: 4 },
            { tag: "swept bangs", popularity: 3 },
            { tag: "parted bangs", popularity: 3 },
            { tag: "side bangs", popularity: 3 },
            { tag: "hair between eyes", popularity: 3 },
            { tag: "side ponytail", popularity: 3 },
            { tag: "low ponytail", popularity: 3 },
            { tag: "high ponytail", popularity: 4 },
            { tag: "hair up", popularity: 3 },
            { tag: "hair down", popularity: 3 },
            { tag: "hair ornament", popularity: 4 },
            { tag: "hairclip", popularity: 4 },
            { tag: "hair ribbon", popularity: 4 },
            { tag: "hair flower", popularity: 3 },
            { tag: "floating hair", popularity: 4 },
          ]
        }
      }
    },
    eyes: {
      label: "Eyes",
      icon: "👁️",
      subcategories: {
        color: {
          label: "Eye Color",
          tags: [
            { tag: "blue eyes", popularity: 5 },
            { tag: "red eyes", popularity: 5 },
            { tag: "green eyes", popularity: 4 },
            { tag: "brown eyes", popularity: 4 },
            { tag: "purple eyes", aliases: ["violet eyes"], popularity: 4 },
            { tag: "yellow eyes", aliases: ["golden eyes", "amber eyes"], popularity: 4 },
            { tag: "pink eyes", popularity: 3 },
            { tag: "orange eyes", popularity: 3 },
            { tag: "aqua eyes", aliases: ["cyan eyes"], popularity: 3 },
            { tag: "grey eyes", aliases: ["gray eyes"], popularity: 3 },
            { tag: "black eyes", popularity: 3 },
            { tag: "white eyes", popularity: 2 },
            { tag: "heterochromia", popularity: 4 },
            { tag: "multicolored eyes", popularity: 3 },
            { tag: "gradient eyes", popularity: 3 },
          ]
        },
        style: {
          label: "Eye Style",
          tags: [
            { tag: "detailed eyes", popularity: 4 },
            { tag: "sparkling eyes", popularity: 3 },
            { tag: "glowing eyes", popularity: 3 },
            { tag: "slit pupils", popularity: 3 },
            { tag: "heart-shaped pupils", popularity: 3, nsfw: true },
            { tag: "symbol-shaped pupils", popularity: 2 },
            { tag: "empty eyes", popularity: 2 },
            { tag: "closed eyes", popularity: 4 },
            { tag: "half-closed eyes", popularity: 3 },
            { tag: "one eye closed", aliases: ["wink"], popularity: 4 },
          ]
        }
      }
    },
    skin: {
      label: "Skin",
      icon: "✋",
      subcategories: {
        tone: {
          label: "Skin Tone",
          tags: [
            { tag: "pale skin", popularity: 4 },
            { tag: "fair skin", popularity: 4 },
            { tag: "light skin", popularity: 3 },
            { tag: "tan", aliases: ["tanned"], popularity: 3 },
            { tag: "dark skin", popularity: 3 },
          ]
        },
        details: {
          label: "Skin Details",
          tags: [
            { tag: "freckles", popularity: 3 },
            { tag: "mole", popularity: 3 },
            { tag: "beauty mark", popularity: 3 },
            { tag: "scar", popularity: 2 },
            { tag: "tattoo", popularity: 3 },
            { tag: "body markings", popularity: 2 },
          ]
        }
      }
    },
    clothing: {
      label: "Clothing",
      icon: "👗",
      subcategories: {
        tops: {
          label: "Tops",
          tags: [
            { tag: "shirt", popularity: 4 },
            { tag: "blouse", popularity: 3 },
            { tag: "t-shirt", popularity: 4 },
            { tag: "sweater", popularity: 4 },
            { tag: "hoodie", popularity: 4 },
            { tag: "jacket", popularity: 4 },
            { tag: "coat", popularity: 3 },
            { tag: "cardigan", popularity: 3 },
            { tag: "crop top", popularity: 4 },
            { tag: "tank top", popularity: 4 },
            { tag: "vest", popularity: 3 },
            { tag: "cape", popularity: 4 },
            { tag: "cloak", popularity: 3 },
            { tag: "robe", popularity: 3 },
          ]
        },
        bottoms: {
          label: "Bottoms",
          tags: [
            { tag: "skirt", popularity: 5 },
            { tag: "miniskirt", popularity: 4 },
            { tag: "long skirt", popularity: 3 },
            { tag: "pleated skirt", popularity: 4 },
            { tag: "pants", aliases: ["trousers"], popularity: 4 },
            { tag: "jeans", popularity: 4 },
            { tag: "shorts", popularity: 4 },
            { tag: "short shorts", popularity: 3 },
            { tag: "hotpants", popularity: 3 },
          ]
        },
        dresses: {
          label: "Dresses",
          tags: [
            { tag: "dress", popularity: 5 },
            { tag: "white dress", popularity: 4 },
            { tag: "black dress", popularity: 4 },
            { tag: "red dress", popularity: 3 },
            { tag: "long dress", popularity: 3 },
            { tag: "short dress", popularity: 3 },
            { tag: "sundress", popularity: 4 },
            { tag: "wedding dress", popularity: 3 },
            { tag: "gown", aliases: ["evening gown", "ball gown"], popularity: 3 },
            { tag: "cocktail dress", popularity: 2 },
            { tag: "chinese dress", aliases: ["qipao", "cheongsam"], popularity: 4 },
            { tag: "kimono", popularity: 4 },
            { tag: "yukata", popularity: 4 },
            { tag: "hanbok", popularity: 2 },
            { tag: "gothic lolita", popularity: 3 },
            { tag: "maid dress", aliases: ["maid outfit"], popularity: 4 },
          ]
        },
        uniforms: {
          label: "Uniforms",
          tags: [
            { tag: "uniform", popularity: 4 },
            { tag: "school uniform", popularity: 5 },
            { tag: "serafuku", aliases: ["sailor uniform"], popularity: 4 },
            { tag: "blazer", popularity: 4 },
            { tag: "military uniform", popularity: 4 },
            { tag: "maid", aliases: ["maid outfit"], popularity: 4 },
            { tag: "nurse outfit", popularity: 3 },
            { tag: "butler", popularity: 2 },
            { tag: "waitress", popularity: 2 },
            { tag: "police uniform", popularity: 2 },
          ]
        },
        fantasy: {
          label: "Fantasy/Armor",
          tags: [
            { tag: "armor", popularity: 4 },
            { tag: "fantasy armor", popularity: 4 },
            { tag: "plate armor", popularity: 3 },
            { tag: "leather armor", popularity: 3 },
            { tag: "knight", popularity: 4 },
            { tag: "witch hat", popularity: 4 },
            { tag: "crown", popularity: 3 },
            { tag: "tiara", popularity: 3 },
            { tag: "circlet", popularity: 2 },
          ]
        },
        swimwear: {
          label: "Swimwear",
          tags: [
            { tag: "swimsuit", popularity: 4 },
            { tag: "bikini", popularity: 5 },
            { tag: "one-piece swimsuit", popularity: 4 },
            { tag: "school swimsuit", popularity: 3 },
            { tag: "competition swimsuit", popularity: 2 },
          ]
        },
        bodysuits: {
          label: "Bodysuits",
          tags: [
            { tag: "bodysuit", popularity: 4 },
            { tag: "leotard", popularity: 3 },
            { tag: "plugsuit", popularity: 2 },
          ]
        },
        casual: {
          label: "Casual",
          tags: [
            { tag: "casual clothes", popularity: 4 },
            { tag: "suit", popularity: 4 },
            { tag: "tuxedo", popularity: 2 },
          ]
        },
        details: {
          label: "Clothing Details",
          tags: [
            { tag: "frills", popularity: 4 },
            { tag: "lace", popularity: 4 },
            { tag: "ribbon", popularity: 4 },
            { tag: "bow", popularity: 4 },
            { tag: "buttons", popularity: 3 },
            { tag: "zipper", popularity: 2 },
            { tag: "belt", popularity: 3 },
            { tag: "ornate", popularity: 3 },
            { tag: "simple", popularity: 3 },
            { tag: "elegant", popularity: 4 },
            { tag: "detailed clothing", popularity: 3 },
          ]
        },
        underwear: {
          label: "Underwear",
          nsfw_category: true,
          tags: [
            { tag: "underwear", popularity: 4, nsfw: true },
            { tag: "bra", popularity: 4, nsfw: true },
            { tag: "panties", popularity: 4, nsfw: true },
            { tag: "lingerie", popularity: 4, nsfw: true },
            { tag: "revealing clothes", popularity: 4, nsfw: true },
            { tag: "see-through", popularity: 3, nsfw: true },
            { tag: "skimpy", popularity: 3, nsfw: true },
          ]
        }
      }
    },
    accessories: {
      label: "Accessories",
      icon: "💎",
      subcategories: {
        eyewear: {
          label: "Eyewear",
          tags: [
            { tag: "glasses", popularity: 4 },
            { tag: "sunglasses", popularity: 3 },
            { tag: "monocle", popularity: 2 },
          ]
        },
        headwear: {
          label: "Headwear",
          tags: [
            { tag: "hat", popularity: 4 },
            { tag: "headband", popularity: 4 },
            { tag: "headpiece", popularity: 3 },
            { tag: "hair bow", popularity: 4 },
            { tag: "beret", popularity: 3 },
            { tag: "cap", popularity: 3 },
            { tag: "hood", popularity: 3 },
          ]
        },
        jewelry: {
          label: "Jewelry",
          tags: [
            { tag: "earrings", popularity: 4 },
            { tag: "necklace", popularity: 4 },
            { tag: "choker", popularity: 4 },
            { tag: "collar", popularity: 3 },
            { tag: "bracelet", popularity: 3 },
            { tag: "ring", popularity: 3 },
            { tag: "anklet", popularity: 2 },
          ]
        },
        handwear: {
          label: "Handwear",
          tags: [
            { tag: "gloves", popularity: 4 },
            { tag: "fingerless gloves", popularity: 3 },
            { tag: "gauntlets", popularity: 2 },
          ]
        },
        legwear: {
          label: "Legwear",
          tags: [
            { tag: "thigh highs", aliases: ["thighhighs"], popularity: 5 },
            { tag: "stockings", popularity: 4 },
            { tag: "pantyhose", popularity: 3 },
            { tag: "knee highs", popularity: 3 },
            { tag: "socks", popularity: 4 },
            { tag: "ankle socks", popularity: 3 },
          ]
        },
        footwear: {
          label: "Footwear",
          tags: [
            { tag: "boots", popularity: 4 },
            { tag: "high heels", popularity: 4 },
            { tag: "sneakers", popularity: 3 },
            { tag: "sandals", popularity: 3 },
            { tag: "loafers", popularity: 2 },
            { tag: "barefoot", popularity: 4 },
          ]
        },
        fantasy: {
          label: "Fantasy Features",
          tags: [
            { tag: "wings", popularity: 4 },
            { tag: "halo", popularity: 3 },
            { tag: "horns", popularity: 4 },
            { tag: "tail", popularity: 4 },
            { tag: "demon tail", popularity: 3 },
            { tag: "cat tail", popularity: 4 },
            { tag: "fox tail", popularity: 3 },
          ]
        }
      }
    },
    weapons: {
      label: "Weapons",
      icon: "⚔️",
      subcategories: {
        melee: {
          label: "Melee Weapons",
          tags: [
            { tag: "sword", popularity: 5 },
            { tag: "katana", popularity: 4 },
            { tag: "rapier", popularity: 3 },
            { tag: "dagger", popularity: 3 },
            { tag: "knife", popularity: 3 },
            { tag: "spear", popularity: 3 },
            { tag: "lance", popularity: 2 },
            { tag: "scythe", popularity: 3 },
            { tag: "axe", popularity: 3 },
            { tag: "hammer", popularity: 2 },
            { tag: "mace", popularity: 2 },
          ]
        },
        ranged: {
          label: "Ranged Weapons",
          tags: [
            { tag: "bow (weapon)", aliases: ["bow"], popularity: 4 },
            { tag: "crossbow", popularity: 2 },
            { tag: "gun", popularity: 4 },
            { tag: "pistol", popularity: 3 },
            { tag: "rifle", popularity: 3 },
            { tag: "sniper rifle", popularity: 2 },
          ]
        },
        magical: {
          label: "Magical",
          tags: [
            { tag: "staff", popularity: 4 },
            { tag: "wand", popularity: 3 },
            { tag: "magic", popularity: 4 },
            { tag: "casting spell", popularity: 3 },
            { tag: "magic circle", popularity: 3 },
          ]
        },
        defensive: {
          label: "Defensive",
          tags: [
            { tag: "shield", popularity: 4 },
          ]
        },
        actions: {
          label: "Weapon Actions",
          tags: [
            { tag: "holding weapon", popularity: 4 },
            { tag: "holding sword", popularity: 4 },
            { tag: "aiming", popularity: 3 },
            { tag: "drawing weapon", popularity: 2 },
          ]
        }
      }
    },
    pose: {
      label: "Pose/Action",
      icon: "🎭",
      subcategories: {
        standing: {
          label: "Standing",
          tags: [
            { tag: "standing", popularity: 5 },
            { tag: "standing on one leg", popularity: 3 },
            { tag: "hands on hips", popularity: 4 },
            { tag: "arms crossed", aliases: ["crossed arms"], popularity: 4 },
            { tag: "hand on hip", popularity: 4 },
            { tag: "hands behind back", aliases: ["arms behind back"], popularity: 3 },
            { tag: "leaning forward", popularity: 3 },
            { tag: "leaning back", popularity: 2 },
            { tag: "contrapposto", popularity: 2 },
            { tag: "dynamic pose", popularity: 4 },
            { tag: "action pose", popularity: 4 },
            { tag: "fighting stance", popularity: 4 },
            { tag: "confident pose", popularity: 3 },
            { tag: "relaxed pose", popularity: 3 },
          ]
        },
        sitting: {
          label: "Sitting",
          tags: [
            { tag: "sitting", popularity: 5 },
            { tag: "sitting on chair", popularity: 3 },
            { tag: "sitting on throne", popularity: 3 },
            { tag: "sitting on bed", popularity: 3 },
            { tag: "sitting on ground", popularity: 3 },
            { tag: "seiza", popularity: 3 },
            { tag: "indian style", aliases: ["crossed legs sitting"], popularity: 3 },
            { tag: "legs crossed", popularity: 3 },
            { tag: "legs together", popularity: 3 },
            { tag: "kneeling", popularity: 4 },
            { tag: "squatting", popularity: 3 },
            { tag: "hugging knees", popularity: 3 },
          ]
        },
        lying: {
          label: "Lying",
          tags: [
            { tag: "lying", popularity: 4 },
            { tag: "lying on back", aliases: ["on back"], popularity: 4 },
            { tag: "lying on side", aliases: ["on side"], popularity: 3 },
            { tag: "lying on stomach", aliases: ["on stomach"], popularity: 3 },
            { tag: "reclining", popularity: 3 },
            { tag: "sleeping", popularity: 3 },
            { tag: "on bed", popularity: 3 },
            { tag: "on floor", popularity: 2 },
            { tag: "on grass", popularity: 3 },
          ]
        },
        arms: {
          label: "Arm Poses",
          tags: [
            { tag: "arm up", popularity: 4 },
            { tag: "arms up", popularity: 4 },
            { tag: "hand on chest", popularity: 3 },
            { tag: "hand to own mouth", popularity: 3 },
            { tag: "finger to cheek", popularity: 3 },
            { tag: "peace sign", popularity: 4 },
            { tag: "waving", popularity: 3 },
            { tag: "salute", popularity: 3 },
            { tag: "reaching out", popularity: 3 },
            { tag: "pointing", popularity: 3 },
          ]
        },
        action: {
          label: "Action",
          tags: [
            { tag: "walking", popularity: 3 },
            { tag: "running", popularity: 3 },
            { tag: "jumping", popularity: 3 },
            { tag: "flying", popularity: 3 },
            { tag: "dancing", popularity: 3 },
            { tag: "turning around", popularity: 2 },
            { tag: "looking back", popularity: 4 },
          ]
        }
      }
    },
    expression: {
      label: "Expression",
      icon: "😊",
      subcategories: {
        positive: {
          label: "Positive",
          tags: [
            { tag: "smile", popularity: 5 },
            { tag: "grin", popularity: 4 },
            { tag: "smirk", popularity: 4 },
            { tag: "slight smile", aliases: ["light smile"], popularity: 4 },
            { tag: "gentle smile", popularity: 4 },
            { tag: "happy", popularity: 4 },
            { tag: "laughing", popularity: 3 },
            { tag: "excited", popularity: 3 },
          ]
        },
        neutral: {
          label: "Neutral",
          tags: [
            { tag: "expressionless", aliases: ["blank expression"], popularity: 3 },
            { tag: "serious", popularity: 4 },
            { tag: "stoic", popularity: 3 },
            { tag: "calm", popularity: 3 },
            { tag: "neutral expression", popularity: 3 },
            { tag: "thinking", popularity: 3 },
            { tag: "pensive", popularity: 2 },
          ]
        },
        negative: {
          label: "Negative",
          tags: [
            { tag: "sad", popularity: 3 },
            { tag: "crying", popularity: 3 },
            { tag: "angry", popularity: 3 },
            { tag: "annoyed", popularity: 3 },
            { tag: "frown", popularity: 3 },
            { tag: "pout", aliases: ["pouting"], popularity: 4 },
            { tag: "scared", popularity: 2 },
            { tag: "worried", popularity: 2 },
          ]
        },
        special: {
          label: "Special",
          tags: [
            { tag: "blush", aliases: ["blushing"], popularity: 5 },
            { tag: "embarrassed", popularity: 4 },
            { tag: "shy", popularity: 4 },
            { tag: "flustered", popularity: 3 },
            { tag: "surprised", popularity: 3 },
            { tag: "shocked", popularity: 2 },
            { tag: "confused", popularity: 2 },
            { tag: "sleepy", popularity: 3 },
            { tag: "tired", popularity: 2 },
            { tag: "determined", popularity: 3 },
            { tag: "confident", popularity: 4 },
            { tag: "smug", popularity: 4 },
          ]
        },
        mouth: {
          label: "Mouth",
          tags: [
            { tag: "open mouth", popularity: 4 },
            { tag: "closed mouth", popularity: 3 },
            { tag: "parted lips", popularity: 3 },
            { tag: ":d", aliases: ["big smile"], popularity: 3 },
            { tag: ":o", aliases: ["surprised face"], popularity: 3 },
          ]
        },
        looking: {
          label: "Looking Direction",
          tags: [
            { tag: "looking at viewer", popularity: 5 },
            { tag: "looking away", popularity: 4 },
            { tag: "looking to the side", popularity: 3 },
            { tag: "looking up", popularity: 3 },
            { tag: "looking down", popularity: 3 },
            { tag: "looking back", popularity: 4 },
            { tag: "eye contact", popularity: 4 },
            { tag: "staring", popularity: 3 },
            { tag: "glancing", popularity: 2 },
          ]
        },
        nsfw_expressions: {
          label: "NSFW Expressions",
          nsfw_category: true,
          tags: [
            { tag: "seductive", popularity: 4, nsfw: true },
            { tag: "bedroom eyes", popularity: 4, nsfw: true },
            { tag: "ahegao", popularity: 3, nsfw: true },
          ]
        }
      }
    },
    background: {
      label: "Background",
      icon: "🏞️",
      subcategories: {
        simple: {
          label: "Simple",
          tags: [
            { tag: "simple background", popularity: 5 },
            { tag: "white background", popularity: 5 },
            { tag: "black background", popularity: 4 },
            { tag: "grey background", aliases: ["gray background"], popularity: 3 },
            { tag: "gradient background", popularity: 4 },
            { tag: "transparent background", popularity: 3 },
            { tag: "two-tone background", popularity: 2 },
          ]
        },
        indoor: {
          label: "Indoor",
          tags: [
            { tag: "indoors", popularity: 4 },
            { tag: "bedroom", popularity: 4 },
            { tag: "living room", popularity: 3 },
            { tag: "bathroom", popularity: 3 },
            { tag: "kitchen", popularity: 2 },
            { tag: "hallway", popularity: 2 },
            { tag: "classroom", popularity: 4 },
            { tag: "library", popularity: 3 },
            { tag: "office", popularity: 3 },
            { tag: "cafe", popularity: 3 },
            { tag: "restaurant", popularity: 2 },
            { tag: "bar", popularity: 2 },
            { tag: "throne room", popularity: 3 },
            { tag: "castle interior", popularity: 3 },
            { tag: "temple", popularity: 3 },
            { tag: "church", popularity: 2 },
            { tag: "laboratory", popularity: 2 },
            { tag: "spaceship interior", popularity: 2 },
            { tag: "dungeon", popularity: 2 },
          ]
        },
        outdoor: {
          label: "Outdoor",
          tags: [
            { tag: "outdoors", popularity: 4 },
            { tag: "sky", popularity: 4 },
            { tag: "clouds", popularity: 4 },
            { tag: "field", aliases: ["meadow"], popularity: 3 },
            { tag: "forest", popularity: 4 },
            { tag: "mountain", aliases: ["mountains"], popularity: 3 },
            { tag: "beach", popularity: 4 },
            { tag: "ocean", aliases: ["sea"], popularity: 3 },
            { tag: "river", popularity: 2 },
            { tag: "lake", popularity: 2 },
            { tag: "waterfall", popularity: 2 },
            { tag: "desert", popularity: 2 },
            { tag: "garden", popularity: 3 },
            { tag: "park", popularity: 3 },
            { tag: "street", popularity: 3 },
            { tag: "city", aliases: ["cityscape"], popularity: 3 },
            { tag: "rooftop", popularity: 3 },
            { tag: "balcony", popularity: 2 },
            { tag: "castle", popularity: 3 },
            { tag: "ruins", popularity: 3 },
            { tag: "snow", popularity: 4 },
            { tag: "fantasy setting", popularity: 3 },
            { tag: "sci-fi setting", popularity: 3 },
          ]
        },
        time: {
          label: "Time of Day",
          tags: [
            { tag: "day", popularity: 4 },
            { tag: "morning", popularity: 3 },
            { tag: "noon", popularity: 2 },
            { tag: "afternoon", popularity: 3 },
            { tag: "evening", popularity: 3 },
            { tag: "night", popularity: 4 },
            { tag: "midnight", popularity: 2 },
            { tag: "sunset", popularity: 4 },
            { tag: "sunrise", popularity: 3 },
            { tag: "dusk", popularity: 3 },
            { tag: "dawn", popularity: 2 },
            { tag: "twilight", popularity: 3 },
          ]
        },
        weather: {
          label: "Weather",
          tags: [
            { tag: "sunny", popularity: 3 },
            { tag: "cloudy", popularity: 3 },
            { tag: "overcast", popularity: 2 },
            { tag: "rain", aliases: ["rainy"], popularity: 4 },
            { tag: "snow", aliases: ["snowy", "snowing"], popularity: 4 },
            { tag: "storm", aliases: ["stormy"], popularity: 2 },
            { tag: "fog", aliases: ["foggy", "mist", "misty"], popularity: 2 },
            { tag: "wind", aliases: ["windy"], popularity: 3 },
          ]
        }
      }
    },
    composition: {
      label: "Composition",
      icon: "📐",
      subcategories: {
        framing: {
          label: "Framing/Shot",
          tags: [
            { tag: "portrait", popularity: 4 },
            { tag: "face focus", popularity: 4 },
            { tag: "upper body", popularity: 5 },
            { tag: "bust", aliases: ["bust shot"], popularity: 3 },
            { tag: "cowboy shot", popularity: 5 },
            { tag: "full body", popularity: 5 },
            { tag: "wide shot", popularity: 3 },
            { tag: "close-up", popularity: 4 },
            { tag: "extreme close-up", popularity: 2 },
            { tag: "feet out of frame", popularity: 3 },
            { tag: "head out of frame", popularity: 2 },
          ]
        },
        angle: {
          label: "Camera Angle",
          tags: [
            { tag: "from above", popularity: 4 },
            { tag: "from below", popularity: 4 },
            { tag: "from side", popularity: 4 },
            { tag: "from behind", popularity: 3 },
            { tag: "front view", popularity: 4 },
            { tag: "three-quarter view", popularity: 3 },
            { tag: "side view", popularity: 3 },
            { tag: "back view", popularity: 3 },
            { tag: "profile", popularity: 4 },
            { tag: "dutch angle", popularity: 2 },
            { tag: "fisheye", popularity: 2 },
            { tag: "pov", aliases: ["first-person view"], popularity: 4 },
          ]
        },
        focus: {
          label: "Focus",
          tags: [
            { tag: "character focus", popularity: 4 },
            { tag: "solo focus", popularity: 4 },
            { tag: "depth of field", aliases: ["dof"], popularity: 4 },
            { tag: "blurry background", popularity: 4 },
            { tag: "bokeh", popularity: 3 },
            { tag: "sharp focus", popularity: 3 },
          ]
        }
      }
    },
    style: {
      label: "Style",
      icon: "🎨",
      subcategories: {
        lighting: {
          label: "Lighting",
          tags: [
            { tag: "natural lighting", popularity: 4 },
            { tag: "sunlight", popularity: 3 },
            { tag: "soft lighting", popularity: 4 },
            { tag: "dramatic lighting", popularity: 4 },
            { tag: "cinematic lighting", popularity: 4 },
            { tag: "backlighting", popularity: 3 },
            { tag: "rim lighting", popularity: 3 },
            { tag: "volumetric lighting", popularity: 4 },
            { tag: "god rays", aliases: ["light rays", "crepuscular rays"], popularity: 3 },
            { tag: "lens flare", popularity: 3 },
            { tag: "glow", popularity: 3 },
            { tag: "neon lights", popularity: 3 },
            { tag: "candlelight", popularity: 2 },
            { tag: "firelight", popularity: 2 },
            { tag: "moonlight", popularity: 3 },
            { tag: "starlight", popularity: 2 },
            { tag: "spotlight", popularity: 2 },
            { tag: "studio lighting", popularity: 3 },
            { tag: "high contrast", popularity: 3 },
            { tag: "low key lighting", popularity: 2 },
            { tag: "high key lighting", popularity: 2 },
            { tag: "chiaroscuro", popularity: 2 },
          ]
        },
        effects: {
          label: "Visual Effects",
          tags: [
            { tag: "particles", popularity: 4 },
            { tag: "sparkles", popularity: 4 },
            { tag: "petals", popularity: 4 },
            { tag: "cherry blossoms", popularity: 4 },
            { tag: "falling leaves", popularity: 3 },
            { tag: "bubbles", popularity: 3 },
            { tag: "water droplets", popularity: 3 },
            { tag: "fire", popularity: 3 },
            { tag: "flames", popularity: 3 },
            { tag: "smoke", popularity: 2 },
            { tag: "lightning", popularity: 3 },
            { tag: "electricity", popularity: 3 },
            { tag: "aura", popularity: 3 },
            { tag: "energy", popularity: 3 },
            { tag: "motion blur", popularity: 3 },
            { tag: "bloom", popularity: 3 },
            { tag: "wind effect", popularity: 3 },
            { tag: "hair blowing", aliases: ["floating hair"], popularity: 4 },
            { tag: "clothes blowing", popularity: 3 },
          ]
        },
        quality: {
          label: "Quality/Aesthetic",
          tags: [
            { tag: "masterpiece", popularity: 5 },
            { tag: "very aesthetic", popularity: 5 },
            { tag: "aesthetic", popularity: 4 },
            { tag: "best quality", popularity: 4 },
            { tag: "high quality", popularity: 4 },
            { tag: "detailed", popularity: 4 },
            { tag: "highly detailed", popularity: 4 },
            { tag: "extremely detailed", popularity: 4 },
            { tag: "intricate", popularity: 3 },
            { tag: "absurdres", aliases: ["high resolution"], popularity: 3 },
            { tag: "highres", popularity: 3 },
            { tag: "no text", popularity: 3 },
          ]
        },
        artStyle: {
          label: "Art Style",
          tags: [
            { tag: "anime style", aliases: ["anime"], popularity: 4 },
            { tag: "manga style", popularity: 3 },
            { tag: "illustration", popularity: 4 },
            { tag: "digital art", popularity: 3 },
            { tag: "concept art", popularity: 3 },
            { tag: "painting", aliases: ["painterly"], popularity: 3 },
            { tag: "watercolor", aliases: ["watercolor (medium)"], popularity: 3 },
            { tag: "oil painting", popularity: 2 },
            { tag: "sketch", popularity: 3 },
            { tag: "lineart", popularity: 3 },
            { tag: "cel shading", popularity: 3 },
            { tag: "flat color", popularity: 3 },
            { tag: "gradient", popularity: 3 },
            { tag: "realistic", popularity: 3 },
            { tag: "semi-realistic", popularity: 3 },
            { tag: "photorealistic", popularity: 2 },
          ]
        },
        year: {
          label: "Year Style",
          tags: [
            { tag: "year 2010", popularity: 2 },
            { tag: "year 2012", popularity: 2 },
            { tag: "year 2014", popularity: 2 },
            { tag: "year 2016", popularity: 3 },
            { tag: "year 2018", popularity: 3 },
            { tag: "year 2020", popularity: 4 },
            { tag: "year 2022", popularity: 4 },
            { tag: "year 2024", popularity: 4 },
          ]
        },
        game: {
          label: "Game Styles",
          tags: [
            { tag: "honkai: star rail", aliases: ["hsr"], popularity: 4 },
            { tag: "genshin impact", popularity: 4 },
            { tag: "honkai impact 3rd", popularity: 3 },
            { tag: "game cg", popularity: 3 },
            { tag: "official art", popularity: 3 },
            { tag: "promotional art", popularity: 2 },
            { tag: "key visual", popularity: 2 },
            { tag: "splash art", popularity: 2 },
          ]
        }
      }
    },
    nsfw: {
      label: "NSFW",
      icon: "🔞",
      nsfw_category: true,
      subcategories: {
        rating: {
          label: "Rating",
          tags: [
            { tag: "rating:general", popularity: 4 },
            { tag: "rating:sensitive", popularity: 4 },
            { tag: "rating:questionable", popularity: 3, nsfw: true },
            { tag: "rating:explicit", popularity: 4, nsfw: true },
          ]
        },
        body: {
          label: "Body Details",
          nsfw_category: true,
          tags: [
            { tag: "large breasts", popularity: 5, nsfw: true },
            { tag: "medium breasts", popularity: 4, nsfw: true },
            { tag: "small breasts", popularity: 4, nsfw: true },
            { tag: "huge breasts", popularity: 3, nsfw: true },
            { tag: "cleavage", popularity: 4, nsfw: true },
            { tag: "sideboob", popularity: 3, nsfw: true },
            { tag: "underboob", popularity: 3, nsfw: true },
            { tag: "wide hips", popularity: 4, nsfw: true },
            { tag: "thick thighs", popularity: 4, nsfw: true },
            { tag: "bare shoulders", popularity: 4, nsfw: true },
            { tag: "bare back", popularity: 3, nsfw: true },
            { tag: "bare legs", popularity: 4, nsfw: true },
            { tag: "midriff", popularity: 4, nsfw: true },
            { tag: "navel", popularity: 4, nsfw: true },
          ]
        },
        state: {
          label: "Clothing State",
          nsfw_category: true,
          tags: [
            { tag: "nude", popularity: 5, nsfw: true },
            { tag: "naked", popularity: 4, nsfw: true },
            { tag: "topless", popularity: 4, nsfw: true },
            { tag: "bottomless", popularity: 3, nsfw: true },
            { tag: "partially nude", popularity: 3, nsfw: true },
            { tag: "partially clothed", popularity: 3, nsfw: true },
            { tag: "undressing", popularity: 3, nsfw: true },
            { tag: "clothes lift", popularity: 3, nsfw: true },
            { tag: "shirt lift", popularity: 3, nsfw: true },
            { tag: "skirt lift", popularity: 3, nsfw: true },
          ]
        },
        poses: {
          label: "NSFW Poses",
          nsfw_category: true,
          tags: [
            { tag: "lying on bed", popularity: 4, nsfw: true },
            { tag: "spread legs", popularity: 4, nsfw: true },
            { tag: "on all fours", popularity: 3, nsfw: true },
            { tag: "bent over", popularity: 3, nsfw: true },
            { tag: "arched back", popularity: 3, nsfw: true },
            { tag: "sensual", popularity: 4, nsfw: true },
            { tag: "provocative", popularity: 3, nsfw: true },
            { tag: "presenting", popularity: 3, nsfw: true },
          ]
        }
      }
    }
  }
}

// Helper function to get all tags from a category
export function getCategoryTags(categoryId: string): TagEntry[] {
  const category = tagDatabase.categories[categoryId]
  if (!category) return []

  const tags: TagEntry[] = []
  for (const subcategory of Object.values(category.subcategories)) {
    tags.push(...subcategory.tags)
  }
  return tags
}

// Helper function to get all tags from a subcategory
export function getSubcategoryTags(categoryId: string, subcategoryId: string): TagEntry[] {
  const category = tagDatabase.categories[categoryId]
  if (!category) return []

  const subcategory = category.subcategories[subcategoryId]
  if (!subcategory) return []

  return subcategory.tags
}

// Helper function to search tags across all categories
export function searchTags(query: string, options: {
  includeNsfw?: boolean
  minPopularity?: number
  limit?: number
} = {}): TagEntry[] {
  const { includeNsfw = false, minPopularity = 1, limit = 50 } = options
  const results: TagEntry[] = []
  const queryLower = query.toLowerCase()

  for (const category of Object.values(tagDatabase.categories)) {
    // Skip entire NSFW category if not enabled
    if (category.nsfw_category && !includeNsfw) continue

    for (const subcategory of Object.values(category.subcategories)) {
      // Skip NSFW subcategories if not enabled
      if (subcategory.nsfw_category && !includeNsfw) continue

      for (const tag of subcategory.tags) {
        // Skip NSFW tags if not enabled
        if (tag.nsfw && !includeNsfw) continue

        // Skip tags below minimum popularity
        if (tag.popularity < minPopularity) continue

        // Check if tag matches query
        const matches =
          tag.tag.toLowerCase().includes(queryLower) ||
          tag.aliases?.some(alias => alias.toLowerCase().includes(queryLower))

        if (matches) {
          results.push(tag)
        }
      }
    }
  }

  // Sort by popularity (descending) and limit results
  return results
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit)
}

// Helper function to get all tags as a flat array (for compatibility with existing code)
export function getAllTagsFlat(includeNsfw: boolean = false): Record<string, { name: string; nsfw?: boolean }[]> {
  const result: Record<string, { name: string; nsfw?: boolean }[]> = {}

  // Map category/subcategory to the old allTags format
  const mappings: Record<string, { category: string; subcategory: string }[]> = {
    gender: [{ category: 'character', subcategory: 'gender' }],
    bodyType: [{ category: 'character', subcategory: 'bodyType' }],
    species: [{ category: 'character', subcategory: 'species' }],
    hairColor: [{ category: 'hair', subcategory: 'color' }],
    hairLength: [{ category: 'hair', subcategory: 'length' }],
    hairStyle: [{ category: 'hair', subcategory: 'style' }],
    eyeColor: [{ category: 'eyes', subcategory: 'color' }],
    eyeStyle: [{ category: 'eyes', subcategory: 'style' }],
    skin: [
      { category: 'skin', subcategory: 'tone' },
      { category: 'skin', subcategory: 'details' }
    ],
    clothingStyle: [
      { category: 'clothing', subcategory: 'tops' },
      { category: 'clothing', subcategory: 'bottoms' },
      { category: 'clothing', subcategory: 'dresses' },
      { category: 'clothing', subcategory: 'uniforms' },
      { category: 'clothing', subcategory: 'fantasy' },
      { category: 'clothing', subcategory: 'swimwear' },
      { category: 'clothing', subcategory: 'bodysuits' },
      { category: 'clothing', subcategory: 'casual' }
    ],
    outfitDetail: [{ category: 'clothing', subcategory: 'details' }],
    accessory: [
      { category: 'accessories', subcategory: 'eyewear' },
      { category: 'accessories', subcategory: 'headwear' },
      { category: 'accessories', subcategory: 'jewelry' },
      { category: 'accessories', subcategory: 'handwear' },
      { category: 'accessories', subcategory: 'legwear' },
      { category: 'accessories', subcategory: 'footwear' },
      { category: 'accessories', subcategory: 'fantasy' }
    ],
    weapon: [
      { category: 'weapons', subcategory: 'melee' },
      { category: 'weapons', subcategory: 'ranged' },
      { category: 'weapons', subcategory: 'magical' },
      { category: 'weapons', subcategory: 'defensive' },
      { category: 'weapons', subcategory: 'actions' }
    ],
    standingPose: [{ category: 'pose', subcategory: 'standing' }],
    sittingPose: [{ category: 'pose', subcategory: 'sitting' }],
    lyingPose: [{ category: 'pose', subcategory: 'lying' }],
    expression: [
      { category: 'expression', subcategory: 'positive' },
      { category: 'expression', subcategory: 'neutral' },
      { category: 'expression', subcategory: 'negative' },
      { category: 'expression', subcategory: 'special' },
      { category: 'expression', subcategory: 'mouth' }
    ],
    looking: [{ category: 'expression', subcategory: 'looking' }],
    composition: [
      { category: 'composition', subcategory: 'framing' },
      { category: 'composition', subcategory: 'angle' },
      { category: 'composition', subcategory: 'focus' }
    ],
    indoorLocation: [{ category: 'background', subcategory: 'indoor' }],
    outdoorLocation: [{ category: 'background', subcategory: 'outdoor' }],
    time: [{ category: 'background', subcategory: 'time' }],
    weather: [{ category: 'background', subcategory: 'weather' }],
    lighting: [{ category: 'style', subcategory: 'lighting' }],
    effect: [{ category: 'style', subcategory: 'effects' }],
    artStyle: [{ category: 'style', subcategory: 'artStyle' }],
    year: [{ category: 'style', subcategory: 'year' }],
    quality: [{ category: 'style', subcategory: 'quality' }],
    nsfwBody: [{ category: 'nsfw', subcategory: 'body' }],
    nsfwClothing: [
      { category: 'nsfw', subcategory: 'state' },
      { category: 'clothing', subcategory: 'underwear' }
    ],
    nsfwPose: [
      { category: 'nsfw', subcategory: 'poses' },
      { category: 'expression', subcategory: 'nsfw_expressions' }
    ],
    rating: [{ category: 'nsfw', subcategory: 'rating' }],
    hsrStyle: [{ category: 'style', subcategory: 'game' }]
  }

  for (const [key, sources] of Object.entries(mappings)) {
    result[key] = []
    for (const source of sources) {
      const tags = getSubcategoryTags(source.category, source.subcategory)
      for (const tag of tags) {
        // Skip NSFW tags if not enabled
        if (tag.nsfw && !includeNsfw) continue
        result[key].push({ name: tag.tag, nsfw: tag.nsfw })
      }
    }
  }

  return result
}

// Get popular tags (popularity >= 4)
export function getPopularTags(includeNsfw: boolean = false): TagEntry[] {
  const results: TagEntry[] = []

  for (const category of Object.values(tagDatabase.categories)) {
    if (category.nsfw_category && !includeNsfw) continue

    for (const subcategory of Object.values(category.subcategories)) {
      if (subcategory.nsfw_category && !includeNsfw) continue

      for (const tag of subcategory.tags) {
        if (tag.nsfw && !includeNsfw) continue
        if (tag.popularity >= 4) {
          results.push(tag)
        }
      }
    }
  }

  return results.sort((a, b) => b.popularity - a.popularity)
}

// Get tag by name (exact match)
export function getTagByName(tagName: string): { tag: TagEntry; category: string; subcategory: string } | null {
  const tagLower = tagName.toLowerCase()

  for (const [categoryId, category] of Object.entries(tagDatabase.categories)) {
    for (const [subcategoryId, subcategory] of Object.entries(category.subcategories)) {
      for (const tag of subcategory.tags) {
        if (tag.tag.toLowerCase() === tagLower) {
          return { tag, category: categoryId, subcategory: subcategoryId }
        }
        if (tag.aliases?.some(alias => alias.toLowerCase() === tagLower)) {
          return { tag, category: categoryId, subcategory: subcategoryId }
        }
      }
    }
  }

  return null
}

// Get suggested tags based on current selection
export function getSuggestedTags(selectedTags: string[], includeNsfw: boolean = false): TagEntry[] {
  const suggestions: TagEntry[] = []

  // Suggest hair colors if none selected
  const hasHairColor = selectedTags.some(t => t.includes('hair') &&
    ['blonde', 'black', 'brown', 'red', 'white', 'silver', 'blue', 'pink', 'purple', 'green'].some(c => t.includes(c)))

  if (!hasHairColor) {
    suggestions.push(...getSubcategoryTags('hair', 'color').filter(t => t.popularity >= 4).slice(0, 5))
  }

  // Suggest eye colors if none selected
  const hasEyeColor = selectedTags.some(t => t.includes('eyes') &&
    ['blue', 'red', 'green', 'brown', 'purple', 'yellow', 'amber'].some(c => t.includes(c)))

  if (!hasEyeColor) {
    suggestions.push(...getSubcategoryTags('eyes', 'color').filter(t => t.popularity >= 4).slice(0, 5))
  }

  return suggestions.filter(t => !t.nsfw || includeNsfw)
}

export default tagDatabase
