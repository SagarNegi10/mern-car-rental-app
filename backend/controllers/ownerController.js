import imagekit from "../configs/imageKit.js";
import Booking from "../models/Booking.js";
import Car from "../models/Car.js";
import User from "../models/user.js";
import fs from 'fs'

// API to change Role of User
export const changeRoleToOwner = async (req, res) => {
    try {
        const {_id} = req.user;
        await User.findByIdAndUpdate(_id, {role: "owner"})
        res.json({success: true, meassge: "Now you can list cars"})
    } catch (error) {
        console.log(error.meassge);
        res.json({success: false, meassge: error.meassge})
    }
}

// API to List Car
export const addCar = async (req, res) => {
    try {
        const {_id} = req.user;
        let car  = JSON.parse(req.body.carData);
        const imageFile = req.file;

        // Upload Image to ImageKit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/cars'
        })

        // optimization through imagekit URL transformation
        var optimizedImageURL = imagekit.url({
            path: response.filePath,
            transformation: [
                {width: '1280'}, // Width resizing
                {quality: 'auto'}, // Auto compression
                {format: 'webp'}, // Convert to modern format
            ]
        });

        const image = optimizedImageURL;
        await Car.create({...car, owner: _id, image})
        res.json({success: true, meassge: 'Car Added'})

    } catch (error) {
        console.log(error.meassge);
        res.json({success: false, meassge: error.meassge})
    }
}

// API to list Owner Cars
export const getOwnerCars = async (req, res) => {
    try {
        const {_id} = req.user;
        const cars = await Car.find({owner: _id})
        res.json({success: true, cars})
    } catch (error) {
        console.log(error.meassge);
        res.json({success: false, meassge: error.meassge})
    }
}

// API to toggle car Availability
export const toggleCarAvailability = async (req, res) => {
    try {
        const {_id} = req.user;
        const {carId} = req.body;
        const car = await Car.findById(carId)

        // Checking is car belong to the user
        if(car.owner.toString() !== _id.toString()){
            res.json({success: false, meassge: "Unauthorized"})
        }

        car.isAvailable = !car.isAvailable;
        await car.save()

        res.json({success: true, meassge: "Availability Toggled"})
    } catch (error) {
        console.log(error.meassge);
        res.json({success: false, meassge: error.meassge})
    }
}

// API to Delete a car
export const deleteCar = async (req, res) => {
    try {
        const {_id} = req.user;
        const {carId} = req.body;
        const car = await Car.findById(carId)

        // Checking is car belong to the user
        if(car.owner.toString() !== _id.toString()){
            res.json({success: false, meassge: "Unauthorized"})
        }

        car.owner = null;
        car.isAvailable = false;
        await car.save()

        res.json({success: true, meassge: "Car Removed"})
    } catch (error) {
        console.log(error.meassge);
        res.json({success: false, meassge: error.meassge})
    }
}

// API to get Dashboad data
export const getDashboardData = async (req, res) => {
    try {
        const {_id, role} = req.user;
        if(role !== 'owner'){
            res.json({success: false, meassge: "Unauthorized"})
        }    
        const cars = await Car.find({owner: _id})
        const bookings = await Booking.find({owner: _id}).populate('car').sort({createdAt: -1});
        const pendingBookings = await Booking.find({owner: _id, status: "pending"})
        const completedBookings = await Booking.find({owner: _id, status: "confirmed"})

        // Calaculate monthlyRevenue from bookings where status is confirmed
        const monthlyRevenue = bookings.slice().filter(booking => booking.status === ' confirmed').reduce((acc, booking) => acc + booking.price, 0)

        const dashboardData = {
            totalCars: cars.length,
            totalBookings: bookings.length,
            pendingBookings: pendingBookings.length,
            completedBookings: completedBookings.length,
            recentBookings: bookings.slice(0,3),
            monthlyRevenue
        }

        res.json({success: true, dashboardData})

    } catch (error) {
        console.log(error.meassge);
        res.json({success: false, meassge: error.meassge})
    }
}

// API to update user Image
export const updateUserImage = async (req, res) => {
    try {
        const {_id} = req.user;
        const imageFile = req.file;

        // Upload Image to ImageKit
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/users'
        })

        // optimization through imagekit URL transformation
        var optimizedImageURL = imagekit.url({
            path: response.filePath,
            transformation: [
                {width: '400'}, // Width resizing
                {quality: 'auto'}, // Auto compression
                {format: 'webp'}, // Convert to modern format
            ]
        });

        const image = optimizedImageURL;
        await User.findByIdAndUpdate(_id, {image});

        res.json({success: true, meassge: 'Image Updated'})

    } catch (error) {
        console.log(error.meassge);
        res.json({success: false, meassge: error.meassge})
    }
}