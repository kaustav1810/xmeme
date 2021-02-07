const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const adminRoutes = require('./routes/admin');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/pages');

app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(`${__dirname}/public`)));

app.use(adminRoutes);

// connecting to the database
mongoose
	.connect(process.env.DB_HOST, {
		useCreateIndex: true,
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false
	})
	.then(() => {
		// set app to listen on port 3000 for incoming requests
		app.listen(process.env.port || 8081, (req, res) => {
			console.log('Server and database are running...');
		});
	})
	.catch((err) => console.log(err));
