class Logger 
{
    static colors =
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

    static Log(message) 
    {
        var colorCode = this.colors["white"];
        const currentTime = new Date().toLocaleTimeString('en-GB');
        console.log(`[${currentTime}] ${colorCode}${message}${this.colors["white"]}`);
    }

    static Log(message, color) 
    {
        var colorCode = this.colors["white"];
        if (color) {
            colorCode = this.colors[color];
        }

        const currentTime = new Date().toLocaleTimeString('en-GB');
        console.log(`[${currentTime}] ${colorCode}${message}${this.colors["white"]}`);
    }

    static LogWarning(message) 
    {
        var colorCode = this.colors["yellow"];

        const currentTime = new Date().toLocaleTimeString('en-GB');
        console.log(`[${currentTime}] ${colorCode}[Warning] ${message}${this.colors["white"]}`);
    }

    static LogError(message) 
    {
        var colorCode = this.colors["red"];

        const currentTime = new Date().toLocaleTimeString('en-GB');
        console.log(`[${currentTime}] ${colorCode}[Error] ${message}${this.colors["white"]}`);
    }

    static LogInfo(message) 
    {
        var colorCode = this.colors["cyan"];

        const currentTime = new Date().toLocaleTimeString('en-GB');
        console.log(`[${currentTime}] ${colorCode}[Info] ${message}${this.colors["white"]}`);
    }
}

module.exports = { Logger }