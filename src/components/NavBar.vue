<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const navItems = [
  { name: 'generator', path: '/', icon: '✨', label: 'Generate' },
  { name: 'history', path: '/history', icon: '📋', label: 'History' },
  { name: 'templates', path: '/templates', icon: '📁', label: 'Templates' },
  { name: 'settings', path: '/settings', icon: '⚙️', label: 'Settings' }
]

const navigate = (path: string) => {
  router.push(path)
}
</script>

<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-surface-900 border-t border-surface-800 safe-bottom z-50">
    <div class="flex justify-around items-center h-16 max-w-lg mx-auto">
      <button
        v-for="item in navItems"
        :key="item.name"
        @click="navigate(item.path)"
        :class="[
          'flex flex-col items-center justify-center w-full h-full transition-colors',
          route.path === item.path
            ? 'text-chrient-gold'
            : 'text-surface-400 hover:text-surface-200'
        ]"
      >
        <span class="text-xl mb-0.5">{{ item.icon }}</span>
        <span class="text-xs font-medium">{{ item.label }}</span>
      </button>
    </div>
  </nav>
</template>
