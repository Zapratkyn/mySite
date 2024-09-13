FROM nginx:latest

RUN apt-get update \
	&& apt-get upgrade -y \
	&& apt-get install -y openssl \
	&& apt-get clean

RUN mkdir -p /etc/nginx/ssl \
	&& mkdir -p /var/run/nginx

RUN openssl req -x509 \
	-nodes \
	-out /etc/nginx/ssl/gpCom.crt \
	-keyout /etc/nginx/ssl/gpCom.key \
	-subj "/C=BE/ST=BR-C/L=BR/O=19/OU=19/CN=gponcele.42.fr/UID=gponcele"

COPY nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]