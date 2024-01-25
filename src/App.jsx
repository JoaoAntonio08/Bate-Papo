import { useAuthState, useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "./App.css"
import { auth, databaseApp } from "./services/firebaseconfig";
import { addDoc, collection, limit, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useRef, useState } from "react";

export const App = () => {
  const [user] = useAuthState(auth);
  return(
    <div className="App">
      <header>
        <h1>ReactChat</h1>
        <SignOut/>
      </header>
      <section>{user ? <ChatRoom/> : <SignIn/>}</section>
    </div>
  );
};

export const ChatRoom = () => {
  const messageRef = collection(databaseApp, "message");
  const QueryMessage = query(messageRef, orderBy("createdAt"), limit(25));
  const [message] = useCollectionData(QueryMessage, {idField: "id"});

  const [formValue, setFormValue] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();

    const {photoURL, uid} = auth.currentUser;

    await addDoc(messageRef, {
      text: formValue,
      uid,
      photoURL,
      createdAt: serverTimestamp(),
    });
    setFormValue("")
  };

return(
  <>
    <main>
      {message &&
      message.map((msg, index) => (
        <ChatMessege key={index} message={msg}/>
      ))}
    </main>
    <form onSubmit={sendMessage}>
      <input type="text" value={formValue} onChange={(e) => setFormValue(e.target.value)}
      />
      <button>Enviar</button>
    </form>
  </>
  );
};

export const ChatMessege = (props) => {
  const {text, photoURL, uid} = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return(
    <div className={`message ${messageClass}`}>
    <img src={photoURL}/>
    <p>{text}</p>
    </div>
  );
};

export const SignIn = () => {
  const [SignInWithGoogle] = useSignInWithGoogle(auth);
  return(
    <button className="sign-in" onClick={() => SignInWithGoogle()}>
      Logar com o google
      </button>
  );
};

export const SignOut = () => {
  return( 
    auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>
      Sair
      </button>
    )
  );
};