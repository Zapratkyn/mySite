all:
	docker compose up

purge:
	docker rm -f `docker ps -aq`
	docker rmi `docker images`
	docker volume rm `docker volume ls`
	docker system prune -f

re : purge
	docker compose up

.PHONY : all purge