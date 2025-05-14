#alpine: phiên bản rút gọn giúp tối ưu dung lượng
FROM node:20.18.0-alpine 

#Thiết lập đường dẫn 
WORKDIR /home/app

COPY package*.json ./

# 5p => 5 * 60 * 1000ms = 300000ms  
RUN npm install --timeout=300000

COPY . .

RUN npx prisma generate

CMD [ "npm", "run", "start"]
