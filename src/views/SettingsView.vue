<script setup lang="ts">
import { useSettings } from '@/composables/useStorage'
import { modelOptions, undesiredPresets } from '@/data/presets'

const { settings, updateSettings, resetSettings, disableNsfw } = useSettings()
</script>

<template>
  <div class="px-4 pt-4">
    <!-- Header -->
    <header class="mb-6">
      <h1 class="text-2xl font-bold">Settings</h1>
      <p class="text-sm text-surface-400">Customize your experience</p>
    </header>

    <div class="space-y-6">
      <!-- Defaults -->
      <div class="card">
        <h3 class="section-title mb-4">Defaults</h3>

        <!-- Default Model -->
        <div class="mb-4">
          <label class="text-sm text-surface-300 mb-2 block">Default Model</label>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="model in modelOptions"
              :key="model.id"
              @click="updateSettings({ defaultModel: model.id as 'v45-full' | 'v45-curated' })"
              :class="[
                'p-3 rounded-xl text-sm font-medium transition-all border',
                settings.defaultModel === model.id
                  ? 'bg-chrient-gold/10 border-chrient-gold text-chrient-gold'
                  : 'bg-surface-800 border-surface-700 text-surface-300'
              ]"
            >
              {{ model.name }}
            </button>
          </div>
        </div>

        <!-- Default Undesired Preset -->
        <div class="mb-4">
          <label class="text-sm text-surface-300 mb-2 block">Default Undesired Preset</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="preset in undesiredPresets.filter(p => !p.nsfw)"
              :key="preset.id"
              @click="updateSettings({ defaultUndesiredPreset: preset.id })"
              :class="[
                'tag-chip',
                settings.defaultUndesiredPreset === preset.id && 'selected'
              ]"
            >
              {{ preset.name }}
            </button>
          </div>
        </div>

        <!-- Default Guidance -->
        <div class="mb-4">
          <label class="text-sm text-surface-300 mb-2 block">
            Default Guidance: {{ settings.defaultGuidance }}
          </label>
          <input
            type="range"
            :value="settings.defaultGuidance"
            @input="updateSettings({ defaultGuidance: Number(($event.target as HTMLInputElement).value) })"
            min="1"
            max="10"
            step="0.5"
            class="w-full accent-chrient-gold"
          />
          <div class="flex justify-between text-xs text-surface-500 mt-1">
            <span>1 (Creative)</span>
            <span>10 (Strict)</span>
          </div>
        </div>

        <!-- Default Steps -->
        <div>
          <label class="text-sm text-surface-300 mb-2 block">
            Default Steps: {{ settings.defaultSteps }}
          </label>
          <input
            type="range"
            :value="settings.defaultSteps"
            @input="updateSettings({ defaultSteps: Number(($event.target as HTMLInputElement).value) })"
            min="20"
            max="50"
            step="1"
            class="w-full accent-chrient-gold"
          />
          <div class="flex justify-between text-xs text-surface-500 mt-1">
            <span>20</span>
            <span>28 (Free)</span>
            <span>50</span>
          </div>
        </div>
      </div>

      <!-- Display -->
      <div class="card">
        <h3 class="section-title mb-4">Display</h3>

        <!-- Token Counter -->
        <div class="flex items-center justify-between py-2">
          <div>
            <div class="font-medium">Show Token Count</div>
            <div class="text-xs text-surface-500">Display estimated token count</div>
          </div>
          <button
            @click="updateSettings({ showTokenCount: !settings.showTokenCount })"
            :class="['toggle', settings.showTokenCount && 'active']"
          >
            <span class="toggle-thumb" />
          </button>
        </div>

        <!-- Compact Mode -->
        <div class="flex items-center justify-between py-2 border-t border-surface-800 mt-2 pt-4">
          <div>
            <div class="font-medium">Compact Mode</div>
            <div class="text-xs text-surface-500">Reduce spacing for more content</div>
          </div>
          <button
            @click="updateSettings({ compactMode: !settings.compactMode })"
            :class="['toggle', settings.compactMode && 'active']"
          >
            <span class="toggle-thumb" />
          </button>
        </div>
      </div>

      <!-- NSFW -->
      <div class="card border-red-500/30">
        <h3 class="section-title mb-4 text-red-400">NSFW Settings</h3>

        <div class="flex items-center justify-between py-2">
          <div>
            <div class="font-medium">NSFW Mode</div>
            <div class="text-xs text-surface-500">
              {{ settings.nsfwEnabled ? 'Adult content enabled' : 'Disabled' }}
            </div>
          </div>
          <button
            v-if="settings.nsfwEnabled"
            @click="disableNsfw"
            class="px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium"
          >
            Disable
          </button>
          <span v-else class="text-surface-500 text-sm">Off</span>
        </div>
      </div>

      <!-- About -->
      <div class="card">
        <h3 class="section-title mb-4">About</h3>
        <div class="space-y-2 text-sm">
          <div class="flex justify-between">
            <span class="text-surface-400">Version</span>
            <span>1.0.0</span>
          </div>
          <div class="flex justify-between">
            <span class="text-surface-400">Model Support</span>
            <span>NovelAI V4.5</span>
          </div>
          <div class="pt-2 border-t border-surface-800 mt-4">
            <p class="text-surface-400 text-xs leading-relaxed">
              mipRef - Chrientmip NovelAI Prompt Generator.
              Seed your imagination. ✨
            </p>
          </div>
        </div>
      </div>

      <!-- Reset -->
      <button
        @click="resetSettings"
        class="w-full py-3 text-red-400 text-sm font-medium"
      >
        Reset All Settings
      </button>
    </div>
  </div>
</template>
