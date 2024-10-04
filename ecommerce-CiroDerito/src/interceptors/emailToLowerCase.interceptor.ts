import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';


@Injectable()
export class EmailToloweCase implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const emailInLowerCase = context.switchToHttp().getRequest()
        console.log(emailInLowerCase);
        emailInLowerCase.body.email.toLowerCase()
        emailInLowerCase.body.email= emailInLowerCase.body.email.toLowerCase()

        return next.handle()
    }
}