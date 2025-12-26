<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { formatShortcut, type KeyboardShortcut } from '@/composables/useKeyboardShortcuts'

export interface Command {
  id: string
  name: string
  description?: string
  icon?: string
  shortcut?: KeyboardShortcut
  category?: string
  action: () => void
}

const props = defineProps<{
  show: boolean
  commands: Command[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'execute', commandId: string): void
}>()

const searchQuery = ref('')
const selectedIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)

// Filter commands based on search
const filteredCommands = computed(() => {
  if (!searchQuery.value.trim()) {
    return props.commands
  }

  const query = searchQuery.value.toLowerCase()
  return props.commands.filter(cmd =>
    cmd.name.toLowerCase().includes(query) ||
    cmd.description?.toLowerCase().includes(query) ||
    cmd.category?.toLowerCase().includes(query)
  )
})

// Group commands by category
const groupedCommands = computed(() => {
  const groups: Record<string, Command[]> = {}

  for (const cmd of filteredCommands.value) {
    const category = cmd.category || 'General'
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(cmd)
  }

  return groups
})

// Flat list for keyboard navigation
const flatCommands = computed(() => filteredCommands.value)

// Reset selection when search changes
watch(searchQuery, () => {
  selectedIndex.value = 0
})

// Focus input when modal opens
watch(() => props.show, (show) => {
  if (show) {
    searchQuery.value = ''
    selectedIndex.value = 0
    nextTick(() => {
      inputRef.value?.focus()
    })
  }
})

// Handle keyboard navigation
const handleKeyDown = (event: KeyboardEvent) => {
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault()
      selectedIndex.value = Math.min(selectedIndex.value + 1, flatCommands.value.length - 1)
      break
    case 'ArrowUp':
      event.preventDefault()
      selectedIndex.value = Math.max(selectedIndex.value - 1, 0)
      break
    case 'Enter':
      event.preventDefault()
      if (flatCommands.value[selectedIndex.value]) {
        executeCommand(flatCommands.value[selectedIndex.value])
      }
      break
    case 'Escape':
      event.preventDefault()
      emit('close')
      break
  }
}

// Execute a command
const executeCommand = (command: Command) => {
  emit('execute', command.id)
  command.action()
  emit('close')
}

// Handle click outside
const handleBackdropClick = (event: MouseEvent) => {
  if ((event.target as HTMLElement).classList.contains('command-palette-backdrop')) {
    emit('close')
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="palette">
      <div
        v-if="show"
        class="command-palette-backdrop fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-[15vh]"
        @click="handleBackdropClick"
      >
        <div class="command-palette w-full max-w-lg mx-4 bg-surface-900 rounded-xl border border-surface-700 shadow-2xl overflow-hidden">
          <!-- Search Input -->
          <div class="p-3 border-b border-surface-800">
            <div class="relative">
              <input
                ref="inputRef"
                v-model="searchQuery"
                type="text"
                placeholder="Type a command..."
                class="w-full px-4 py-2.5 pl-10 bg-surface-800 border border-surface-700 rounded-lg
                       text-white placeholder-surface-500 focus:outline-none focus:border-chrient-gold"
                @keydown="handleKeyDown"
              />
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500">
                /
              </span>
            </div>
          </div>

          <!-- Commands List -->
          <div class="max-h-[50vh] overflow-y-auto">
            <template v-if="Object.keys(groupedCommands).length > 0">
              <div
                v-for="(commands, category) in groupedCommands"
                :key="category"
              >
                <div class="px-3 py-1.5 text-xs text-surface-500 uppercase tracking-wider bg-surface-900/50 sticky top-0">
                  {{ category }}
                </div>
                <button
                  v-for="command in commands"
                  :key="command.id"
                  @click="executeCommand(command)"
                  :class="[
                    'w-full px-4 py-2.5 flex items-center gap-3 text-left transition-colors',
                    flatCommands.indexOf(command) === selectedIndex
                      ? 'bg-chrient-gold/10 text-white'
                      : 'text-surface-300 hover:bg-surface-800'
                  ]"
                >
                  <span v-if="command.icon" class="text-lg w-6 text-center">
                    {{ command.icon }}
                  </span>
                  <div class="flex-1 min-w-0">
                    <div class="font-medium truncate">{{ command.name }}</div>
                    <div v-if="command.description" class="text-xs text-surface-500 truncate">
                      {{ command.description }}
                    </div>
                  </div>
                  <kbd
                    v-if="command.shortcut"
                    class="hidden sm:inline-flex items-center gap-1 px-2 py-1 bg-surface-800 rounded text-xs text-surface-400 font-mono"
                  >
                    {{ formatShortcut(command.shortcut) }}
                  </kbd>
                </button>
              </div>
            </template>

            <!-- No Results -->
            <div
              v-else
              class="p-8 text-center text-surface-500"
            >
              <div class="text-2xl mb-2">🔍</div>
              <div>No commands found for "{{ searchQuery }}"</div>
            </div>
          </div>

          <!-- Footer -->
          <div class="px-3 py-2 border-t border-surface-800 flex items-center justify-between text-xs text-surface-500">
            <div class="flex items-center gap-4">
              <span><kbd class="kbd">↑↓</kbd> Navigate</span>
              <span><kbd class="kbd">Enter</kbd> Execute</span>
              <span><kbd class="kbd">Esc</kbd> Close</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.kbd {
  @apply px-1 py-0.5 bg-surface-700 rounded text-surface-400 font-mono;
}

.palette-enter-active,
.palette-leave-active {
  transition: all 0.2s ease;
}

.palette-enter-from,
.palette-leave-to {
  opacity: 0;
}

.palette-enter-from .command-palette,
.palette-leave-to .command-palette {
  transform: scale(0.95) translateY(-10px);
}
</style>
