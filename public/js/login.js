// 카카오 초기화
if (!Kakao.isInitialized()) {
  Kakao.init("");
}

function loginWithKakao() {
  Kakao.Auth.login({
    scope: "profile_nickname,profile_image,account_email",
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

      // 사용자의 카카오 계정 정보 가져오기
      var id = res.id;
      var profile_nickname = res.kakao_account.profile.nickname;

      // 가져온 정보 로컬 스토리지에 저장
      localStorage.setItem("nickname", profile_nickname);
      localStorage.setItem("id", id);

      // 콘솔에 확인 출력
      console.log("Nickname: ", profile_nickname);
      console.log("ID: ", id);
    },
    fail: function (error) {
      alert("카카오 로그인 실패: " + JSON.stringify(error));
    },
  });
}
