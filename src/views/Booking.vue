<template>
  <div class="section bg-slate-50 min-h-screen">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-slate-900 mb-2">Book a Session</h1>

      <div v-if="serviceLoading" class="text-slate-400">Loading...</div>
      <div v-else-if="service">
        <!-- Service summary -->
        <div class="bg-white rounded-xl border border-slate-200 p-5 mb-6">
          <p class="text-xs text-amber-600 font-semibold uppercase mb-1">{{ service.category?.replace(/-/g, ' ') }}</p>
          <h2 class="font-bold text-slate-800 text-xl">{{ service.name }}</h2>
          <div class="flex justify-between mt-3 text-sm">
            <span class="text-slate-500">Total price</span>
            <span class="font-bold">KES {{ service.price?.toLocaleString() }}</span>
          </div>
          <div class="flex justify-between mt-1 text-sm">
            <span class="text-slate-500">Deposit to confirm ({{ service.depositPercentage }}%)</span>
            <span class="font-bold text-amber-600">KES {{ depositAmount.toLocaleString() }}</span>
          </div>
        </div>

        <!-- Booking form -->
        <form @submit.prevent="submit" class="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-4">
          <div>
            <label class="label">Full Name *</label>
            <input v-model="form.clientName" class="input" required placeholder="Your full name" />
          </div>
          <div>
            <label class="label">Email *</label>
            <input v-model="form.clientEmail" type="email" class="input" required placeholder="you@example.com" />
          </div>
          <div>
            <label class="label">Phone *</label>
            <input v-model="form.clientPhone" class="input" required placeholder="+254 7XX XXX XXX" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="label">Preferred Date *</label>
              <input v-model="form.date" type="date" class="input" :min="minDate" required />
            </div>
            <div>
              <label class="label">Preferred Time *</label>
              <select v-model="form.time" class="input" required>
                <option value="">Select time</option>
                <option v-for="t in timeSlots" :key="t" :value="t">{{ t }}</option>
              </select>
            </div>
          </div>
          <div>
            <label class="label">Location / Venue</label>
            <input v-model="form.location" class="input" placeholder="Where should we meet? (optional)" />
          </div>
          <div>
            <label class="label">Additional Notes</label>
            <textarea v-model="form.notes" class="input" rows="3" placeholder="Tell us more about what you need..." />
          </div>

          <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
            <strong>Next step:</strong> After submitting, you'll pay a deposit of
            <strong>KES {{ depositAmount.toLocaleString() }}</strong> via M-Pesa to confirm your booking.
          </div>

          <button type="submit" class="btn-primary" :disabled="loading">
            {{ loading ? 'Submitting...' : 'Request Booking →' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { GET_SERVICE } from '@/shared/apollo/queryStrings/services.js';
import { CREATE_BOOKING } from '@/shared/apollo/queryStrings/bookings.js';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();

const { result: serviceResult, loading: serviceLoading } = useQuery(GET_SERVICE, { id: route.params.serviceId });
const service = computed(() => serviceResult.value?.service);
const depositAmount = computed(() => Math.round((service.value?.price || 0) * (service.value?.depositPercentage || 30) / 100));

const form = ref({ clientName: '', clientEmail: '', clientPhone: '', date: '', time: '', location: '', notes: '' });
const minDate = new Date(Date.now() + 86400000).toISOString().split('T')[0];
const timeSlots = ['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM'];

const { mutate, loading } = useMutation(CREATE_BOOKING);

const submit = async () => {
  try {
    const { data } = await mutate({ ...form.value, serviceId: route.params.serviceId });
    const booking = data?.createBooking;
    await Swal.fire({
      icon: 'success',
      title: 'Booking Submitted!',
      html: `Your reference is <strong>${booking.referenceCode}</strong>.<br/>You'll be redirected to pay the deposit.`,
      confirmButtonText: 'Pay Deposit',
      confirmButtonColor: '#f59e0b',
    });
    router.push(`/booking/confirm/${booking.referenceCode}`);
  } catch (err) {
    Swal.fire({ icon: 'error', title: 'Error', text: err.message });
  }
};
</script>
