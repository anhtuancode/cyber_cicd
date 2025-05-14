import 'dotenv/config.js'

export const DATABASE_URL = process.env.DATABASE_URL;
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const ACCESS_TOKEN_EXPIRES = process.env.ACCESS_TOKEN_EXPIRES;

export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
export const REFRESH_TOKEN_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES;

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export const CLOUD_NAME="dgzknzxns";
export const CLOUD_API_KEY="463119663572871";
export const CLOUD_API_SECRET="IGNODJ10Wuh1IYgCv_Q28nXMuCY";



console.log({
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
});
