import * as applicantService from "../services/applicants.service.js";
import STATUS_CODES from "../utils/statusCodes.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const createApplicant = async (req, res) => {
  try {
    const data = req.body.data ? JSON.parse(req.body.data) : req.body;

    if (!data.applicant) data.applicant = {};

    if (req.file) {
      data.applicant.photo = `uploads/photos/${req.file.filename}`;
    }

    const applicant = await applicantService.createApplicant(data);

    return successResponse(
      res,
      STATUS_CODES.CREATED,
      "Applicant created successfully",
      applicant
    );
  } catch (error) {
    console.error("Error creating applicant:", error);
    return errorResponse(
      res,
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      "Failed to create applicant",
      error.message
    );
  }
};

export const getAllApplicants = async (req, res) => {
    try {
        const applicants = await applicantService.getApplicants();
        return successResponse(res, STATUS_CODES.OK, "Applicants fetched successfully", applicants);
    } catch (error) {
        console.error(error);
        return errorResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, "Failed to fetch applicants", error.message);
    }
};

export const getApplicantById = async (req, res) => {
    try {
        const id = req.query.id;
        const applicant = await applicantService.getApplicantById(id);

        if (!applicant) {
            return errorResponse(res, STATUS_CODES.NOT_FOUND, "Applicant not found");
        }

        return successResponse(res, STATUS_CODES.OK, "Applicant fetched successfully", applicant);
    } catch (error) {
        console.error(error);
        return errorResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, "Failed to fetch applicant", error.message);
    }
};

export const getApplicantByName = async (req, res) => {
    try {
        const { name } =  req.query;
        const applicants = await applicantService.getApplicantByName(name);

        if (!applicants || applicants.length === 0) {
            return errorResponse(res, STATUS_CODES.NOT_FOUND, "No applicants found with this name");
        }

        return successResponse(res, STATUS_CODES.OK, "Applicants fetched successfully", applicants);
    } catch (error) {
        console.error("Error fetching applicants by name:", error);
        return errorResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, "Failed to fetch applicants", error.message);
    }
};

export const deleteApplicant = async (req, res) => {
    try {
        const id = req.query.id;
        const deleted = await applicantService.deleteApplicant(id);

        if (!deleted) {
            return errorResponse(res, STATUS_CODES.NOT_FOUND, "Applicant not found");
        }

        return successResponse(res, STATUS_CODES.OK, "Applicant deleted successfully");
    } catch (error) {
        console.error(error);
        return errorResponse(res, STATUS_CODES.INTERNAL_SERVER_ERROR, "Failed to delete applicant", error.message);
    }
};
