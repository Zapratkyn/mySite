systemctl start nginx
python3 manage.py makemigrations;
python3 manage.py migrate;
python3 manage.py runserver 0.0.0.0:8000;
# daphne -b 0.0.0.0 -p 8000 backend.asgi:application
# cd backend && daphne -e ssl:8000:privateKey=/usr/src/app/django.key:certKey=/usr/src/app/django.crt backend.asgi:application
