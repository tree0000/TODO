function openLoginPopup() {
  window.open("newlogin.html", "loginPopup", "width=400,height=500");
}
function redirectWithUsername() {
  const username = document.getElementById("username").value;
  window.location.href = `../html/main.html?username=${encodeURIComponent(
    username
  )}`;
  return false; // 폼이 실제로 제출되지 않도록 막음
}
