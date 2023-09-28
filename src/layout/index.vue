<script setup>
import Header from '@/layout/header/index.vue'
import Tabs from '@/layout/tabs/index.vue'
import Main from '@/layout/main/index.vue'
import SideBar from '@/layout/sidebar/index.vue'
import Footer from '@/layout/footer/index.tsx'
</script>

<template>
  <div class="app-container">
    <SideBar />
    <div class="app-main">
      <div class="app-top">
        <Header />
        <Tabs />
      </div>
      <Main />
      <Footer />
    </div>
  </div>
</template>
