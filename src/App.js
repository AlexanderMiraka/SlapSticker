import { createUseStyles } from "react-jss";
import React from "react";
// import logo from './logo.svg'
import "./styles/index.css";
import header from "./components/global/header";
import PictureCaptureSteps from "./components/pictureCapture/pictureCapture";
import { Link, Switch, Route, Redirect } from "react-router-dom";

const useStyles = createUseStyles((theme) => ({
  "@global body": {
    fontFamily: "sans-serif",
  },

  App: {
    "& a": {
      color: theme.palette.text,
    },
  },
  Header: {
    "&  h1": {
      fontFamily: "sans-serif",
      fontSize: "4rem",
    },
  },
  Main: {
    "& canvas": {
      width: "100%",
      height: "100%",
    },
    "& video": {
      display: "none",
    },
  },
  Stickers: {
    "& img": {
      height: "4rem",
    },
  },
  Gallery: {
    "& img": {
      height: "16rem",
    },
  },
  Picture: {
    background: "black",
    padding: 4,
    position: "relative",
    display: "inline-block",
    "& h3": {
      padding: 8,
      textAlign: "center",
      width: "100%",
    },
  },
}));

function App(props) {
  // css classes from JSS hook
  const classes = useStyles(props);
  // currently active sticker

  // webcam behavior hook
  return (
    <div className={classes.App}>
      {React.createElement(header)}
      {/* same Thing as <render> I used it because I do not render any props for this component */}
      <Switch>
        /** * Main app route */
        <Route path="/" exact>
          <div class="homepage">
            <h3 class="homepageHeading">
              Enhance pictures app. Use stickers, filters and take funny photos
              for you and your friends.
            </h3>
            <PictureCaptureSteps classes={classes} />
          </div>
        </Route>
        /** * Readme route */
        <Route path="/readme">
          <main class="readme">
            <h2>Readme Message</h2>
            <p>Hello, Please use npm install before you run this project</p>
            <p>
              If you check for responsiveness refresh the page each time you see
              a screen size
            </p>
            <section>
              <h3>What this app should do</h3>
              <ul>
                <li>User can give the captured image a title</li>
                <li>User can pick a sticker</li>
                <li>User can upload their own images</li>
                <li>
                  User can pick a filter (Be carefult with this, it is not
                  optimized)
                </li>
                <li>
                  User can capture the webcam image with sticker and/or filters
                </li>
                <li>User can see their photos below</li>
                <li>User can download them</li>
              </ul>
            </section>
          </main>
        </Route>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}
export default App;
