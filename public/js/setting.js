if (!Kakao.isInitialized()) {
  Kakao.init(""); // 실제 앱 키로 대체하세요.
}
function loginWithKakao() {

  if (Kakao.Auth.getAccessToken()) {
    console.log("이미 로그인된 상태입니다.");

    Kakao.Auth.logout(function () {
      Kakao.Auth.login({
        scope: "profile_nickname,profile_image",
        success: function (authObj) {
          console.log(authObj);
          Kakao.Auth.setAccessToken(authObj.access_token);
          getInfo();
        },
        fail: function (err) {
          console.error(err);
        },
      });
    });
  } else {
    Kakao.Auth.login({
      scope: "profile_nickname,profile_image",
      success: function (authObj) {
        console.log(authObj);
        Kakao.Auth.setAccessToken(authObj.access_token);
        getInfo();
      },
      fail: function (err) {
        console.error(err);
      },
    });
  }
}

function getInfo() {
  Kakao.API.request({
    url: "/v2/user/me",
    success: function (res) {
      console.log(res);
    },
    fail: function (error) {
      console.error(error);
    },
  });
}

//회원가입 창
function openJoinWindow() {
  window.open(
    "Login.html", 
    "joinWindow", 
    "width=400,height=500,left=100,top=100" 
  );
}
function openLoginPopup() {
  window.open("newlogin.html", "loginPopup", "width=400,height=500");
}

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");
  if (username) {
    document.getElementById("nickname").textContent = username;
  }
});
