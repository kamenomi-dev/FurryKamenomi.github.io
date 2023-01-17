/**
 * @name articleHelper
 * @depend JQuery, Showdown
 * @description yeah, this is a Article Helper.
 * @author Creakler
 */
class _articleHelper {
  private articleHashTable = new hashTable();
  private tables!: articleTableStruc;
  private config!: articleConfigStruc;
  private applyElement!: HTMLElement;
  private currentArticle: number = -1;

  private showdown: showdown.Converter = new showdown.Converter()

  constructor() {

  };
  /**
   * init
   * @param articleTable File URL
   * @param configFile File URL
   * @description init article helper plugin. isn't depend on Orz.
   */
  public async init(applyElement: HTMLElement, tableFile: string, configFile: string) {
    let
      articleTables!: articleTableStruc,
      articleConfig!: articleConfigStruc;
    ; (function parseArticleTable() {
      $.ajax({
        url: tableFile,
        type: 'GET',
        async: false,
        success: response => {
          articleTables = response as articleTableStruc;
        },
        error: () => {
          // @ts-ignore // Using Log4js plugin //
          _ConsoleEx.log('ERROR', `The '${articleTable}' Table isn't exist!`);
        }
      });
    })();
    ; (function parseArticleConfig() {
      $.ajax({
        url: configFile,
        type: 'GET',
        async: false,
        success: response => {
          articleConfig = response as articleConfigStruc;
        },
        error: () => {
          // @ts-ignore // Using Log4js plugin //
          _ConsoleEx.log('ERROR', `The '${configFile}' Config isn't exist!`);
        }
      });
    })();
    this.tables = articleTables;
    this.config = articleConfig;
    this.applyElement = applyElement;
    if (this.config.debugMode) {
      // @ts-ignore // Using Log4js plugin //
      _ConsoleEx.log('INFO', 'Successfully init <_articleHelper> class!');
    };
  };
  /**
   * absolutelyJump
   * @param articleName
   */
  public absolutelyJump(articleName: string): boolean {
    this.tables.lists.forEach((value, index) => {
      if (value.title == articleName) {
        this.currentArticle = index;
        this.refresh();
        return true;
      };
    });
    if(this.currentArticle == -1) {
      this.absolutelyJump('404');
      return false;
    };
    return true;
  };
  private async refresh(): Promise<boolean> {
    if (this.currentArticle < 0 || this.currentArticle > this.tables.lists.length - 1)
      return false;
    let
      articleFile = this.tables.lists[this.currentArticle].toFile,
      articleInfo!: articleInfoStruc,
      articleBody!: string;
    ; (() => {
      $.ajax({
        url: `${this.config.articlePath + articleFile}.at`,
        type: 'GET',
        async: false,
        success: response => {        
          articleBody = response as string;
        },
        error: () => {
          // @ts-ignore // Using Log4js plugin //
          _ConsoleEx.log('ERROR', `The article '${articleFile}' isn't exist.`);
          // this.absolutelyJump('404');
        }
      })
    })();
    ; (() => {
      $.ajax({
        url: `${this.config.articlePath + articleFile}.info.json`,
        type: 'GET',
        async: false,
        success: response => {        
          articleInfo = response as articleInfoStruc;
        },
        error: () => {
          // @ts-ignore // Using Log4js plugin //
          _ConsoleEx.log('ERROR', `Info.config of the article '${articleFile}' isn't exist.`);
          // this.absolutelyJump('404');
        }
      })
    })();
    
    document.title = `creaklerblog 2023 - ${articleInfo.name}`
    switch (articleInfo.articleType.toLowerCase()) {
      case 'html':
        $('#Content-HTML').remove();
        $('<div/>', {
          id: "Content-HTML",
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
        .html(
          this.showdown.makeHtml(articleBody)
        );
        
        break;
      default:
        // @ts-ignore // Using Log4js plugin //
        _ConsoleEx.log('ERROR', `The article '${articleFile}' is using a unsupport Type: <${articleInfo.articleType}>`);
        break;
    }
    return false;
  };
};
type articleTableStruc = {
  lists: [{
    title: string,
    toFile: string,
    isInternal: boolean,
    internalConf: {
      httpcode: number
    },
  }],
};
type articleConfigStruc = {
  debugMode: boolean,
  isDefault: string,
  customStyle: string,
  articlePath: string
};
type articleInfoStruc = {
  name: string,
  time: string,
  author: string,
  articleType: string,
  lastEditTime: string
};
var articleHelper = new _articleHelper();