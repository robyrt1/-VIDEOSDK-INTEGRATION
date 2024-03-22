interface EnvironmentService {
  getEnv(envName: string): any;
}

export type IEnvironmentService = EnvironmentService;
