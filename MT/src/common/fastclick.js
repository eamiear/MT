/**
 * Created by skz on 2017/11/6 16:24
 */

import FastClick from 'fastclick'

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}
