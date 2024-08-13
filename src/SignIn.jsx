import { GithubAuthProvider, signInAnonymously, GoogleAuthProvider, signInWithPopup, browserPopupRedirectResolver } from 'firebase/auth';
import Credits from './credits';
import LoadingAnim from './loading';
import { useState, useEffect, useRef } from 'react';
import auth from './firebase';
export default function SignIn() {
    const [loading, setLoadingState] = useState(false);
    const isMounted = useRef(true);  // useRef to persist value across renders

    useEffect(() => {
        // Set isMounted to true when the component is mounted
        isMounted.current = true;
        
        return () => {
            // Cleanup function: Set isMounted to false when the component unmounts
            isMounted.current = false;
        };
    }, []);
    const signInWith = async (providerType) => {
      try {
          if (isMounted.current) setLoadingState(true);
          
          if (providerType === "AnonymousAuthProvider") {
              await signInAnonymously(auth);
          } else {
              const provider = new providerType();
              await signInWithPopup(auth, provider, browserPopupRedirectResolver);
          }
      } catch (error) {
          console.log(error);
      } finally {
          if (isMounted.current) setLoadingState(false);
      }
  };
  
    return (
      <header className='Landing'>
        {
          loading ? <LoadingAnim /> : 
          <div className="SignIn">
          <h1>
              🗿
              Sigma Chat
              💀
          </h1>
          <em>A New Way To Talk</em>
          <p>Sign in with</p>
          <button className="sign-in" onClick={() => signInWith(GithubAuthProvider)}>
            <i className="bi bi-github"></i>
            Github
          </button>
          <br />
          <button className="sign-in" onClick={() => signInWith(GoogleAuthProvider)}>
            <i className="bi bi-google"></i>
            Google
          </button>
          <br />
          <p>or Sign in anonymously</p>
          <button className="sign-in" onClick={() => signInWith("AnonymousAuthProvider")}>
            <i className="bi bi-person"></i>
            Guest
          </button>
          <Credits />
        </div>
        }
      </header>
    );
  }