<script setup lang="ts">
import './default.scss'

type ButtonProps = {
  text: string
  link?: string
  onClick?: () => void
  primaryHover?: boolean
}

const router = useRouter()

const { text, link, onClick, primaryHover } = defineProps<ButtonProps>()

const handleClick = () => {
  if (link) {
    router.push(link)
  }

  if (onClick) {
    onClick()
  }
}
</script>

<template>
  <button
    class="btn-default"
    :class="{ 'btn-default-primary-hover': primaryHover }"
    type="button"
    @click="handleClick"
  >
    <span>{{ text }}</span>
    
  </button>
</template>