import { controller, httpGet, httpPost, requestBody, requestHeaders, requestParam } from 'inversify-express-utils';
import { ROOM_USECASES_IOC_IDS } from '../../../infrastructure/IOC/room.usecases.ioc.identifiers';
import { inject } from 'inversify';
import { ICreateRoomV1UsecasePort } from '../../../domain/port/usecases/v1/create-room.v1.usecase.port';
import { get } from 'lodash';
import { IValidateRoomUsecaseV1Port } from '../../..//domain/port/usecases/v1/validate-room.v1.usecase.port';
import { DeactivateRoomUsecaseV1Input, IDeactivateRoomUsecaseV1Port } from '../../../domain/port/usecases/v1/deactivate-room.v1.usecase.port';

@controller('/api/v1/room')
export class RoomControllerV1 {
  constructor(
    @inject(ROOM_USECASES_IOC_IDS.CREATE) private createRoomV1Usecase: ICreateRoomV1UsecasePort,
    @inject(ROOM_USECASES_IOC_IDS.VALIDATE_ROOM) private validateRoomUscaseV1: IValidateRoomUsecaseV1Port,
    @inject(ROOM_USECASES_IOC_IDS.DEACTIVATE_A_ROOM) private deactivateRoomUsecaseV1: IDeactivateRoomUsecaseV1Port,
  ) {}

  @httpGet('/createMeeting')
  async create() {
    return this.createRoomV1Usecase.execute();
  }

  @httpGet('/validate/:roomId')
  async validateRoom(@requestParam('roomId') roomId: string, @requestHeaders() header: any) {
    const getToken = get(header, 'authorization', '');
    return this.validateRoomUscaseV1.execute({ roomId, token: getToken });
  }

  @httpPost('/deactivate')
  async deactivateRoom(@requestHeaders() header: any, @requestBody() body:Omit<DeactivateRoomUsecaseV1Input, 'token'>){
    const getToken = get(header, 'authorization', '');
    return this.deactivateRoomUsecaseV1.execute({...body, token:getToken})
  }
}
