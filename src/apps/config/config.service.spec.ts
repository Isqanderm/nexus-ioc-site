import { Test } from '@nexus-ioc/testing';
import { ConfigService } from './config.service';

describe('ConfigService', () => {
  it('should get service instance', async () => {
    const moduleRef = await Test.createModule({
      providers: [ConfigService],
    }).compile();
    const configService = await moduleRef.get<ConfigService>(ConfigService);

    expect(configService).toBeInstanceOf(ConfigService);
  });
});
