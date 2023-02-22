// import { BadRequestException, Injectable } from '@nestjs/common';
// import { EnvironmentService } from '@core/environment';
// import { HttpService } from '@nestjs/axios';
// import { catchError, lastValueFrom, map, mergeMap, of, retry, throwError } from 'rxjs';
// import { AxiosResponse } from 'axios';

// @Injectable()
// export class GetService {

//   constructor(
//     private httpService: HttpService,
//     private environmentService: EnvironmentService
//   ) { }

//   async dueDates(token: string, cookie: string, url_bank: string): Promise<AxiosResponse<any, any>> {
//     const headers = {
//       'targetpath': `${this.environmentService.getEnvironmentValue('URL_DUE_DATES')}/${url_bank}`,
//       'typeauth': 'client_credential',
//       Authorization: `${token}`,
//       ...(cookie ? { cookie } : {}),
//     }

//     return await lastValueFrom(
//       this.httpService.get(this.environmentService.getEnvironmentValue('URL_AMBASSADOR_BANK'), {
//         headers
//       }).pipe(
//         mergeMap(val => {
//           if (val.status >= 400) {
//             return throwError(`Received status ${val.status} from HTTP call`);
//           }
//           return of(val);
//         }),
//         catchError(err => {
//           throw new BadRequestException(err.response.data);
//         }),
//       ),
//     );
//   }
// }
