FROM python:3-alpine

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt \
    && python3 manage.py makemigrations \
    && python3 manage.py migrate

CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "backend.asgi:application"]
