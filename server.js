import express from 'express';
import cors from 'cors';
import axios from 'axios';
import 'dotenv/config';

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

const BASE_URL = process.env.RAJA_ONGKIR_URL_API;
const API_KEY = process.env.RAJA_ONGKIR_API_KEY;
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    key: API_KEY,
  },
});

app.get('/', (req, res) => {
  res.json({
    message: 'hello world',
  });
});

app.get('/city', async (req, res) => {
  try {
    const response = await api.get('/city');

    res.json({ cities: response.data });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

app.post('/cost', async (req, res) => {
  try {
    const { origin, destination, weight, courier } = req.body;

    const response = await api.post('/cost', {
      origin,
      destination,
      weight,
      courier,
    });

    return res.json({ data: response.data });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
