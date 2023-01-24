FROM node:14-slim as production

WORKDIR /usr/src/app

COPY . .
RUN npm i --only=prod
RUN npm run build

CMD ["node", "dist/main"]