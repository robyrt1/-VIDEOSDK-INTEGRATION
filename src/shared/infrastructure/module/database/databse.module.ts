import { Container } from 'inversify';
import { Database } from '../../../application/services/database/database';
import { DATABASE_IOC_IDS } from './Ioc/database.ioc.identifiers';
import { IDatabase } from '../../../application/services/database/types/database.service.types';

export default (container: Container): Container => {
  container.bind<IDatabase>(DATABASE_IOC_IDS.DATABASE).toConstantValue(Database.getInstance());

  return container;
};
