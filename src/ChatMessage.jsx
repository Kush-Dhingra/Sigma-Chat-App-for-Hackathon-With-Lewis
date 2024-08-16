import BootstrapTooltip from "./tooltip";
export default function ChatMessage(props) {
    const { createdAt, text, uid, photoURL, name } = props.message;
    const auth = props.auth
    let timestamp;
    try {
      timestamp = createdAt.toDate().toLocaleTimeString();
    }
    catch (error) {
      timestamp = "";
    }
    const textStyle = {}
    if (uid === 'ELNY1HQ1iCWHtOyaoJK15WBiMD72') {
      textStyle.color = '#ffffff'
      textStyle.backgroundColor = '#000000'
    }
    return (
      <div
        className={`message ${
          uid === auth.currentUser.uid ? "sent" : "received"
        }`}
      >
        <BootstrapTooltip
          placement={uid === auth.currentUser.uid ? "right" : "left"}
          title={`${name ? name : "Anonymous"}`}
        >
          {photoURL ? (
            <img src={photoURL} alt="avatar" />
          ) : (
            <img
              src={`https://robohash.org/${uid}`}
              alt=""
              style={{ border: "0.15rem solid #ffffff" }}
            />
          )}
        </BootstrapTooltip>
        <p style={textStyle}>{text}
          <br />
          <em className="time">
            {timestamp}
          </em>
        </p>
      </div>
    );
  }
  