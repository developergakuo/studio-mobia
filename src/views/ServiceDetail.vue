<template>
  <div class="section bg-slate-50 min-h-screen">
    <div class="max-w-3xl mx-auto" v-if="service">
      <RouterLink to="/services" class="text-amber-500 text-sm font-medium hover:underline">← Back to Services</RouterLink>
      <div v-if="service.images?.[0]" class="mt-4 rounded-2xl overflow-hidden h-64 md:h-96">
        <img :src="service.images[0]" :alt="service.name" class="w-full h-full object-cover" />
      </div>
      <h1 class="text-3xl font-bold text-slate-900 mt-6 mb-2">{{ service.name }}</h1>
      <p class="text-amber-600 font-semibold uppercase text-sm mb-4">{{ service.category?.replace(/-/g, ' ') }}</p>
      <p class="text-slate-600 mb-8">{{ service.description }}</p>
      <div class="bg-white rounded-xl border border-slate-200 p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div>
          <p class="text-3xl font-bold text-slate-900">KES {{ service.price?.toLocaleString() }}</p>
          <p class="text-slate-400 text-sm">{{ service.duration }}</p>
        </div>
        <div class="text-center md:text-right">
          <p class="text-sm text-slate-500">Deposit to book</p>
          <p class="text-xl font-bold text-amber-600">KES {{ depositAmount.toLocaleString() }}</p>
        </div>
        <RouterLink :to="`/book/${service.id}`" class="btn-primary whitespace-nowrap">Book This Service</RouterLink>
      </div>
    </div>
    <div v-else class="text-slate-400">Loading...</div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import { GET_SERVICE } from '@/shared/apollo/queryStrings/services.js';

const route = useRoute();
const { result } = useQuery(GET_SERVICE, { id: route.params.id });
const service = computed(() => result.value?.service);
const depositAmount = computed(() => Math.round((service.value?.price || 0) * (service.value?.depositPercentage || 30) / 100));
</script>
