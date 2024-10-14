FROM python:3-alpine

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt 


CMD ["sh", "launch.sh"]
# CMD ["pyhton3", "manage.py", "runserver", "0.0.0.0:8000"]
# CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "backend.asgi:application"]
