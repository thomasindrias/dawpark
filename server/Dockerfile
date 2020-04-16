FROM node

WORKDIR /dawpark

COPY ./package.json .

#RUN npm i -g yarn
RUN yarn install --production

COPY ./ormconfig.json .
COPY ./.env .
COPY ./dist ./dist

ENV NODE_ENV production
EXPOSE 4000

CMD ["node", "dist/index.js"]