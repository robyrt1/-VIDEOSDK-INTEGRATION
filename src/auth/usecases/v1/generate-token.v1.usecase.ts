import { injectable, inject } from 'inversify';

import { JWT_IOC_IDS } from '../../../shared/infrastructure/module/jwt/IOC/jwt.ioc.identifiers';
import { ENRIRONMENT_IOC_IDS } from '../../../shared/infrastructure/module/enrironment/IOC/enrironment.ioc.identifiers';

import { IJwtService } from './../../../shared/application/services/jwt/types/jwt.services.types';
import { IEnvironmentService } from '../../../shared/application/services/enrironment/types/environment.services.types';
import { GenerateTokenV1UsecasePort } from '../../domain/port/usecases/v1/generate-token.v1.usecase.port';

@injectable()
export class GenerateTokenV1Auth implements GenerateTokenV1UsecasePort<any, any> {
  constructor(
    @inject(JWT_IOC_IDS.JWT_SERVICE) private jwt: IJwtService,
    @inject(ENRIRONMENT_IOC_IDS.ENRIRONMENT_SERVICE) private environmentSharedService: IEnvironmentService,
  ) {}
  execute() {
    try {
      const API_KEY = this.environmentSharedService.getEnv('API_KEY');
      const payload = {
        apikey: API_KEY,
        permissions: [`allow_join`],
      };
      return this.jwt.genereted(payload);
    } catch (error) {
      return error;
    }
  }
}
