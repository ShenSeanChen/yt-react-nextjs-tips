/**
 * File: src/components/Dashboard.tsx
 * 
 * Progressive React Tutorial - Personal Dashboard
 * Uncomment sections as you teach each pattern!
 */

'use client';

import React, { useState, useEffect, useMemo, useCallback, createContext, useContext } from 'react';

// =====================================
// PATTERN 1: useState - State Management
// =====================================

function Counter() {
  // 🐍 Python equivalent: self.count = 0 in __init__
  // But Python needs manual UI updates, React auto-updates!
  
  // ❌ BAD: Variable doesn't trigger re-renders
  // let count = 0;
  // const increment = () => {
  //   count += 1;  // Changes but UI doesn't update!
  //   console.log('Count changed to:', count); // Only shows in console
  // };

  // ✅ GOOD: useState triggers automatic re-renders
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div className="widget">
      <h3>
        <span className="widget-icon">🔢</span>
        Counter Widget
        <span className="pattern-badge">useState</span>
      </h3>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', margin: '1rem 0' }}>
          {count}
        </div>
        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
          Click buttons to see automatic re-renders
        </p>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        <button onClick={decrement} className="btn btn-secondary">-</button>
        <button onClick={reset} className="btn btn-secondary">Reset</button>
        <button onClick={increment} className="btn btn-primary">+</button>
      </div>
    </div>
  );
}

// =====================================
// PATTERN 2: useEffect - Side Effects
// =====================================

function Clock() {
  const [time, setTime] = useState<Date | null>(null);

  // ❌ BAD: Side effect in render function
  // This creates infinite timers and memory leaks!
  // setInterval(() => {
  //   setTime(new Date());
  // }, 1000);

  // ✅ GOOD: useEffect handles side effects properly
  useEffect(() => {
    // Fix hydration mismatch by only setting time after client mount
    setTime(new Date());
    
    // 🐍 Python: Like __enter__ in context manager
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    
    // 🐍 Python: Like __exit__ in context manager
    return () => clearInterval(timer); // Cleanup prevents memory leaks
  }, []); // Empty array = run once on mount

  return (
    <div className="widget">
      <h3>
        <span className="widget-icon">⏰</span>
        Live Clock
        <span className="pattern-badge">useEffect</span>
      </h3>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '1rem 0' }}>
          {time ? time.toLocaleTimeString() : '--:--:-- --'}
        </div>
        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
          Updates every second with automatic cleanup
        </p>
      </div>
    </div>
  );
}

// =====================================
// PATTERN 3: Props & Component Composition
// =====================================

// ❌ BAD: Hardcoded, not reusable
// function SubmitButton() {
//   return <button className="btn btn-primary">Submit</button>;
// }
// function CancelButton() {
//   return <button className="btn btn-secondary">Cancel</button>;
// }

// ✅ GOOD: Reusable component with props
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'destructive';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  style?: React.CSSProperties;
}

function Button({ variant = 'primary', children, onClick, disabled = false, type = 'button', style }: ButtonProps) {
  // 🐍 Python: Like function parameters with defaults
  // def button(variant='primary', children=None, on_click=None, disabled=False):
  
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={style}
    >
      {children}
    </button>
  );
}

function ButtonShowcase() {
  return (
    <div className="widget">
      <h3>
        <span className="widget-icon">🎨</span>
        Button Variants
        <span className="pattern-badge">Props</span>
      </h3>
      <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', marginBottom: '1rem' }}>
        One component, multiple styles via props
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <Button variant="primary" onClick={() => alert('Primary!')}>
          Primary Button
        </Button>
        <Button variant="secondary" onClick={() => alert('Secondary!')}>
          Secondary Button
        </Button>
        <Button variant="destructive" onClick={() => alert('Danger!')}>
          Destructive Button
        </Button>
        <Button disabled onClick={() => alert('Never fires')}>
          Disabled Button
        </Button>
      </div>
    </div>
  );
}

// =====================================
// PATTERN 4: Conditional Rendering
// =====================================

interface User {
  name: string;
  email: string;
}

function UserProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = () => {
    setLoading(true);
    setError(null);
    setUser(null);
    
    // Simulate API call
    setTimeout(() => {
      if (Math.random() > 0.7) {
        setError('Failed to load user data');
      } else {
        setUser({ name: 'John Doe', email: 'john@example.com' });
      }
      setLoading(false);
    }, 2000);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // ❌ BAD: Shows everything at once
  // return (
  //   <div className="widget">
  //     <div>Loading...</div>
  //     <div>Error: Something went wrong</div>
  //     <div>Welcome, John!</div>
  //   </div>
  // );

  // ✅ GOOD: Show appropriate state
  // 🐍 Python: Like if/elif/else statements
  return (
    <div className="widget">
      <h3>
        <span className="widget-icon">👤</span>
        User Profile
        <span className="pattern-badge">Conditional</span>
      </h3>
      
      {loading && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="status-loading">Loading user data...</div>
        </div>
      )}
      
      {error && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="status-error">❌ {error}</div>
          <Button onClick={fetchUser} variant="secondary" style={{ marginTop: '1rem' }}>
            Try Again
          </Button>
        </div>
      )}
      
      {!loading && !error && !user && (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="status-loading">Please log in</div>
        </div>
      )}

      {user && (
        <div>
          <div className="status-success">✅ User loaded successfully!</div>
          <div style={{ marginTop: '1rem' }}>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
          <Button onClick={fetchUser} variant="secondary" style={{ marginTop: '1rem' }}>
            Reload User
          </Button>
        </div>
      )}
    </div>
  );
}

// =====================================
// PATTERN 5: List Rendering & Keys
// =====================================

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn React useState', completed: true },
    { id: 2, text: 'Master useEffect', completed: true },
    { id: 3, text: 'Understand props', completed: false },
    { id: 4, text: 'Practice conditional rendering', completed: false },
    { id: 5, text: 'Build awesome apps', completed: false },
  ]);

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="widget">
      <h3>
        <span className="widget-icon">📝</span>
        Learning Checklist
        <span className="pattern-badge">List Rendering</span>
      </h3>
      
      <div style={{ marginBottom: '1rem' }}>
        <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
          Progress: {completedCount}/{todos.length} completed
        </p>
        <div style={{ 
          background: 'var(--muted)', 
          height: '8px', 
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            background: 'var(--primary)',
            height: '100%',
            width: `${(completedCount / todos.length) * 100}%`,
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>
      
      {/* ❌ BAD: No keys - React gets confused when list changes */}
      {/* {todos.map(todo => 
        <div onClick={() => toggleTodo(todo.id)}>
          {todo.text}
        </div>
      )} */}

      {/* ✅ GOOD: Unique keys help React track items */}
      {/* 🐍 Python: Like enumerate() giving each item an index */}
      <div>
        {todos.map(todo => (
          <div 
            key={todo.id} 
            onClick={() => toggleTodo(todo.id)}
            className={`todo-item ${todo.completed ? 'todo-completed' : ''}`}
          >
            <span style={{ marginRight: '0.5rem' }}>
              {todo.completed ? '✅' : '⬜'}
            </span>
            {todo.text}
          </div>
        ))}
      </div>
    </div>
  );
}

// =====================================
// PATTERN 6: Event Handling & Forms
// =====================================

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  // ❌ BAD: Inline functions create new functions every render
  // const handleSubmit = (e) => {
  //   todos.map(todo => 
  //     <button onClick={() => deleteTodo(todo.id)}>Delete</button>
  //   )
  // }

  // ✅ GOOD: Proper event handling
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  }, [formData]);

  if (submitted) {
    return (
      <div className="widget">
        <h3>
          <span className="widget-icon">📧</span>
          Contact Form
          <span className="pattern-badge">Forms</span>
        </h3>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <div className="status-success">✅ Message sent successfully!</div>
          <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Form will reset automatically...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="widget">
      <h3>
        <span className="widget-icon">📧</span>
        Contact Form
        <span className="pattern-badge">Forms</span>
      </h3>
      <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', marginBottom: '1rem' }}>
        Controlled components with validation
      </p>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="input"
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
            className="input"
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message"
            className="textarea"
          />
          {errors.message && <div className="error">{errors.message}</div>}
        </div>
        
        <Button type="submit">Send Message</Button>
      </form>
    </div>
  );
}

// =====================================
// PATTERN 7: Context API (Global State)
// =====================================

// ❌ BAD: Prop drilling nightmare
// function App() {
//   const [theme, setTheme] = useState('light');
//   return (
//     <Header theme={theme} setTheme={setTheme} />
//     <Main theme={theme} setTheme={setTheme} />
//     <Footer theme={theme} setTheme={setTheme} />
//   );
// }

// ✅ GOOD: Context API eliminates prop drilling
// 🐍 Python: Like a global variable, but better managed
interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  // Apply theme class to body element
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemeToggle() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('ThemeToggle must be used within ThemeProvider');
  }
  
  const { theme, toggleTheme } = context;
  
  return (
    <div className="widget">
      <h3>
        <span className="widget-icon">🎨</span>
        Theme Switcher
        <span className="pattern-badge">Context API</span>
      </h3>
      <p style={{ color: 'var(--muted-foreground)', fontSize: '0.875rem', marginBottom: '1rem' }}>
        Global state without prop drilling
      </p>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
          Current theme: <strong>{theme}</strong>
        </div>
        <Button onClick={toggleTheme}>
          Switch to {theme === 'light' ? '🌙 Dark' : '☀️ Light'} mode
        </Button>
      </div>
    </div>
  );
}

// =====================================
// PATTERN 8: Custom Hooks & Performance
// =====================================

// Custom hook - reusable logic
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // 🐍 Python: Like creating a reusable function
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = useCallback((value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [key]);

  return [storedValue, setValue];
}

function NotesWidget() {
  const [notes, setNotes] = useLocalStorage<string[]>('tutorial-notes', []);
  const [newNote, setNewNote] = useState('');

  // ❌ BAD: Expensive calculation runs on every render
  // const noteStats = {
  //   total: notes.length,
  //   long: notes.filter(note => note.length > 10).length,
  //   avgLength: notes.reduce((sum, note) => sum + note.length, 0) / notes.length
  // };

  // ✅ GOOD: useMemo only recalculates when notes change
  // 🐍 Python: Like @lru_cache decorator
  const noteStats = useMemo(() => {
    console.log('📊 Calculating note statistics...'); // You'll only see this when notes change
    return {
      total: notes.length,
      long: notes.filter(note => note.length > 10).length,
      avgLength: notes.length > 0 ? Math.round(notes.reduce((sum, note) => sum + note.length, 0) / notes.length) : 0
    };
  }, [notes]);

  const addNote = useCallback(() => {
    if (newNote.trim()) {
      setNotes([...notes, newNote.trim()]);
      setNewNote('');
    }
  }, [notes, newNote, setNotes]);

  const clearNotes = useCallback(() => {
    setNotes([]);
  }, [setNotes]);

  return (
    <div className="widget">
      <h3>
        <span className="widget-icon">📚</span>
        Smart Notes
        <span className="pattern-badge">Custom Hooks</span>
      </h3>
      
      <div style={{ 
        background: 'var(--muted)', 
        padding: '0.75rem', 
        borderRadius: '0.5rem',
        marginBottom: '1rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.5rem',
        textAlign: 'center'
      }}>
        <div>
          <div style={{ fontWeight: 'bold' }}>{noteStats.total}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Notes</div>
        </div>
        <div>
          <div style={{ fontWeight: 'bold' }}>{noteStats.long}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Long</div>
        </div>
        <div>
          <div style={{ fontWeight: 'bold' }}>{noteStats.avgLength}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>Avg chars</div>
        </div>
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note..."
            className="input"
            onKeyPress={(e) => e.key === 'Enter' && addNote()}
            style={{ flex: 1 }}
          />
          <Button onClick={addNote}>Add</Button>
        </div>
      </div>
      
      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
        {notes.length === 0 ? (
          <p style={{ 
            color: 'var(--muted-foreground)', 
            fontSize: '0.875rem',
            textAlign: 'center',
            padding: '1rem'
          }}>
            No notes yet. Add one above!
          </p>
        ) : (
          notes.map((note, index) => (
            <div key={index} className="note-item">
              {note}
            </div>
          ))
        )}
      </div>
      
      {notes.length > 0 && (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <Button variant="destructive" onClick={clearNotes}>
            Clear All Notes
          </Button>
        </div>
      )}
    </div>
  );
}

// =====================================
// SECTION COMPONENT FOR ORGANIZATION
// =====================================

interface SectionProps {
  number: number;
  title: string;
  description: string;
  children: React.ReactNode;
}

function Section({ number, title, description, children }: SectionProps) {
  return (
    <div className="tutorial-section">
      <div className="section-header">
        <div className="pattern-number">{number}</div>
        <div>
          <div className="section-title">{title}</div>
          <div className="section-description">{description}</div>
        </div>
      </div>
      <div className="widgets-grid">
        {children}
      </div>
    </div>
  );
}

// =====================================
// MAIN DASHBOARD COMPONENT
// =====================================

function DashboardContent() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('DashboardContent must be used within ThemeProvider');
  }
  
  const { theme } = context;

  return (
    <div className={`container ${theme}`}>
      {/* Foundation Patterns */}
      <Section
        number={1}
        title="State Management"
        description="useState + useEffect - The foundation of React components"
      >
        <Counter />
        <Clock />
      </Section>

        <Section
          number={2}
          title="Component Architecture"
          description="Props & Composition - Building reusable components"
        >
          <ButtonShowcase />
        </Section>

        <Section
          number={3}
          title="UI Patterns"
          description="Conditional Rendering - Showing the right content at the right time"
        >
          <UserProfile />
        </Section>

        <Section
          number={4}
          title="Data Display"
          description="List Rendering & Keys - Efficiently displaying arrays of data"
        >
          <TodoList />
        </Section>

        <Section
          number={5}
          title="User Interaction"
          description="Event Handling & Forms - Managing user input and validation"
        >
          <ContactForm />
        </Section>

        <Section
          number={6}
          title="Global State"
          description="Context API - Sharing state across components without prop drilling"
        >
          <ThemeToggle />
        </Section>

        <Section
          number={7}
          title="Advanced Patterns"
          description="Custom Hooks & Performance - Reusable logic and optimization"
        >
          <NotesWidget />
        </Section>
      </div>
    );
}

export default function Dashboard() {
  return (
    <ThemeProvider>
      <DashboardContent />
    </ThemeProvider>
  );
} 