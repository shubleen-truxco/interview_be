import * as adminService from "../services/auth.service.js";
import { successResponse, errorResponse } from "../utils/response.js";
import  STATUS_CODES  from "../utils/statusCodes.js";

// Admin registration (optional)
export const registerAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return errorResponse(res, STATUS_CODES.BAD_REQUEST, "Username and password are required");
    }

    const admin = await adminService.createAdmin(username, password);
    return successResponse(
      res,
      STATUS_CODES.CREATED,
      "Admin created successfully",
      { id: admin.id, username: admin.username }
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, STATUS_CODES.BAD_REQUEST, "Failed to create admin", error.message);
  }
};

// Admin login
export const loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return errorResponse(res, STATUS_CODES.BAD_REQUEST, "Username and password are required");
    }

    const { token, admin } = await adminService.loginAdmin(username, password);

    return successResponse(
      res,
      STATUS_CODES.OK,
      "Login successful",
      { token, admin }
    );
  } catch (error) {
    console.error(error);
    return errorResponse(res, STATUS_CODES.UNAUTHORIZED, "Login failed", error.message);
  }
};
