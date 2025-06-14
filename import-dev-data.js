// Get arguments from command line --import or --export
import mongoose from 'mongoose';
import fs from 'fs';
import TourModel from './models/tourModel.js';

const args = process.argv.slice(2);
const importData = args.includes('--import');
const exportData = args.includes('--export');
let connexionString = 'mongodb+srv://haithemly69:<PASSWORD>@cluster0.tgbw0cy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
connexionString = connexionString.replace('<PASSWORD>', process.env.PASSWORD);
if(exportData){
    
    mongoose.connect("mongodb+srv://haithemly69:6YUeGSzHqXQfD9Rj@cluster0.tgbw0cy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
      });


    // Export tours-simple.json data from MongoDB
    const tours = JSON.parse(fs.readFileSync('tours-simple.json', 'utf-8'));
    TourModel.create(tours)
      .then(() => {
        console.log('Data exported successfully');
      })
      .catch((err) => {
        console.error('Error importing data:', err);
      })
      .finally(() => {
        mongoose.connection.close();
      });
      
}

if(importData){
    mongoose.connect(connexionString)
      .then(() => {
        console.log('Connected to MongoDB');
      })
      .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
      });
    
    // Write data to tours-simple.json
    TourModel.find()
      .then((tours) => {
        fs.writeFileSync('tours-simple.json', JSON.stringify(tours, null, 2));
        console.log('Data exported successfully');
      })
      .catch((err) => {
        console.error('Error exporting data:', err);
      })
      .finally(() => {
        mongoose.connection.close();
      });
}

