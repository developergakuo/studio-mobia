<template>
  <div class="section bg-slate-50 min-h-screen">
    <div class="max-w-lg mx-auto text-center">
      <div v-if="loading" class="text-slate-400">Loading your booking...</div>
      <div v-else-if="booking">
        <div class="text-6xl mb-6">📋</div>
        <h1 class="text-3xl font-bold text-slate-900 mb-2">Booking Received!</h1>
        <p class="text-slate-500 mb-8">Please pay the deposit below to confirm your session.</p>

        <div class="bg-white rounded-2xl border border-slate-200 p-6 text-left mb-6">
          <div class="flex justify-between py-2 border-b border-slate-100">
            <span class="text-slate-500">Reference</span>
            <span class="font-mono font-bold text-amber-600">{{ booking.referenceCode }}</span>
          </div>
          <div class="flex justify-between py-2 border-b border-slate-100">
            <span class="text-slate-500">Service</span>
            <span class="font-semibold">{{ booking.service?.name }}</span>
          </div>
          <div class="flex justify-between py-2 border-b border-slate-100">
            <span class="text-slate-500">Date</span>
            <span>{{ booking.date ? new Date(booking.date).toLocaleDateString('en-KE', { dateStyle: 'long' }) : '—' }} at {{ booking.time }}</span>
          </div>
          <div class="flex justify-between py-2 border-b border-slate-100">
            <span class="text-slate-500">Total</span>
            <span class="font-bold">KES {{ booking.totalPrice?.toLocaleString() }}</span>
          </div>
          <div class="flex justify-between py-2">
            <span class="text-slate-500 font-semibold">Deposit Due Now</span>
            <span class="text-amber-600 font-bold text-lg">KES {{ booking.depositAmount?.toLocaleString() }}</span>
          </div>
        </div>

        <div v-if="booking.depositPaid" class="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-green-800">
          ✅ Deposit paid! Your booking is confirmed. We'll be in touch shortly.
        </div>
        <div v-else class="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-amber-800 text-sm">
          Pay <strong>KES {{ booking.depositAmount?.toLocaleString() }}</strong> via M-Pesa to confirm your slot.
        </div>

        <div v-if="paymentError" class="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-red-700 text-sm">
          {{ paymentError }}
        </div>

        <button
          v-if="!booking.depositPaid"
          class="btn-primary w-full text-lg"
          :disabled="paying"
          @click="startPayment"
        >
          <span v-if="paying">Redirecting to payment...</span>
          <span v-else>Pay KES {{ booking.depositAmount?.toLocaleString() }} Deposit via M-Pesa</span>
        </button>
      </div>
      <div v-else class="text-slate-400">Booking not found.</div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { computed, ref } from 'vue';
import { GET_BOOKING_BY_REF, PESAPAL_BOOKING_REQUEST } from '@/shared/apollo/queryStrings/bookings.js';

const route = useRoute();
const { result, loading } = useQuery(GET_BOOKING_BY_REF, { referenceCode: route.params.ref });
const booking = computed(() => result.value?.bookingByRef);

const paying = ref(false);
const paymentError = ref('');

const { mutate: requestPayment } = useMutation(PESAPAL_BOOKING_REQUEST);

async function startPayment() {
  if (!booking.value?.id) return;
  paying.value = true;
  paymentError.value = '';

  try {
    const callbackUrl = `${window.location.origin}/booking/payment-complete`;
    const { data } = await requestPayment({
      bookingId: booking.value.id,
      callback_url: callbackUrl,
    });

    const redirectUrl = data?.pesapalBookingRequest?.redirectUrl;
    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      throw new Error('No redirect URL returned from payment gateway');
    }
  } catch (err) {
    paymentError.value = err.message || 'Payment initiation failed. Please try again.';
    paying.value = false;
  }
}
</script>
