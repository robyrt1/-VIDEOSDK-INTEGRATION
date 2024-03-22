import { inject } from 'inversify';
import { Request } from 'express';
import { controller, httpGet, request } from 'inversify-express-utils';

import { AUTH_USE_CASES_IOC_IDS } from '../../../infrastructure/Ioc/auth.usecases.ioc.identifiers';
import { GenerateTokenV1Auth } from '../../../usecases/v1/generate-token.v1.usecase';

@controller('/api/v1/token')
export class VideoController {
  constructor(
    @inject(AUTH_USE_CASES_IOC_IDS.GENERATE_TOKEN)
    private readonly generateTokenV1Auth: GenerateTokenV1Auth,
  ) {}

  @httpGet('/')
  async generate(@request() req: Request) {
    return this.generateTokenV1Auth.execute();
  }
}
