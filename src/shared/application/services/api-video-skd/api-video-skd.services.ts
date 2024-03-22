import { EnvironmentService } from './../enrironment/environment.services';
import axios from 'axios';
import { inject, injectable } from 'inversify';
import { ENRIRONMENT_IOC_IDS } from '../../../infrastructure/module/enrironment/IOC/enrironment.ioc.identifiers';
import { HTTP_METHODS } from '../../constants/http-methods';

@injectable()
export class ApiVideoSKDServices {
  private urlBase: string;
  constructor(@inject(ENRIRONMENT_IOC_IDS.ENRIRONMENT_SERVICE) private environmentService: EnvironmentService) {
    this.urlBase = this.environmentService.getEnv('BASE_URL_VIDEO_SKD');
  }

  async validateRoom(roomId: string, token: string) {
    const apiUrl = this.urlBase + 'v2/rooms/validate/' + roomId;
    const data = await axios({
      method: HTTP_METHODS.GET,
      url: apiUrl,
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    });

    return data.data;
  }

  async createMeeting(token: string) {
    const apiUrl = this.urlBase + 'v2/rooms';
    const data = await axios({
      method: HTTP_METHODS.POST,
      url: apiUrl,
      data: {},
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      },
    });

    return { ...data.data, token };
  }

  async meetingInit(roomId: string, token: string) {
    const apiUrl = this.urlBase + 'infra/v1/meetings/init-config';
    const data = await axios({
      method: HTTP_METHODS.POST,
      url: apiUrl,
      data: { roomId },
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      },
    });

    return data.data;
  }

  async deactivateARoom(token: string, roomId: string) {
    const apiUrl = this.urlBase + 'v2/rooms/deactivate';
    const data = await axios({
      method: HTTP_METHODS.POST,
      url: apiUrl,
      data: { roomId },
      headers: {
        authorization: token,
        'Content-Type': 'application/json',
      },
    });

    return data.data;
  }
}
