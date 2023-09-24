import { Injectable, Scope, Inject, HttpStatus } from '@nestjs/common';
import { ResponseDto } from './response.dto';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

type NewType<T> = ResponseDto<T>;
export class IResponseData<T> implements NewType<T> {
  success = true;
  statusCode: number = HttpStatus.OK;
  data: T;
  path: any;
  method: string;
  requestId?: string;
  timestamp: number = Date.now();
  message;
}

@Injectable({ scope: Scope.REQUEST })
export class ResponseService<T> {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  public Response(result: IResponseData<T>): ResponseDto<T> {
    const { route, method } = this.request;
    const defaultData = new DefaultData('No Data');

    const response: ResponseDto<T> = {
      success: result.success,
      statusCode: result.statusCode,
      data: result.data || defaultData.getMessage(),
      path: route.path,
      method: method,
      requestId: result.requestId,
      message: result.message,
      timestamp: Date.now(),
    };
    return response;
  }
}

class DefaultData {
  constructor(private readonly message: string) {}
  getMessage() {
    return this.message;
  }
}
