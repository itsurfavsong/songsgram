import './App.css';
import Header from './components/common/Header.jsx';
import NotificationInfo from './components/subscriptions/NotificationInfo.jsx';
import ProtectedRouter from './routes/ProtectedRouter.jsx';

function App() {
  return (
    <>
      <Header></Header>
      <ProtectedRouter />
      <NotificationInfo></NotificationInfo>
    </>
  )
}

export default App;
