import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRES, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_EXPIRES, REFRESH_TOKEN_SECRET } from "../common/constant/app.constant";

const tokenService = {
    createTokens: (userId) =>{
        const accessToken = jwt.sign({userId: userId}, ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRES});
        const refreshToken = jwt.sign({userId: userId}, REFRESH_TOKEN_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRES})
        // const OTP ="1234";
        // const timeOut = '60s';
        // const otpToken = jwt.sign({userId: userId}, OTP, {expiresIn: timeOut});
        // otp: lưu vào database
        // OTP: quăng vào email cho người dùng

        // BƯỚC XÁC THỰC
        // OTP:  nhận từ người dùng lấy ở email và gửi cho BE
        // otpToken: lấy trong database
        // const isOTP = jwt.verify(otpToken, OTP); 

        return {accessToken, refreshToken};
    }
}


export default tokenService;