FROM debian:bookworm-slim

WORKDIR /app

COPY . .

RUN apt update \
    && apt upgrade -y \
    && apt install -y npm \
    && apt clean

RUN npm install

VOLUME /app/src
VOLUME /app/public

CMD ["npm", "run", "build"]