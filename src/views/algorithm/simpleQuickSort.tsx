export default defineComponent({
  name: 'simpleQuickSort',
  setup() {
    const sourceValue = ref('5,3,8,34,12,76,55')
    const handleResult = ref('')

    const quickSort = (arr) => {
      console.log(arr)
      if (!arr || arr.length === 0) return []
      const compareValue = arr[0]
      let left = []
      let right = []
      for (let i = 1; i < arr.length; i++) {
        Number(compareValue) > Number(arr[i]) ? left.push(arr[i]) : right.push(arr[i])
      }
      left = quickSort(left)
      right = quickSort(right)
      left.push(compareValue)
      return left.concat(right)
    }

    const handleSort = () => {
      if (sourceValue.value === '') return
      handleResult.value = quickSort(sourceValue.value.split(',')).join(',')
    }

    return {
      sourceValue,
      handleResult,
      handleSort
    }
  },
  render() {
    return (
      <div>
        <h1>简单快速排序</h1>
        <div style="padding: 16px 0">
          <span>原数组</span>
          <el-input v-model={this.sourceValue}></el-input>
          <el-button onClick={this.handleSort}>开始排序</el-button>
        </div>
        <div>
          <span>排序后</span>
          <el-input v-model={this.handleResult}></el-input>
        </div>
      </div>
    )
  }
})
