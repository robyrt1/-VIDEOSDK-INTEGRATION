import { Container } from 'inversify';

import { ENRIRONMENT_IOC_IDS } from './IOC/enrironment.ioc.identifiers';

import { EnvironmentService } from '../../../application/services/enrironment/environment.services';

import { IEnvironmentService } from '../../../application/services/enrironment/types/environment.services.types';

export default (container: Container): Container => {
  container.bind<IEnvironmentService>(ENRIRONMENT_IOC_IDS.ENRIRONMENT_SERVICE).to(EnvironmentService);

  return container;
};
