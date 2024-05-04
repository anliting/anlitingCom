FROM alpine
RUN apk add --no-cache git npm
WORKDIR /app
COPY ./main/package.json .
RUN npm i
FROM alpine
RUN apk add --no-cache nodejs
WORKDIR /app
COPY --from=0 /app/node_modules node_modules
COPY . commit
CMD (cd work;node ../commit/main/main.mjs)
