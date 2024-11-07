import React from 'react';
import { i18nHook } from '../../../hooks/i18n';
import { CodePreview } from '../../CodePreview';

export const CircularDependency: React.FC = () => {
  const t = i18nHook();

  return (
    <div className="page">
      <h1>{t('pages.circular-dependency.title')}</h1>
      <p>{t('pages.circular-dependency.description')}</p>

      <h2>{t('pages.circular-dependency.forward-ref.title')}</h2>
      <CodePreview language="typescript">
        {`
@Injectable()
export class ServiceA {
  constructor(
    @Inject(forwardRef(() => ServiceB))
    private serviceB: ServiceB
  ) {}
}

@Injectable()
export class ServiceB {
  constructor(
    @Inject(forwardRef(() => ServiceA))
    private serviceA: ServiceA
  ) {}
}`}
      </CodePreview>

      <h2>{t('pages.circular-dependency.module-ref.title')}</h2>
      <CodePreview language="typescript">
        {`
@Injectable()
export class ServiceA {
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    const serviceB = this.moduleRef.get(ServiceB);
    // Используйте serviceB здесь
  }
}`}
      </CodePreview>
    </div>
  );
}; 