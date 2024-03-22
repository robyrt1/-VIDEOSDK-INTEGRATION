import { inject, injectable } from 'inversify';
import { HttpStatus } from '../../constants/httpCode';
import jwt from 'jsonwebtoken';
import { IEnvironmentService } from '../enrironment/types/environment.services.types';
import { ENRIRONMENT_IOC_IDS } from './../../../infrastructure/module/enrironment/IOC/enrironment.ioc.identifiers';
import { IJwtService } from './types/jwt.services.types';

@injectable()
export class JwtService implements IJwtService {
  constructor(@inject(ENRIRONMENT_IOC_IDS.ENRIRONMENT_SERVICE) private environmentService: IEnvironmentService) {}
  genereted(payload: string | object | Buffer) {
    try {
      const expireIn = this.environmentService.getEnv('JWT_EXPIRES_IN');
      const secret = this.environmentService.getEnv('JWT_SECRET');
      const options = {
        expiresIn: expireIn,
        algorithm: 'HS256',
      };
      return jwt.sign(payload, secret, options as jwt.SignOptions);
    } catch (err) {
      throw {
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        err,
      };
    }
  }

  verify(token: string) {
    let result;
    try {
      const secret = process.env.JWT_SECRET;
      const decoded = jwt.verify(token, secret);

      result = { isValidToken: true, data: decoded };
    } catch (err) {
      result = { isValidToken: false, err };
    }
    return result;
  }
}
