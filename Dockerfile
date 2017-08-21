FROM risingstack/alpine:3.4-v8.3.0-4.5.2

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json package.json
ENV NODE_ENV=production
RUN npm install

COPY src/ src/
COPY main.js main.js
COPY server.js server.js
COPY api.yaml api.yaml

ENV PORT=80

EXPOSE 80

CMD ["npm", "start"]
