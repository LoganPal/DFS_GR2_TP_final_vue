import cors from 'cors';
import express from 'express';
import { router as billRoutes } from './routes/bill.mjs';
import { router as clientRoutes } from './routes/client.mjs'; 

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.get('/', (req, res) => {
  res.send('Bills API v1.0.0');
});

const uploadFile = (req, res, next) => {
  console.log('Enregistrement des fichiers envoyés dans la requête');
  res.urlFichier = 'test.jpg';
  next();
};

app.get('/uploadfile', uploadFile, (req, res) => {
  res.send('Votre fichier a bien été enregistré: ' + res.urlFichier);
});

app.use('/bills', billRoutes);
app.use('/clients', clientRoutes); 
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
