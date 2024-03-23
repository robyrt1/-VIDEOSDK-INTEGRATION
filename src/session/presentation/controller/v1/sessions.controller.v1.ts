import { inject } from 'inversify';
import { controller, httpGet, queryParam, requestHeaders, requestParam } from 'inversify-express-utils';
import { get } from 'lodash';

import { SESSION_IOC_IDS } from '../../../infrastructure/IOC/session.ioc.identifiers';

import { IFindSessionsUsecaseV1Port } from '../../../domain/port/usecases/v1/find-sessions.usecase.v2';
import { IFindSessionsByIdUsecaseV1Port } from '../../../domain/port/usecases/v1/find-sessions-by-id.usecase.v1';

@controller('/api/v1/session')
export class SessionControllerV1 {
  constructor(@inject(SESSION_IOC_IDS.FIND_SESSIONS) private findSessionUsecaseV1: IFindSessionsUsecaseV1Port,
@inject(SESSION_IOC_IDS.FIND_SESSIONS_BY_ID) private findSessionByIdUsecaseV1:IFindSessionsByIdUsecaseV1Port) {}
  @httpGet('/')
  async findSession(@requestHeaders() header: any, @queryParam('roomId') roomId: string) {
    const token = get(header, 'authorization', '');
    return this.findSessionUsecaseV1.execute({ token, roomId });
  }

  @httpGet('/id')
  async findSessionById(@requestHeaders() header: any, @requestParam('id') id: string) {
    const token = get(header, 'authorization', '');
    return this.findSessionByIdUsecaseV1.execute({ token, id });
  }
}
