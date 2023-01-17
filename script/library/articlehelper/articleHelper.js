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
/**
 * @name articleHelper
 * @depend JQuery, Showdown
 * @description yeah, this is a Article Helper.
 * @author Creakler
 */
var _articleHelper = /** @class */ (function () {
    function _articleHelper() {
        this.articleHashTable = new hashTable();
        this.currentArticle = -1;
        this.showdown = new showdown.Converter();
    }
    ;
    /**
     * init
     * @param articleTable File URL
     * @param configFile File URL
     * @description init article helper plugin. isn't depend on Orz.
     */
    _articleHelper.prototype.init = function (applyElement, tableFile, configFile) {
        return __awaiter(this, void 0, void 0, function () {
            var articleTables, articleConfig;
            return __generator(this, function (_a) {
                ;
                (function parseArticleTable() {
                    $.ajax({
                        url: tableFile,
                        type: 'GET',
                        async: false,
                        success: function (response) {
                            articleTables = response;
                        },
                        error: function () {
                            // @ts-ignore // Using Log4js plugin //
                            _ConsoleEx.log('ERROR', "The '".concat(articleTable, "' Table isn't exist!"));
                        }
                    });
                })();
                ;
                (function parseArticleConfig() {
                    $.ajax({
                        url: configFile,
                        type: 'GET',
                        async: false,
                        success: function (response) {
                            articleConfig = response;
                        },
                        error: function () {
                            // @ts-ignore // Using Log4js plugin //
                            _ConsoleEx.log('ERROR', "The '".concat(configFile, "' Config isn't exist!"));
                        }
                    });
                })();
                this.tables = articleTables;
                this.config = articleConfig;
                this.applyElement = applyElement;
                if (this.config.debugMode) {
                    // @ts-ignore // Using Log4js plugin //
                    _ConsoleEx.log('INFO', 'Successfully init <_articleHelper> class!');
                }
                ;
                return [2 /*return*/];
            });
        });
    };
    ;
    /**
     * absolutelyJump
     * @param articleName
     */
    _articleHelper.prototype.absolutelyJump = function (articleName) {
        var _this = this;
        this.tables.lists.forEach(function (value, index) {
            if (value.title == articleName) {
                _this.currentArticle = index;
                _this.refresh();
                return true;
            }
            ;
        });
        if (this.currentArticle == -1) {
            this.absolutelyJump('404');
            return false;
        }
        ;
        return true;
    };
    ;
    _articleHelper.prototype.refresh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var articleFile, articleInfo, articleBody;
            var _this = this;
            return __generator(this, function (_a) {
                if (this.currentArticle < 0 || this.currentArticle > this.tables.lists.length - 1)
                    return [2 /*return*/, false];
                articleFile = this.tables.lists[this.currentArticle].toFile;
                ;
                (function () {
                    $.ajax({
                        url: "".concat(_this.config.articlePath + articleFile, ".at"),
                        type: 'GET',
                        async: false,
                        success: function (response) {
                            articleBody = response;
                        },
                        error: function () {
                            // @ts-ignore // Using Log4js plugin //
                            _ConsoleEx.log('ERROR', "The article '".concat(articleFile, "' isn't exist."));
                            // this.absolutelyJump('404');
                        }
                    });
                })();
                ;
                (function () {
                    $.ajax({
                        url: "".concat(_this.config.articlePath + articleFile, ".info.json"),
                        type: 'GET',
                        async: false,
                        success: function (response) {
                            articleInfo = response;
                        },
                        error: function () {
                            // @ts-ignore // Using Log4js plugin //
                            _ConsoleEx.log('ERROR', "Info.config of the article '".concat(articleFile, "' isn't exist."));
                            // this.absolutelyJump('404');
                        }
                    });
                })();
                document.title = "creaklerblog 2023 - ".concat(articleInfo.name);
                switch (articleInfo.articleType.toLowerCase()) {
                    case 'html':
                        $('#Content-HTML').remove();
                        $('<div/>', {
                            id: "Content-HTML"
                        })
                            .appendTo('#Orz-Content')[0]
                            .innerHTML = articleBody;
                        break;
                    case 'markdown':
                        $('#Content-Markdown').remove();
                        $('<div/>', {
                            id: "Content-Markdown"
                        })
                            .appendTo('#Orz-Content')
                            .html(this.showdown.makeHtml(articleBody));
                        break;
                    default:
                        // @ts-ignore // Using Log4js plugin //
                        _ConsoleEx.log('ERROR', "The article '".concat(articleFile, "' is using a unsupport Type: <").concat(articleInfo.articleType, ">"));
                        break;
                }
                return [2 /*return*/, false];
            });
        });
    };
    ;
    return _articleHelper;
}());
;
var articleHelper = new _articleHelper();
