import { useEffect, useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import content from './data/portfolio';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Life() {
  const [feed, setFeed] = useState(null);
  const [state, setState] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();
    let fetching = false;
    async function refresh() {
      if (fetching || controller.signal.aborted) return;
      fetching = true;
      try {
        const result = await fetch('/api/life', { signal: controller.signal });
        if (!result.ok) throw new Error('Life unavailable');
        const data = await result.json();
        if (!Array.isArray(data.groups) || !data.groups.every(group => typeof group.name === 'string' && Array.isArray(group.items))) {
          throw new Error('Invalid Life data');
        }
        if (controller.signal.aborted) return;
        setFeed(data);
        setState('ready');
      } catch {
        if (!controller.signal.aborted) setState('error');
      } finally {
        fetching = false;
      }
    }
    refresh();
    const interval = window.setInterval(refresh, 5 * 60 * 1000);
    return () => { controller.abort(); window.clearInterval(interval); };
  }, []);

  const groups = feed?.groups.filter(group => !/^done$/i.test(group.name.trim()) && group.items.length) ?? [];

  return (
    <section id="life" className="content-section life-section" aria-labelledby="life-title">
      <div className="life-heading">
        <h2 id="life-title" className="section-title">Life</h2>
        <a href={content.life.href} target="_blank" rel="noopener noreferrer" aria-label="LifeをGitHubで開く">
          <FiArrowUpRight aria-hidden="true" />
        </a>
      </div>
      {state === 'loading' && <p className="life-message" role="status">読み込み中…</p>}
      {state === 'error' && <p className="life-message" role="status">
        {feed ? '更新を取得できませんでした。前回の内容を表示しています。' : '現在、Lifeを読み込めません。'}
      </p>}
      {feed && (groups.length ? (
        <div className="life-grid">
          {groups.map(group => (
            <div className="life-group" key={group.name}>
              <h3>{group.name}</h3>
              <div className="life-items">{group.items.map(item => (
                <article className="life-item" key={item.id}>
                  <h4>{item.url ? <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}<FiArrowUpRight aria-hidden="true" /></a> : item.title}</h4>
                  {item.body ? <div className="life-body">
                    <Markdown remarkPlugins={[remarkGfm]} components={{
                      h1: ({ children }) => <h5>{children}</h5>,
                      h2: ({ children }) => <h5>{children}</h5>,
                      h3: ({ children }) => <h5>{children}</h5>,
                      h4: ({ children }) => <h5>{children}</h5>,
                      h5: ({ children }) => <h5>{children}</h5>,
                      h6: ({ children }) => <h5>{children}</h5>,
                      a: ({ children, href }) => <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>,
                    }}>{item.body}</Markdown>
                  </div> : item.bodyUnavailable ? <p className="life-body-empty">本文を取得できませんでした。リンク先で確認できます。</p> : null}
                </article>
              ))}</div>
            </div>
          ))}
        </div>
      ) : <p className="life-message">進行中・未完了の項目はありません。</p>)}
    </section>
  );
}
