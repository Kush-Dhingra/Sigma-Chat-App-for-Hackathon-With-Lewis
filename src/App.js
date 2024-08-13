import './firebase'
import './App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './firebase';
import SignIn from './SignIn';
import ChatRoom from './ChatRoom';
function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}



export default App;
