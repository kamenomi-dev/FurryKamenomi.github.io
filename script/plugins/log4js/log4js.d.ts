type consoleExAppenderPrototype = {
    file?: string | string[];
    writer?: HTMLElement | HTMLElement[];
};
declare enum consoleExLevel {
    'FATAL' = 0,
    'ERROR' = 1,
    'WARN' = 2,
    'INFO' = 3,
    'DEBUG' = 4,
    'ALL' = 5
}
declare enum consoleExLevelColor {
    'ORANGE' = 0,
    'READ' = 1,
    'YELLOW' = 2,
    'WHITE' = 3,
    'BLUE' = 4,
    '#00000000' = 5
}
