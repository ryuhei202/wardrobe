import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase/app";
import "firebase/analytics";

firebase.initializeApp({
  apiKey: "AIzaSyDKEewcjjMpq4XYPRxbtmsLSOEYwlHCijA",
  authDomain: "leeap-wardrobe.firebaseapp.com",
  databaseURL: "https://leeap-wardrobe.firebaseio.com",
  projectId: "leeap-wardrobe",
  storageBucket: "leeap-wardrobe.appspot.com",
  messagingSenderId: "795958516059",
  appId: "1:795958516059:web:41989e1d2bb26a7ca5627e",
  measurementId: "G-PN1JLN0FQH",
});
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
