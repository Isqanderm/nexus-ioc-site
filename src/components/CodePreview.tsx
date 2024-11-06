import React from 'react';

export const CodePreview: React.FC = () => {
  const code = `
@Injectable()
export class UserService {
  constructor(
    @Inject('DATABASE')
    private readonly db: Database,
    private readonly logger: LoggerService
  ) {}

  async getUsers(): Promise<User[]> {
    this.logger.log('Fetching users...');
    return this.db.users.findAll();
  }
}`;

  return (
    <section className="code-preview">
      <div className="container">
        <div className="code-wrapper">
          <div className="code-header">
            <span className="file-name">user.service.ts</span>
            <div className="actions">
              <button className="copy-button">Copy</button>
            </div>
          </div>
          <pre className="code-block">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </section>
  );
}; 