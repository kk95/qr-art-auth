<template>
  <InputMask
    v-bind="$attrs"
    unstyled
    :pt="theme"
    :pt-options="{
      mergeProps: ptViewMerge,
    }"
  />
</template>

<script setup lang="ts">
import InputMask, { type InputMaskPassThroughOptions, type InputMaskProps } from 'primevue/inputmask'
import { ref } from 'vue'
import { ptViewMerge } from './utils'

interface Props extends /* @vue-ignore */ InputMaskProps {}
defineProps<Props>()

const theme = ref<InputMaskPassThroughOptions>({
  root: `block w-full bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-green-primary sm:text-sm/6
        disabled:bg-white/5 disabled:text-gray-500 disabled:cursor-not-allowed
        p-invalid:outline-red-400 p-invalid:focus:outline-red-500
        transition-colors duration-200`,
})
</script>
