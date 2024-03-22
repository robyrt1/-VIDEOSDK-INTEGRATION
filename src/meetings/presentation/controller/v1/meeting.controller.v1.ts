import { inject } from 'inversify';
import { controller, httpPost, requestBody, requestHeaders } from 'inversify-express-utils';
import { MEETING_USECASE_IOC_IDS } from '../../../infrastructure/IOC/meeting.usecase.ioc.identifiers';
import { IInitConfigUsecaseV1Port } from '../../../domain/port/usecase/v1/init-config.usecase.v1.port';
import { Request } from 'express';
import { get } from 'lodash';

@controller('/api/v1/meeting')
export class MeetingControllerV1 {
  constructor(@inject(MEETING_USECASE_IOC_IDS.INIT) private initConfigUsecaseV1: IInitConfigUsecaseV1Port) {}

  @httpPost('/init')
  async initConfig(@requestHeaders() header: any, @requestBody() body: any) {
    const headerToken = header['authorization'];
    return this.initConfigUsecaseV1.execute({ ...body, token: headerToken });
  }
}
