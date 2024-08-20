//네이버 연동
import nodemailer from "nodemailer";

export const smtpTransport = nodemailer.createTransport({
    pool: true,
    maxConnections: 1,
    service: "naver",
    host: "smtp.naver.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: "foopx@naver.com",  // Replace with your email
        pass: "qwer1234"          // Replace with your password
    },
    tls: {
        rejectUnauthorized: false
    }
});
//코드 자동 생성
var generateRandomNumber = function(min, max) {
    var randNum = Math.floor(Math.random() * (max - min + 1)) + min;

    return randNum;
}


//이메일 발송 
export const emailAuth = async(req,res) => {
    const number = generateRandomNumber(111111, 999999)

    const { email } = req.body; //사용자가 입력한 이메일

    const mailOptions = {
        from : "bik1111@naver.com ", // 발신자 이메일 주소.
        to : email, //사용자가 입력한 이메일 -> 목적지 주소 이메일
        subject : " 인증 관련 메일 입니다. ",
        html : '<h1>인증번호를 입력해주세요 \n\n\n\n\n\n</h1>' + number
    }
    smtpTransport.sendMail(mailOptions, (err, response) => {
        console.log("response", response);
        //첫번째 인자는 위에서 설정한 mailOption을 넣어주고 두번째 인자로는 콜백함수.
        if(err) {
            res.json({ok : false , msg : ' 메일 전송에 실패하였습니다. '})
            smtpTransport.close() //전송종료
            return
        } else {
            res.json({ok: true, msg: ' 메일 전송에 성공하였습니다. ', authNum : number})
            smtpTransport.close() //전송종료
            return 

        }
    })
}
