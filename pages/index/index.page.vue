<script lang="ts" setup>
import { ref, watchEffect } from "vue";
import AppInput from "./../../components/BaseInput.vue";
import PhoneInput from "./../../components/BasePhoneContact.vue";
import { validateUserInfo } from "../../services/users";

interface UserInfo {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
}

interface UserInfoError {
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  contact: string | null;
}

const userInfo = ref<UserInfo>({
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
});

const errorBag = ref<UserInfoError>({
  firstName: null,
  lastName: null,
  email: null,
  contact: null,
});

const validateForm = () => {
  // console.log(userInfo.value.firstName);
  return validateUserInfo({
    firstName: userInfo.value.firstName,
    lastName: userInfo.value.lastName,
    email: userInfo.value.email,
    contact: String(userInfo.value.contact),
  });
};

const validateField = (key: string) => {
  const errors: Object = validateForm();
  if (errors[key]) {
    errorBag.value[key] = errors[key][0];
  } else {
    errorBag.value[key] = null;
  }
};

const resetErrorBag = () => {
  errorBag.value = {
    firstName: null,
    lastName: null,
    email: null,
    contact: null,
  };
};

const setErrorBag = (errors: string[]) => {
  for (const key in errors) {
    errorBag.value[key] = errors[key][0];
  }
};

const validate = () => {
  var errors = validateForm();

  console.log(errors);
  if (Object.keys(errors).length) {
    resetErrorBag();
    setErrorBag(errors);
  }
  // if (Object.keys(errors).length === 0) {
  //     resetErrorBag();
  //     if (terms.value) {
  //         if (optin.value) {
  //             nextStep();
  //         } else {
  //             optinModal.value = true;
  //         }
  //         return;
  //     } else {
  //         agreementModal.value = true;
  //     }
  // }
};

// watchEffect(() => {
//   if (userInfo.value) {
//     console.log(userInfo.value);
//   }
// });
</script>
<template>
  <div class="mt-10"></div>
  <div class="flex flex-col items-center justify-center gap-5">
    <form class="w-4/5" @submit.prevent="validate">
      <div class="flex flex-col gap-0 sm:flex-row sm:gap-4">
        <!-- First Name input  -->
        <AppInput
          v-model="userInfo.firstName"
          required
          label="First Name"
          :errorMessage="errorBag.firstName"
          @input="validateField('firstName')">
          >
        </AppInput>
        <!-- Last Name Input -->
        <AppInput
          v-model="userInfo.lastName"
          required
          label="Last Name"
          :errorMessage="errorBag.lastName"
          @input="validateField('lastName')">
        </AppInput>
      </div>

      <!-- Email Input -->
      <AppInput
        v-model="userInfo.email"
        required
        label="Email"
        :errorMessage="errorBag.email"
        @input="validateField('email')">
        ">
      </AppInput>
      <!-- Contact Input  -->
      <PhoneInput
        v-model="userInfo.contact"
        required
        label="Phone"
        :errorMessage="errorBag.contact"
        @input="validateField('contact')">
        ">
      </PhoneInput>
      <div class="flex justify-center mt-5">
        <button
          class="w-full px-12 py-3 mt-4 capitalize btn btn-primary sm:w-auto"
          type="submit">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>
