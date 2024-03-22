FROM node:20  AS installer

WORKDIR /api
COPY . .

RUN rm -rf node_modules
RUN npm install

FROM node:20-alpine
# RUN apk update && apk add --no-cache zsh
WORKDIR /api
COPY --from=installer /api ./
CMD [ "npm", "run", "start:dev" ]