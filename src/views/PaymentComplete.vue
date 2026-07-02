<template>
  <div class="section bg-slate-50 min-h-screen">
    <div class="max-w-lg mx-auto text-center">
      <div v-if="loading" class="text-slate-400">Verifying payment...</div>
      <div v-else-if="booking">
        <template v-if="booking.depositPaid">
          <div class="text-6xl mb-6">🎉</div>
          <h1 class="text-3xl font-bold text-slate-900 mb-2">Deposit Paid!</h1>
          <p class="text-slate-500 mb-8">Your booking is confirmed. We'll contact you to finalize details.</p>
          <div class="bg-white rounded-2xl border border-slate-200 p-6 text-left mb-6">
            <div class="flex justify-between py-2 border-b border-slate-100">
              <span class="text-slate-500">Reference</span>
              <span class="font-mono font-bold text-amber-600">{{ booking.referenceCode }}</span>
            </div>
            <div class="flex justify-between py-2 border-b border-slate-100">
              <span class="text-slate-500">Service</span>
              <span class="font-semibold">{{ booking.service?.name }}</span>
            </div>
            <div class="flex justify-between py-2">
              <span class="text-slate-500">Deposit Paid</span>
              <span class="text-green-600 font-bold">KES {{ booking.depositAmount?.toLocaleString() }}</span>
            </div>
          </div>
          <router-link to="/" class="btn-primary inline-block">Back to Home</router-link>
        </template>
        <template v-else>
          <div class="text-6xl mb-6">⏳</div>
          <h1 class="text-3xl font-bold text-slate-900 mb-2">Payment Pending</h1>
          <p class="text-slate-500 mb-8">
            We haven't confirmed your payment yet. If you completed the M-Pesa prompt,
            please wait a moment and refresh.
          </p>
          <div class="mb-4">
            <span class="font-mono text-amber-600 font-bold">Ref: {{ booking.referenceCode }}</span>
          </div>
          <button class="btn-primary" @click="reload">Refresh Status</button>
        </template>
      </div>
      <div v-else class="text-slate-400 space-y-4">
        <p>Could not load your booking details.</p>
        <router-link to="/" class="text-amber-600 underline">Back to Home</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useQuery } from '@vue/apollo-composable';
import { computed } from 'vue';
import { GET_BOOKING_BY_REF } from '@/shared/apollo/queryStrings/bookings.js';

const route = useRoute();
const ref = computed(() => route.query.ref);

const { result, loading } = useQuery(
    GET_BOOKING_BY_REF,
    () => ({ referenceCode: ref.value }),
    { enabled: computed(() => !!ref.value), fetchPolicy: 'network-only' }
);

const booking = computed(() => result.value?.bookingByRef);

function reload() {
    window.location.reload();
}
</script>
