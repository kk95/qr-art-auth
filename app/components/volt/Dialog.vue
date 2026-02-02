<template>
  <Dialog
    unstyled
    :pt="theme"
    :pt-options="{
      mergeProps: ptViewMerge,
    }"
  >
    <template #closebutton="{ closeCallback }">
      <SecondaryButton
        variant="text"
        rounded
        autofocus
        @click="closeCallback"
      >
        <template #icon>
          <TimesIcon />
        </template>
      </SecondaryButton>
    </template>
    <template #maximizebutton="{ maximized, maximizeCallback }">
      <SecondaryButton
        variant="text"
        rounded
        autofocus
        @click="maximizeCallback"
      >
        <template #icon>
          <WindowMinimizeIcon v-if="maximized" />
          <WindowMaximizeIcon v-else />
        </template>
      </SecondaryButton>
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
  </Dialog>
</template>

<script setup lang="ts">
import TimesIcon from '@primevue/icons/times'
import WindowMaximizeIcon from '@primevue/icons/windowmaximize'
import WindowMinimizeIcon from '@primevue/icons/windowminimize'
import Dialog, { type DialogPassThroughOptions, type DialogProps } from 'primevue/dialog'
import { ref } from 'vue'
import SecondaryButton from './SecondaryButton.vue'
import { ptViewMerge } from './utils'

interface Props extends /* @vue-ignore */ DialogProps {}
defineProps<Props>()

const theme = ref<DialogPassThroughOptions>({
  root: `max-h-[90%] max-w-screen rounded-[15px]
        border border-white/10 dark:border-white/10
        bg-input-bg dark:bg-input-bg
        text-white dark:text-white shadow-lg
        p-maximized:w-screen p-maximized:h-screen p-maximized:top-0 p-maximized:start-0 p-maximized:max-h-full p-maximized:rounded-none`,
  header: `flex items-center justify-between shrink-0 p-5`,
  title: `font-semibold text-xl`,
  headerActions: `flex items-center gap-2`,
  content: `overflow-y-auto pt-0 px-5 pb-5 p-maximized:grow`,
  footer: `shrink-0 pt-0 px-5 pb-5 flex justify-end gap-2`,
  mask: `p-modal:bg-[rgba(28,53,69,0.5)] p-modal:fixed p-modal:top-0 p-modal:start-0 p-modal:w-full p-modal:h-full`,
  transition: {
    enterFromClass: 'opacity-0 scale-75',
    enterActiveClass: 'transition-all duration-150 ease-[cubic-bezier(0,0,0.2,1)]',
    leaveActiveClass: 'transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)]',
    leaveToClass: 'opacity-0 scale-75',
  },
})
</script>
