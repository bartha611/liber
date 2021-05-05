FROM python:3.7
RUN mkdir /home/Liber
WORKDIR /home/Liber
COPY requirements.txt /home/Liber
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8080
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]

