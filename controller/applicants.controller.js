import * as applicantService from "../services/applicants.service.js";

export const createApplicant = async (req, res) => {
    try {
        let data;
        if (req.body.data) {
            data = JSON.parse(req.body.data);
        } else {
            data = req.body;
        }

        const file = req.file;
        const applicant = await applicantService.createApplicant(data, file);

        res.status(201).json({
            success: true,
            message: "Applicant created successfully",
            data: applicant,
        });
    } catch (error) {
        console.error("Error creating applicant:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};



export const getAllApplicants = async (req, res) => {
    try {
        const applicants = await applicantService.getApplicants();
        res.status(200).json({ success: true, data: applicants });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export const getApplicantById = async (req, res) => {
    try {
        const id = req.params.id;
        const applicant = await applicantService.getApplicantById(id);
        if (!applicant) return res.status(404).json({ success: false, message: "Applicant not found" });
        res.status(200).json({ success: true, data: applicant });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getApplicantByName = async (req, res) => {
    try {
        const name = req.params.name;
        const applicants = await applicantService.getApplicantByName(name);
        if (!applicants.length) return res.status(404).json({ success: false, message: "No applicants found" });
        res.status(200).json({ success: true, data: applicants });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export const deleteApplicant = async (req, res) => {
    try {
        const id = req.params.id;
        const deleted = await applicantService.deleteApplicant(id);
        if (!deleted) return res.status(404).json({ success: false, message: "Applicant not found" });
        res.status(200).json({ success: true, message: "Applicant deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
