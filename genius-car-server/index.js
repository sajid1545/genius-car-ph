const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();
require('colors');

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mnpr83s.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});

function verifyJWT(req, res, next) {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).send({ message: 'Unauthorize access' });
	}

	const token = authHeader.split(' ')[1];

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) {
			return res.status(401).send({ message: 'Unauthorize access' });
		}
		req.decoded = decoded;
		next();
	});
}

async function run() {
	try {
		console.log('database connected');
		const serviceCollection = client.db('geniusCar').collection('services');

		const orderCollection = client.db('geniusCar').collection('orders');

		app.post('/jwt', async (req, res) => {
			const user = req.body;
			const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
			res.send({ token });
		});

		app.get('/services', async (req, res) => {
			const search = req.query.search;
			console.log(search);
			let query = {};
			if (search.length) {
				query = {
					$text: {
						$search: search,
					},
				};
			}
			// const query = { price: { $gt: 100, $lt:300 } };
			// const query = { price: { $in: [150,20] } };
			// const query = { $and: [{price: {$gt:20}}, {price:{$gt:100}}] } ;
			const order = req.query.order === 'asc' ? 1 : -1;
			const cursor = serviceCollection.find(query).sort({ price: order });
			const services = await cursor.toArray();
			res.send(services);
		});

		app.get('/services/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: id };
			const service = await serviceCollection.findOne(query);
			res.send(service);
		});

		// orders api

		app.post('/orders', verifyJWT, async (req, res) => {
			const order = req.body;
			const result = await orderCollection.insertOne(order);
			res.send(result);
		});

		app.get('/orders', verifyJWT, async (req, res) => {
			const decoded = req.decoded;
			console.log(decoded);

			if (decoded.email !== req.query.email) {
				return res.status(403).send({ message: 'Unauthorize access' });
			}

			let query = {};
			if (req.query.email) {
				query = {
					email: req.query.email,
				};
			}
			const cursor = orderCollection.find(query);
			const order = await cursor.toArray();
			res.send(order);
		});

		app.patch('/orders/:id', verifyJWT, async (req, res) => {
			const id = req.params.id;
			const status = req.body.status;
			const query = { _id: ObjectId(id) };
			const updateDoc = {
				$set: {
					status: status,
				},
			};

			const result = await orderCollection.updateOne(query, updateDoc);
			res.send(result);
		});

		app.delete('/orders/:id', verifyJWT, async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const result = await orderCollection.deleteOne(query);
			res.send(result);
		});
	} finally {
	}
}

run().catch((err) => console.error(err));

app.get('/', (req, res) => {
	res.send('Genius Car Mechanic');
});

app.listen(port, () => {
	console.log(`running on port ${port}`.blue.bold);
});
