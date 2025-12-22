import Sidebar from './components/Sidebar'
import Header from './components/Header'
import NoticeManagement from './components/NoticeManagement'

function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white' }}>
      <Sidebar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <main style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
          <NoticeManagement />
        </main>
      </div>
    </div>
  )
}

export default App
