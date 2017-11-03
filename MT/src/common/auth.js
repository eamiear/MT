import Cookies from 'js-cookie'
import { AUTHORITY_KEY, USER_TOKEN_KEY, USER_ID_KEY } from '@/common/constants'

export function getToken () {
  return Cookies.get(USER_TOKEN_KEY)
}

export function setToken (token) {
  return Cookies.set(USER_TOKEN_KEY, token)
}

export function removeToken () {
  return Cookies.remove(USER_TOKEN_KEY)
}

export function getUID () {
  return Cookies.get(USER_ID_KEY)
}

export function setUID (uid) {
  return Cookies.set(USER_ID_KEY, uid)
}

export function removeUID () {
  return Cookies.remove(USER_ID_KEY)
}

export function getAuthorityInfo () {
  return Cookies.get(AUTHORITY_KEY)
}

export function setAuthorityInfo (authInfo) {
  return Cookies.set(AUTHORITY_KEY, authInfo)
}

export function removeAuthorityInfo () {
  return Cookies.remove(AUTHORITY_KEY)
}
