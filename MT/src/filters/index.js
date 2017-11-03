import { Helper } from '@/common/helper'

export function upperCase (str) {
  return str && str.toUpperCase()
}

export function dateFormat (datetime) {
  return Helper.parseTime(datetime)
}
