<template>
  <Select
    unstyled
    :pt="theme"
    :pt-options="{
      mergeProps: ptViewMerge,
    }"
  >
    <template #dropdownicon>
      <Icon
        name="heroicons:chevron-down"
        class="w-4 h-4"
      />
    </template>
    <template #loadingicon>
      <Icon
        name="heroicons:arrow-path"
        class="w-4 h-4 animate-spin"
      />
    </template>
    <template #filtericon>
      <Icon
        name="heroicons:magnifying-glass"
        class="w-4 h-4 text-surface-400"
      />
    </template>
    <template #clearicon="{ clearCallback }">
      <Icon
        name="heroicons:x-mark"
        class="w-4 h-4 text-surface-400 absolute top-1/2 -mt-2 end-10"
        @click="clearCallback"
      />
    </template>
    <template
      v-for="(_, slotName) in $slots"
      #[slotName]="slotProps"
    >
      <slot
        :name="slotName"
        v-bind="slotProps ?? {}"
      />
    </template>
  </Select>
</template>

<script setup lang="ts">
import Select, { type SelectPassThroughOptions, type SelectProps } from 'primevue/select'
import { ptViewMerge } from './utils'

interface Props extends /* @vue-ignore */ SelectProps {}
defineProps<Props>()

const theme = ref<SelectPassThroughOptions>({
  root: `inline-flex cursor-pointer relative select-none rounded-md p-fluid:flex
        bg-white/5 dark:bg-white/5
        border border-white/10 hover:border-white/20 dark:border-white/10 dark:hover:border-white/20
        p-focus:border-primary
        p-filled:bg-white/5 dark:p-filled:bg-white/5
        p-invalid:border-red-500/50 dark:p-invalid:border-red-500/50
        p-disabled:bg-surface-200 p-disabled:text-surface-500 dark:p-disabled:bg-surface-700 dark:p-disabled:text-surface-400 p-disabled:pointer-events-none
        shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]
        transition-colors duration-200`,
  label: `block whitespace-nowrap overflow-hidden flex-auto w-[1%]
        py-2 px-3 overflow-ellipsis
        p-clearable:pe-7 p-empty:overflow-hidden p-empty:opacity-0 p-editable:cursor-default
        text-white dark:text-white bg-transparent border-none outline-none
        p-placeholder:text-gray-500 dark:p-placeholder:text-gray-500
        p-disabled:text-surface-500 dark:p-disabled:text-surface-400
        p-small:text-sm p-small:px-[0.625rem] p-small:py-[0.375rem]
        p-large:text-lg p-large:px-[0.875rem] p-large:py-[0.625rem]`,
  dropdown: `flex items-center justify-center shrink-0 bg-transparent
        text-gray-400 w-10 rounded-e-md`,
  overlay: `absolute top-0 left-0 rounded-md p-portal-self:min-w-full
        bg-gray-800 dark:bg-gray-800
        border border-white/10 dark:border-white/10
        text-white dark:text-white
        shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)]`,
  header: `pt-2 pb-1 px-4`,
  pcFilterContainer: {
    root: `relative`,
  },
  pcFilter: {
    root: `w-full appearance-none rounded-md outline-hidden
            bg-white/5 dark:bg-white/5
            text-white dark:text-white
            placeholder:text-gray-500 dark:placeholder:text-gray-500
            border border-white/10 dark:border-white/10
            enabled:hover:border-white/20 dark:enabled:hover:border-white/20
            enabled:focus:border-primary
            disabled:bg-surface-200 disabled:text-surface-500
            dark:disabled:bg-surface-700 dark:disabled:text-surface-400
            ps-3 pe-10 py-2 p-fluid:w-full
            transition-colors duration-200 shadow-[0_1px_2px_0_rgba(18,18,23,0.05)]`,
  },
  pcFilterIconContainer: {
    root: `absolute top-1/2 -mt-2 leading-none end-3 z-1`,
  },
  listContainer: `overflow-auto`,
  list: `m-0 p-1 list-none gap-[2px] flex flex-col`,
  optionGroup: `m-0 px-3 py-2 bg-transparent text-gray-400 dark:text-gray-400 font-semibold`,
  optionGroupLabel: ``,
  option: `cursor-pointer font-normal whitespace-nowrap relative overflow-hidden flex items-center
        px-3 py-2 border-none text-white dark:text-white bg-transparent rounded-sm
        p-focus:bg-primary-500 dark:p-focus:bg-primary-500 p-focus:text-white dark:p-focus:text-white
        p-selected:bg-highlight p-focus:p-selected:bg-highlight-emphasis
        transition-colors duration-200`,
  optionLabel: ``,
  optionCheckIcon: `relative -ms-[0.375rem] me-[0.375rem] text-white dark:text-white`,
  optionBlankIcon: ``,
  emptyMessage: `px-3 py-2`,
  virtualScroller: ``,
  transition: {
    enterFromClass: 'opacity-0 scale-y-75',
    enterActiveClass: 'transition duration-120 ease-[cubic-bezier(0,0,0.2,1)]',
    leaveActiveClass: 'transition-opacity duration-100 ease-linear',
    leaveToClass: 'opacity-0',
  },
})
</script>
