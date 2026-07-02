<template>
  <div class="section bg-slate-50 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <h1 class="section-title">Our Services</h1>
      <p class="section-sub">Choose a service and book your slot — pay a deposit to confirm.</p>

      <!-- Category filter -->
      <div class="flex flex-wrap gap-2 mb-8">
        <button
          v-for="cat in ['all', ...CATEGORIES]" :key="cat"
          @click="activeCategory = cat"
          :class="['px-4 py-1.5 rounded-full text-sm font-medium border transition-colors',
            activeCategory === cat ? 'bg-amber-500 border-amber-500 text-white' : 'bg-white border-slate-300 text-slate-600 hover:border-amber-400']">
          {{ cat === 'all' ? 'All' : cat.replace(/-/g, ' ') }}
        </button>
      </div>

      <div v-if="loading" class="text-slate-400">Loading services...</div>
      <div v-else-if="!filteredServices.length" class="text-slate-400">No services found.</div>
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="s in filteredServices" :key="s.id"
          class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow">
          <div v-if="s.images?.[0]" class="h-48 bg-slate-200 overflow-hidden">
            <img :src="s.images[0]" :alt="s.name" class="w-full h-full object-cover" />
          </div>
          <div v-else class="h-48 bg-gradient-to-br from-slate-800 to-slate-600 flex items-center justify-center">
            <span class="text-5xl">{{ categoryIcon(s.category) }}</span>
          </div>
          <div class="p-5">
            <p class="text-xs text-amber-600 font-semibold uppercase mb-1">{{ s.category?.replace(/-/g, ' ') }}</p>
            <h3 class="font-bold text-slate-800 text-lg mb-2">{{ s.name }}</h3>
            <p class="text-slate-500 text-sm mb-4 line-clamp-3">{{ s.description }}</p>
            <div class="flex items-center justify-between mb-4">
              <div>
                <p class="text-2xl font-bold text-slate-900">KES {{ s.price?.toLocaleString() }}</p>
                <p class="text-xs text-slate-400">{{ s.duration }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm font-semibold text-amber-600">{{ s.depositPercentage }}% deposit</p>
                <p class="text-xs text-slate-400">= KES {{ Math.round((s.price || 0) * s.depositPercentage / 100).toLocaleString() }}</p>
              </div>
            </div>
            <RouterLink :to="`/book/${s.id}`" class="btn-primary w-full text-center block">
              Book Now
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { GET_SERVICES } from '@/shared/apollo/queryStrings/services.js';

const CATEGORIES = ['photography','video','recording','content-creation','events','product-photography','real-estate','drone'];
const ICONS = { photography:'📸', video:'🎬', recording:'🎙️', 'content-creation':'📱', events:'🎉', 'product-photography':'📦', 'real-estate':'🏠', drone:'🚁' };
const categoryIcon = cat => ICONS[cat] || '🎯';

const activeCategory = ref('all');
const { result, loading } = useQuery(GET_SERVICES);
const services = computed(() => result.value?.services || []);
const filteredServices = computed(() =>
  activeCategory.value === 'all' ? services.value : services.value.filter(s => s.category === activeCategory.value)
);
</script>
