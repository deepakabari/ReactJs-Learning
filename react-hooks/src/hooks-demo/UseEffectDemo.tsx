import React, { useEffect, useState } from "react";
import "./UseEffectDemo.css";

type Fruit = { id: number; label: string };

const DemoBody: React.FC<{
  tick: number;
  width: number;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  clicks: number;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  debouncedQuery: string;
  isLoading: boolean;
  fetchError: string | null;
  users: string[];
  fruits: Fruit[];
}> = ({
  tick,
  width,
  count,
  setCount,
  clicks,
  query,
  setQuery,
  debouncedQuery,
  isLoading,
  fetchError,
  users,
  fruits,
}) => (
  <>
    <section className="panel gradient-1">
      <header>
        <h3>Mount + Cleanup</h3>
        <p>Timers are set on mount and cleared on unmount.</p>
      </header>
      <div className="stats">
        <div className="stat">
          <span className="label">Seconds since mount</span>
          <span className="value">{tick}</span>
        </div>
        <div className="stat">
          <span className="label">Window width</span>
          <span className="value">{width}px</span>
        </div>
      </div>
    </section>

    <section className="panel gradient-2">
      <header>
        <h3>Dependency Arrays</h3>
        <p>
          Effect runs when <code>count</code> changes.
        </p>
      </header>
      <div className="row">
        <button className="btn" onClick={() => setCount((c) => c + 1)}>
          Increment Count
        </button>
        <div className="badge">count: {count}</div>
      </div>
    </section>

    <section className="panel gradient-3">
      <header>
        <h3>Event Listeners</h3>
        <p>
          Global <code>mousedown</code> increases click count. Cleaned up on
          unmount.
        </p>
      </header>
      <div className="badge big">Document clicks: {clicks}</div>
    </section>

    <section className="panel gradient-4">
      <header>
        <h3>Debounced Effects</h3>
        <p>Typing updates after 500ms of inactivity.</p>
      </header>
      <input
        className="input"
        placeholder="Type to search users (name or email)…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="row">
        <div className="chip">query: “{query}”</div>
        <div className="chip accent">debounced: “{debouncedQuery}”</div>
      </div>
    </section>

    <section className="panel gradient-5">
      <header>
        <h3>Fetch + AbortController</h3>
        <p>Search results abort if you type again or unmount.</p>
      </header>

      {isLoading && <div className="loader">Loading…</div>}
      {fetchError && <div className="error">Error: {fetchError}</div>}

      {!isLoading && !fetchError && (
        <ul className="list">
          {users.length === 0 && debouncedQuery && (
            <li className="muted">No results</li>
          )}
          {users.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>
      )}
    </section>

    <section className="panel gradient-6">
      <header>
        <h3>Data Loaded on Mount</h3>
        <p>Fruits set from a delayed timeout (cleanup clears it).</p>
      </header>
      <ul className="tags">
        {fruits.map((f) => (
          <li key={f.id} className="tag">
            {f.label}
          </li>
        ))}
      </ul>
    </section>
  </>
);

const UseEffectDemo: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(true);
  const [tick, setTick] = useState(0);
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [clicks, setClicks] = useState(0);
  const [count, setCount] = useState(0);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [users, setUsers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [log, setLog] = useState<string[]>([]);

  const pushLog = (message: string) => {
    console.log(message);
    setLog((l) =>
      [new Date().toLocaleTimeString() + " — " + message, ...l].slice(0, 30)
    );
  };

  // componentDidMount + cleanup
  useEffect(() => {
    pushLog("Mount: start tick interval & delayed fruits");
    const interval = setInterval(() => setTick((t) => t + 1), 1000);

    const timeout = setTimeout(() => {
      setFruits([
        { id: 1, label: "Apple" },
        { id: 2, label: "Banana" },
        { id: 3, label: "Cherry" },
      ]);
      pushLog("Timeout fired: fruits set");
    }, 600);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      pushLog("Cleanup: cleared interval + timeout");
    };
  }, []);

  useEffect(() => {
    pushLog(`Effect [count]: Count changed to ${count}`);
  }, [count]);

  useEffect(() => {
    const onDocClick = () => setClicks((c) => c + 1);
    document.addEventListener("mousedown", onDocClick);
    pushLog("Effect []: Attached document mousedown listener");
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      pushLog("Cleanup: Removed document mousedown listener");
    };
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setDebouncedQuery("");
      return;
    }
    pushLog(`Debounce: waiting for query "${query}"...`);
    const id = setTimeout(() => {
      setDebouncedQuery(query.trim());
      pushLog(`Debounce: committed "${query.trim()}"`);
    }, 500);
    return () => {
      clearTimeout(id);
      pushLog("Debounce cleanup: cleared pending timeout");
    };
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      setUsers([]);
      setFetchError(null);
      return;
    }

    const ctrl = new AbortController();
    const signal = ctrl.signal;

    (async () => {
      try {
        setIsLoading(true);
        setFetchError(null);
        pushLog(`Fetch: searching users for "${debouncedQuery}"`);
        // Fake API via jsonplaceholder
        // Filter client-side just for demo purposes
        const res = await fetch("https://jsonplaceholder.typicode.com/users", {
          signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Array<{ name: string; email: string }> = await res.json();
        const filtered = data
          .filter((u) =>
            `${u.name} ${u.email}`
              .toLowerCase()
              .includes(debouncedQuery.toLowerCase())
          )
          .map((u) => `${u.name} (${u.email})`);
        setUsers(filtered);
        pushLog(`Fetch: got ${filtered.length} result(s)`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (e: any) {
        if (e.name === "AbortError") {
          pushLog("Fetch aborted (cleanup)");
        } else {
          setFetchError(e.message ?? "Unknown error");
          pushLog(`Fetch error: ${e.message ?? e}`);
        }
      } finally {
        setIsLoading(false);
      }
    })();

    return () => {
      ctrl.abort();
      pushLog("Fetch cleanup: aborting in-flight request");
    };
  }, [debouncedQuery]);

  useEffect(() => {
    const prevTitle = document.title;
    document.title = `Ticks: ${tick} | Count: ${count}`;
    return () => {
      document.title = prevTitle;
    };
  }, [tick, count]);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    pushLog("Effect []: Attached window resize listener");
    return () => {
      window.removeEventListener("resize", onResize);
      pushLog("Cleanup: Removed window resize listener");
    };
  }, []);

  // NOTE: This is for education only; avoid in production unless intentional.
  useEffect(() => {
    // Anything here will run after EVERY render
    // We keep it passive: just log once in a while for the demo.
    pushLog("Effect (no deps): ran after a render");
    return () => {
      // This cleanup will run BEFORE the next run (and before unmount).
      // We keep it minimal to avoid noisy logs.
    };
  }, []);

  return (
    <div className={`uedemo ${theme}`}>
      <header className="appbar">
        <h2 className="title">useEffect Demo</h2>
        <div className="controls">
          <button
            className="btn ghost"
            onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
            aria-label="Toggle theme"
          >
            Toggle {theme === "light" ? "Dark" : "Light"}
          </button>
          <button
            className="btn"
            onClick={() => setMounted((m) => !m)}
            aria-label="Toggle mount"
            title="Unmount to see cleanups fire"
          >
            {mounted ? "Unmount Demo" : "Mount Demo"}
          </button>
        </div>
      </header>

      <main className="grid">
        {mounted ? (
          <DemoBody
            tick={tick}
            width={width}
            count={count}
            setCount={setCount}
            clicks={clicks}
            query={query}
            setQuery={setQuery}
            debouncedQuery={debouncedQuery}
            isLoading={isLoading}
            fetchError={fetchError}
            users={users}
            fruits={fruits}
          />
        ) : (
          <div className="panel gradient-0">
            <h3>Demo Unmounted</h3>
            <p>Re-mount to restart timers, listeners, and effects.</p>
          </div>
        )}

        <aside className="log panel">
          <h3>Effect Log</h3>
          <p className="muted">
            Also check the browser console for more information.
          </p>
          <ul className="loglist">
            {log.map((line, i) => (
              <li key={i}>{line}</li>
            ))}
          </ul>
        </aside>
      </main>

      <footer className="footer">
        <small>
          Patterns: mount/cleanup • deps • event listeners • debounce • fetch
          abort • title side-effect • resize • no-deps pitfall
        </small>
      </footer>
    </div>
  );
};

export default UseEffectDemo;
