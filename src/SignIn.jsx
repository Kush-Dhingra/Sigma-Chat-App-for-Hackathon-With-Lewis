import { GithubAuthProvider, signInAnonymously, GoogleAuthProvider, signInWithPopup, browserPopupRedirectResolver } from 'firebase/auth';
import Credits from './credits';
import LoadingAnim from './loading';
import { useState, useEffect, useRef } from 'react';
import auth from './firebase';
function DownloadPopup() {
  return (
    <div className="DownloadPopup">
      <a href="https://github.com/Kush-Dhingra/Sigma-Chat-App-for-Hackathon-With-Lewis/releases/download/Chat/Sigma.Chat.Setup.exe" className="btn btn-outline-light"><i className="bi bi-windows"></i> Windows</a>
      <b>For Macos and Linux Please Visit the <a href="https://github.com/Kush-Dhingra/Sigma-Chat-App-for-Hackathon-With-Lewis">Github Repo</a> And Follow The Instructions to Run the App</b>
    </div>
  )
}
export default function SignIn() {
    const [loading, setLoadingState] = useState(false);
    const isMounted = useRef(true); 

    useEffect(() => {
      
        isMounted.current = true;
        
        return () => {
          
            isMounted.current = false;
        };
    }, []);

    const providerMap = {
        'GoogleAuthProvider': GoogleAuthProvider,
        'GithubAuthProvider': GithubAuthProvider,
    };

    const signInWith = async (providerType) => {
        try {
            if (isMounted.current) setLoadingState(true);

            if (providerType === "AnonymousAuthProvider") {
                await signInAnonymously(auth);
                if (isMounted.current) setLoadingState(false);
                return;
            } else {
                const ProviderClass = providerMap[providerType];
                if (!ProviderClass) {
                    throw new Error("Invalid provider type");
                }
                const provider = new ProviderClass();
                await signInWithPopup(auth, provider, browserPopupRedirectResolver)
            }
        } catch (error) {
            console.error("Sign-in error: ", error.message);
            alert("An error occurred. Please try again or Use a diffrent Sign In Method!");
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
          <button className="sign-in" onClick={() => signInWith('GithubAuthProvider')}>
            <i className="bi bi-github"></i>
            Github
          </button>
          <br />
          <button className="sign-in" onClick={() => signInWith('GoogleAuthProvider')}>
            <i className="bi bi-google"></i>
            Google
          </button>
          <br />
          <p>or Sign in anonymously</p>
          <button className="sign-in" onClick={() => signInWith("AnonymousAuthProvider")}>
            <i className="bi bi-person"></i>
            Guest
          </button>
          <br />
          <button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Download
          </button>
          <div data-bs-theme="dark" className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Download</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <DownloadPopup />
                </div>
              </div>
            </div>
          </div>
          <Credits />
        </div>
        }
      </header>
    );
  }