FROM  node:10

# Install app dependencies
COPY package.json /src/package.json
COPY package-lock.json /src/package-lock.json

RUN cd /src; npm install

# Bundle app source
COPY . /src

RUN cd /src; npm run build

WORKDIR /src

CMD ["npm", "start"]