import TourModel from '../models/tourModel.js';

const TourService = {
  getAllTours: async (queryObj) => {
    try {
        
        if (queryObj.sort) {
            delete temp.sort;
        }
        if (queryObj.limit) {
            delete temp.limit;
        }
        let temp = JSON.stringify(queryObj);
        temp = temp.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        console.log(temp);
        let query = TourModel.find(JSON.parse(temp));
        
        if (queryObj.sort) {
            const sortBy = queryObj.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-ratingsAverage');
        }

        const tours = await query;
        console.log(tours);
        return tours;
    } catch (err) {
      console.error('Error fetching tours:', err);
      throw err;
    }
  },

  getTourById: async (id) => {
    try {
      const tour = await TourModel.findById(id);
      console.log(tour);
      return tour;
    } catch (err) {
      console.error('Error fetching tour by ID:', err);
      throw err;
    }
  },

  updateTourById: async (id, data) => {
    try {
    console.log('Updating tour with ID:', id, 'with data:', data);
    
      const tour = await TourModel.updateOne({ _id: id }, data);
      
      return tour;
    } catch (err) {
      console.error('Error updating tour:', err);
      throw err;
    }
  }
};

export default TourService;