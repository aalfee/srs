//To execute this file run "node entry.js" in the terminal
// Creating a javascript file that opens and runs an html file (assuming its in the same directory)

const {exec}=require('child_process');  //This function is used to execute a shell command from within Node.js
const path=require('path');             //This constructs the full path to the index.html file

const htmlFilePath=path.join(__dirname, 'index.html');

//This is the command to open the html file in the default web browser

const command=process.platform==='win32' ? `start ${htmlFilePath}`:`open ${htmlFilePath}`;  //This checks the OS to determine the correct command to open the file (Windows uses start and macOS/Linux uses open)

exec(command, (error, stdout, stderr) =>                //This runs the command and does error checks and outputs
{
    if(error){console.error(`Error Opening the html file: ${error.message}`);
    return;
}
    if(stderr){console.error(`Error: ${stderr}`);
    return;
}
console.log(`HTML file opened successfully: ${stdout}`);
});