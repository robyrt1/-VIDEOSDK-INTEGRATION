import { inject, injectable } from 'inversify';
import { IJwtService } from './../../shared/application/services/jwt//types/jwt.services.types';
import { JWT_IOC_IDS } from '../../shared/infrastructure/module/jwt/IOC/jwt.ioc.identifiers';

@injectable()
export class AuthService {
  public constructor(@inject(JWT_IOC_IDS.JWT_SERVICE) private jwtService: IJwtService) {}

  public async generateJwt(payload: Buffer | object): Promise<string> {
    return this.jwtService.genereted(payload);
  }
}
