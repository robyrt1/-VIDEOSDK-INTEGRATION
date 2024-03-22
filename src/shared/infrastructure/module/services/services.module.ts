import { Container } from 'inversify';
import { ApiVideoSKDServices } from '../../../application/services/api-video-skd/api-video-skd.services';
import { SERVICES_IOC_IDS } from './IOC/api-video-skd-services.ioc';
import { HTTP_IOC_IDS } from './IOC/http.service.ioc';
import { HttpService } from '../../../application/services/http/http.service';

export default (container: Container): Container => {
  container.bind(SERVICES_IOC_IDS.API_VIDEO_SDK_SERVICES).to(ApiVideoSKDServices);
  container.bind(HTTP_IOC_IDS.HTTP_SERVICE).to(HttpService);
  return container;
};
