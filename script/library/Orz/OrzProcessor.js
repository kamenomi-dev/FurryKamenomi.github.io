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
var _this = this;
var _OrzConf, _ConsoleEx, OrzPluginInit;
$(function () { return __awaiter(_this, void 0, void 0, function () {
    var htmlBody, orzTopbar, orzContent, orzDetectLine, orzActivityBarContent, cookieTheme, cookieContentPos, userAgent, items, tabItems_1, highlight_1, orzEditor_1, orzEditContent_1, orzEditContentStatus_1, cssTips_1;
    return __generator(this, function (_a) {
        // Check Cookies and set Config
        if (!$.cookie('Orz-Theme'))
            $.cookie('Orz-Theme', 'dark', { expires: 365 });
        if (!$.cookie('Orz-ContentsPos'))
            $.cookie('Orz-ContentsPos', 256, { expires: 365 });
        htmlBody = $('body')[0], orzTopbar = $('#Orz-Topbar')[0], orzContent = $('#Orz-Content')[0], orzDetectLine = $('#Orz-DContent-DetectLine')[0], orzActivityBarContent = $('#Orz-ActivityBar-Content')[0], cookieTheme = $.cookie('Orz-Theme'), cookieContentPos = $.cookie('Orz-ContentsPos');
        // Set control by Cookies
        {
            /* Theme */ {
                $('#Orz-Theme')[0]['src']
                    = "./style/themes/".concat(cookieTheme, "/color.css");
            }
            ;
            /* Content */ {
                orzDetectLine.onmousedown = function () {
                    document.onmousemove = function (ev) {
                        var step = ev.pageX;
                        if ((85 + 48 < step && step < 170 + 48)
                            || orzContent.style.width == '300px')
                            return;
                        if (htmlBody.clientWidth - step <= 300)
                            step = htmlBody.clientWidth - 300;
                        if (ev.pageX < 85 + 48 + 1)
                            step = 48;
                        orzActivityBarContent.style.width = "".concat(step - 48, "px");
                        orzDetectLine.style.left = "".concat(step - 3, "px");
                        orzContent.style.left = "".concat(step, "px");
                    };
                };
                document.onmouseup = function () {
                    document.onmousemove = function () { };
                    var newPos = orzContent.offsetLeft;
                    orzDetectLine.style.left = "".concat(newPos - 3, "px");
                    $.cookie('Orz-ContentsPos', newPos, { expires: 365 });
                };
                orzActivityBarContent.style.width = "".concat(cookieContentPos - 48, "px");
                orzDetectLine.style.left = "".concat(cookieContentPos - 3, "px");
                orzContent.style.left = "".concat(cookieContentPos, "px");
            }
            ;
        }
        ;
        userAgent = navigator.userAgent;
        _OrzConf = {
            // Debug mode
            debugmode: true,
            // All detect-variable
            isFocus: true,
            isWindows: !/macintosh|mac os x/i.test(userAgent),
            isFireFox: userAgent.indexOf('Firefox') != -1,
            // Plugin Support
            pluginProc: new OrzPluginProcessor(),
            pluginsConf: [],
            // Theme Support
            themeConf: {
                theme: cookieTheme,
                theme_variable: getComputedStyle(document.documentElement)
            },
            // Variable
            editorStatus: 'search',
            contentPos: cookieContentPos,
            activityTablistIndex: 0
        };
        // Init eventListener. right?
        /* Window */ {
            htmlBody.onfocus = htmlBody.onblur = function (ev) {
                var isFocus = _OrzConf.isFocus = (ev.type == 'focus');
                MI_ChangeAllFontColor(isFocus);
                orzTopbar.style.backgroundColor
                    = _OrzConf.themeConf.theme_variable.getPropertyValue(isFocus
                        ? '--Orz-TopBar-BackgroundColor'
                        : '--Orz-TopBar-BackgroundColor-unForced');
            };
        }
        ;
        /* Topbar */ {
            /* Favicon */ {
                $('.Orz-Logo').each(function (index, logo) {
                    logo.onclick = function () {
                        location.href = '/';
                    };
                });
            }
            ;
            /* MenuItem */ {
                items = $('#Orz-Topbar>.Orz-Item').children();
                items.each(function (index, item) {
                    item.onclick = function () {
                        // DEBUG //
                        // @ts-ignore Using log4js plugin //
                        _ConsoleEx.log('DEBUG', "The top-bar current index is ".concat(index));
                    };
                    item.onmouseover = item.onmouseout = function (ev) {
                        var isOver = (ev.type == 'mouseover');
                        item.firstElementChild.style.backgroundColor
                            = isOver
                                ? _OrzConf.themeConf.theme_variable.getPropertyValue('--Orz-Topbar-Item-BackgroundColor')
                                : 'transparent';
                        if (!_OrzConf.isFocus)
                            item.style.color
                                = _OrzConf.themeConf.theme_variable.getPropertyValue(isOver
                                    ? '--Orz-TextIcon-Default'
                                    : '--Orz-TextIcon-unForced');
                    };
                });
            }
            ;
        }
        ;
        /* Activity - Bar */ {
            /* Tablist */ {
                tabItems_1 = $('.Actions-Tab').children(), highlight_1 = $('#Actions-Tab-Highlight')[0];
                tabItems_1[0].style.color = _OrzConf.themeConf.theme_variable.getPropertyValue('--Orz-TextIcon-Default');
                tabItems_1.each(function (index, item) {
                    item.onclick = function () {
                        var lastItem = tabItems_1[_OrzConf.activityTablistIndex];
                        // Move position & Set Color//
                        highlight_1.style.top = "".concat(item.offsetTop, "px");
                        lastItem.style.color = _OrzConf.themeConf.theme_variable.getPropertyValue('--Orz-TextIcon-unForced');
                        // Set new index //
                        _OrzConf.activityTablistIndex = index;
                        // DEBUG //
                        if (_OrzConf.debugmode) {
                            // @ts-ignore Using log4js plugin //
                            _ConsoleEx.log('DEBUG', "The activity-bar current index is ".concat(index));
                        }
                        ;
                    };
                    item.onmouseover = item.onmouseout = function (ev) {
                        var isOver = (ev.type == 'mouseover'), isActive = (_OrzConf.activityTablistIndex == index);
                        // Ignore active tab //
                        if (isActive)
                            return;
                        // Set status color //
                        item.style.color
                            = _OrzConf.themeConf.theme_variable.getPropertyValue(isOver
                                ? '--Orz-TextIcon-Default'
                                : '--Orz-TextIcon-unForced');
                    };
                });
            }
            ;
        }
        ;
        /* Editor */ {
            orzEditor_1 = $('#Orz-Editor'), orzEditContent_1 = $('#Editor-Content'), orzEditContentStatus_1 = $('#Editor-Content-Status'), cssTips_1 = _OrzConf.themeConf.theme_variable.getPropertyValue('--Editor-tips');
            // Auto Set //
            orzEditor_1.hide();
            orzEditContent_1.val(cssTips_1);
            // Event Listen //
            // Keydown
            $('body').on('keydown', function (ev) {
                if (ev.ctrlKey && ev.code == 'KeyP') {
                    orzEditor_1.toggle();
                    orzEditor_1.trigger('focus');
                    ev.preventDefault();
                }
                ;
            });
            // Focus & Blur
            orzEditContent_1[0].onfocus = orzEditContent_1[0].onblur = function (ev) {
                var isFocus = (ev.type == 'focus');
                orzEditContent_1.val(orzEditContent_1.val() == (isFocus ? cssTips_1 : '')
                    ? (isFocus
                        ? ''
                        : cssTips_1) :
                    orzEditContent_1.val());
                if (!isFocus) {
                    orzEditor_1.hide();
                }
                ;
            };
            // Input
            orzEditContent_1.on('input', function (ev) {
                var values = orzEditContent_1.val().toString().split(' >'), prefix = values[0].toLowerCase();
                // search = values[1].trimStart();
                switch (prefix) {
                    case 'key':
                        _OrzConf.editorStatus = 'key';
                        orzEditContentStatus_1.text('\uEB11');
                        break;
                    default:
                        _OrzConf.editorStatus = 'search';
                        orzEditContentStatus_1.text('\uEA73');
                        break;
                }
                ;
            });
            // Enter
            orzEditContent_1.on('keydown', function (ev) {
                if (ev.code == 'Enter' || ev.code == 'NumpadEnter')
                    if (_OrzConf.editorStatus == 'key')
                        ColorEggs.key(orzEditContent_1.val().split('>')[1].trimStart());
            });
        }
        ;
        /* Load dependent plugin */ {
            _OrzConf.pluginProc.regPluginFile('//www.furrycreakler.cn/script/plugins/log4js', 'log4js');
        }
        ;
        /* ToWebsiteMain */ {
            websiteMain();
        }
        ;
        return [2 /*return*/];
    });
}); });
// GLOBAL EVENT //
/* For MenuItem */
function MI_ChangeAllFontColor(isFocus) {
    var items = $('#Orz-Topbar>.Orz-Item').children();
    if (isFocus)
        items.css('color', _OrzConf.themeConf.theme_variable.getPropertyValue('--Orz-TextIcon-Default'));
    else
        items.css('color', _OrzConf.themeConf.theme_variable.getPropertyValue('--Orz-TextIcon-unForced'));
}
;
// PLUGIN SUPPORT //
var OrzPluginProcessor = /** @class */ (function () {
    function OrzPluginProcessor() {
        this.hashTable = new hashTable();
    }
    /**
     * regPluginFileAsFile
     */
    OrzPluginProcessor.prototype.regPluginFile = function (path, fileName) {
        return __awaiter(this, void 0, void 0, function () {
            var 
            /* Variable */
            initedResult, ajaxResult, 
            /* Function */
            summonToken, token;
            return __generator(this, function (_a) {
                initedResult = false, ajaxResult = false, summonToken = function (getMain) {
                    return sha256(fileName + (~(new Date()).getTime())).slice(0, getMain ? 6 : -1);
                };
                /* Check the plugin is exist */ {
                    $.ajax({
                        url: "".concat(path, "/").concat(fileName, ".js"),
                        type: 'GET',
                        async: false,
                        success: function () {
                            ajaxResult = true;
                        }
                    });
                    if (!ajaxResult) {
                        // @ts-ignore Using Log4js plugin// 
                        _ConsoleEx.log('WARN', "The ".concat(fileName, " plugin isn't exist on ").concat(path, "/*"));
                    }
                    ;
                }
                ;
                // Create the script to load.
                $('<script/>', {
                    src: "".concat(path, "/").concat(fileName, ".js"),
                    id: "pl-".concat(fileName)
                }).appendTo('orz-plugins');
                // Push it into list.
                _OrzConf.pluginsConf.push({
                    path: path,
                    fileName: fileName,
                    status: 'loading'
                });
                token = summonToken(true);
                // Hashtable add pluginToken & Index.
                this.hashTable.put(token, _OrzConf.pluginsConf.length - 1);
                // Call include function.
                try {
                    initedResult = OrzPluginInit(token);
                }
                catch (err) {
                    // @ts-ignore Using log4js plugin //
                    _ConsoleEx.log('ERROR', "The plugin-loader cannot find the <main> as OrzPluginInit function of the ".concat(fileName, " plugin."));
                }
                ;
                // throw Error, if it failed to init.
                if (!initedResult)
                    // @ts-ignore Using log4js plugin //
                    _ConsoleEx.log('ERROR', "The ".concat(fileName, " failed to init, huh?"));
                if (initedResult && _OrzConf.debugmode)
                    // @ts-ignore Using log4js plugin //
                    _ConsoleEx.log('DEBUG', "The ".concat(fileName, " successfully init :D"));
                return [2 /*return*/, initedResult];
            });
        });
    };
    ;
    /**
     * sendStatus
     */
    OrzPluginProcessor.prototype.sendStatus = function (token, status) {
        return __awaiter(this, void 0, void 0, function () {
            var index, pluginData, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0: return [4 /*yield*/, this.toIndexAsToken(token)];
                    case 1:
                        index = _d.sent();
                        _a = _OrzConf.pluginsConf;
                        return [4 /*yield*/, index];
                    case 2:
                        pluginData = _a[_d.sent()];
                        return [4 /*yield*/, index];
                    case 3:
                        _b = (_d.sent()) < 0;
                        if (_b) return [3 /*break*/, 5];
                        _c = isNaN;
                        return [4 /*yield*/, index];
                    case 4:
                        _b = _c.apply(void 0, [_d.sent()]);
                        _d.label = 5;
                    case 5:
                        if (_b)
                            return [2 /*return*/, false];
                        if (_OrzConf.debugmode)
                            console.log("[DEBUG - OrzPluginLoader]: Status of the ".concat(pluginData.fileName, " plugin was changed, new: ").concat(status));
                        pluginData.status = status;
                        return [2 /*return*/, true];
                }
            });
        });
    };
    ;
    /**
     * setInfo
     */
    OrzPluginProcessor.prototype.setInfo = function (token, info) {
        return __awaiter(this, void 0, void 0, function () {
            var index, pluginData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toIndexAsToken(token)];
                    case 1:
                        index = _a.sent(), pluginData = _OrzConf.pluginsConf[index];
                        return [4 /*yield*/, index];
                    case 2:
                        if ((_a.sent()) == -1)
                            return [2 /*return*/, false];
                        pluginData.pluginInfo = info;
                        return [2 /*return*/, true];
                }
            });
        });
    };
    ;
    /**
     * toIndexAsToken
     */
    OrzPluginProcessor.prototype.toIndexAsToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.hashTable.get(token)];
            });
        });
    };
    return OrzPluginProcessor;
}());
;
/* Plugin base class */
var OrzPluginBase = /** @class */ (function () {
    function OrzPluginBase() {
    }
    OrzPluginBase.prototype.eventCallback = function () {
        return true;
    };
    ;
    return OrzPluginBase;
}());
;
var OrzPluginStatus;
(function (OrzPluginStatus) {
    OrzPluginStatus[OrzPluginStatus["loading"] = 0] = "loading";
    OrzPluginStatus[OrzPluginStatus["failed"] = 1] = "failed";
    OrzPluginStatus[OrzPluginStatus["ok"] = 2] = "ok";
    OrzPluginStatus[OrzPluginStatus["error"] = 3] = "error";
    OrzPluginStatus[OrzPluginStatus["crashed"] = 4] = "crashed";
})(OrzPluginStatus || (OrzPluginStatus = {}));
;
