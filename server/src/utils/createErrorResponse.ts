import { AppError, createInternalServerError } from "@domain/errors/error";


export function isAppError(error: any): error is AppError {
  return (
    error &&
    typeof error.name === "string" &&
    typeof error.message === "string" &&
    (typeof error.httpStatus === "number")
  );
}

export function createErrorResponse(e: any): AppError {
  return isAppError(e)
    ? e
    : createInternalServerError("Ups, hubo un error interno");
}
