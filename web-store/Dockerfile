FROM node:latest
WORKDIR /web-store
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]