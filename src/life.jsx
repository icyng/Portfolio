import useLifeFeed from './hooks/useLifeFeed';
import { FiArrowUpRight } from 'react-icons/fi';
import content from './data/portfolio';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MARKDOWN_PLUGINS = [remarkGfm];
const MarkdownHeading = ({ children }) => <h5>{children}</h5>;
const MarkdownLink = ({ children, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
);
const MARKDOWN_COMPONENTS = {
  h1: MarkdownHeading, h2: MarkdownHeading, h3: MarkdownHeading,
  h4: MarkdownHeading, h5: MarkdownHeading, h6: MarkdownHeading,
  a: MarkdownLink,
};

function LifeItem({ item }) {
  return (
    <article className="life-item">
      <h4>{item.url ? <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}<FiArrowUpRight aria-hidden="true" /></a> : item.title}</h4>
      {item.body ? <div className="life-body">
        <Markdown remarkPlugins={MARKDOWN_PLUGINS} components={MARKDOWN_COMPONENTS}>{item.body}</Markdown>
      </div> : item.bodyUnavailable ? <p className="life-body-empty">本文を取得できませんでした。リンク先で確認できます。</p> : null}
    </article>
  );
}

export default function Life() {
  const { feed, state, groups } = useLifeFeed();

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
                <LifeItem key={item.id} item={item} />
              ))}</div>
            </div>
          ))}
        </div>
      ) : <p className="life-message">進行中・未完了の項目はありません。</p>)}
    </section>
  );
}
