import { httpRequest } from '@/utils/request'

async function exportFile({ url, params, data, method, filename }: any) {
  const res: any = await httpRequest.request({
    url: url,
    method,
    params,
    data,
    responseType: 'blob'
  })
  const blob = new Blob([res], {
    type: 'application/octet-stream'
  })
  const fileName = filename
  const linkNode = document.createElement('a')

  linkNode.download = fileName
  linkNode.style.display = 'none'
  linkNode.href = URL.createObjectURL(blob)
  document.body.appendChild(linkNode)
  linkNode.click()

  URL.revokeObjectURL(linkNode.href)
  document.body.removeChild(linkNode)
}
export { exportFile }
