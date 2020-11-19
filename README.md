# OuAtterrir


## API

* `POST /answer`: payload: `{data: answer}`
* `GET /data`: csv data (only one set of propositions per user contribution)
* `GET /data?returnAll`: csv data unfiltered (multiple versions of a user contribution possible)
* `GET /data?json`: json dump


## Dev Install

- API:

```
npm install
```

Start a MongoDB (at least 4.0) on the port 27117, either already installed, or you can do so via Docker using:
```
npm run mongo
```

In another shell, run the API server with:
```
npm run start
```

You can test the API is properly working by calling:
```
curl -H "Content-Type: application/json" -d '{"data": {"TEST": "OK"}}' localhost:4000/answer
curl 'admin:password@localhost:4000/data?json'
```

- Client:

```
cd client
npm install
npm run start
```

It will open automatically the website in your browser on `http://localhost:3000`


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
PUBLIC_PORT=8000 MONGO_USER=admin MONGO_PASSWORD=password docker-compose up
```

Or set environment variables definitely by creating a .env file such as the example one and edit it:
```
cp .env{.example,}
```

Then just run (or with -d option for production):
```
docker-compose up
```

The client is then served on `http://localhost:{PUBLIC_PORT}` and the API on `http://localhost:{PUBLIC_PORT}/api/`
