FROM node:14

ENV API_PORT "4002"
ENV API_PREFIX "/api"
ENV SWAGGER_ENABLE "1"
ENV DATABASE_TYPE "sqlite"
ENV DATABASE_NAME "test.db"
ENV DATABASE_SYNCHRONIZE "true"
ENV DATABASE_ENTITIES "dist/**/*.entity.js"

# Create app directory, this is in our container/in our image
WORKDIR /chandra/src/app

#Copy and Install app dependencies
COPY package*.json ./

RUN npm install

#(in prod env) you can install the dependencies using npm install --only=prod

# Bundle app source
COPY . .

RUN npm run build

EXPOSE 8080
CMD [ "node", "dist/server.js" ]