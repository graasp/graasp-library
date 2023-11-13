FROM node:18-alpine

# install git, necessary for github dependencies
RUN apk add --no-cache git

WORKDIR /usr/src/app
RUN mkdir -p .

# install app dependencies with yarn 3
COPY package.json .
COPY .yarnrc.yml .
COPY .yarn .yarn
RUN yarn install

# bundle app source
COPY . .

# build with babel
RUN yarn build

EXPOSE 3005

CMD ["yarn", "start:next"]
