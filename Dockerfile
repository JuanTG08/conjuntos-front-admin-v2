FROM node:18.18.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .

RUN npm install

ENV TWILIO_ACCOUNT_SID="AC9a8495b5218950247a2720170394ace2" \
    TWILIO_AUTH_TOKEN="5ee92d0408d990428699771997242957"

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]