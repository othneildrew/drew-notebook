import { Suspense, lazy, useState, type ComponentType, type ReactElement } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import CodeBlock from '@theme/CodeBlock';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import styles from './styles.module.css';

interface SourceFile {
  title: string;
  source: string;
}

interface ExperimentProps {
  load: () => Promise<{ default: ComponentType }>;
  files: SourceFile[];
}

export default function Experiment({ load, files }: ExperimentProps): ReactElement {
  const [Demo] = useState(() => lazy(load));

  return (
    <>
      <div className={styles.stage}>
        <BrowserOnly>
          {() => (
            <Suspense fallback={<div className={styles.loading}>Loading…</div>}>
              <Demo />
            </Suspense>
          )}
        </BrowserOnly>
      </div>
      <Tabs>
        {files.map(({ title, source }) => (
          <TabItem key={title} value={title} label={title}>
            <CodeBlock language="tsx" showLineNumbers>
              {source}
            </CodeBlock>
          </TabItem>
        ))}
      </Tabs>
    </>
  );
}
