import express from 'express';
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import { AppDataSource } from './data-source';


const app = express();
app.use(express.json());

app.use('/admin', adminRoutes);
app.use('/user', userRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));