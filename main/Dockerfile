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
ENV httpListenPort=80
ENV httpListenHostname=0.0.0.0
ENV wsListenPort=81
ENV wsListenHostname=0.0.0.0
CMD (cd work;node ../commit/main/main.mjs)
