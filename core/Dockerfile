FROM python:3.13-slim

WORKDIR /opt/nextjs

ENV HTTP_PROXY=http://server:20171
ENV HTTPS_PROXY=http://server:20171
ENV NO_PROXY=127.0.0.1,localhost

COPY ./core/requirements.txt .

RUN mkdir .wheelhouse
COPY ./core/.wheelhouse ./.wheelhouse

RUN mkdir src
COPY ./core/src ./src

RUN pip install --no-index --find-links=./.wheelhouse -r ./requirements.txt

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
