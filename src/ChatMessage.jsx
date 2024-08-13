import BootstrapTooltip from "./tooltip"
export default function ChatMessage(props) {
    const { text, uid, photoURL, name } = props.message;
    const auth = props.auth
    const textStyle = {}
    if (['qTteUx6BTpR8O0SF5Wq9mLVsDC22', 'QOdAZ4vnj1RgD80iJSxao3aIf903'].includes(uid)) {
      textStyle.color = '#ffffff'
      textStyle.backgroundColor = '#000000'
    }
    return (
      <div className={`message ${uid === auth.currentUser.uid ? 'sent' : 'received'}`}>
        <BootstrapTooltip placement={uid === auth.currentUser.uid ? 'right' : 'left'} title={name ? name : 'Anonymous'}>{ photoURL ? <img src={photoURL} alt="avatar" /> : <img src={`https://robohash.org/${uid}`} alt="" style={{ border: '0.15rem solid #ffffff'}} /> }</BootstrapTooltip>
        <p style={textStyle}>{text}</p>
      </div>
    );
  }
  