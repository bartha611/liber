FROM python:3.7
WORKDIR /home/Liber

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash
RUN apt-get install -y nodejs

RUN npm install -g npm

COPY requirements.txt /home/Liber
RUN pip install -r requirements.txt
COPY . .

RUN npm install
RUN npm run build:prod

RUN python3 manage.py collectstatic --no-input

EXPOSE 8000
CMD ["gunicorn", "Liber.wsgi:application", "--bind", "0.0.0.0:8000"]

