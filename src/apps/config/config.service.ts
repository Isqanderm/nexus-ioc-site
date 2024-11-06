import { Injectable } from '@nexus-ioc/core';

@Injectable()
export class ConfigService {
  getConfig() {
    return {
      port: Number(process.env.PORT) || 3000,
      isServerSide: Boolean(process.env.IS_SERVER),
    };
  }
}
