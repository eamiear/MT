import request from '@/common/ajax'

export function getQiNiuToken () {
  return request.get({
    reqMethod: 'common.upload.getUpToken',
    params: {}
  })
}
