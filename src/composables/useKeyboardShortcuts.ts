import { onMounted, onUnmounted, ref } from 'vue'

export interface KeyboardShortcut {
  key: string
  ctrl?: boolean
  shift?: boolean
  alt?: boolean
  meta?: boolean
  description: string
  action: () => void
  category?: string
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[]) {
  const isEnabled = ref(true)

  const handleKeyDown = (event: KeyboardEvent) => {
    // Don't trigger shortcuts when typing in inputs
    const target = event.target as HTMLElement
    if (
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable
    ) {
      // Allow Escape to work even in inputs
      if (event.key !== 'Escape') {
        return
      }
    }

    if (!isEnabled.value) return

    for (const shortcut of shortcuts) {
      const ctrlMatch = shortcut.ctrl ? (event.ctrlKey || event.metaKey) : !(event.ctrlKey || event.metaKey)
      const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey
      const altMatch = shortcut.alt ? event.altKey : !event.altKey

      if (
        event.key.toLowerCase() === shortcut.key.toLowerCase() &&
        ctrlMatch &&
        shiftMatch &&
        altMatch
      ) {
        event.preventDefault()
        shortcut.action()
        return
      }
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })

  const enable = () => {
    isEnabled.value = true
  }

  const disable = () => {
    isEnabled.value = false
  }

  return {
    isEnabled,
    enable,
    disable
  }
}

// Pre-defined shortcut helpers
export function createGeneratorShortcuts(handlers: {
  copy: () => void
  copyWithUC: () => void
  copyAll: () => void
  random: () => void
  reset: () => void
  undo: () => void
  redo: () => void
  save: () => void
  openSearch: () => void
  openCommandPalette: () => void
  toggleNsfw?: () => void
  preview: () => void
}): KeyboardShortcut[] {
  return [
    {
      key: 'c',
      ctrl: true,
      description: 'Copy prompt',
      action: handlers.copy,
      category: 'Clipboard'
    },
    {
      key: 'c',
      ctrl: true,
      shift: true,
      description: 'Copy with undesired content',
      action: handlers.copyWithUC,
      category: 'Clipboard'
    },
    {
      key: 'a',
      ctrl: true,
      shift: true,
      description: 'Copy all (with settings)',
      action: handlers.copyAll,
      category: 'Clipboard'
    },
    {
      key: 'r',
      ctrl: true,
      description: 'Randomize all',
      action: handlers.random,
      category: 'Generation'
    },
    {
      key: 'Delete',
      ctrl: true,
      description: 'Reset all',
      action: handlers.reset,
      category: 'Generation'
    },
    {
      key: 'z',
      ctrl: true,
      description: 'Undo',
      action: handlers.undo,
      category: 'History'
    },
    {
      key: 'y',
      ctrl: true,
      description: 'Redo',
      action: handlers.redo,
      category: 'History'
    },
    {
      key: 'z',
      ctrl: true,
      shift: true,
      description: 'Redo (alternative)',
      action: handlers.redo,
      category: 'History'
    },
    {
      key: 's',
      ctrl: true,
      description: 'Save as preset',
      action: handlers.save,
      category: 'Templates'
    },
    {
      key: 'f',
      ctrl: true,
      description: 'Focus search',
      action: handlers.openSearch,
      category: 'Navigation'
    },
    {
      key: '/',
      description: 'Open command palette',
      action: handlers.openCommandPalette,
      category: 'Navigation'
    },
    {
      key: 'k',
      ctrl: true,
      description: 'Open command palette (alternative)',
      action: handlers.openCommandPalette,
      category: 'Navigation'
    },
    {
      key: 'p',
      ctrl: true,
      description: 'Preview prompt',
      action: handlers.preview,
      category: 'View'
    },
    ...(handlers.toggleNsfw ? [{
      key: 'n',
      ctrl: true,
      shift: true,
      description: 'Toggle NSFW mode',
      action: handlers.toggleNsfw,
      category: 'Settings'
    }] : [])
  ]
}

// Get all shortcuts grouped by category
export function getShortcutsByCategory(shortcuts: KeyboardShortcut[]): Record<string, KeyboardShortcut[]> {
  const grouped: Record<string, KeyboardShortcut[]> = {}

  for (const shortcut of shortcuts) {
    const category = shortcut.category || 'Other'
    if (!grouped[category]) {
      grouped[category] = []
    }
    grouped[category].push(shortcut)
  }

  return grouped
}

// Format shortcut for display
export function formatShortcut(shortcut: KeyboardShortcut): string {
  const parts: string[] = []

  if (shortcut.ctrl) parts.push('Ctrl')
  if (shortcut.shift) parts.push('Shift')
  if (shortcut.alt) parts.push('Alt')

  // Format key
  let key = shortcut.key
  if (key === ' ') key = 'Space'
  else if (key === 'ArrowUp') key = '↑'
  else if (key === 'ArrowDown') key = '↓'
  else if (key === 'ArrowLeft') key = '←'
  else if (key === 'ArrowRight') key = '→'
  else if (key === 'Escape') key = 'Esc'
  else if (key === 'Delete') key = 'Del'
  else key = key.toUpperCase()

  parts.push(key)

  return parts.join('+')
}
