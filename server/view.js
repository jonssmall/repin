'use strict';
module.exports = (user) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <title>rePin</title>
    <meta charset="UTF-8">	
    <meta name="viewport" content="width=device-width, initial-scale=1.0">								
  </head>
  <body>
    <div id="app"></div> 
    <script type="text/javascript" charset="utf-8">
      window.USER = ${JSON.stringify(user)};					
    </script>
    <script type="text/javascript" charset="utf-8" src="/client/dist/index.js"></script>
  </body>
  </html>
  `;
}