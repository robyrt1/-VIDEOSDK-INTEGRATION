import { injectable } from 'inversify';
import { Request } from 'express';
import { IHTTPResponse, IDataHttpResponse } from './types/http.service.types';
import { formatDatetime } from '../../utils/formatDatetime';
@injectable()
export class HttpService implements IHttpService {
  public generateResponse(req: Request, success: boolean, data: IDataHttpResponse): IHTTPResponse {
    if (process.env.NODE_ENV === 'production') delete data.stack;

    const datetime = formatDatetime(new Date());
    const httpMethod = req.method;
    const path = req.path;
    const response = {
      success,
      datetime,
      httpMethod,
      path,
      data,
    };

    return response;
  }
}

export interface IHttpService {
  generateResponse(req: Request, success: boolean, data: IDataHttpResponse): IHTTPResponse;
}
