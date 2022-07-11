import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { MongoError } from 'mongodb';
import { ExceptionMessages } from './messages';

@Catch(MongoError)
export class MongoServerExceptionFilter implements ExceptionFilter<MongoError> {
  catch(exception: MongoError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    switch (exception.code) {
      case 11000: // duplicate entity exception
        response.status(HttpStatus.BAD_REQUEST).json(
          HttpException.createBody({
            statusCode: HttpStatus.BAD_REQUEST,
            error: 'Bad Request',
            message: ExceptionMessages.DuplicatedEntity,
            constrainedFields: (exception as any).keyValue,
          }),
        );
        break;
      default:
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
          HttpException.createBody({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Mongo Error',
            message: ExceptionMessages.MongoDbError,
            stack: exception.stack,
          }),
        );
    }
  }
}
