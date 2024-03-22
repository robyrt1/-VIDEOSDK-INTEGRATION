import { Container } from 'inversify';
import { IJwtService } from '../../../application/services/jwt/types/jwt.services.types';
import { JWT_IOC_IDS } from './IOC/jwt.ioc.identifiers';
import { JwtService } from '../../../application/services/jwt/jwt.services';

export default (container: Container): Container => {
  container.bind<IJwtService>(JWT_IOC_IDS.JWT_SERVICE).to(JwtService);

  return container;
};
