import { UsecasePort } from '../../../../../shared/application/port/usecases/use-case.port';
export interface IValidateRoomUsecaseV1Input {
  roomId: string;
  token: string;
}
export type IValidateRoomUsecaseV1Port<Output = any, Input = IValidateRoomUsecaseV1Input> = UsecasePort<Output, Input>;
