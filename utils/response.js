import STATUS_CODES from "./statusCodes.js";

export const successResponse = (res, status = STATUS_CODES.OK, message = "Success", data = null) => {
    return res.status(status).json({
        success: true,
        message,
        data,
    });
};

export const errorResponse = (res, status = STATUS_CODES.INTERNAL_SERVER_ERROR, message = "Something went wrong", error = null) => {
    return res.status(status).json({
        success: false,
        message,
        error,
    });
};
