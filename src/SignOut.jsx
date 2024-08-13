
export default function SignOut( { signOut } ) {
    return (
      <>
        <button className="btn btn-outline-light" onClick={signOut}>Sign Out</button>
        <h5 style={{ color: 'white' }}>Try saying suki if you dare!</h5>
      </>
    );
  }
  