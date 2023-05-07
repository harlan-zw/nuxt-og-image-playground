<template>
<h1>check og image</h1>
</template>

<script setup lang="ts">
const title = 'Bumbleboss';
const image = 'https://bumbleboss.xyz/media/seo/work.png';
const accent = '#012354';

useSeoMeta({
  title: title,
});

defineOgImageStatic({
  image: image,
  accent: accent,
});
</script>
