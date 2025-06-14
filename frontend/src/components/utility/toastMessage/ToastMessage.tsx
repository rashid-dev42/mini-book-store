import "./ToastMessage.css";
import React from "react";

interface Props {
  message: string,
  isSuccessful: boolean,
  setShowToastMessage: (displayToastMessage: boolean) => void;
  setMessage: (displayMessage: string) => void;
  setIsSuccessful: (isSuccessful: boolean) => void;
}

const ToastMessage: React.FC<Props> = ({ message, isSuccessful, setShowToastMessage, setMessage, setIsSuccessful }) => {
  const toastMessageStyle = isSuccessful ? {
    backgroundColor: "green"
  } : {
    backgroundColor: "red"
  };

  const closeToastMessage = (): void => {
    setShowToastMessage(false);
    setMessage("");
    setIsSuccessful(false);
  };

  return (
    <div className="ToastMessage">
      <div style={toastMessageStyle} className="ToastMessage-div">
        <h3>{message}</h3>
        <button onClick={closeToastMessage}>&#10799;</button>
      </div>
    </div>
  );
};

export default ToastMessage;