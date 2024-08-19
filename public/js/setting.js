if (!Kakao.isInitialized()) {
  Kakao.init("8ff4d517e937032a85d65c38f3c6e3ad"); // 실제 앱 키로 대체하세요.
}
function loginWithKakao() {
  // 이미 로그인된 상태인지 확인
  if (Kakao.Auth.getAccessToken()) {
    console.log("이미 로그인된 상태입니다.");
    // 로그아웃 처리 후 다시 로그인 시도
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
    // 로그인되지 않은 상태라면 바로 로그인 시도
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
    "Login.html", // 새 창으로 띄울 페이지의 경로
    "joinWindow", // 창의 이름
    "width=400,height=500,left=100,top=100" // 창의 크기와 위치
  );
}

function openLoginPopup() {
  window.open("newlogin.html", "loginPopup", "width=400,height=500");
}
//닉네임
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");
  if (username) {
    document.getElementById("nickname").textContent = username;
  }
});
