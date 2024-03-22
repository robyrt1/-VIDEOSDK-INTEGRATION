import { UsecasePort } from '../../../../../shared/application/port/usecases/use-case.port';
export interface InitConfigUsecaseV1Input {
  roomId: string;
  token: string;
}

export type IInitConfigUsecaseV1Port<Output = any, Input = InitConfigUsecaseV1Input> = UsecasePort<Output, Input>;
