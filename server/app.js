const express = require('express');
const cors = require('cors');
const userRoutes = require('./src/routes/userRoutes');
const homeRoutes = require('./src/routes/homeRoutes');
const tokenRoutes = require('./src/routes/tokenRoutes');
const bookRoutes = require('./src/routes/bookRoutes')
const categoryRoutes = require('./src/routes/categoryRoutes');
const orderRoutes = require('./src/routes/orderRoutes');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/', homeRoutes)
app.use('/api/users', userRoutes);
app.use('/api/token/', tokenRoutes);

app.use('/api/livros/', bookRoutes);
app.use('/api/categorias/', categoryRoutes);
app.use('/api/pedidos/', orderRoutes);
module.exports = app;
