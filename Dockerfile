FROM node:13.13.0-alpine3.10

COPY --chown=node:node . /api

WORKDIR /api

RUN npm ci --production false

CMD ["npm", "run", "start"]
