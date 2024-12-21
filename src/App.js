import './App.css';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import ChatBot from './chatpot/BSChatBot/ChatBot.js';

function App() {
  return (
    <div className='app' >
      <ChatBot />
    </div >
  );
}

export default App;
