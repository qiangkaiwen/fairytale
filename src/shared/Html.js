// color background 5c5b53
// color header
const Html = ({ body = "", styles = "", title, state = {} }) => `
<!DOCTYPE html>
<html style="margin:0; height: 100%;">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${title}</title>
    ${styles}
    <link rel="stylesheet" type="text/css" href="/styles.css">
  </head>
  <body style="color:#333; margin:0; height:100%; background-color: #fff;">
    <div id="app" style="margin:0; min-height:100%; display: flex; flex-wrap: wrap; flex-direction: row;">${body}</div>
    <script>
        window.REDUX_STATE = ${JSON.stringify(state)}
    </script>
    <script type="text/javascript" src="/bundle.js"></script>
  </body>
</html>
`;

export default Html;
