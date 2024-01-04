FROM node:14-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ..
RUN npm run build
###################
FROM node:14-alpine
COPY --from=build app/build app/build
RUN npm install --production
EXPOSE 3000
ENV NODE_ENV=production
CMD ["npm", "start"]
