
var colors =
{
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
};

function Log(message) 
    {
        var colorCode = colors["white"];
        const currentTime = new Date().toLocaleTimeString('en-GB');
        console.log(`[${currentTime}] ${colorCode}${message}${colors["white"]}`);
    }

function Log(message, color) 
    {
        var colorCode = colors["white"];
        if (color) {
            colorCode = colors[color];
        }

        const currentTime = new Date().toLocaleTimeString('en-GB');
        console.log(`[${currentTime}] ${colorCode}${message}${colors["white"]}`);
    }

function LogWarning(message) 
    {
        var colorCode = colors["yellow"];

        const currentTime = new Date().toLocaleTimeString('en-GB');
        console.log(`[${currentTime}] ${colorCode}[Warning] ${message}${colors["white"]}`);
    }

function LogError(message) 
    {
        var colorCode = colors["red"];

        const currentTime = new Date().toLocaleTimeString('en-GB');
        console.log(`[${currentTime}] ${colorCode}[Error] ${message}${colors["white"]}`);
    }

    function LogInfo(message) 
    {
        var colorCode = colors["cyan"];

        const currentTime = new Date().toLocaleTimeString('en-GB');
        console.log(`[${currentTime}] ${colorCode}[Info] ${message}${colors["white"]}`);
    }


module.exports = 
{ 
    Log: Log,
    LogInfo: LogInfo,
    LogWarning: LogWarning,
    LogError: LogError
 };