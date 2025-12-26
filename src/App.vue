<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <div class="min-h-screen bg-surface-950 text-white flex flex-col">
    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto pb-20">
      <RouterView />
    </main>

    <!-- Bottom Navigation -->
    <NavBar />
  </div>
</template>
