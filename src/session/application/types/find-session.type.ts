export interface IFindSessionPayload {
  token:string,
  roomId: string
}


export interface ISessionData {
  pageInfo: PageInfo;
  data:     Datum[];
}

export interface Datum {
  apiKey:              string;
  start:               string;
  end:                 string;
  participants:        Participant[];
  region:              string;
  usageDataCalculated: boolean;
  calculationErrored:  boolean;
  isFirstSession:      boolean;
  recordingLog:        any[];
  livestreamLog:       any[];
  hlsLog:              any[];
  activeDuration:      number;
  maxJoinedPeersCount: number;
  id:                  string;
  roomId:              string;
  status:              string;
  links:               Links;
  webhook:             Webhook;
}

export interface Links {
  get_room:    string;
  get_session: string;
}

export interface Participant {
  events:            Events;
  participantId:     string;
  name:              string;
  mediaRegion:       string;
  timelog:           Timelog[];
  initTime:          number;
  deviceInfo:        DeviceInfo;
  geoLocation:       GeoLocation;
  changeModeHistory: ChangeModeHistory[];
  mode:              string;
  _id:               string;
}

export interface ChangeModeHistory {
  mode:    string;
  timelog: string;
  _id:     string;
}

export interface DeviceInfo {
  sdkType:          string;
  sdkVersion:       string;
  platform:         string;
  browserUserAgent: BrowserUserAgent;
}

export interface BrowserUserAgent {
  browser:  Browser;
  os:       OS;
  platform: Platform;
}

export interface Browser {
  name:    string;
  version: string;
}

export interface OS {
  name: string;
}

export interface Platform {
  type: string;
}

export interface Events {
  mic:              Mic[];
  webcam:           Mic[];
  screenShare:      any[];
  screenShareAudio: any[];
}

export interface Mic {
  start: string;
  end:   string;
  _id:   string;
}

export interface GeoLocation {
  city:    string;
  country: string;
  region:  string;
}

export interface Timelog {
  start: string;
  end:   string;
}

export interface Webhook {
  totalCount:   number;
  successCount: number;
  data:         any[];
}

export interface PageInfo {
  currentPage: number;
  perPage:     number;
  lastPage:    number;
  total:       number;
}
