import React from 'react';

type Language = string;
interface CodePreviewProps {
  children: string;
  language?: Language;
  showLineNumbers?: boolean;
  title?: string;
}

export const CodePreview: React.FC<CodePreviewProps> = (props) => {
  return (
    <section className="code-preview">
      <div className="container">
        <div className="code-wrapper">
          <div className="code-header">
            <span className="file-name">{props.title}</span>
            <div className="actions">
              <button className="copy-button">Copy</button>
            </div>
          </div>
          <pre className="code-block">
            <code>{props.children}</code>
          </pre>
        </div>
      </div>
    </section>
  );
};
