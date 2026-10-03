import { useEffect, useState } from 'react';

export default function useLifeFeed() {
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

  return { feed, state, groups };
}
