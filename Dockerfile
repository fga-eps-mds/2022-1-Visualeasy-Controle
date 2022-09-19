FROM node:16.16.0

WORKDIR /visualeasy-controle

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]