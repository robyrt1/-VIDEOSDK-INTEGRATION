import { inject, injectable } from 'inversify';
import { IFindSessionPayload, ISessionData } from '../../types/find-session.type';
import { IJwtService } from '../../../../shared/application/services/jwt/types/jwt.services.types';
import { JWT_IOC_IDS } from '../../../../shared/infrastructure/module/jwt/IOC/jwt.ioc.identifiers';
import { ApiVideoSKDServices } from '../../../../shared/application/services/api-video-skd/api-video-skd.services';
import { SERVICES_IOC_IDS } from '../../../../shared/infrastructure/module/services/IOC/api-video-skd-services.ioc';
import { HttpExeption } from '../../../../shared/application/exception/http.exception';
import { get } from 'lodash';
import { HttpStatus } from '../../../../shared/application/constants/httpCode';
import { IFindSessionsByIdUsecaseV1Port } from '../../../domain/port/usecases/v1/find-sessions-by-id.usecase.v1';
import { IFindSessionByIDData, IFindSessionByIdPayload } from '../../types/find-session-by-id.type';

@injectable()
export class FindSessionsByIdUsecaseV1 implements IFindSessionsByIdUsecaseV1Port{
  constructor(
    @inject(SERVICES_IOC_IDS.API_VIDEO_SDK_SERVICES) private apiVideoSKDServices: ApiVideoSKDServices,
    @inject(JWT_IOC_IDS.JWT_SERVICE) private jwtService: IJwtService,
  ) {}
  async execute(input: IFindSessionByIdPayload): Promise<IFindSessionByIDData> {
    try {
      const validateToke = this.jwtService.verify(input.token);
      if (!get(validateToke, 'isValidToken', true)) {
        throw new HttpExeption('Token is expired or invalid', HttpStatus.UNAUTHORIZED);
      }
      return this.apiVideoSKDServices.fetchASessions(input.token, input.id);
    } catch (error) {
      throw error;
    }
  }
}
