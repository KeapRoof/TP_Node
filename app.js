import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';
import tourRouter from './routes/tour.routes.js';
import userRouter from './routes/user.routes.js';
console.log("=== BOOTING SERVER ===");
dotenv.config();

let connexionString = 'mongodb+srv://haithemly69:<PASSWORD>@cluster0.tgbw0cy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
connexionString = connexionString.replace('<PASSWORD>', process.env.PASSWORD);



const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.get('/ping', (req, res) => {
  console.log('PING route triggered');
  res.send('pong');
});

// Route tours
app.use('/api/v1/tours', tourRouter);
// Route users
app.use('/api/v1/users', userRouter);

async function startServer() {
  try {
    await mongoose.connect(connexionString);
    console.log('Connected to MongoDB');
    
    app.listen(port, () => {
      console.log(`App running on port ${port}`);
    });
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

startServer();




