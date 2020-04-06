FROM base

WORKDIR /app

# Installing dependencies
COPY package*.json ./
#RUN yarn

# Copying source files
COPY . .

# Building app
RUN yarn build

EXPOSE 3000

# Running the app
CMD [ "yarn", "serve" ]
