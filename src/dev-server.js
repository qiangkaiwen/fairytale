import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import Html from "./shared/Html";
import devConfing from "../webpack.config.dev";
import { postResetRequest } from "./shared/lib/apiClients/UserClient";

require("dotenv").config();

const bodyParser = require("body-parser");
const port = process.env.PORT;
const title = "Dev Fairytale Dashboard";
const server = express();

const setupClient = () => {
  const config = devConfing;
  const compiler = webpack(config);
  server.use(
    webpackDevMiddleware(compiler, {
      noInfo: true,
      publicPath: config.output.publicPath,
      stats: {
        assets: false,
        colors: true,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
      }
    })
  );

  server.use(webpackHotMiddleware(compiler));
  server.use(express.static("dev"));
  server.use("/assets", express.static("assets"));
  server.get("*", (req, res) => {
    const html = Html({
      title
    });

    res.send(html);
  });
};

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
          subject: "ClubApp Password Reset",
          text: "Please use the following link to reset your password: " + process.env.APP_URL_BASE + "/reset?token=" + token,
          html: "<p>Please use the following link to reset your password: " + process.env.APP_URL_BASE + "/reset?token=" + token + "</p>"
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

if (process.env.NODE_ENV === "production") {
  //  setupServer();
} else {
  setupClient();
}

server.listen(port);
console.log(`Serving at http://localhost:${port}`);
