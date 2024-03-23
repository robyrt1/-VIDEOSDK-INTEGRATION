import { UsecasePort } from "../../../../../shared/application/port/usecases/use-case.port";
import { IFindSessionPayload, ISessionData } from "../../../../application/types/find-session.type";



export type IFindSessionsUsecaseV1Port<Output=ISessionData,Input=IFindSessionPayload> = UsecasePort<Output,Input>