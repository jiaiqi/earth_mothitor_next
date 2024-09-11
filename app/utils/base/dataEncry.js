import Base64 from './base.js'

// 加密
export function encode(value) {
  const base = new Base64()
  const data = base.encode(JSON.stringify(value))
  return data
}
// 解密
export function decode(value) {
  const base = new Base64()
  const data = JSON.parse(base.decode(value))
  return data
}
