FROM node:alpine

WORKDIR /app

RUN npm install -g npm-check-updates \
    ncu -u \
    npm install \
    npm install express

COPY . .

CMD ["node", "express.js"]

# docker build . -t express
# docker run -it -p 3000:3000 express
