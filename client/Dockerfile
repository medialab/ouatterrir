FROM node:13.13.0-alpine3.10 AS builder

WORKDIR /frontend

ADD . /frontend/

RUN apk add --update --virtual --no-cache python build-base \
    && npm ci --production false \
    && PUBLIC_URL="/" npm run build \
    && rm -rf ./node_modules /root/.npm /root/.node-gyp /root/.config /usr/lib/node_modules \
    && apk del python build-base 

FROM nginx:alpine

COPY --from=builder --chown=nginx:nginx /frontend/build /client

WORKDIR /client

RUN rm /etc/nginx/conf.d/default.conf

COPY --from=builder --chown=nginx:nginx /frontend/docker-nginx.conf /etc/nginx/conf.d/ouatterrir.template

COPY --from=builder --chown=nginx:nginx /frontend/docker-entrypoint.sh /

CMD ["/bin/sh", "/docker-entrypoint.sh"]
