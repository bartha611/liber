FROM python:3.7
RUN mkdir /home/Liber
WORKDIR /home/Liber


RUN curl -sL https://deb.nodesource.com/setup_14.x | bash
RUN apt-get install -y nodejs

RUN npm install -g npm



COPY requirements.txt /home/Liber
RUN pip install -r requirements.txt
COPY . .

RUN npm install && npm run build

EXPOSE 8080
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]

