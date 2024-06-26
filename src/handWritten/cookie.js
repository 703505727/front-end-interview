// 设置 Cookie
document.cookie =
  "username=john; expires=Thu, 18 Dec 2043 12:00:00 GMT; path=/";

// 读取 Cookie
function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    if (cookie.startsWith(name + "=")) {
      return cookie.slice(name.length + 1);
    }
  }
  return "";
}
const username = getCookie("username");
console.log("username", username);

// 删除 Cookie
// 最常用的方法就是给`cookie`设置一个过期的事件，这样`cookie`过期后会被浏览器删除
function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
}
deleteCookie("username");
const username2 = getCookie("username");
console.log("username", username2);

