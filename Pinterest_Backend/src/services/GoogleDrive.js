import { google } from "googleapis";
import fs from "fs";
import readline from "readline";


const googleAPI = (req, res, err) => {
  return new Promise((resolve, reject) => {
    let auth1, path;

    const timeOver = 4000;
    const SCOPES = ["https://www.googleapis.com/auth/drive"];
    const TOKEN_PATH = "src/services/token.json";
    const CREDENTIALS_PATH = "src/services/credentials.json";

    //Read credentials.json
    fs.readFile(CREDENTIALS_PATH, (err, content) => {
      if (err) return console.log("Error loading client secret file:", err);
      // Authorize a client with credentials, then call the Google Drive API.
      authorize(JSON.parse(content), () => {});
    });
    /**
     * Create an OAuth2 client with the given credentials, and then execute the
     * given callback function.
     * The callback to call with the authorized client.
     */
    function authorize(credentials, callback) {
      const { client_secret, client_id, redirect_uris } = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
      );
      auth1 = oAuth2Client;

      // Check if we have previously stored a token.
      fs.readFile(TOKEN_PATH, (err, token) => {
        // console.log("TOKEN:", TOKEN_PATH);
        if (err) return getAccessToken(oAuth2Client, callback);
        oAuth2Client.setCredentials(JSON.parse(token));
        callback(oAuth2Client);
      });
    }
    /**
         * Get and store new token after prompting for user authorization, and then
         * execute the given callback with the authorized OAuth2 client.
         The callback for the authorized client.
        */
    function getAccessToken(oAuth2Client, callback) {
      const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
      });
      console.log("Authorize this app by visiting this url:", authUrl);
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question("Enter the code from that page here: ", (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
          if (err) return console.error("Error retrieving access token", err);
          oAuth2Client.setCredentials(token);
          // Store the token to disk for later program executions
          fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) return console.error(err);
            console.log("Token stored to", TOKEN_PATH);
          });
          callback(oAuth2Client);
        });
      });
    }

    function listFiles() {
      const drive = google.drive({ version: "v3", auth: auth1 });
      drive.files.list(
        {
          pageSize: 1,
          fields: "nextPageToken, files(id, name)",
        },
        (err, res) => {
          if (err) return console.log("The API returned an error: " + err);
          const files = res.data.files;

          if (files.length) {
            //Trả về link hính ảnh trên gg drive.
            path = "https://drive.google.com/uc?id=" + files[0].id;
          }
        }
      );
    }

    function upload() {
      const drive = google.drive({ version: "v3", auth: auth1 });
      const folderId = "10fxX_GHcgu1UiWGIgYsTTSk-FTMAtuh5";

      const fileMetaData = {
        name: req.file.filename,
        parents: [folderId]
      };
      const media = {
        mimeType: req.file.mimetype,
        body: fs.createReadStream(req.file.path),
      };

      drive.files.create(
        {
          resource: fileMetaData,
          media: media,
          fields: "id",
        },
        (err) => {
          if (err) {
            console.log(err);
          } else {
            //Xóa file trong folder images (local)
            fs.unlinkSync(req.file.path);
            console.log("Uploaded!, waiting to save to database...");
          }
        }
      );

      //Set thời gian để dữ lấy id của file vừa upload.
      setTimeout(() => {
        fs.readFile(CREDENTIALS_PATH, (err, content) => {
          if (err) return console.log("Error loading client secret file:", err);
          // Authorize a client with credentials, then call the Google Drive API.
          authorize(JSON.parse(content), listFiles);
        });
      }, timeOver);
    }
    
    //Set thời gian để dữ lấy token auth1.
    setTimeout(upload, timeOver);
    setTimeout(() => {
      resolve(path);
    }, timeOver * 3);
  });
};
const googleAPIDelete = (fileId) => {


  const SCOPES = ["https://www.googleapis.com/auth/drive","https://www.googleapis.com/auth/drive.appdata"];
  const TOKEN_PATH = "src/services/token.json";
  const CREDENTIALS_PATH = "src/services/credentials.json";

  //Read credentials.json
  fs.readFile(CREDENTIALS_PATH, (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), delete1);
  });
  /**
   * Create an OAuth2 client with the given credentials, and then execute the
   * given callback function.
   * The callback to call with the authorized client.
   */
  function authorize(credentials, callback) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      // console.log("TOKEN:", TOKEN_PATH);
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }
  /**
       * Get and store new token after prompting for user authorization, and then
       * execute the given callback with the authorized OAuth2 client.
       The callback for the authorized client.
      */
  function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Enter the code from that page here: ", (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error("Error retrieving access token", err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log("Token stored to", TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }
    async function delete1(auth) {
      const drive = google.drive({ version: 'v3', auth: auth })

      drive.files
        .delete({
          fileId: fileId,
        })
        .then(
          async function (response) {
            console.log("Deleted: ", response.request.responseURL);
          },
          function (err) {
            console.log('Deletion Failed for some reason: ', err);
          }
        );
  }

}


export { googleAPI, googleAPIDelete };
