import ChatMessage from './ChatMessage';
import SignOut from './SignOut';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useRef, useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import auth from './firebase';
// Data-Set
import genZData from './gen_z.json';

const firestore = firebase.firestore();

const wordMap = Object.fromEntries(genZData.words.map(({ word, gen_z_word }) => [word.toLowerCase(), gen_z_word]));

const genZify = (inputString) => {
  const pattern = new RegExp(`\\b(${Object.keys(wordMap).join('|')})\\b`, 'gi');
  return inputString.replace(pattern, matched => wordMap[matched.toLowerCase()] || matched);
};

export default function ChatRoom() {
  const dummy = useRef();

  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt', 'desc').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState(localStorage.getItem('formValue') || '');
  useEffect(() => {
    localStorage.setItem('formValue', formValue);
  }, [formValue]);

  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!formValue || formValue.trim() === '') {
      return;
    }
    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: genZify(formValue),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      name: auth.currentUser.displayName,
    });

    setFormValue('');
  };

  return (
    <>
      <header className='signout'>
        {auth.currentUser ? <SignOut signOut={() => auth.signOut()} /> : <p></p>}
      </header>
      <div>
        <main style={{ backgroundColor: '#282c34', borderLeft: '0.25rem solid fmai#1e1e24' }}>
          {messages &&
            [...messages].reverse().map((msg) => <ChatMessage auth={auth} key={msg.id} message={msg} />)}
          <span ref={dummy}></span>
        </main>

        <form onSubmit={sendMessage}>
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="Say something skibidi!"
            className='form-control'
            id='messageInput'
          />
          <span>
            <button className='send btn btn-primary' type="submit" disabled={!formValue || formValue.trim() === ''}>
              <i className="bi bi-send"></i>
            </button>
          </span>
        </form>
      </div>
    </>
  );
}
