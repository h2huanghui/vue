const currentAuth = ["admin"];

export { currentAuth };

/* 获取当前用户权限 */
export function getCurrentAuthority() {
  return currentAuth;
}

/* 检查用户权限 ,参数authority是一个数组*/
export function check(authority) {
  const current = getCurrentAuthority();
  //用户权限在不在当前[]里面,在的话返回true,不在的话返回false
  return current.some(item => authority.includes(item));
}

/* 检查是否登录 */
export function isLogin() {
  const current = getCurrentAuthority();
  return current && current[0] !== "guest";
}