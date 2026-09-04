import Form from "../models/formModels.js";

export const postForm = async (req, res) => {
    try {
        console.log("BODY RECEIVED:", req.body);

        const {
            firstname,
            lastname,
            placeofbirth,
            dob,
            joindate,
            gender,
            nationality,
            maritalstatus,
            settlement
        } = req.body;

        // Required text fields
        if (!firstname || firstname.trim().length < 2) {
            return res.status(400).json({
                message: "First name is required and must be at least 2 characters long"
            });
        }

        if (!lastname || lastname.trim().length < 2) {
            return res.status(400).json({
                message: "Last name is required and must be at least 2 characters long"
            });
        }

        if (!placeofbirth || placeofbirth.trim().length < 2) {
            return res.status(400).json({
                message: "Place of birth is required and must be at least 2 characters long"
            });
        }

        // Required select fields
        if (!nationality) {
            return res.status(400).json({
                message: "Nationality is required"
            });
        }

        if (!settlement) {
            return res.status(400).json({
                message: "Settlement camp is required"
            });
        }

        if (!maritalstatus) {
            return res.status(400).json({
                message: "Marital status is required"
            });
        }

        // Gender
        if (!gender) {
            return res.status(400).json({
                message: "Gender is required"
            });
        }

        // Registration date
        const registrationDate = new Date();
        registrationDate.setHours(0, 0, 0, 0);

        // Date of birth
        if (!dob) {
            return res.status(400).json({
                message: "Date of birth is required"
            });
        }

        const birthDate = new Date(dob);
        birthDate.setHours(0, 0, 0, 0);

        if (isNaN(birthDate.getTime())) {
            return res.status(400).json({
                message: "Invalid Date of birth"
            });
        }

        if (birthDate >= registrationDate) {
            return res.status(400).json({
                message: "Date of birth must be before today's date"
            });
        }

        // Date of joining
        if (!joindate) {
            return res.status(400).json({
                message: "Date of joining settlement camp is required"
            });
        }

        const joiningDate = new Date(joindate);
        joiningDate.setHours(0, 0, 0, 0);

        if (isNaN(joiningDate.getTime())) {
            return res.status(400).json({
                message: "Invalid Date of joining"
            });
        }

        if (joiningDate > registrationDate) {
            return res.status(400).json({
                message: "Date of joining settlement camp cannot be in the future"
            });
        }

        if (joiningDate < birthDate) {
            return res.status(400).json({
                message: "Date of joining cannot be before date of birth"
            });
        }

        // Create MongoDB document
        const form = new Form({
            firstname: firstname.trim(),
            lastname: lastname.trim(),
            placeofbirth: placeofbirth.trim(),
            dob: birthDate,
            joindate: joiningDate,
            gender: gender || "Female",
            nationality,
            maritalstatus,
            settlement
        });

        // Save to MongoDB
        const savedForm = await form.save();

        console.log("SAVED TO DATABASE:", savedForm);

        return res.status(201).json({
            message: "Beneficiary saved successfully",
            data: savedForm
        });

    } catch (error) {
        console.error("DATABASE ERROR:", error);

        return res.status(500).json({
            message: "Error saving beneficiary",
            error: error.message
        });
    }
};
