# POC RESTful API in NodeJs with MongoDB running in Docker in RaspberryPi

## Environment

RaspberryPi 3B

Raspbian Stretch

Docker 19.03.1

NodeJs 10.16.3

MongoDB 3.0.14 

## Environment preparation

In the RaspberryPi 3B with OS Raspbian version Stretch run:

```
apt-get update
apt-get upgrade
apt-get install raspberrypi-kernel raspberrypi-kernel-headers
curl -sSL https://get.docker.com | sh
usermod -aG docker pi
reboot
```

Clone this repository:

```
git clone https://github.com/sergioaraki/POC-RESTful-API-NodeJs-MongoDB
```

Go to the repository folder:

```
cd POC-RESTful-API-NodeJs-MongoDB
```

Build docker image:

```
docker build -t node:arm .
```

Run docker image:

```
docker run -v /data/db:/data/db -v /data/configdb:/data/configdb -p 3000:3000 -ti node:arm
```

## All the API endpoints available

(GET/POST) http://localhost:3000/careers

(GET/PUT/DELETE) http://localhost:3000/careers/:careerId

(PUT/DELETE) http://localhost:3000/careersCourse/:careerId/:courseId

(GET/POST) http://localhost:3000/courses

(GET/PUT/DELETE) http://localhost:3000/courses/:courseId

(GET/POST) http://localhost:3000/students

(GET/PUT/DELETE) http://localhost:3000/students/:studentId

(PUT/DELETE) http://localhost:3000/studentsCourse/:studentId/:courseId

(PUT) http://localhost:3000/studentsUpdateCourse/:studentId/:courseId/:status/:grade

There is an example for each endpoint in the postman collection (POC-RESTful-API.postman_collection.json)


MongoDB running in docker in RaspberryPi thanks to [andresvidal](https://github.com/andresvidal/rpi3-mongodb3)