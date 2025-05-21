FROM node:18

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

ENV PORT=1337
EXPOSE 1337

CMD ["npm", "run", "start"]
