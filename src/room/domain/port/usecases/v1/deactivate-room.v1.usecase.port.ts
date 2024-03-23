import { UsecasePort } from '../../../../../shared/application/port/usecases/use-case.port';
export interface DeactivateRoomUsecaseV1Input {
  roomId: string;
  token: string;
}
export type IDeactivateRoomUsecaseV1Port<Output = any, Input = DeactivateRoomUsecaseV1Input> = UsecasePort<
  Output,
  Input
>;
