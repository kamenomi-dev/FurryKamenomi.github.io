var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/* OrzMajorPlugin */
OrzPluginInit = function pluginMain(token) {
    // debug // console.log(`The plugin of token is ${token}`);
    _OrzConf.pluginsConf;
    /* TODO */
    var consoleExtra = /** @class */ (function (_super) {
        __extends(consoleExtra, _super);
        function consoleExtra() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isInited = false;
            _this.useColor = false;
            _this._oriConsoleLog = console.log;
            _this.hookSystemAllLog = false;
            return _this;
        }
        consoleExtra.prototype.init = function (isAuto, isUseColor) {
            var _this = this;
            if (isAuto === void 0) { isAuto = false; }
            if (isUseColor === void 0) { isUseColor = false; }
            this.hookSystemAllLog = isAuto;
            this.useColor = isUseColor;
            if (isAuto) {
                console.log = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    _this.log.apply(_this, __spreadArray(['INFO'], args, false));
                };
            }
            ;
            //window.onerror = () => true;
            this.isInited = true;
        };
        ;
        /**
         * Output a log.
         */
        consoleExtra.prototype.log = function (OutputLevel) {
            var LogData = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                LogData[_i - 1] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var fullLog, callerInfo, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            fullLog = '', callerInfo = getCaller();
                            LogData.forEach(function (log) {
                                fullLog += "".concat(log.toString(), "   ");
                            });
                            if (consoleExLevel[OutputLevel] == undefined) {
                                this.log('WARN', "Unknown level, auto change to 'INFO'");
                                OutputLevel = 'INFO';
                            }
                            ;
                            ;
                            _a = (this._oriConsoleLog || console.log);
                            return [4 /*yield*/, this.format("[%d] [".concat(callerInfo === null || callerInfo === void 0 ? void 0 : callerInfo.callerFn, "/%c%p%c]: ").concat(fullLog), OutputLevel)];
                        case 1:
                            _a.apply(void 0, [_b.sent(), this.useColor
                                    ? "color: ".concat(consoleExLevelColor[consoleExLevel[OutputLevel]], ";")
                                    : 'color: white;',
                                'color: white;']);
                            return [2 /*return*/];
                    }
                });
            });
        };
        ;
        /**
         * format
         */
        consoleExtra.prototype.format = function (logString, level) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    ['%p', '%n', '%d', '%l'].forEach(function (kword) {
                        var position = logString.indexOf(kword);
                        var _loop_1 = function () {
                            /* Variable */
                            var replaceData = '', isCustomDate = (logString[position + 2] == '{') && (logString.indexOf('}', position + 2) != -1);
                            /* Key word */ {
                                kword == '%p' ? replaceData = level : // Level
                                    kword == '%n' ? replaceData = (_OrzConf.isWindows ? '\r\n' : '\n') : // Line feed
                                        kword == '%d' ? replaceData = (function () {
                                            return isCustomDate ?
                                                formatTime(logString.slice(position + 3, logString.indexOf('}', position + 2))) :
                                                formatTime();
                                        })() :
                                            kword == '%l' ? replaceData = (function () {
                                                var _a;
                                                return ((_a = getCaller()) === null || _a === void 0 ? void 0 : _a.position.col.toString()) || '0';
                                            })() : '';
                                logString // Concat the log
                                    = logString.slice(0, position)
                                        + replaceData
                                        + logString.slice((kword == '%d' && isCustomDate)
                                            ? logString.indexOf('}', position + 2) + 1
                                            : position + 2);
                            }
                            ;
                            // Find next the keyword.
                            position = logString.indexOf(kword);
                        };
                        while (position != -1) {
                            _loop_1();
                        }
                        ;
                    });
                    return [2 /*return*/, logString];
                });
            });
        };
        ;
        return consoleExtra;
    }(OrzPluginBase));
    ;
    _ConsoleEx = new consoleExtra();
    _OrzConf.pluginProc.sendStatus(token, 'ok');
    return true;
};
/* Enum */
var consoleExLevel;
(function (consoleExLevel) {
    consoleExLevel[consoleExLevel["FATAL"] = 0] = "FATAL";
    consoleExLevel[consoleExLevel["ERROR"] = 1] = "ERROR";
    consoleExLevel[consoleExLevel["WARN"] = 2] = "WARN";
    consoleExLevel[consoleExLevel["INFO"] = 3] = "INFO";
    consoleExLevel[consoleExLevel["DEBUG"] = 4] = "DEBUG";
    consoleExLevel[consoleExLevel["ALL"] = 5] = "ALL";
})(consoleExLevel || (consoleExLevel = {}));
;
var consoleExLevelColor;
(function (consoleExLevelColor) {
    consoleExLevelColor[consoleExLevelColor["ORANGE"] = 0] = "ORANGE";
    consoleExLevelColor[consoleExLevelColor["RED"] = 1] = "RED";
    consoleExLevelColor[consoleExLevelColor["YELLOW"] = 2] = "YELLOW";
    consoleExLevelColor[consoleExLevelColor["WHITE"] = 3] = "WHITE";
    consoleExLevelColor[consoleExLevelColor["#007ACC"] = 4] = "#007ACC";
    consoleExLevelColor[consoleExLevelColor["#00000000"] = 5] = "#00000000";
})(consoleExLevelColor || (consoleExLevelColor = {}));
