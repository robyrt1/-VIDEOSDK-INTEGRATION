import { ApiVideoSKDServices } from './../../../shared/application/services/api-video-skd/api-video-skd.services';
import { inject, injectable } from 'inversify';
import { AUTH_USE_CASES_IOC_IDS } from '../../../auth/infrastructure/Ioc/auth.usecases.ioc.identifiers';
import { GenerateTokenV1UsecasePort } from '../../../auth/domain/port/usecases/v1/generate-token.v1.usecase.port';
import { ICreateRoomV1UsecasePort } from '../../domain/port/usecases/v1/create-room.v1.usecase.port';
import { SERVICES_IOC_IDS } from '../../../shared/infrastructure/module/services/IOC/api-video-skd-services.ioc';

@injectable()
export class CreateRoomUseCaseV1 implements ICreateRoomV1UsecasePort {
  constructor(
    @inject(AUTH_USE_CASES_IOC_IDS.GENERATE_TOKEN) private GenerateTokenV1Usecase: GenerateTokenV1UsecasePort,
    @inject(SERVICES_IOC_IDS.API_VIDEO_SDK_SERVICES) private apiVideoSKDServices: ApiVideoSKDServices,
  ) {}
  async execute() {
    try {
      const token = await this.GenerateTokenV1Usecase.execute();
      const data = await this.apiVideoSKDServices.createMeeting(token);

      return data;
    } catch (error) {
      throw error;
    }
  }
}
