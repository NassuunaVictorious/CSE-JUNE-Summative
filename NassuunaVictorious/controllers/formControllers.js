import express from 'express';
import Form from "../models/formModels.js";

export const postForm = async (req, res) => {
    try {
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

        if (!firstname || firstname.trim().length < 2) {
            return res.status(400).json({ message: 'First name is required and must be at least 2 characters long' });
        }
        if (!lastname || lastname.trim().length < 2) {
            return res.status(400).json({ message: 'Last name is required and must be at least 2 characters long' });
        }
        if (!placeofbirth || placeofbirth.trim().length < 2) {
            return res.status(400).json({ message: 'Place of birth is required and must be at least 2 characters long' });
        }

        const registrationDate = new Date();
        const birthDate = new Date(dob);

        if (isNaN(birthDate.getTime())) {
            return res.status(400).json({ message: 'Invalid Date of birth format' });
        }
        if (birthDate >= registrationDate) {
            return res.status(400).json({ message: 'Date of birth must be before date of registration' });
        }

        if (joindate) {
            const joiningDate = new Date(joindate);
            if (isNaN(joiningDate.getTime())) {
                return res.status(400).json({ message: 'Invalid Date of joining format' });
            }
            if (joiningDate <= registrationDate) {
                return res.status(400).json({ message: 'Date of joining settlement camp must be after date of registration' });
            }
        } else {
            return res.status(400).json({ message: 'Date of joining settlement camp is required' });
        }

        const form = new Form({
            firstname,
            lastname,
            placeofbirth,
            dob,
            joindate,
            gender: gender || 'Female',
            nationality,
            maritalstatus,
            settlement
        });

        await form.save();
        res.status(201).json({ message: 'Beneficiary saved successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error saving beneficiary', error: error.message });
    }
};
