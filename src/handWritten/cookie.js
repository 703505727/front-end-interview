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

// 全面
const CookieUtil = {
  get(name) {
    if (!name || typeof name !== "string") {
      return null;
    }
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const [cookieName, cookieValue] = cookies[i].trim().split("=");
      if (cookieName === encodeURIComponent(name)) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  },

  set(name, value, expires, path, domain, secure) {
    if (
      !name ||
      typeof name !== "string" ||
      /^(?:expires|max\-age|path|domain|secure)$/i.test(name)
    ) {
      throw new TypeError("Invalid cookie name");
    }
    if (value && typeof value !== "string") {
      throw new TypeError("Invalid cookie value");
    }
    let cookieText = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    if (expires) {
      let expDate = expires;
      if (typeof expires === "number") {
        expDate = new Date();
        expDate.setTime(expDate.getTime() + expires * 1000); // Convert days to milliseconds
      }
      cookieText += `; expires=${expDate.toUTCString()}`;
    }
    if (path) {
      cookieText += `; path=${path}`;
    }
    if (domain) {
      cookieText += `; domain=${domain}`;
    }
    if (secure) {
      cookieText += `; secure`;
    }
    document.cookie = cookieText;
  },

  remove(name, path, domain) {
    if (!name || typeof name !== "string") {
      return;
    }
    this.set(name, "", -86400, path, domain); // Set cookie to expire in the past
  },
};

// 使用示例
try {
  // 设置 Cookie
  CookieUtil.set(
    "myCookie",
    "myValue",
    new Date("January 1, 2030"),
    "/",
    "example.com",
    true
  );

  // 获取 Cookie
  console.log(CookieUtil.get("myCookie")); // 输出 'myValue'

  // 删除 Cookie
  CookieUtil.remove("myCookie", "/", "example.com");
} catch (error) {
  console.error(error);
}
