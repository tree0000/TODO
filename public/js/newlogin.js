function openLoginPopup() {
  window.open("newlogin.html", "loginPopup", "width=400,height=500");
}
// 카카오 초기화
if (!Kakao.isInitialized()) {
  Kakao.init("");
}
function loginWithKakao() {
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

function getInfo() {
  Kakao.API.request({
    url: "/v2/user/me",
    success: function (res) {
      console.log(res);
      var id = res.id;
      var profile_nickname = res.kakao_account.profile.nickname;
      localStorage.setItem("nickname", profile_nickname);
      localStorage.setItem("id", id);
      console.log(profile_nickname);
      console.log(id);
    },
    fail: function (error) {
      alert("카카오 로그인 실패" + JSON.stringify(error));
    },
  });
}

const HOST = `https://kauth.kakao.com`;

// 카카오 끝
