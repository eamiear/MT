/**
 * Created by skz on 2017/10/10 17:48
 * Constants
 */
// =======================================================================
// ---------------------------- 常量 -------------------------------------
// =======================================================================

// system constants
export const AUTHORITY_KEY = 'account_session_authinfo'

export const INTERFACE_VERSION = '1.0'

export const USER_TOKEN_KEY = 'utopa_token_key'

export const USER_ID_KEY = 'utopa_uid_key'

export const SESSION_REQUEST = 'account.session.gen'

// third part constants
// TODO should be config in the server system
export const QINIU_IMAGE_REQUEST_BASEURL = 'http://ox2m2b48s.bkt.clouddn.com/'

export const QINIU_UPLOAD_URL = 'http://upload-z2.qiniu.com'

// =======================================================================
// ------------------------- Status Code About ---------------------------
// =======================================================================
// request status code
export const REQUEST_SUCCESS = 0                  // 请求成功
export const REQUEST_FAIL = 1                     // 请求失败

// APP
export const SESSION_EXPIRE = 99950001           // 会话过期
export const SESSION_RENEW = 99950002            // 会话续约
export const INVALID_SESSION = 99950003          // 无效会话
export const INVALID_SIGN = 99950004             // 签名失败

export const NOT_LOGIN_USER = 99950005           // 未登录用户
export const TOKEN_EXPIRE = 99950006             // 令牌过期
export const TOKEN_RENEW = 99950007              // 令牌续约

// Common Exception Code
export const CREATE_SERVICE_FAIL = 99990003       // 创建业务异常新新实例失败
export const SERVER_CRASH = 99990019              // 系统不舒服
export const SERVICE_NOT_EXIST = 99990021         // 调用服务不存在
export const SERVICE_TYPE_ERROR = 99990022        // 服务类型错误

export const USER_EXIST = 10010010                 // 用户已存在
export const UNREGISTER_OR_DISABLE_ACCOUNT = 10010009  // 尚未注册或已禁用
export const BANNED_USER = 10010014                // 用户已被禁用

export const HAS_SUBMENU = 220100001               // 有下级菜单

export const EXCEPTION_STATUS_DESC_MAP = {
  '99990003': '创建业务异常新新实例失败',
  '99990019': '系统不舒服，请稍后再试',
  '99990021': '调用服务不存在',
  '99990022': '服务类型错误',
  '99950005': '用户未登录',
  '10010010': '用户已存在',
  '10010009': '尚未注册或已禁用',
  '10010014': '用户已被禁用',
  '220100001': '有下级菜单，不能删除!',
  '22010004': '用户名或密码错误'
}

