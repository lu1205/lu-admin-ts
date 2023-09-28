export const replaceNUll = (obj: any, str: any = '') => {
  for (const key in obj) {
    if (
      obj[key] === null ||
      obj[key] === 'null' ||
      obj[key] === undefined ||
      obj[key] === 'undefined'
    ) {
      obj[key] = str
    } else if (typeof obj[key] === 'object') {
      replaceNUll(obj[key])
    }
  }
  return obj
}
