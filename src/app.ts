import express from 'express';
import cors from 'cors';
import cardRoutes from './routes/card';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/api', cardRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

