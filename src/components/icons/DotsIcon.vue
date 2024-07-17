<script>
export default {
  name: 'DotsIcon',
  props: {
    width: {
      type: [Number, String],
      default: 24
    },
    height: {
      type: [Number, String],
      default: 24
    },
    color: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>

<template>
  <svg :width="width" :height="height" :fill="color" class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-m9simb"
    focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="MoreHorizIcon">
    <path
      d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2">
    </path>
  </svg>
</template>