declare let HashTable: {
    new (): {
        put(key: any, value: any): boolean;
        get(key: any): any;
        remove(key: any): boolean;
    };
};
declare var OrzCommon: {
    sha256: (data: string, isBigCase?: boolean) => string;
    formatTime: (format?: string) => string;
    deepClone: (target: any) => any;
    getCaller: () => {
        callerFn: string;
        fileName: string;
        position: {
            col: number;
            row: number;
        };
    } | void;
    hashTable: {
        new (): {
            put(key: any, value: any): boolean;
            get(key: any): any;
            remove(key: any): boolean;
        };
    };
};
