import { describe, it, expect } from 'vitest';
import {
  createBadRequestError,
  createConflictError,
  createForbiddenError,
  createInternalServerError,
  createInvalidDataError,
  createNotFoundError,
  createUnauthorizedError,
  createCredentialsError,
} from './error';

describe('createInternalServerError', () => {
  it('should create an InternalServerError with the default message', () => {
    const error = createInternalServerError();
    expect(error).toMatchObject({
      name: 'InternalServerError',
      message: 'An unexpected internal server error occurred.',
      httpStatus: 500,
    });
  });

  it('should create an InternalServerError with a custom message', () => {
    const customMessage = 'Something went terribly wrong!';
    const error = createInternalServerError(customMessage);
    expect(error).toMatchObject({
      name: 'InternalServerError',
      message: customMessage,
      httpStatus: 500,
    });
  });
});

describe('createNotFoundError', () => {
  it('should create a NotFoundError with the default message', () => {
    const error = createNotFoundError();
    expect(error).toMatchObject({
      name: 'NotFoundError',
      message: 'Resource not found.',
      httpStatus: 404,
    });
  });

  it('should create a NotFoundError with a custom message', () => {
    const customMessage = '404 Not Found';
    const error = createNotFoundError(customMessage);
    expect(error).toMatchObject({
      name: 'NotFoundError',
      message: customMessage,
      httpStatus: 404,
    });
  });
});

describe('createBadRequestError', () => {
  it('should create a BadRequestError with the default message', () => {
    const error = createBadRequestError();
    expect(error).toMatchObject({
      name: 'BadRequestError',
      message: 'Bad request.',
      httpStatus: 400,
    });
  });

  it('should create a BadRequestError with a custom message', () => {
    const customMessage = '400 Bad Request';
    const error = createBadRequestError(customMessage);
    expect(error).toMatchObject({
      name: 'BadRequestError',
      message: customMessage,
      httpStatus: 400,
    });
  });
});

describe('createConflictError', () => {
  it('should create a ConflictError with the default message', () => {
    const error = createConflictError();
    expect(error).toMatchObject({
      name: 'ConflictError',
      message: 'Resource already exists.',
      httpStatus: 409,
    });
  });

  it('should create a ConflictError with a custom message', () => {
    const customMessage = '409 Conflict';
    const error = createConflictError(customMessage);
    expect(error).toMatchObject({
      name: 'ConflictError',
      message: customMessage,
      httpStatus: 409,
    });
  });
});

describe('createInvalidDataError', () => {
  it('should create an InvalidDataError with the default message', () => {
    const error = createInvalidDataError();
    expect(error).toMatchObject({
      name: 'InvalidDataError',
      message: 'Invalid data provided.',
      httpStatus: 400,
    });
  });

  it('should create an InvalidDataError with a custom message', () => {
    const customMessage = '400 Invalid Data';
    const error = createInvalidDataError(customMessage);
    expect(error).toMatchObject({
      name: 'InvalidDataError',
      message: customMessage,
      httpStatus: 400,
    });
  });
});

describe('createForbiddenError', () => {
  it('should create a ForbiddenError with the default message', () => {
    const error = createForbiddenError();
    expect(error).toMatchObject({
      name: 'ForbiddenError',
      message: 'Access forbidden.',
      httpStatus: 403,
    });
  });

  it('should create a ForbiddenError with a custom message', () => {
    const customMessage = '403 Access forbidden.';
    const error = createForbiddenError(customMessage);
    expect(error).toMatchObject({
      name: 'ForbiddenError',
      message: customMessage,
      httpStatus: 403,
    });
  });
});

describe('createUnauthorizedError', () => {
  it('should create an UnauthorizedError with the default message', () => {
    const error = createUnauthorizedError();
    expect(error).toMatchObject({
      name: 'UnauthorizedError',
      message: 'Unauthorized access.',
      httpStatus: 401,
    });
  });

  it('should create an UnauthorizedError with a custom message', () => {
    const customMessage = '401 Unauthorized';
    const error = createUnauthorizedError(customMessage);
    expect(error).toMatchObject({
      name: 'UnauthorizedError',
      message: customMessage,
      httpStatus: 401,
    });
  });
});

describe('createCredentialsError', () => {
  it('should create a CredentialsError with the default message', () => {
    const error = createCredentialsError();
    expect(error).toMatchObject({
      name: 'CredentialsError',
      message: 'Invalid credentials.',
      httpStatus: 400,
    });
  });

  it('should create a CredentialsError with a custom message', () => {
    const customMessage = 'Wrong password!';
    const error = createCredentialsError(customMessage);
    expect(error).toMatchObject({
      name: 'CredentialsError',
      message: customMessage,
      httpStatus: 400,
    });
  });
});
