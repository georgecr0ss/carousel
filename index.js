const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;

let app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'/views'));

app.get('/', (req, res) => {
	res.render('index');
})

app.use(express.static(path.join(__dirname, '/public')));

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
})