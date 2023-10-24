export default defineComponent({
  name: 'selectSort',
  setup() {
    const sourceValue = ref('5,3,8,34,12,76,55')
    const handleResult = ref('')

    const compare = (val1, val2) => {
      return Number(val1) > Number(val2)
    }

    const exChange = (arr, index1, index2) => {
      const temp = arr[index1]
      arr[index1] = arr[index2]
      arr[index2] = temp
    }

    const selectSort = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        let maxIndex = 0
        for (let j = 0; j < arr.length - i; j++) {
          if (!compare(arr[maxIndex], arr[j])) {
            maxIndex = j
          }
        }
        exChange(arr, maxIndex, arr.length - 1 - i)
      }

      return arr
    }

    const handleSort = () => {
      if (sourceValue.value === '') return
      handleResult.value = selectSort(sourceValue.value.split(',')).join(',')
    }

    return () => (
      <div>
        <h1>选择排序</h1>
        <div style="padding: 16px 0">
          <span>原数组</span>
          <el-input v-model={sourceValue.value}></el-input>
          <el-button onClick={handleSort}>开始排序</el-button>
        </div>
        <div>
          <span>排序后</span>
          <el-input v-model={handleResult.value}></el-input>
        </div>
      </div>
    )
  }
})
