FROM node:lts-bookworm AS dependencies
WORKDIR /
COPY package.json .
RUN npm install

FROM node:lts-alpine3.20 AS deploy
WORKDIR /
COPY --from=dependencies ./node_modules ./node_modules
COPY . .
EXPOSE 8080
CMD [ "node", "app.js" ]