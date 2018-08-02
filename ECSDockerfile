FROM node:8.11.1

WORKDIR /opt/app
COPY . .

RUN npm install
RUN npm run lint

EXPOSE 3000
CMD ["npm", "start"]