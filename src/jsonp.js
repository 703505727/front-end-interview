// jsonp 解决跨越请求问题

const newScript = document.createElement("script");
newScript.src = "https://www.abc.com?callback=fn";
document.body.appendChild(newScript);
function fn(data) {
  console.log(data);
}
