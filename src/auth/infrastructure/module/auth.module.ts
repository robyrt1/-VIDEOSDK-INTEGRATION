import { GenerateTokenV1Auth } from './../../usecases/v1/generate-token.v1.usecase';
import { Container } from 'inversify';
import { AUTH_USE_CASES_IOC_IDS } from '../Ioc/auth.usecases.ioc.identifiers';

export default (container: Container): Container => {
  container.bind(AUTH_USE_CASES_IOC_IDS.GENERATE_TOKEN).to(GenerateTokenV1Auth);
  return container;
};
