import './App.css'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-slate-900">Welcome to Nebs-IT</h1>
        <p className="mt-4 text-slate-600">Your HR Management System</p>
      </main>
    </div>
  )
}

export default App
