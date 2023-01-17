var
  _OrzConf: OrzConfig,
  _ConsoleEx: Console | OrzPluginBase,
  OrzPluginInit: Function;
$(async () => {
  // Check Cookies and set Config
  if (!$.cookie('Orz-Theme'))
    $.cookie('Orz-Theme', 'dark', { expires: 365 });
  if (!$.cookie('Orz-ContentsPos'))
    $.cookie('Orz-ContentsPos', 256, { expires: 365 });

  // Init Element
  let
    htmlBody = $('body')[0] as HTMLElement,
    orzTopbar = $('#Orz-Topbar')[0] as HTMLElement,
    orzContent = $('#Orz-Content')[0] as HTMLElement,
    orzDetectLine = $('#Orz-DContent-DetectLine')[0] as HTMLElement,
    orzActivityBarContent = $('#Orz-ActivityBar-Content')[0] as HTMLElement,
    cookieTheme = $.cookie('Orz-Theme') as string,
    cookieContentPos = $.cookie('Orz-ContentsPos') as number;

  // Set control by Cookies
  {
    /* Theme */ {
      $('#Orz-Theme')[0]['src']
        = `./style/themes/${cookieTheme}/color.css`
    };

    /* Content */ {
      orzDetectLine.onmousedown = () => {
        document.onmousemove = ev => {
          let step = ev.pageX;
          if ((85 + 48 < step && step < 170 + 48)
            || orzContent.style.width == '300px')
            return;
          if (htmlBody.clientWidth - step <= 300)
            step = htmlBody.clientWidth - 300;
          if (ev.pageX < 85 + 48 + 1)
            step = 48;


          orzActivityBarContent.style.width = `${step - 48}px`;
          orzDetectLine.style.left = `${step - 3}px`;
          orzContent.style.left = `${step}px`;
        };
      };
      document.onmouseup = () => {
        document.onmousemove = () => { };
        let newPos = orzContent.offsetLeft;

        orzDetectLine.style.left = `${newPos - 3}px`
        $.cookie('Orz-ContentsPos', newPos, { expires: 365 });
      };



      orzActivityBarContent.style.width = `${cookieContentPos - 48}px`;
      orzDetectLine.style.left = `${cookieContentPos - 3}px`
      orzContent.style.left = `${cookieContentPos}px`;
    };
  };



  // Set global config
  let userAgent = navigator.userAgent;
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
    htmlBody.onfocus = htmlBody.onblur = ev => {
      let isFocus = _OrzConf.isFocus = (ev.type == 'focus');
      MI_ChangeAllFontColor(isFocus);
      orzTopbar.style.backgroundColor
        = _OrzConf.themeConf.theme_variable.getPropertyValue(
          isFocus
            ? '--Orz-TopBar-BackgroundColor'
            : '--Orz-TopBar-BackgroundColor-unForced'
        );
    };
  };
  /* Topbar */ {
    /* Favicon */ {
      $('.Orz-Logo').each((index, logo) => {
        logo.onclick = () => {
          location.href = '/';
        };
      });
    };
    /* MenuItem */ {
      let items = $('#Orz-Topbar>.Orz-Item').children();
      items.each((index, item) => {
        item.onclick = () => {
          // DEBUG //
          // @ts-ignore Using log4js plugin //
          _ConsoleEx.log('DEBUG', `The top-bar current index is ${index}`);
        };
        item.onmouseover = item.onmouseout = ev => {
          let isOver = (ev.type == 'mouseover');
          (item.firstElementChild as HTMLElement).style.backgroundColor
            = isOver
              ? _OrzConf.themeConf.theme_variable.getPropertyValue('--Orz-Topbar-Item-BackgroundColor')
              : 'transparent';
          if (!_OrzConf.isFocus)
            item.style.color
              = _OrzConf.themeConf.theme_variable.getPropertyValue(
                isOver
                  ? '--Orz-TextIcon-Default'
                  : '--Orz-TextIcon-unForced'
              );
        };
      });
    };
  };
  /* Activity - Bar */ {
    /* Tablist */ {
      let
        tabItems = $('.Actions-Tab').children(),
        highlight = $('#Actions-Tab-Highlight')[0] as HTMLElement;

      tabItems[0].style.color = _OrzConf.themeConf.theme_variable.getPropertyValue('--Orz-TextIcon-Default');
      tabItems.each((index, item) => {
        item.onclick = () => {
          let
            lastItem = tabItems[_OrzConf.activityTablistIndex];
          // Move position & Set Color//
          highlight.style.top = `${item.offsetTop}px`;
          lastItem.style.color = _OrzConf.themeConf.theme_variable.getPropertyValue('--Orz-TextIcon-unForced');
          // Set new index //
          _OrzConf.activityTablistIndex = index;
          // DEBUG //
          if (_OrzConf.debugmode) {
            // @ts-ignore Using log4js plugin //
            _ConsoleEx.log('DEBUG', `The activity-bar current index is ${index}`);
          };
        };
        item.onmouseover = item.onmouseout = ev => {
          let
            isOver = (ev.type == 'mouseover'),
            isActive = (_OrzConf.activityTablistIndex == index);
          // Ignore active tab //
          if (isActive)
            return;

          // Set status color //
          item.style.color
            = _OrzConf.themeConf.theme_variable.getPropertyValue(
              isOver
                ? '--Orz-TextIcon-Default'
                : '--Orz-TextIcon-unForced'
            );
        };
      });
    };
  };
  /* Editor */ {
    // Variable //
    let
      orzEditor = $('#Orz-Editor'),
      orzEditContent = $('#Editor-Content'),
      orzEditContentStatus = $('#Editor-Content-Status'),
      cssTips = _OrzConf.themeConf.theme_variable.getPropertyValue('--Editor-tips');

    // Auto Set //
    orzEditor.hide();
    orzEditContent.val(cssTips);

    // Event Listen //
    // Keydown
    $('body').on('keydown', ev => {
      if (ev.ctrlKey && ev.code == 'KeyP') {
        orzEditor.toggle();
        orzEditor.trigger('focus');
        ev.preventDefault();
      };
    });
    // Focus & Blur
    orzEditContent[0].onfocus = orzEditContent[0].onblur = ev => {
      let isFocus = (ev.type == 'focus');
      orzEditContent.val(
        orzEditContent.val() == (isFocus ? cssTips : '')
          ? (isFocus 
            ? ''
            : cssTips
          ):
          orzEditContent.val() as string);
      if (!isFocus) {
        orzEditor.hide();
      };
    };
    // Input
    orzEditContent.on('input', ev => {
      let
        values = orzEditContent.val()!.toString().split(' >'),
        prefix = values[0].toLowerCase();
        // search = values[1].trimStart();
      
      switch (prefix) {
        case 'key':
          _OrzConf.editorStatus = 'key';
          orzEditContentStatus.text('\uEB11');
          break;
        default:
          _OrzConf.editorStatus = 'search';
          orzEditContentStatus.text('\uEA73');
          break;
      };
    });
    // Enter
    orzEditContent.on('keydown', ev => {      
      if(ev.code == 'Enter' || ev.code == 'NumpadEnter')
        if(_OrzConf.editorStatus == 'key')
          ColorEggs.key((orzEditContent.val() as string).split('>')[1].trimStart());
    });
  };

  /* Load dependent plugin */ {
    _OrzConf.pluginProc.regPluginFile('//www.furrycreakler.cn/script/plugins/log4js', 'log4js');
  };

  /* ToWebsiteMain */ {
    websiteMain();
  };
});
// GLOBAL EVENT //
/* For MenuItem */
function MI_ChangeAllFontColor(isFocus: boolean) {
  let items = $('#Orz-Topbar>.Orz-Item').children()
  if (isFocus)
    items.css('color', _OrzConf.themeConf.theme_variable.getPropertyValue('--Orz-TextIcon-Default'));
  else
    items.css('color', _OrzConf.themeConf.theme_variable.getPropertyValue('--Orz-TextIcon-unForced'));
};

// PLUGIN SUPPORT //
class OrzPluginProcessor {
  private hashTable = new hashTable();
  /**
   * regPluginFileAsFile
   */
  public async regPluginFile(path: string, fileName: string) {
    let
      /* Variable */
      initedResult: boolean = false,
      ajaxResult: boolean = false,
      /* Function */
      summonToken = (getMain: boolean) => {
        return sha256(fileName + (~(new Date()).getTime())).slice(0, getMain ? 6 : -1);
      };
    /* Check the plugin is exist */ {
      $.ajax({
        url: `${path}/${fileName}.js`,
        type: 'GET',
        async: false,
        success: () => {
          ajaxResult = true;
        }
      });
      if (!ajaxResult) {
        // @ts-ignore Using Log4js plugin// 
        _ConsoleEx.log('WARN', `The ${fileName} plugin isn't exist on ${path}/*`);
      };
    };

    // Create the script to load.
    $('<script/>', {
      src: `${path}/${fileName}.js`,
      id: `pl-${fileName}`
    }).appendTo('orz-plugins');

    // Push it into list.
    _OrzConf.pluginsConf!.push(
      {
        path: path,
        fileName: fileName,
        status: 'loading',
      }
    );

    // Summon a once Token.
    let token: string = summonToken(true);

    // Hashtable add pluginToken & Index.
    this.hashTable.put(token, _OrzConf.pluginsConf!.length - 1);

    // Call include function.
    try {
      initedResult = OrzPluginInit(token);
    } catch (err) {
      // @ts-ignore Using log4js plugin //
      _ConsoleEx.log('ERROR', `The plugin-loader cannot find the <main> as OrzPluginInit function of the ${fileName} plugin.`);
    };



    // throw Error, if it failed to init.
    if (!initedResult)
      // @ts-ignore Using log4js plugin //
      _ConsoleEx.log('ERROR', `The ${fileName} failed to init, huh?`)
    if (initedResult && _OrzConf.debugmode)
      // @ts-ignore Using log4js plugin //
      _ConsoleEx.log('DEBUG', `The ${fileName} successfully init :D`)

    return initedResult;
  };

  /**
   * sendStatus
   */
  public async sendStatus(token: string, status: keyof typeof OrzPluginStatus) {
    let
      index = await this.toIndexAsToken(token),
      pluginData = _OrzConf.pluginsConf![await index];
    if (await index < 0 || isNaN(await index))
      return false;
    if (_OrzConf.debugmode)
      console.log(`[DEBUG - OrzPluginLoader]: Status of the ${pluginData.fileName} plugin was changed, new: ${status}`)
    pluginData.status = status;
    return true;
  };

  /**
   * setInfo
   */
  public async setInfo(token: string, info: OrzPluginInfo) {
    let
      index = await this.toIndexAsToken(token),
      pluginData = _OrzConf.pluginsConf![index];
    if (await index == -1)
      return false;
    pluginData.pluginInfo = info;
    return true;
  };

  /**
   * toIndexAsToken
   */
  public async toIndexAsToken(token: string) {
    return this.hashTable.get(token);
  }
};
/* Plugin base class */
class OrzPluginBase {
  public eventCallback(): boolean {
    return true;
  };
};

type OrzConfig = {
  debugmode: boolean,
  isFocus: boolean,
  isWindows: boolean,
  isFireFox: boolean,
  pluginProc: OrzPluginProcessor,
  pluginsConf?: OrzPlugin[],
  themeConf: {
    theme: string,
    theme_variable: CSSStyleDeclaration,
  },
  editorStatus: string;
  contentPos: number,
  activityTablistIndex: number,
};
type OrzPlugin = {
  path: string,
  fileName: string,
  status: keyof typeof OrzPluginStatus,
  pluginInfo?: OrzPluginInfo,
}
type OrzPluginInfo = {
  author: string,
  version: string,
  description: string,
  publicFn: Function[],
};
enum OrzPluginStatus {
  'loading', 'failed', 'ok', 'error', 'crashed'
};
