<script setup>
import { useServerSeoMeta, computed, ref, definePageMeta, onMounted, onBeforeUnmount, useDebounceFn, watch } from "#imports";

definePageMeta({
  title: 'Home',
  description: 'This is the home page',
  breadcrumbTitle: 'Home'
})

useServerSeoMeta({
  title: 'Home & //<"With Encoding">\\\\',
  ogTitle: 'Home & //<"With Encoding">\\\\',
})

const host = computed(() => typeof window !== 'undefined' ? window.location.href : '/')

const color = ref('bg-green-500')
const title = ref('Fully dynamic')

const time = ref('')

function setTime() {
  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()
  // use am pm
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const hours12 = hours % 12 || 12
  time.value = `${hours12}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} ${ampm}`
}

setTime()

let interval = null
onMounted(() => {
  interval = setInterval(() => {
    setTime()
  }, 15000)
})

onBeforeUnmount(() => {
  clearInterval(interval)
})

const tailwindUrl = ref(`/__og-image__/image/satori/tailwind/og.png?title=${encodeURIComponent(title.value)}&bgColor=${color.value.replace('#', '')}`)

const setTailwindUrl = useDebounceFn(() => {
  // do something
  tailwindUrl.value = `/__og-image__/image/satori/tailwind/og.png?title=${encodeURIComponent(title.value)}&bgColor=${color.value.replace('#', '')}`
}, 500)


watch([color, title], () => {
  // do debounce
  setTailwindUrl()
})
</script>
<template>
<div class="px-7 my-5">
  <OgImage description="My description of the home page." theme-color="#b5ffd6" />
  <div class="mb-10 xl:grid grid-cols-3 gap-10 justify-center max-w-7xl mx-auto">
    <div>
      <h2 class="text-2xl mb-10 ">Prerendered at build time.</h2>
      <h3 class="text-lg font-bold mb-3">Browser Screenshot</h3>
      <div class="lg:grid grid-cols-1 gap-5">
        <div>
          <NuxtLink external no-prefetch to="/__og-image__/image/browser/delayed/og.png" target="_blank">
            <div class="mb-2">Delayed Screenshot</div>
            <img :src="`/__og-image__/image/browser/delayed/og.png`" width="400" height="210" class="rounded" />
          </NuxtLink>
        </div>
        <div>
          <NuxtLink external no-prefetch to="/__og-image__/image/browser/component/og.png" target="_blank">
            <div class="mb-2">Vue Component</div>
            <img :src="`/__og-image__/image/browser/component/og.png`" width="400" height="210" class="rounded" />
          </NuxtLink>
        </div>
      </div>
      <hr class="my-10">
      <h2 class="text-lg font-bold mb-3">Satori</h2>
      <div class="lg:grid grid-cols-1 gap-5">
        <NuxtLink external no-prefetch to="/__og-image__/image/satori/static/og.png" target="_blank">
          <div class="mb-2">Default template</div>
          <img :src="`/__og-image__/image/satori/static/og.png`" width="400" height="210" class="rounded" />
        </NuxtLink>
        <NuxtLink external no-prefetch to="/__og-image__/image/satori/with-options/og.png" target="_blank">
          <div class="mb-2">Default with options</div>
          <img :src="`/__og-image__/image/satori/with-options/og.png`" width="400" height="210" class="rounded" />
        </NuxtLink>
        <NuxtLink external no-prefetch to="/__og-image__/image/satori/image/og.png" target="_blank">
          <div class="mb-2">Image</div>
          <img :src="`/__og-image__/image/satori/image/og.png`" width="400" height="210" class="rounded" />
        </NuxtLink>
        <NuxtLink external no-prefetch to="/__og-image__/image/satori/custom-font/og.png" target="_blank">
          <div class="mb-2">Custom Font</div>
          <img :src="`/__og-image__/image/satori/custom-font/og.png`" width="400" height="210" class="rounded" />
        </NuxtLink>
      </div>
    </div>
    <div class="col-span-2">
      <h2 class="text-2xl mb-5 ">Generated at runtime.</h2>
      <p class="italic opacity-70 text-xs mb-10">Note: These may break as I'm on the free Vercel tier</p>
      <h3 class="text-lg font-bold mb-3">Satori</h3>
      <div class="lg:grid grid-cols-1 gap-5">
        <NuxtLink external no-prefetch to="/__og-image__/image/satori/time/og.png" target="_blank">
          <div class="mb-2">Current time <span class="text-xs opacity-70">updates every 15 seconds</span></div>
          <img :src="`/__og-image__/image/satori/time/og.png?description=Generated+at+runtime&title=The+time+is+${time}`" width="800" height="420" class="rounded" />
        </NuxtLink>
        <div>
          <div class="mb-2">Tailwind - Custom Props Example</div>
          <div>
            <label>Background Colour
              <input type="text" v-model="color" class="border-1 border-gray-200 px-2 py-1 mb-1">
            </label>
          </div>
          <div>
            <label>Title
              <input type="text" v-model="title" class="border-1 border-gray-200 px-2 py-1 mb-1">
            </label>
          </div>
          <NuxtLink external no-prefetch to="/__og-image__/image/satori/tailwind/og.png" target="_blank">
            <img :src="tailwindUrl" width="800" height="420" class="rounded" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
