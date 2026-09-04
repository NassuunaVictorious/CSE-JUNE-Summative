import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import { fileURLToPath } from 'url';
import { postForm } from './controllers/formControllers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('./public')));

app.use(session({
  secret: 'your-very-secure-secret-key', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/form', (req, res) => {
  res.render('form');
});

app.post('/register', postForm);

app.use((req, res) => {
  res.status(404).send('Route not found');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
