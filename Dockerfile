FROM node:alpine
RUN apk add --no-cache python3
WORKDIR /app
COPY package.json .
RUN npm install --production --silent
COPY . .
CMD npm run start
