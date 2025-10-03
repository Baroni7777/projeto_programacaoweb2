import { ExceptionFilter, HttpException,
     ArgumentsHost, HttpStatus, Catch } from "@nestjs/common";
import { Request, Response } from "express";
import { timeStamp } from "node:console";
import path from "node:path";
import { sendHttpResponse } from "src/commons/mensagem/send.response";

@Catch(HttpException)

export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();

    
    const status = exception.getStatus();
    const message = exception.message;
    const erro = exception.cause;

    return sendHttpResponse(res, status, message, null, req.path, erro);

  }
}
