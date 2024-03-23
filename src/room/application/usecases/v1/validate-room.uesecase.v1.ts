import { inject, injectable } from 'inversify';

import { ApiVideoSKDServices } from './../../../../shared/application/services/api-video-skd/api-video-skd.services';

import { SERVICES_IOC_IDS } from '../../../../shared/infrastructure/module/services/IOC/api-video-skd-services.ioc';
import { JWT_IOC_IDS } from '../../../../shared/infrastructure/module/jwt/IOC/jwt.ioc.identifiers';

import {
  IValidateRoomUsecaseV1Port,
  IValidateRoomUsecaseV1Input,
} from '../../../domain/port/usecases/v1/validate-room.v1.usecase.port';
import { get } from 'lodash';
import { IJwtService } from '../../../../shared/application/services/jwt/types/jwt.services.types';

import { HttpStatus } from '../../../../shared/application/constants/httpCode';
import { HttpExeption } from '../../../../shared/application/exception/http.exception';

@injectable()
export class ValidateRoomUseCaseV1 implements IValidateRoomUsecaseV1Port {
  constructor(
    @inject(SERVICES_IOC_IDS.API_VIDEO_SDK_SERVICES) private apiVideoSKDServices: ApiVideoSKDServices,
    @inject(JWT_IOC_IDS.JWT_SERVICE) private jwtService: IJwtService,
  ) {}
  async execute(input: IValidateRoomUsecaseV1Input) {
    try {
      const validateToke = this.jwtService.verify(input.token);
      if (!get(validateToke, 'isValidToken', true)) {
        throw new HttpExeption('Token is expired or invalid', HttpStatus.UNAUTHORIZED);
      }
      const data = await this.apiVideoSKDServices.validateRoom(input.roomId, input.token);

      return data;
    } catch (error) {
      console.log('🚀 ~ ValidateRoomUseCaseV1 ~ execute ~ error:', error);
      throw error;
    }
  }
}
