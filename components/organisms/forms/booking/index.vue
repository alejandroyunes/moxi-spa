<script lang="ts" setup>
import './booking-form.scss'
import { ref } from 'vue'
import { AxiosError } from 'axios'
import { reset } from '@formkit/core'
import Loading from '~/components/atoms/loading/loading-icon/index.vue'
import { formPost } from '~/utils/apis/FormPostMethod'
import CardBooked from '~/components/organisms/card-booked/index.vue'
import CardServices from '~/components/organisms/card-services/index.vue'

import FooterSubmit from '~/components/atoms/footer-submit/index.vue'

const name = ref('')
const email = ref('')
const phone = ref('')
const visitReason = ref('')
const cardNumber = ref('')
const cardExpiry = ref('')
const cardCvv = ref('')
const billingZip = ref('')
const acceptTerms = ref(false)

const isResponseError = ref(true)
const isRequestError = ref(false)
const isSuccess = ref(false)
const isLoading = ref(false)
const isFirstStep = ref(true)
const stepsCompleted = ref(false)

const formData = ref({
  firstStep: {
    name: '',
    email: '',
    phone: '',
    visitReason: ''
  },
  secondStep: {
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    billingZip: '',
    acceptTerms: false
  }
})

const emit = defineEmits(['updateBookingStatus'])

const updateBookingStatus = (status: boolean) => {
  emit('updateBookingStatus', status)
}

watch(isSuccess, (newValue) => {
  updateBookingStatus(newValue)
})


type Props = {
  booking: typeof formData.value.firstStep
  payment: typeof formData.value.secondStep
}

const submitHandler = async (createForm: Props) => {
  if (isFirstStep.value) {

    formData.value.firstStep = { ...createForm.booking }
    isFirstStep.value = false
  } else {

    formData.value.secondStep = { ...createForm.payment }
    stepsCompleted.value = true

    const data = {
      ...formData.value.firstStep,
      ...formData.value.secondStep
    }

    if (stepsCompleted.value) {
      try {
        isLoading.value = true
        isSuccess.value = false
        isRequestError.value = false
        isResponseError.value = false

        await new Promise((resolve) => setTimeout(resolve, 2000))

        console.log('Combined Data:', data)

        isLoading.value = false
        isSuccess.value = true

      } catch (error) {
        isLoading.value = false

        const axiosError = error as AxiosError<Error>

        if (axiosError.response) {
          isResponseError.value = true
        } else if (axiosError.request) {
          isRequestError.value = true
        }
      }
    }
  }

  isLoading.value = false
}

</script>

<template>
  <section class="booking-form-inner" v-if="!isSuccess">

    <div class="booking-form" v-if="!isLoading">

      <h2 v-if="isFirstStep" class="title">Enter your details below</h2>
      <h2 v-else class="title">Secure your appointment by card</h2>

      <p v-if="!isFirstStep" class="description">A credit or debit card is required to book your appointment.</p>

      <FormKit v-if="isFirstStep" type="form" id="booking-form" #default="{ state }" :actions="false"  @submit="submitHandler">

        <FormKit type="group" name="booking">

          <div class="form-group-inline">
            
            <div class="form-group-input">
              <label for="name">Full Name</label>
              <FormKit
                type="text"
                placeholder="input your full name"
                maxLength="30"
                minLength="3"
                v-model="name"
                name="name"
                validation="required" />
            </div>

            <div class="form-group-input">
              <label for="email">Email</label>
              <FormKit
                type="email"
                placeholder="input your email"
                v-model="email"
                name="email"
                validation="required|email" />
            </div>

            <div class="form-group-input">
              <label for="tel">Phone</label>
              <FormKit maxLength="10" minLength="10" inputmode="numeric" name="phone"
                oninput="this.value = this.value.replace(/\D/g, '')"
                :validation="[['matches', /^.{10,10}$/], ['required']]" v-model.number="phone" type="text"
                placeholder="301 456 7890" />
            </div>

          </div>

          <div class="form-group-textarea">
            <label for="visitReason">Visit Reason</label>
            <FormKit
              type="textarea"
              name="visitReason"
              placeholder="Visit Reason"
              maxLength="85"
              v-model="visitReason"
              validation="required" />
          </div>

        </FormKit>

          <FooterSubmit v-show="isFirstStep" />

      </FormKit>

      <FormKit v-else type="form" id="payment-form" #default="{ state }" :actions="false" @submit="submitHandler">
        <FormKit type="group" name="payment">

          <div class="form-group-inline">

            <div class="form-group-input">
            <label for="cardNumber">Card information</label>
            <FormKit
              type="text"
              placeholder="1234 1234 1234 1234"
              maxLength="16"
              minLength="16"
              v-model="cardNumber"
              name="cardNumber"
              validation="required" />
            </div>

            <div class="form-group-row">
              <div class="form-group-input">
                <FormKit
                  type="text"
                  placeholder="MM / YY"
                  maxLength="4"
                  minLength="4"
                  v-model="cardExpiry"
                  name="cardExpiry"
                  validation="required" />
              </div>

              <div class="form-group-input">
                <FormKit
                  type="text"
                  placeholder="CVV"
                  v-model="cardCvv"
                  name="cardCvv"
                  validation="required" />
              </div>

            </div>

            <div class="form-group-input">
              <FormKit 
                  type="text"
                  maxLength="6"
                  name="postal_code"
                  :validation="[['required']]" v-model="billingZip"
                  placeholder="Billing zip code"
                  oninput="this.value = this.value.replace(/\s/g, '')">
                </FormKit>
            </div>

            <div class="checkbox-option">
              <FormKit
                type="checkbox"
                name="acceptTerms"
                id="acceptTerms"
                validation="accepted"
                validation-visibility="dirty"
                v-model="acceptTerms" 
                :value="acceptTerms" />
              <p>We ask that you please reschedule or cancel at least 24 hours before the beginning of your appointment or you may be charged a cancellation fee of $50. In the event of emergency, contact us directly. Your card will be held in case of late cancellation and for future purchases.  It will no be charged now.</p>

            </div>

            <div class="border-bottom"></div>

              <button type="submit" class="book-appointment-submit">Book Appointment</button>

              <p>By creating this appointment, you acknowledge you will receive automated transactional messages from this merchant.</p>

          </div>

        </FormKit>

        <FooterSubmit v-show="!isFirstStep" class="desktop-only" />

      </FormKit>

    </div>

    <div class="booking-form-info" v-if="isLoading">

      <h3 v-show="isLoading" class="booking-form-title">Saving...</h3>
      <p v-show="isLoading" class="booking-form-description">Appointment is being saved...</p>

      <Loading v-show="isLoading" />

    </div>

  </section>

  <CardBooked v-else />
  <CardServices v-if="isSuccess" />
</template>
