import React from 'react';
import "./Dashboard.css";
import { withRouter} from 'react-router-dom';
import { store } from 'react-notifications-component';
const Dashboard = (props) => {
    const logOut = () => {
        localStorage.removeItem("TOKEN")
        store.addNotification({
            message: "Logged Out",
            type: "success",
            insert: "bottom",
            container: "bottom-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
              duration: 2000,
              onScreen: true
            }
          },()=> {
            return props.history.push("/")
          });
        

    }
    return (
        <div class="top-navigation" id="navigation-bar">
            <a href="#" class="active">What We Do</a>
            <a href="#">Articles</a>
            <a href="#">My Account</a>
            <a href="#">Contact</a>
            <a href="#" className="log-out" onClick={() => logOut()}>Log Out</a>
        </div>
    )
}

export default withRouter(Dashboard);