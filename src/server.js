import express from "express";
import { ServerStyleSheet } from "styled-components";
import { renderToString } from "react-dom/server";
import CookieParser from "cookie-parser";
import compression from "compression";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import matchPath from "react-router-dom/matchPath";
import Html from "./shared/Html";
import RootReducer from "./shared/reducers/RootReducer";
import serverRoot from "./server/index";
import routes from "./shared/routes";
import { postResetRequest } from "./shared/lib/apiClients/UserClient";

require("dotenv").config();

const bodyParser = require("body-parser");
const title = "Fairytale Clubapp Dashboard";
const server = express();

const setupServer = () => {
  server.use(compression({ threshold: 0 }));
  server.use(express.static("public"));
  server.use("/assets", express.static("assets"));
  server.use(CookieParser());
  // way  to handle route params
  server.get("*", async (req, res) => {
    const sheet = new ServerStyleSheet();
    let persistedState;
    if (req.cookies && req.cookies.state) {
      persistedState = JSON.parse(req.cookies.state);
    }
    const store = createStore(RootReducer, persistedState, applyMiddleware(thunk));
    const context = {};
    const location = req.url;
    const dataFetches = routes
      .filter(route => matchPath(location, route))
      .map(route => route.component)
      .filter(comp => comp.initial)
      .map(comp => store.dispatch(comp.initial(store.getState().UserReducer.token)));

    await Promise.all(dataFetches);

    const body = renderToString(sheet.collectStyles(serverRoot(store, location, context)));
    const styles = sheet.getStyleTags();
    const html = Html({
      body,
      styles,
      title,
      state: store.getState()
    });
    if (context.url) {
      res.redirect(context.url);
    }
    res.send(html);
  });
};

setupServer();

const nodemailer = require("nodemailer");

// The credentials for the email account you want to send mail from.
const credentials = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // These environment variables will be pulled from the .env file
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD
  }
}

// Getting Nodemailer all setup with the credentials for when the 'sendEmail()'
// function is called.
const transporter = nodemailer.createTransport(credentials)

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

const mailToken = length => {
  let text="";
  const possible = "abcdefghijklmonpqrstuvwxyz0123456789_-.";
  for(let i = 0; i< length; i++){
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const router = express.Router();
router.post("/resetsubmit", (req, res, next) => {

  const email = req.body.email;

  const token = mailToken(40);
  // Save reset token against user email in db to check when user comes back to reset password
  postResetRequest(
    { email: email, token: token }
  ).then((response) => {
      if (response.send) {
        console.log("SEND RES EMAIL!!!!!");
        // Send email
        const mail = {
          from: process.env.MAIL_USER,
          to: email,
          subject: "Club-portaalin salasanan palauttaminen",
          text: "Seuraavan linkin kautta voit uusia salasanasi: " + process.env.APP_URL_BASE + "reset?token=" + token,
          html: "<p>Seuraavan linkin kautta voit uusia salasanasi: " + process.env.APP_URL_BASE + "reset?token=" + token + "</p>"
        };
        transporter.sendMail(mail, (err, data) => {
          if (err) {
            console.log("Problem sending email: " + err);
            res.json({
              msg: "fail"
            })
          } else {
            console.log("Message sent: " + data.response);
            res.json({
              msg: "success"
            })
          }
        })
      }
    }
  );
});

server.use("/", router);

const port = process.env.PORT;
server.listen(port);
console.log(`Serving at http://localhost:${port}`);
