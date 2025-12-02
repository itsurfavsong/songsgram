import './App.css';
import Header from './components/common/Header.jsx';
import ProtectedRouter from './routes/ProtectedRouter.jsx';

function App() {
  return (
    <>
      <Header></Header>
      <ProtectedRouter />
    </>
  )
}

export default App;
