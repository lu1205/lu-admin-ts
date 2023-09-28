<template>
  <div>
    <div>
      <input v-focus />
    </div>
    <div class="drag-ele">
      <div v-draggable style="background-color: pink">这是拖拽元素，整个视图中移动</div>
    </div>
    <div class="target-ele" id="targetEle">
      <div v-draggable:targetEle style="background-color: pink">这是拖拽元素，仅在父元素中移动</div>
    </div>
    <div>
      <el-button type="primary" @click="showDialog = true"> 显示Dialog </el-button>
      <el-button type="primary" @click="getUserData"> 获取信息 </el-button>
      <div v-draggable v-if="showDialog">
        <el-dialog v-model="showDialog" title="Warning" width="30%" align-center>
          <template #header>
            <span> header </span>
          </template>
          <span>Open the dialog from the center from the screen</span>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="showDialog = false">Cancel</el-button>
              <el-button type="primary" @click="showDialog = false"> Confirm </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getUserInfoById } from '@/api'
import { useUserStore } from '@/stores/user'
const { userInfoStore } = useUserStore()

const showDialog = ref(false)
const getUserData = async () => {
  const res = getUserInfoById({ id: userInfoStore.id })
  console.log(res)
}
</script>

<style scoped lang="scss">
.drag-ele {
  height: 80px;
  background-color: #87ceebff;
}

.target-ele {
  width: 600px;
  height: 600px;
  background-color: #f6f6f6;
}
</style>
