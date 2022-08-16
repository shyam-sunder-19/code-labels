import { google } from 'googleapis';

const createNewSheet = async (title, callback) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "keys.json", //the key file
        //url to spreadsheets API
        scopes: "https://www.googleapis.com/auth/spreadsheets", 
    })
    const authClientObject = await auth.getClient();
    const googleSheetsInstance = google.sheets({ version: "v4", auth: authClientObject });
    try {
        googleSheetsInstance.spreadsheets.create({
          properties: {
            title: title,
          },
        }).then((response) => {
          if (callback) callback(response);
          console.log('Spreadsheet ID: ' + response.result.spreadsheetId);
        });
      } catch (err) {
        document.getElementById('content').innerText = err.message;
        return;
      }
}

export default createNewSheet