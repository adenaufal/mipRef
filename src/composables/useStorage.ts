import { ref, watch, type Ref } from 'vue'
import type { HistoryEntry, SavedTemplate, AppSettings } from '@/types'
import { defaultAppSettings } from '@/types'

const STORAGE_KEYS = {
  history: 'mipref_history',
  templates: 'mipref_templates',
  settings: 'mipref_settings'
}

const MAX_HISTORY_ITEMS = 100

// Generic local storage helper
function getFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultValue
  } catch {
    return defaultValue
  }
}

function setToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error('Failed to save to localStorage:', e)
  }
}

// History composable
export function useHistory() {
  const history: Ref<HistoryEntry[]> = ref(getFromStorage(STORAGE_KEYS.history, []))

  const addToHistory = (entry: HistoryEntry) => {
    history.value.unshift(entry)
    // Limit history size
    if (history.value.length > MAX_HISTORY_ITEMS) {
      history.value = history.value.slice(0, MAX_HISTORY_ITEMS)
    }
    setToStorage(STORAGE_KEYS.history, history.value)
  }

  const removeFromHistory = (id: string) => {
    history.value = history.value.filter(h => h.id !== id)
    setToStorage(STORAGE_KEYS.history, history.value)
  }

  const toggleFavorite = (id: string) => {
    const entry = history.value.find(h => h.id === id)
    if (entry) {
      entry.favorite = !entry.favorite
      setToStorage(STORAGE_KEYS.history, history.value)
    }
  }

  const clearHistory = () => {
    history.value = []
    setToStorage(STORAGE_KEYS.history, [])
  }

  const getFavorites = () => {
    return history.value.filter(h => h.favorite)
  }

  return {
    history,
    addToHistory,
    removeFromHistory,
    toggleFavorite,
    clearHistory,
    getFavorites
  }
}

// Templates composable
export function useTemplates() {
  const templates: Ref<SavedTemplate[]> = ref(getFromStorage(STORAGE_KEYS.templates, []))

  const saveTemplate = (template: SavedTemplate) => {
    const existingIndex = templates.value.findIndex(t => t.id === template.id)
    if (existingIndex >= 0) {
      templates.value[existingIndex] = template
    } else {
      templates.value.push(template)
    }
    setToStorage(STORAGE_KEYS.templates, templates.value)
  }

  const deleteTemplate = (id: string) => {
    templates.value = templates.value.filter(t => t.id !== id)
    setToStorage(STORAGE_KEYS.templates, templates.value)
  }

  const getTemplate = (id: string) => {
    return templates.value.find(t => t.id === id)
  }

  return {
    templates,
    saveTemplate,
    deleteTemplate,
    getTemplate
  }
}

// Settings composable
export function useSettings() {
  const settings: Ref<AppSettings> = ref(getFromStorage(STORAGE_KEYS.settings, defaultAppSettings))

  watch(settings, (newSettings) => {
    setToStorage(STORAGE_KEYS.settings, newSettings)
  }, { deep: true })

  const updateSettings = (partial: Partial<AppSettings>) => {
    settings.value = { ...settings.value, ...partial }
  }

  const resetSettings = () => {
    settings.value = { ...defaultAppSettings }
    setToStorage(STORAGE_KEYS.settings, settings.value)
  }

  const enableNsfw = () => {
    settings.value.nsfwEnabled = true
    settings.value.nsfwConfirmed = true
  }

  const disableNsfw = () => {
    settings.value.nsfwEnabled = false
  }

  return {
    settings,
    updateSettings,
    resetSettings,
    enableNsfw,
    disableNsfw
  }
}
