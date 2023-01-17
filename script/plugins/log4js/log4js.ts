/* OrzMajorPlugin */
OrzPluginInit = function pluginMain(token: string): boolean {
  // debug // console.log(`The plugin of token is ${token}`);
  _OrzConf.pluginsConf

  /* TODO */
  class consoleExtra extends OrzPluginBase {
    private isInited: boolean = false;
    private useColor: boolean = false;
    private _oriConsoleLog: Function = console.log;
    private hookSystemAllLog: Boolean = false;
    public init(isAuto: boolean = false, isUseColor: boolean = false) {
      this.hookSystemAllLog = isAuto;
      this.useColor = isUseColor;
      if (isAuto) {
        console.log = (...args) => {
          this.log('INFO', ...args);
        };
      };
      //window.onerror = () => true;
      this.isInited = true;
    };
    /**
     * Output a log.
     */
    public async log(
      OutputLevel: keyof typeof consoleExLevel,
      ...LogData: any[]
    ) {
      let
        fullLog: string = '',
        callerInfo = getCaller();

      LogData.forEach(log => {
        fullLog += `${log.toString()}   `
      });

      if (consoleExLevel[OutputLevel] == undefined) {
        this.log('WARN', `Unknown level, auto change to 'INFO'`);
        OutputLevel = 'INFO';
      };

      ; (this._oriConsoleLog || console.log)(await this.format(
        `[%d] [${callerInfo?.callerFn}/%c%p%c]: ${fullLog}`, OutputLevel
      ), this.useColor
        ? `color: ${consoleExLevelColor[consoleExLevel[OutputLevel]]};`
        : 'color: white;',
        'color: white;'
      );
    };

    /**
     * format
     */
    private async format(logString: string, level: keyof typeof consoleExLevel) {
      ['%p', '%n', '%d', '%l'].forEach((kword) => {
        let position = logString.indexOf(kword);
        while (position != -1) {
          /* Variable */
          let
            replaceData: string = '',
            isCustomDate = (logString[position + 2] == '{') && (logString.indexOf('}', position + 2) != -1);

          /* Key word */ {
            kword == '%p' ? replaceData = level : // Level
              kword == '%n' ? replaceData = (_OrzConf.isWindows ? '\r\n' : '\n') : // Line feed
                kword == '%d' ? replaceData = ((): string => { // Date
                  return isCustomDate ?
                    formatTime(logString.slice(position + 3, logString.indexOf('}', position + 2))) :
                    formatTime();
                })() :
                  kword == '%l' ? replaceData = ((): string => { // Line
                    return getCaller()?.position.col.toString() || '0';
                  })() : '';

            logString // Concat the log
              = logString.slice(0, position)
              + replaceData
              + logString.slice(
                (kword == '%d' && isCustomDate)
                  ? logString.indexOf('}', position + 2) + 1
                  : position + 2);
          };
          // Find next the keyword.
          position = logString.indexOf(kword);
          //debugger
        };
      });
      return logString;
    };
  };
  _ConsoleEx = new consoleExtra();
  _OrzConf.pluginProc.sendStatus(token, 'ok');
  return true;
};
/* Type */
type consoleExAppenderPrototype = {
  file?: string | string[],
  writer?: HTMLElement | HTMLElement[]
}
/* Enum */
enum consoleExLevel {
  'FATAL', 'ERROR', 'WARN',
  'INFO', 'DEBUG', 'ALL'
};
enum consoleExLevelColor {
  'ORANGE', 'RED', 'YELLOW',
  'WHITE', '#007ACC', '#00000000'
}