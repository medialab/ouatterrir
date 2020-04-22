# ouatterrir

## API

* `POST /answer`: payload: `{data: answer}`
* `GET /data`: csv data
* `GET /data?json`: json dump


## Dev Install

- API:

```
npm install
```

Start a MongoDB (at least 4.0), either already installed, or you can start one via Docker on the 27117 port for instance with:
```
docker-compose run -p 27117:27017 mongo
```

Then run the API server with:
```
npm run start
```

You can test the API is properly working by calling:
```
curl -H "Content-Type: application/json" -d '{"data": {"TEST": "OK"}}' localhost:3000/answer
curl 'admin:password@localhost:3000/data?json'
```

- Client:

```
cd client
npm install
npm run start
```

## Prod Deployment with Docker

Build the containers:
```
docker-compose build
```

Or pull prebuilt ones:
```
docker-compose pull
```

Then start the whole website with the credentials and the port of your choice, for instance admin/password and 8000, using:
```
PUBLIC_PORT=8000 MONGO_USER=admin MONGO_PASSWORD=password docker-compose run
```

Or set environment variables definitely by creating a .env file such as the example one and edit it:
```
cp .env{.example,}
```

Then just run:
```
docker-compose up
```
