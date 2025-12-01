FROM python:3.14-slim

WORKDIR WORKDIR /opt/nextjs

COPY ./core/requirements.txt .

RUN mkdir src
COPY ./src ./src

RUN pip install -r requirements.txt

CMD ["fastapi", "dev", "./src/main.py"]
