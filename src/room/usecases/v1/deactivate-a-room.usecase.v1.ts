import { inject, injectable } from 'inversify';
import { get } from 'lodash';

import {
  DeactivateRoomUsecaseV1Input,
  IDeactivateRoomUsecaseV1Port,
} from '../../../room/domain/port/usecases/v1/deactivate-room.v1.usecase.port';

import { HttpStatus } from '../../../shared/application/constants/httpCode';
import { HttpExeption } from '../../../shared/application/exception/http.exception';

import { ApiVideoSKDServices } from '../../../shared/application/services/api-video-skd/api-video-skd.services';

import { IJwtService } from '../../../shared/application/services/jwt/types/jwt.services.types';
import { JWT_IOC_IDS } from '../../../shared/infrastructure/module/jwt/IOC/jwt.ioc.identifiers';
import { SERVICES_IOC_IDS } from '../../../shared/infrastructure/module/services/IOC/api-video-skd-services.ioc';

@injectable()
export class DeactivateARoomUsecaseV1 implements IDeactivateRoomUsecaseV1Port {
  constructor(
    @inject(SERVICES_IOC_IDS.API_VIDEO_SDK_SERVICES) private apiVideoSDKServices: ApiVideoSKDServices,
    @inject(JWT_IOC_IDS.JWT_SERVICE) private jwtService: IJwtService,
  ) {}

  async execute(input: DeactivateRoomUsecaseV1Input) {
    try {
      const validateToke = this.jwtService.verify(input.token);
      if (!get(validateToke, 'isValidToken', true)) {
        throw new HttpExeption('Token is expired or invalid', HttpStatus.UNAUTHORIZED);
      }
      const data = await this.apiVideoSDKServices.deactivateARoom(input.token, input.roomId);

      return data;
    } catch (error) {
      throw error;
    }
  }
}
