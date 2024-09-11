import { encode } from './base/dataEncry'

const TokenKey = encode('Admin-Token')

const ExpiresInKey = encode('Admin-Expires-In')

const UserKey = encode('Admin-User')

const RefreshTokenKey = encode('Admin-Refresh-Token')

export function getToken() {
  // return Cookies.get(TokenKey)
  return localStorage.getItem(TokenKey)
}
export function getUser() {
  // return Cookies.get(UserKey)
  return localStorage.getItem(UserKey)
}
// 把token存到本地
export function setToken(token) {
  // let expires = new Date(new Date() * 1 + time * 1000) , { expires: expires }
  // return Cookies.set(TokenKey, token)
  return localStorage.setItem(TokenKey, token)
}
export function setUser(user) {
  // let expires = new Date(new Date() * 1 + time * 1000) , time , { expires: expires }
  // return Cookies.set(UserKey, user)
  return localStorage.setItem(UserKey, user)
}
export function removeToken() {
  // return Cookies.remove(TokenKey)
  localStorage.removeItem('Flag')
  return localStorage.removeItem(TokenKey)
}
export function removeUser() {
  // return Cookies.remove(UserKey)
  return localStorage.removeItem(UserKey)
}

export function getExpiresIn() {
  // return Cookies.get(ExpiresInKey) || -1
  return localStorage.getItem(ExpiresInKey) || -1
}
// 把token的有效期存到本地
export function setExpiresIn(time) {
  // return Cookies.set(ExpiresInKey, time)
  return localStorage.setItem(ExpiresInKey, time) || -1
}

export function removeExpiresIn() {
  // return Cookies.remove(ExpiresInKey)
  return localStorage.removeItem(ExpiresInKey)
}

export function getRefreshToken() {
  // return Cookies.get(RefreshTokenKey) || ``
  return localStorage.getItem(RefreshTokenKey) || ``
}

export function setRefreshToken(token) {
  // return Cookies.set(RefreshTokenKey, token)
  return localStorage.setItem(RefreshTokenKey, token)
}

export function removeRefreshToken() {
  // return Cookies.remove(RefreshTokenKey)
  return localStorage.removeItem(RefreshTokenKey)
}
