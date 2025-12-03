FROM python:3.14-slim

WORKDIR /opt/nextjs

COPY ./core/requirements.txt .

RUN mkdir src
COPY ./core/src ./src

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
