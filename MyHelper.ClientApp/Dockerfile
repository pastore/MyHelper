FROM node

RUN mkdir -p /clientApp

WORKDIR /clientApp

COPY package.json package-lock.json /clientApp/

RUN ["npm", "install"]

COPY . /clientApp

EXPOSE 4200/tcp

CMD ["npm", "run", "docker", "--", "--host", "0.0.0.0", "--poll", "500"]
