import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {  plainToClass, plainToInstance } from 'class-transformer';

interface ClassConstractor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstractor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // run something before request handle

    // run something before response sent out
    return next.handle().pipe(
      map((data: any) => {
        let res = plainToInstance(this.dto, data , {
          excludeExtraneousValues: true
        });

        return {
          msg: 'Successfully request !',
          data: res,
        };
      }),
    );
  }
}
