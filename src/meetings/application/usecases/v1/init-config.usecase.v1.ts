import { InitConfigUsecaseV1Input } from './../../../../../dist/src/meetings/domain/port/usecase/v1/init-config.usecase.v1.port.d';
import { ApiVideoSKDServices } from './../../../../shared/application/services/api-video-skd/api-video-skd.services';
import { inject, injectable } from 'inversify';
import { get } from 'lodash';
import {
  IInitConfigUsecaseV1Port,
} from '../../../domain/port/usecase/v1/init-config.usecase.v1.port';
import { SERVICES_IOC_IDS } from '../../../../shared/infrastructure/module/services/IOC/api-video-skd-services.ioc';
import { JWT_IOC_IDS } from '../../../../shared/infrastructure/module/jwt/IOC/jwt.ioc.identifiers';
import { IJwtService } from '../../../../shared/application/services/jwt/types/jwt.services.types';
import { HttpExeption } from '../../../../shared/application/exception/http.exception';
import { HttpStatus } from '../../../../shared/application/constants/httpCode';
import { IInitConfigData } from '../../types/init-config.types';
@injectable()
export class InitConfigUsecaseV1 implements IInitConfigUsecaseV1Port {
  constructor(
    @inject(SERVICES_IOC_IDS.API_VIDEO_SDK_SERVICES) private apiVideoSKDServices: ApiVideoSKDServices,
    @inject(JWT_IOC_IDS.JWT_SERVICE) private jwtService: IJwtService,
  ) {}
  async execute(Input: InitConfigUsecaseV1Input):Promise<IInitConfigData> {
    try {
      const validateToke = this.jwtService.verify(Input.token);
      if (!get(validateToke, 'isValidToken', true)) {
        throw new HttpExeption('Token is expired or invalid', HttpStatus.UNAUTHORIZED);
      }

      return this.apiVideoSKDServices.meetingInit(Input.roomId, Input.token);
    } catch (error) {
      throw { message: get(error, 'message'), status: get(error, 'status') };
    }
  }
}
