import Sidebar from './components/Sidebar'

function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white' }}>
      <Sidebar />
      <main style={{ flex: 1 }}>
      </main>
    </div>
  )
}

export default App
