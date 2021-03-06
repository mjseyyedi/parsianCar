FROM node:10.16.3

WORKDIR /app

# Installing dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn

# Copying source files
COPY . .

# Building app
RUN yarn build

EXPOSE 3000

# Running the app
CMD [ "yarn", "serve" ]
