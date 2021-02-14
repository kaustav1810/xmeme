/**
 * Entry point of the app.
 */

const express = require('express'),
path = require('path'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
mongoose = require('mongoose'),
swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
require('dotenv').config();

const adminRoutes = require('./routes/admin');

const app = express();

// to set default template engine as "ejs"
app.set('view engine', 'ejs');
app.set('views', './src/pages');

// to define HTTP methods like "PUT"/"PATCH"/...
app.use(methodOverride('_method'));
app.use(bodyParser.raw());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(`${__dirname}/public`)));


app.use(adminRoutes);

// swaggerAPI endpoint
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// connecting to the database
mongoose
	.connect(process.env.DB_HOST, {
		useCreateIndex: true,
		useUnifiedTopology: true,
		useNewUrlParser: true,
		useFindAndModify: false
	})
	.then(() => {
		// set app to listen on port 8081 for incoming requests
		app.listen(process.env.port || 8081, (req, res) => {
			console.log('Server and database are running on 8081...');
		});
		
	})
	.catch((err) => console.log(err));
