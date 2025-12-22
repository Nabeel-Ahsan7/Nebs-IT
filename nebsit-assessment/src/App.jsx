import Sidebar from './components/Sidebar'
import Header from './components/Header'

function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
        </main>
      </div>
    </div>
  )
}

export default App
