FROM debian:bookworm-slim

WORKDIR /app

COPY . .

RUN apt update \
    && apt upgrade -y \
    && apt install -y npm \
    && apt clean

RUN npm install
# RUN npm install -g serve
# RUN npm run build

VOLUME /app/src
VOLUME /app/public

# CMD ["serve", "-s", "build"]
CMD ["npm", "run", "start"]