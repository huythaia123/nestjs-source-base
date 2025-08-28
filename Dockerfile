# Sử dụng Node.js chính thức (phiên bản 22)
FROM node:22-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -g @nestjs/cli

RUN npm i

COPY . .

RUN npm run build

# Giai đoạn chạy (chỉ cần code đã build + node_modules production)
# FROM node:22-alpine AS production

# WORKDIR /usr/src/app

# COPY package*.json ./

# RUN npm i --omit=dev

# COPY --from=base /usr/src/app/dist ./dist
# COPY .env .

# EXPOSE 8000

CMD [ "npm", "run", "start:prod" ]