import { HttpStatus } from '@nestjs/common';
import { injectable } from 'inversify';
import { env } from 'node:process';
@injectable()
export class EnvironmentService implements IEnvironmentService {
  getEnv(envName: string) {
    if (!env[envName])
      throw { message: `enviroment var '${envName}' not found/not loaded.`, status: HttpStatus.INTERNAL_SERVER_ERROR };
    return env[envName];
  }
}

export interface IEnvironmentService {
  getEnv(envName: string): any;
}
