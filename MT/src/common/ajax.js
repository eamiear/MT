/**
 * Created by skz on 2017/10/10 18:13
 */
/**
 * AJax 请求
 * 封装签名
 * Methods:
 *   1. request
 *   2. get
 *   3. post
 * params: 方法请求参数与 axios 请求参数基本相同，比 axios 多了一个 reqMethod 字段
 *   req = {
 *    url: '',
 *    method: 'get',
 *    params: {},
 *    reqMethod: 'account.session.gen'      // 请求方法
 *   }
 * 使用:
 * request(req)
 * get({params: {}, reqMethod: ''})
 * post({params: {}, reqMethod: ''})
 */

import { Helper } from '@/common/helper'
import { getAuthorityInfo, setAuthorityInfo, removeAuthorityInfo, getToken } from '@/common/auth'
import * as Const from '@/common/constants'
import fetch from '@/common/fetch'
// import { error } from '@/utils/dialog'
import md5 from 'blueimp-md5'

/*eslint-disable no-useless-call*/

function getAuthInfo () {
  return getAuthorityInfo() && JSON.parse(getAuthorityInfo())
}

function setAuthoInfo (authInfo) {
  setAuthorityInfo(JSON.stringify(authInfo))
}
// 获取会话
function getSession () {
  let authInfo = getAuthInfo()
  if (!authInfo) {
    return fetch({
      method: 'get',
      params: {method: Const.SESSION_REQUEST}
    }).then((response) => {
      let result = response.data
      if (result && result.code === 0) {
        authInfo = result.data
        authInfo.difference = authInfo.timestamp - Math.floor(Date.now() / 1000)
        setAuthoInfo(authInfo)
      }
    })
  }
}

// 获取签名
function getSign (method, params, interfaceVer = Const.INTERFACE_VERSION) {
  let paramsStr = JSON.stringify(Helper.deepSort(params))
  paramsStr = paramsStr.replace(/(\/)/g, '\\$1')
  let authInfo = getAuthInfo()
  const timestamp = Math.floor(Date.now() / 1000) + authInfo['difference']
  authInfo['timestamp'] = timestamp
  setAuthoInfo(authInfo)
  const sessionKey = authInfo['sessionKey']
  const sessionSecret = authInfo['sessionSecret']
  const mix = 'method=' + method + '&params=' + paramsStr + '&sessionKey=' + sessionKey + '&timestamp=' + timestamp + '&ver=' + interfaceVer + sessionSecret
  return md5(mix)
}

// 获取请求参数
function getReqParams (method, params, interfaceVer = Const.INTERFACE_VERSION) {
  const sign = getSign(method, params)
  const authInfo = getAuthInfo()
  return {
    method: method,
    ver: interfaceVer,
    timestamp: authInfo['timestamp'],
    sessionKey: authInfo['sessionKey'],
    sign: sign,
    params: params
  }
}

// ajax 请求
async function request (req) {
  const args = [].slice.call(arguments)
  let authInfo = getAuthInfo()
  if (!authInfo) {
    await getSession()
  }
  const reqParams = req.params
  const reqMethod = req.reqMethod
  let requestParams = Object.assign({accessToken: getToken()}, reqParams || {})
  req['params'] = getReqParams(reqMethod, requestParams)

  return new Promise((resolve, reject) => {
    fetch(req).then((response) => {
      resolve(response)
      const result = response.data
      const statusCode = result.code
      if (Const.INVALID_SESSION === statusCode || Const.INVALID_SIGN === statusCode || Const.SESSION_RENEW === statusCode) {
        removeAuthorityInfo()
        getSession().then(() => {
          request.apply(null, args)
        })
      }
    }).catch((response) => {
      // error('操作失败')
      console.log('服务出错\n\t error path: \n', location.href, response)
      reject(response)
    })
  })
}

// get 请求
function get (req) {
  return request(Object.assign(req, {method: 'get'}))
}

// post 请求
function post (req) {
  return request(Object.assign(req, {method: 'post'}))
}

export default {
  get,
  // fetch: get,
  post,
  request
}
