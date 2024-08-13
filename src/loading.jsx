export default function LoadingAnim() {
    return (
      <svg className='loading' version="1.1" id="L5" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
          <circle fill="#a200ff" stroke="none" cx="6" cy="50" r="6">
            <animateTransform 
               attributeName="transform" 
               dur="1s" 
               type="translate" 
               values="0 15 ; 0 -15; 0 15" 
               repeatCount="indefinite" 
               begin="0.1"/>
          </circle>
          <circle fill="#0000ff" stroke="none" cx="30" cy="50" r="6">
            <animateTransform 
               attributeName="transform" 
               dur="1s" 
               type="translate" 
               values="0 10 ; 0 -10; 0 10" 
               repeatCount="indefinite" 
               begin="0.2"/>
          </circle>
          <circle fill="#00d5ff" stroke="none" cx="54" cy="50" r="6">
            <animateTransform 
               attributeName="transform" 
               dur="1s" 
               type="translate" 
               values="0 5 ; 0 -5; 0 5" 
               repeatCount="indefinite" 
               begin="0.3"/>
          </circle>
        </svg>
    )
  }