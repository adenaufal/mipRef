import { ref, watch, type Ref } from 'vue'

export interface UndoRedoOptions {
  maxHistory?: number
  debounceMs?: number
}

export function useUndoRedo<T>(
  state: Ref<T>,
  options: UndoRedoOptions = {}
) {
  const { maxHistory = 50, debounceMs = 300 } = options

  const history = ref<T[]>([])
  const future = ref<T[]>([])
  const isUndoingOrRedoing = ref(false)
  let debounceTimer: ReturnType<typeof setTimeout> | null = null

  // Initialize with current state
  history.value = [JSON.parse(JSON.stringify(state.value))]

  // Watch for state changes and add to history
  watch(
    state,
    (newValue) => {
      if (isUndoingOrRedoing.value) return

      // Debounce rapid changes
      if (debounceTimer) {
        clearTimeout(debounceTimer)
      }

      debounceTimer = setTimeout(() => {
        // Clear future when new action is taken
        future.value = []

        // Add to history
        const snapshot = JSON.parse(JSON.stringify(newValue))
        history.value.push(snapshot)

        // Limit history size
        if (history.value.length > maxHistory) {
          history.value.shift()
        }
      }, debounceMs)
    },
    { deep: true }
  )

  const canUndo = ref(false)
  const canRedo = ref(false)

  // Update can flags
  watch(
    [history, future],
    () => {
      canUndo.value = history.value.length > 1
      canRedo.value = future.value.length > 0
    },
    { immediate: true, deep: true }
  )

  const undo = () => {
    if (history.value.length <= 1) return

    isUndoingOrRedoing.value = true

    // Move current state to future
    const current = history.value.pop()
    if (current) {
      future.value.unshift(current)
    }

    // Restore previous state
    const previous = history.value[history.value.length - 1]
    if (previous) {
      state.value = JSON.parse(JSON.stringify(previous))
    }

    // Use nextTick equivalent
    setTimeout(() => {
      isUndoingOrRedoing.value = false
    }, 0)
  }

  const redo = () => {
    if (future.value.length === 0) return

    isUndoingOrRedoing.value = true

    // Get future state
    const next = future.value.shift()
    if (next) {
      history.value.push(JSON.parse(JSON.stringify(next)))
      state.value = JSON.parse(JSON.stringify(next))
    }

    // Use nextTick equivalent
    setTimeout(() => {
      isUndoingOrRedoing.value = false
    }, 0)
  }

  const clear = () => {
    history.value = [JSON.parse(JSON.stringify(state.value))]
    future.value = []
  }

  // Take a snapshot manually (useful for before major operations)
  const snapshot = () => {
    if (isUndoingOrRedoing.value) return

    future.value = []
    const snap = JSON.parse(JSON.stringify(state.value))
    history.value.push(snap)

    if (history.value.length > maxHistory) {
      history.value.shift()
    }
  }

  return {
    history,
    future,
    canUndo,
    canRedo,
    undo,
    redo,
    clear,
    snapshot
  }
}
