export class Logger 
{
    private colors: { [key: string]: string } = 
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

    Log(message: string, color?: string) 
    {
        var colorCode = this.colors["white"];
        if (color) {
            colorCode = this.colors[color];
        }

        const currentTime = new Date().toLocaleTimeString('en-GB');
        console.log(`[${currentTime}] ${colorCode}${message}${this.colors["white"]}`);
    }

    LogWarning(message: string) 
    {
        var colorCode = this.colors["yellow"];

        const currentTime = new Date().toLocaleTimeString('en-GB');
        console.log(`[${currentTime}] ${colorCode}[Warning] ${message}${this.colors["white"]}`);
    }

    LogError(message: string) 
    {
        var colorCode = this.colors["red"];

        const currentTime = new Date().toLocaleTimeString('en-GB');
        console.log(`[${currentTime}] ${colorCode}[Error] ${message}${this.colors["white"]}`);
    }

    LogInfo(message: string) 
    {
        var colorCode = this.colors["cyan"];

        const currentTime = new Date().toLocaleTimeString('en-GB');
        console.log(`[${currentTime}] ${colorCode}[Info] ${message}${this.colors["white"]}`);
    }
}

module.exports = { Logger };