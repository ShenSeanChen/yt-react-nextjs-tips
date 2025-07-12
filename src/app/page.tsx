import Dashboard from '@/components/Dashboard';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <h1>🚀 React Mastery Tutorial</h1>
            <p className="header-subtitle">
              Master the 8 essential React patterns that cover 95% of use cases
            </p>
          </div>
        </div>
      </header>
      
      <main>
        <Dashboard />
      </main>
      
      <footer className="footer">
        <div className="container">
          <p>
            Built for teaching React fundamentals to vibe coders and developers who want to stop getting stuck with AI tools
          </p>
        </div>
      </footer>
    </div>
  );
}
