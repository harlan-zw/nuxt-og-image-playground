<script setup lang="ts">
definePageMeta({
  title: 'Dynamic Banner',
  description: 'My description',
  image: 'https://example.com/image.jpg',
})

defineOgImageComponent('Tailwind', {
  title: 'The time is: ' + Date.now(),
  description: 'This is a description of the page. It can be a bit longer than the title.',
  icon: 'carbon:alarm',
  cacheMaxAgeSeconds: 15,
})
</script>
<template>
  <div>
    <div>
      Dynamic Banner page
    </div>
  </div>
</template>
