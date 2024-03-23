import { UsecasePort } from "../../../../../shared/application/port/usecases/use-case.port";
import { IFindSessionByIDData, IFindSessionByIdPayload } from "../../../../application/types/find-session-by-id.type";



export type IFindSessionsByIdUsecaseV1Port<Output=IFindSessionByIDData,Input=IFindSessionByIdPayload> = UsecasePort<Output,Input>