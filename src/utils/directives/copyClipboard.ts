import type { DirectiveBinding, ObjectDirective } from 'vue'

const copyClipboardHandle = (text: string) => {
  // clipboardData 在页面上将需要的东西复制到剪贴板上
  // const clipboardData = window.clipboardData
  // if (clipboardData) {
  //   clipboardData.clearData()
  //   clipboardData.setData('Text', text)
  // } else if (document.execCommand) {
  // 注意 document.execCommand 已弃用 但是有些浏览器依旧支持 用的时候记得看兼容情况
  // 通过创建 dom 元素，去把要复制的内容拿到
  const el = document.createElement('textarea')
  el.value = text
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  el.select()
  // 拷贝当前内容到剪贴板
  document.execCommand('copy')
  // 删除 el 节点
  document.body.removeChild(el)
  // }
}
const CopyClipboard: ObjectDirective = {
  mounted(el: HTMLElement, binding: DirectiveBinding<any>) {
    console.log(binding.value)
    el.addEventListener('click', () => copyClipboardHandle(binding.value))
  },
  unmounted(el: HTMLElement, binding: DirectiveBinding<any>) {
    el.removeEventListener('click', () => copyClipboardHandle(binding.value))
  }
}

export default CopyClipboard
