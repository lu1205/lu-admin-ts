export default defineComponent({
  name: 'bubblingSort',
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

    const bubblingSort = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
          if (compare(arr[j], arr[j + 1])) {
            exChange(arr, j, j + 1)
          }
        }
      }
      return arr
    }

    const handleSort = () => {
      if (sourceValue.value === '') return
      handleResult.value = bubblingSort(sourceValue.value.split(',')).join(',')
    }

    return () => (
      <div>
        <h1>冒泡排序</h1>
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
