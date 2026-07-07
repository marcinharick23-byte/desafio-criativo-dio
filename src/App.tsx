
import { Header } from './components/Header';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Upper navigation header */}
      <Header />

      {/* Main dashboard view */}
      <main className="flex-1 w-full bg-slate-950/40">
        <Dashboard />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Aegis Finance. Desenvolvido com React, TypeScript & Tailwind CSS.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Termos de Uso</span>
            <span className="hover:text-slate-300 cursor-pointer">Política de Privacidade</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
