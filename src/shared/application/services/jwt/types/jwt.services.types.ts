interface Jwt {
  genereted(data: string | object | Buffer): any;
  verify(token: string): any;
}

export type IJwtService = Jwt;
