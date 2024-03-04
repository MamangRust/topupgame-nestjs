## Admin

### Register

curl --request POST \
  --url http://localhost:3000/admin/signup \
  --header 'Content-Type: application/json' \

  --data '{
    "fullName": "dragon kingh",
    "email": "john.doe3@example.com",
    "password": "yourpassword",
    "retypePassword": "yourpassword"
}'

### Login

curl --request POST \
  --url http://localhost:3000/admin/signin \
\
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.4.0' \
  --data '{
    "email": "john.doe@example.com",
    "password": "yourpassword"
}'



## Bank

### Find All

curl -X GET http://localhost:3000/banks


### Find Id

curl -X GET http://localhost:3000/banks/1


### Create

curl -X POST http://localhost:3000/banks -H "Content-Type: application/json" -d '{"name": "Bank Syariah Indonesia", "holderName": "Yanto Knight", "holderNumbers": "22081544"}'

curl -X POST http://localhost:3000/banks -H "Content-Type: application/json" -d '{"name": "Bank Syariah Mandiri", "holderName": "Dono knight", "holderNumbers": "77542493"}'

curl -X POST http://localhost:3000/banks -H "Content-Type: application/json" -d '{"name": "Bank BNI Syariah", "holderName": "Yono Knight", "holderNumbers": "99888443"}'


### Update

curl -X PUT http://localhost:3000/banks/1 -H "Content-Type: application/json" -d '{
    "name": "Updated Bank",
    "holderName": "Jane Doe"
}'


### Delete

curl -X DELETE http://localhost:3000/banks/1



## Category

### Find All

curl -X GET http://localhost:3000/category

### Find Id

curl -X GET http://localhost:3000/category/1


### Create

curl -X POST http://localhost:3000/category -H "Content-Type: application/json" -d '{"name": "Mobile"}'


curl -X POST http://localhost:3000/category -H "Content-Type: application/json" -d '{"name": "Desktop"}'


curl -X POST http://localhost:3000/category -H "Content-Type: application/json" -d '{"name": "Console"}'

### Update

curl -X PUT http://localhost:3000/category/1 -H "Content-Type: application/json" -d '{"name": "Desktop"}'


### Delete

curl -X DELETE http://localhost:3000/category/1


## Member

### Sign in

curl --request POST \
  --url http://localhost:3000/members/signin \
  --header 'Content-Type: application/json' \
  --data '{
	"email": "mengolang@gmail.com",
	"password": "mengolanggg"
}'

### Sign up

curl --request POST \
  --url http://localhost:3000/members/signup \
  --header 'Content-Type: multipart/form-data' \
  --header 'User-Agent: insomnia/8.4.0' \
  --form fullName=Mengolang \
  --form email=mengolang@gmail.com \
  --form password=mengolanggg \
  --form favoriteCategory=1 \
  --form avatar=@/home/holyraven/Pictures/Test_program/Test_product.png


## Nominal

### Find All

curl -X GET http://localhost:3000/nominals

### Find Id

curl -X GET http://localhost:3000/nominals/1


### Create 

curl -X POST http://localhost:3000/nominals \
-H "Content-Type: application/json" \
-d '{
    "name": "Example Nominal",
    "quantity": 10,
    "price": 50
}'

<!-- Gold -->
curl -X POST http://localhost:3000/nominals \
-H "Content-Type: application/json" \
-d '{
    "name": "Gold",
    "quantity": 50,
    "price": 1250000
}'

curl -X POST http://localhost:3000/nominals \
-H "Content-Type: application/json" \
-d '{
    "name": "Gold",
    "quantity": 100,
    "price": 2250000
}'

curl -X POST http://localhost:3000/nominals \
-H "Content-Type: application/json" \
-d '{
    "name": "Gold",
    "quantity": 125,
    "price": 3250000
}'

curl -X POST http://localhost:3000/nominals \
-H "Content-Type: application/json" \
-d '{
    "name": "Gold",
    "quantity": 500,
    "price": 5000000
}'

curl -X POST http://localhost:3000/nominals \
-H "Content-Type: application/json" \
-d '{
    "name": "Gold",
    "quantity": 225,
    "price": 4250000
}'

<!-- Jewel -->
curl -X POST http://localhost:3000/nominals \
-H "Content-Type: application/json" \
-d '{
    "name": "Jewel",
    "quantity": 50,
    "price": 75000
}'

curl -X POST http://localhost:3000/nominals \
-H "Content-Type: application/json" \
-d '{
    "name": "Jewel",
    "quantity": 100,
    "price": 125000
}'

curl -X POST http://localhost:3000/nominals \
-H "Content-Type: application/json" \
-d '{
    "name": "Jewel",
    "quantity": 150,
    "price": 150000
}'

curl -X POST http://localhost:3000/nominals \
-H "Content-Type: application/json" \
-d '{
    "name": "Jewel",
    "quantity": 225,
    "price": 175000
}'

curl -X POST http://localhost:3000/nominals \
-H "Content-Type: application/json" \
-d '{
    "name": "Jewel",
    "quantity": 500,
    "price": 325000
}'

<!-- Diamonds -->

curl -X POST http://localhost:3000/nominals \
-H "Content-Type: application/json" \
-d '{
    "name": "Diamond",
    "quantity": 50,
    "price": 125000
}'

curl -X POST http://localhost:3000/nominals \
-H "Content-Type: application/json" \
-d '{
    "name": "Diamond",
    "quantity": 100,
    "price": 225000
}'

curl -X POST http://localhost:3000/nominals \
-H "Content-Type: application/json" \
-d '{
    "name": "Diamond",
    "quantity": 150,
    "price": 300000
}'

curl -X POST http://localhost:3000/nominals \
-H "Content-Type: application/json" \
-d '{
    "name": "Diamond",
    "quantity": 300,
    "price": 400000
}'

curl -X POST http://localhost:3000/nominals \
-H "Content-Type: application/json" \
-d '{
    "name": "Diamond",
    "quantity": 500,
    "price": 500000
}'




### Update

curl -X PUT http://localhost:3000/nominals/1 \
-H "Content-Type: application/json" \
-d '{
    "name": "Updated Nominal",
    "quantity": 15,
    "price": 70
}'


## Delete
curl -X DELETE http://localhost:3000/nominals/1

