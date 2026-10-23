import { useState, type ReactNode } from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import DocItemLayout from '@theme-original/DocItem/Layout';
import type { WrapperProps } from '@docusaurus/types';
import type DocItemLayoutType from '@theme/DocItem/Layout';

import { ControlsContainerContext } from '@site/src/components/Experiment/ControlsContainer';
import styles from './styles.module.css';

type DocItemLayoutProps = WrapperProps<typeof DocItemLayoutType>;

export default function DocItemLayoutWrapper(props: DocItemLayoutProps): ReactNode {
  const { frontMatter } = useDoc();
  const [controlsContainer, setControlsContainer] = useState<HTMLElement | null>(null);

  const isExperiment = Boolean((frontMatter as { experiment?: boolean }).experiment);

  if (!isExperiment) {
    return <DocItemLayout {...props} />;
  }

  return (
    <ControlsContainerContext.Provider value={controlsContainer}>
      <div className="row">
        <div className="col col--8">
          <DocItemLayout {...props} />
        </div>
        <aside className="col col--4">
          <div ref={setControlsContainer} className={styles.controls} />
        </aside>
      </div>
    </ControlsContainerContext.Provider>
  );
}
