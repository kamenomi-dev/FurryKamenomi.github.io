var _ColorEggs_2023 = /** @class */ (function () {
    function _ColorEggs_2023() {
    }
    /**
     * key
     */
    _ColorEggs_2023.prototype.key = function (key) {
        console.log(key, key.indexOf('NDYgVGlhbkx1byBIdQ') != -1, sha256(key));
        if (key.indexOf('NDYgVGlhbkx1byBIdQ') != -1)
            if (sha256(key, false) == '505c37f6125303e8701a60642d69bcc60ed35eeff5600e17354a7d4856128938') {
                articleHelper.absolutelyJump('Tianluo-HappyBirthday');
            }
        ;
    };
    ;
    /**
     * summonKey
     */
    _ColorEggs_2023.prototype.summonKey = function () {
        return sha256("NDYgVGlhbkx1byBIdQ Today ".concat((new Date().getFullYear()), " 01 17"));
    };
    ;
    return _ColorEggs_2023;
}());
;
var ColorEggs = new _ColorEggs_2023();
