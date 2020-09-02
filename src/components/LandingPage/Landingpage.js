import React,{useState, Fragment} from 'react';
import "./Landingpage.css";
import SignUp from '../SignUp/SignUp';
import Login from '../Login/Login';
import Typing from 'react-typing-animation'
export const LandingPage = () => {
    const [existUser, setExistingUser] = useState(true);
    const [leftPannel, setLeftPannel] = useState(50);
    const [rightPannel, setRightPannel] = useState(50);
  
    const slowMotion = () =>
      new Promise((resolve) => {
        setTimeout(() => {
          setLeftPannel((width) => width + 1);
          resolve();
        }, 2);
      });
    const onLogin = async () => {
      setRightPannel(0);
      while (leftPannel <= 102) {
        await slowMotion();
      }
    };
    return(
        <Fragment>
        <div className="landingpage-container">
        <div className="landingpage-name" style={{ width: `${leftPannel}%` }}>
          <Typing>
            <h1 className="landingpage-brand">Supply Chain</h1>
          </Typing>
        </div>
        <div
          className="landingpage-form-container"
          style={{ width: `${rightPannel}%` }}
        >
          {existUser ? (
            <Login
              updateSignup={() => setExistingUser(false)}
              onLogin={onLogin}
            />
          ) : (
            <SignUp updateLogin={() => setExistingUser(true)} />
          )}
        </div>
      </div>
      </Fragment>
    );
}