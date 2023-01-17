declare var _OrzConf: OrzConfig, _ConsoleEx: Console | OrzPluginBase, OrzPluginInit: Function;
declare class OrzPluginProcessor {
    private hashTable;
    /**
     * regPluginFileAsFile
     */
    regPluginFile(path: string, fileName: string): Promise<true>;
    /**
     * sendStatus
     */
    sendStatus(token: string, status: keyof typeof OrzPluginStatus): Promise<boolean>;
    /**
     * setInfo
     */
    setInfo(token: string, info: OrzPluginInfo): Promise<boolean>;
    /**
     * toIndexAsToken
     */
    toIndexAsToken(token: string): Promise<any>;
}
declare class OrzPluginBase {
    eventCallback(): boolean;
}
type OrzConfig = {
    isWindows: boolean;
    isFireFox: boolean;
    debugmode: boolean;
    pluginProc: OrzPluginProcessor;
    themeConf: {
        theme: string;
        theme_variable: CSSStyleDeclaration;
    };
    contentPos: number;
    pluginsConf?: OrzPlugin[];
};
type OrzPlugin = {
    path: string;
    fileName: string;
    status: keyof typeof OrzPluginStatus;
    pluginInfo?: OrzPluginInfo;
};
type OrzPluginInfo = {
    author: string;
    version: string;
    description: string;
    publicFn: Function[];
};
declare enum OrzPluginStatus {
    'loading' = 0,
    'failed' = 1,
    'ok' = 2,
    'error' = 3,
    'crashed' = 4
}
