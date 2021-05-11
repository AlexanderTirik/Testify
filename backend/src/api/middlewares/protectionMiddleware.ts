import { NextFunction, Request, Response } from 'express';
import { ErrorCode } from '../../common/enums/ErrorCode';
import CustomError from '../../common/errors/CustomError';
import { getUserTests } from '../../services/test.service';

export const testMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const error = new CustomError(400, 'Test ID is invalid', ErrorCode.InvalidTestId);
  const testId = req.params.id;
  const userId = req.user.id;
  const tests = await getUserTests(userId);

  if (tests.some(test => test.id === testId)) {
    next();
  } else {
    throw error;
  }
};

export const questionMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const error = new CustomError(400, 'Test ID is invalid', ErrorCode.InvalidTestId);
  const { testId } = req.params;
  const userId = req.user.id;
  const tests = await getUserTests(userId);

  if (tests.some(test => test.id === testId)) {
    next();
  } else {
    throw error;
  }
};
