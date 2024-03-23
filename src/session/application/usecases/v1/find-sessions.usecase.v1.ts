import { inject, injectable } from 'inversify';
import { IFindSessionsUsecaseV1Port } from '../../../domain/port/usecases/v1/find-sessions.usecase.v2';
import { IFindSessionPayload, ISessionData } from '../../types/find-session.type';
import { IJwtService } from '../../../../shared/application/services/jwt/types/jwt.services.types';
import { JWT_IOC_IDS } from '../../../../shared/infrastructure/module/jwt/IOC/jwt.ioc.identifiers';
import { ApiVideoSKDServices } from '../../../../shared/application/services/api-video-skd/api-video-skd.services';
import { SERVICES_IOC_IDS } from '../../../../shared/infrastructure/module/services/IOC/api-video-skd-services.ioc';
import { HttpExeption } from '../../../../shared/application/exception/http.exception';
import { get } from 'lodash';
import { HttpStatus } from '../../../../shared/application/constants/httpCode';

@injectable()
export class FindSessionsUsecaseV1 implements IFindSessionsUsecaseV1Port {
  constructor(
    @inject(SERVICES_IOC_IDS.API_VIDEO_SDK_SERVICES) private apiVideoSKDServices: ApiVideoSKDServices,
    @inject(JWT_IOC_IDS.JWT_SERVICE) private jwtService: IJwtService,
  ) {}
  async execute(input: IFindSessionPayload): Promise<ISessionData> {
    try {
      const validateToke = this.jwtService.verify(input.token);
      if (!get(validateToke, 'isValidToken', true)) {
        throw new HttpExeption('Token is expired or invalid', HttpStatus.UNAUTHORIZED);
      }
      return this.apiVideoSKDServices.fetchSessions(input.token, input.roomId);
    } catch (error) {
      throw error;
    }
  }
}
