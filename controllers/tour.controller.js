import TourService from '../services/tour.services.js';
import qs from 'qs';

export async function getTours(req, res) {
    try {
        const parsedQuery = qs.parse(req.query);
        console.log(parsedQuery)
        let tours = await TourService.getAllTours(parsedQuery);
        return res.status(200).json({
            status: 200,
            data: tours,
            message: "Successfully Tours Retrieved"
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
}

export async function getTourById(req,res) {
    try {
        let tour = await TourService.getTourById(req.params.id);
        console.log(tour);
        if (!tour) {
            return res.status(404).json({
                status: 404,
                message: "Tour not found"
            });
        }
        return res.status(200).json({
            status: 200,
            data: tour,
            message: "Successfully Tour Retrieved"
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
}

export async function updateTourById(req, res) {
    try {
        console.log(req.body)
        let updatedTour = await TourService.updateTourById(req.params.id, req.body);
        if (!updatedTour) {
            return res.status(404).json({
                status: 404,
                message: "Tour not found or update failed"
            });
        }
        return res.status(200).json({
            status: 200,
            data: updatedTour,
            message: "Successfully Tour Updated"
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
}

export async function deleteTourById(req, res) {
    try {
        let deletedTour = await TourService.deleteTourById(req.params.id);
        if (!deletedTour) {
            return res.status(404).json({
                status: 404,
                message: "Tour not found or delete failed"
            });
        }
        return res.status(200).json({
            status: 200,
            data: deletedTour,
            message: "Successfully Tour Deleted"
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message
        });
    }
}

