<template>
  <a-table
    :columns="columns"
    :data-source="dataSource"
    bordered
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  >
    <template #bodyCell="{ text, column }">
      <template v-if="['name', 'age', 'address'].includes(column.dataIndex)">
        <div>
          {{ text }}
        </div>
      </template>
      <template v-else-if="column.dataIndex === 'operation'">
        <div>123</div>
      </template>
    </template>
  </a-table>
</template>
<script setup lang="ts">
const columns = [
  {
    title: 'name',
    dataIndex: 'name',
    width: '25%'
  },
  {
    title: 'age',
    dataIndex: 'age',
    width: '15%'
  },
  {
    title: 'address',
    dataIndex: 'address',
    width: '40%'
  },
  {
    title: 'operation',
    dataIndex: 'operation'
  }
]

const pagination = reactive({
  total: 100,
  current: 1,
  pageSize: 20
})

type dataItem = {
  key: string
  name: string
  age: number
  address: string
}
const data: Array<dataItem> = []
for (let i = 0; i < pagination.pageSize; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`
  })
}
const dataSource = ref<dataItem[]>(data)

const loading = ref<boolean>(false)
const handleTableChange = (pag: { current: number; pageSize: number }) => {
  loading.value = true
  console.log(pag)
  setTimeout(() => {
    dataSource.value = []
    for (let i = (pag.current - 1) * pag.pageSize; i < pag.current * pag.pageSize; i++) {
      dataSource.value.push({
        key: i.toString(),
        name: `Edrward ${i}`,
        age: 32,
        address: `London Park no. ${i}`
      })
    }
    pagination.current = pag.current
    pagination.pageSize = pag.pageSize
    loading.value = false
  }, 500)
}
</script>
