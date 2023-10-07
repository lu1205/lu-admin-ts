<template>
  <template v-for="item in menuList" :key="item.id">
    <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.id + ''">
      <template #title>
        <el-icon>
          <component :is="getIcon(item.meta.icon)"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <sideItem :routes="item.children" />
    </el-sub-menu>
    <el-menu-item v-else :index="item.path + ''">
      <template #title>
        <el-icon>
          <component :is="getIcon(item.meta.icon)"></component>
        </el-icon>
        <!--        <div :style="{ height: '100%', marginLeft: item.parentId ? '10px' : '' }">-->
        <span>{{ item.meta.title }}</span>
        <!--        </div>-->
      </template>
    </el-menu-item>
  </template>
</template>

<script setup>
import { Setting, Reading, Document, DocumentChecked, House, Grid } from '@element-plus/icons-vue'
import { ref } from 'vue'
const icons = {
  Setting,
  Reading,
  Document,
  DocumentChecked,
  House,
  Grid
}
const getIcon = (name) => {
  return icons[name]
}
const props = defineProps(['routes'])
let menuList = ref(props.routes ?? [])
</script>
