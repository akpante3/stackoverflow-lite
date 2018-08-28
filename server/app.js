import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './app/routes/users';
import questionRoutes from './app/routes/question';
import cors from 'cors';


const app = express();
const port = process.env.PORT || 8000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/v1', questionRoutes);
app.use('/v1', userRoutes);

app.listen(port, () => {
  console.log(`running on ${port}`);
});

export default app;
