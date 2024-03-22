export interface IHTTPResponse {
  success: boolean;
  datetime: string;
  httpMethod: string;
  path: string;
  data: IDataHttpResponse;
}

export interface IErrorResponseData {
  message: string;
  stack?: string;
}

export type ISuccessResponse = any | any[];

export type IErrorResponse = IErrorResponseData;

export type IDataHttpResponse = IErrorResponse | ISuccessResponse;
