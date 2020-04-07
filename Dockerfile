FROM node:8.15.0
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 3000
EXPOSE ["npm", "start"]
