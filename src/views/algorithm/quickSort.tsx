export default defineComponent({
  name: 'quickSort',
  setup() {
    const sourceValue = ref('1,5,3,8,34,12,76,55')
    const handleResult = ref('')

    const swap = (arr, index1, index2) => {
      const temp = arr[index1]
      arr[index1] = arr[index2]
      arr[index2] = temp
    }

    const sortImp = (arr, begin, end) => {
      // 1、判断开始是否小于结尾
      // 2、定义基准值，用于分割数组
      // 3、去左侧值与基准值比较，如果小于基准值，比较下一个，直到大于基准值，然后取右侧值与基准值进行比较，找到右侧小于基准值的数据，
      if (begin >= end - 1) return
      let left = begin
      let right = end
      // 定义基准值
      let temp = arr[begin]
      while (left < right) {
        while (left < right && Number(arr[left]) <= Number(temp)) {
          left++
        }
        while (right > left && Number(arr[right]) >= Number(temp)) {
          right--
        }
        if (left < right) {
          swap(arr, left, right)
        }
      }
      // do {
      //   do {
      //     left++
      //   } while (left < right && Number(arr[left]) <= Number(temp))
      //   do {
      //     right--
      //   } while (right > left && Number(arr[right]) >= Number(temp))
      //   if (left < right) {
      //     swap(arr, left, right)
      //   }
      // } while (left < right)
      let point = left === right ? right - 1 : right
      swap(arr, begin, point)
      sortImp(arr, begin, point)
      sortImp(arr, point + 1, end)
      return arr
    }

    const quickSort = (arr) => {
      console.log(arr)
      return sortImp(arr, 0, arr.length)
    }

    const handleSort = () => {
      if (sourceValue.value === '') return
      handleResult.value = quickSort(sourceValue.value.split(',')).join(',')
    }

    return () => (
      <div>
        <h1>标准快速排序</h1>
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
