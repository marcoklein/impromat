FROM node:16-alpine

COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
COPY src ./src
COPY schema ./schema

RUN yarn install --frozen-lockfile --production

CMD ["yarn", "start"]
EXPOSE 8080