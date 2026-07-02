<template>
  <div class="section bg-slate-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <h1 class="section-title">Our Work</h1>
      <p class="section-sub">A showcase of what we create.</p>

      <div class="flex flex-wrap gap-2 mb-8">
        <button v-for="cat in ['all', ...categories]" :key="cat"
          @click="active = cat"
          :class="['px-4 py-1.5 rounded-full text-sm font-medium border transition-colors',
            active === cat ? 'bg-amber-500 border-amber-500 text-white' : 'bg-white border-slate-300 text-slate-600 hover:border-amber-400']">
          {{ cat === 'all' ? 'All' : cat }}
        </button>
      </div>

      <div v-if="loading" class="text-slate-400">Loading...</div>
      <div v-else class="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        <div v-for="item in filtered" :key="item.id" class="break-inside-avoid">
          <div class="bg-slate-200 rounded-xl overflow-hidden group cursor-pointer" @click="lightbox = item">
            <img v-if="item.type === 'image'" :src="item.url" :alt="item.caption" class="w-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <video v-else :src="item.url" class="w-full" />
            <div v-if="item.caption" class="p-2 text-xs text-slate-600">{{ item.caption }}</div>
          </div>
        </div>
      </div>

      <!-- Lightbox -->
      <div v-if="lightbox" class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" @click.self="lightbox = null">
        <button class="absolute top-4 right-4 text-white text-3xl" @click="lightbox = null">×</button>
        <img :src="lightbox.url" :alt="lightbox.caption" class="max-w-full max-h-screen rounded-lg" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';

const GALLERY_QUERY = gql`query { gallery { id url thumbnailUrl caption category type } }`;
const { result, loading } = useQuery(GALLERY_QUERY);
const items = computed(() => result.value?.gallery || []);
const categories = computed(() => [...new Set(items.value.map(i => i.category))]);
const active = ref('all');
const filtered = computed(() => active.value === 'all' ? items.value : items.value.filter(i => i.category === active.value));
const lightbox = ref(null);
</script>
