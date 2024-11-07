import React from 'react';
import { i18nHook } from '../../../hooks/i18n';
import { CodePreview } from '../../CodePreview';

export const Testing: React.FC = () => {
  const t = i18nHook();

  return (
    <div className="page">
      <h1>{t('pages.testing.title')}</h1>
      <p>{t('pages.testing.description')}</p>

      <h2>{t('pages.testing.unit-testing.title')}</h2>
      <CodePreview language="typescript">
        {`
import { createMock } from '@nexus-ioc/testing';

describe('UserService', () => {
  let userService: UserService;
  let databaseService: DatabaseService;

  beforeEach(() => {
    databaseService = createMock<DatabaseService>();
    userService = new UserService(databaseService);
  });

  it('should find user by id', async () => {
    const mockUser = { id: 1, name: 'John' };
    databaseService.findOne.mockResolvedValue(mockUser);

    const result = await userService.findById(1);
    expect(result).toEqual(mockUser);
  });
});`}
      </CodePreview>

      <h2>{t('pages.testing.e2e-testing.title')}</h2>
      <CodePreview language="typescript">
        {`
import { createTestingModule } from '@nexus-ioc/testing';

describe('UserController (e2e)', () => {
  let app: INexusApplication;

  beforeEach(async () => {
    const moduleRef = await createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNexusApplication();
    await app.init();
  });

  it('/users (GET)', async () => {
    const response = await app
      .inject()
      .get('/users')
      .expect(200);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: expect.any(Number) })
      ])
    );
  });
});`}
      </CodePreview>
    </div>
  );
}; 