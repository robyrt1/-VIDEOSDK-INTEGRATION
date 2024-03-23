
export interface IInitConfigPayload {
  roomId: string;
  token: string;
}


export interface IInitConfigData {
  data: Data;
}

interface Data {
  baseUrl:       string;
  signalingUrl:  null;
  iceServers:    string;
  observability: Observability;
}

interface Observability {
  metaData: MetaData;
  jwt:      string;
  traces:   Traces;
  logs:     Logs;
  metrices: Logs;
}

interface Logs {
  endPoint: string;
  enabled:  boolean;
}

interface MetaData {
  userId: string;
  email:  string;
}

interface Traces {
  endPoint:   string;
  pbEndPoint: string;
  enabled:    boolean;
}
