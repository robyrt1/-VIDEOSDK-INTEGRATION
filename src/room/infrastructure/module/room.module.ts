import { Container } from 'inversify';
import { ROOM_USECASES_IOC_IDS } from '../IOC/room.usecases.ioc.identifiers';
import { ICreateRoomV1UsecasePort } from '../../domain/port/usecases/v1/create-room.v1.usecase.port';
import { IValidateRoomUsecaseV1Port } from '../../domain/port/usecases/v1/validate-room.v1.usecase.port';
import { IDeactivateRoomUsecaseV1Port } from '../../domain/port/usecases/v1/deactivate-room.v1.usecase.port';

import { CreateRoomUseCaseV1 } from '../../usecases/v1/create-room.usecase.v1';
import { ValidateRoomUseCaseV1 } from '../../usecases/v1/validate-room.uesecase.v1';
import { DeactivateARoomUsecaseV1 } from '../../usecases/v1/deactivate-a-room.usecase.v1';

export default (container: Container): Container => {
  container.bind<ICreateRoomV1UsecasePort>(ROOM_USECASES_IOC_IDS.CREATE).to(CreateRoomUseCaseV1);
  container.bind<IValidateRoomUsecaseV1Port>(ROOM_USECASES_IOC_IDS.VALIDATE_ROOM).to(ValidateRoomUseCaseV1);
  container.bind<IDeactivateRoomUsecaseV1Port>(ROOM_USECASES_IOC_IDS.DEACTIVATE_A_ROOM).to(DeactivateARoomUsecaseV1);
  return container;
};
