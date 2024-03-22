import { Container } from 'inversify';
import { IInitConfigUsecaseV1Port } from '../../domain/port/usecase/v1/init-config.usecase.v1.port';
import { MEETING_USECASE_IOC_IDS } from '../IOC/meeting.usecase.ioc.identifiers';
import { InitConfigUsecaseV1 } from '../../usecases/v1/init-config.usecase.v1';

export default (container: Container): Container => {
  container.bind<IInitConfigUsecaseV1Port>(MEETING_USECASE_IOC_IDS.INIT).to(InitConfigUsecaseV1);
  return container;
};
