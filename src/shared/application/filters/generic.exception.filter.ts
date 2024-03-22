import { IHttpService } from './../services/http/http.service';
import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { HttpException } from '@nestjs/common';
import { IErrorResponseData } from '../services/http/types/http.service.types';
import { HTTP_IOC_IDS } from '../../infrastructure/module/services/IOC/http.service.ioc';
@injectable()
export class GenericExceptionFilter {
  constructor(@inject(HTTP_IOC_IDS.HTTP_SERVICE) private httpService: IHttpService) {}
  public handleError(error: any, req: Request, res: Response, next: NextFunction): void {
    const status = this.getStatus(error);

    const errorData: IErrorResponseData = {
      stack: error.stack,
      message: error.message,
    };
    const data = this.httpService.generateResponse(req, false, errorData);
    res.status(status).json(data);
  }

  private getStatus(error: any): number {
    if (error instanceof HttpException) {
      return error.getStatus();
    }
    return 500;
  }
}
