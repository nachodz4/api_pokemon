import express, { Request, Response } from 'express';
import bodyParser  from 'body-parser';
import cardRoutes from './routes/card';


const app = express();
const port = 3000;

app.use(express.json());
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/api', cardRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

