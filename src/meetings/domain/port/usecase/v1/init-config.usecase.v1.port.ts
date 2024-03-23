import { UsecasePort } from '../../../../../shared/application/port/usecases/use-case.port';
import { IInitConfigData, IInitConfigPayload } from '../../../../application/types/init-config.types';

export type IInitConfigUsecaseV1Port<Output = IInitConfigData, Input = IInitConfigPayload> = UsecasePort<Output, Input>;
