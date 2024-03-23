import { FindSessionsByIdUsecaseV1 } from './../../application/usecases/v1/find-sessions-by-id.usecase.v1';
import { Container } from "inversify";
import { IFindSessionsUsecaseV1Port } from "../../domain/port/usecases/v1/find-sessions.usecase.v2";
import { SESSION_IOC_IDS } from "../IOC/session.ioc.identifiers";
import { FindSessionsUsecaseV1 } from "../../application/usecases/v1/find-sessions.usecase.v1";
import { IFindSessionsByIdUsecaseV1Port } from "../../domain/port/usecases/v1/find-sessions-by-id.usecase.v1";

export default (container:Container):Container =>{
  container.bind<IFindSessionsUsecaseV1Port>(SESSION_IOC_IDS.FIND_SESSIONS).to(FindSessionsUsecaseV1)
  container.bind<IFindSessionsByIdUsecaseV1Port>(SESSION_IOC_IDS.FIND_SESSIONS_BY_ID).to(FindSessionsByIdUsecaseV1)
  return container
}