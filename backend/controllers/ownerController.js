import imagekit from "../configs/imageKit.js";
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