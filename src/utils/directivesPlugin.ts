// 批量注册自定义指令
// directivesKey as keyof typeof directives 表示指定确切的类型，否则在 TS 中会报错
// (因为 directivesKey 可能为任意类型，而当 directives 的属性不包含 directivesKey 是就会报错)

export default {
  install: (app: any, directives: any) => {
    for (const directivesKey in directives) {
      app.directive(directivesKey, directives[directivesKey as keyof typeof directives])
    }
  }
}
