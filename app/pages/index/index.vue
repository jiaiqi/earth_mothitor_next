<script lang="ts" setup>
import NoticeBar from './components/NoticeBar.vue'
import MixNews from './components/MixNews.vue'
import EarthQuakeNews from './components/EarthQuakeNews.vue'
import ProfessionalWebsite from './components/ProfessionalWebsite.vue'
import ImageNavigation from './components/ImageNavigation.vue'
import WebsiteNavigation from './components/WebsiteNavigation.vue'
import Banner from '~/components/Banner.vue'
</script>

<template>
  <div class="min-h-screen-260">
    <Banner />
    <!-- <ClientOnly> -->
    <NoticeBar />
    <!-- </ClientOnly> -->
    <MixNews />
    <EarthQuakeNews />
    <ProfessionalWebsite />
    <ImageNavigation />
    <WebsiteNavigation />
  </div>
</template>
