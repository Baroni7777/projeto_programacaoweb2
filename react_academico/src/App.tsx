import './App.css'
import Layout from './components/layout/Layout'
import Lista from './views/cidade/lista'

function App() {
  return (
    <div>
          {/* Componente pai - Layout
              Componente Filho - Lista
               */}
        <Layout>
           <Lista />  {/* Lista - Children */}
        </Layout>
        
    </div>
  )
}

export default App
