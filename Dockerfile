FROM node:13-alpine
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install -g serve
COPY . /app
RUN npm run build
EXPOSE 5000
CMD ["serve","-s","build"]

