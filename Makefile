all:
	docker compose up

node:
	docker run --name node -dit -v ./node/src:/app/src -p 127.0.0.1:3000:3000/tcp node

purge:
	docker rm -f `docker ps -aq`
	docker rmi `docker images`