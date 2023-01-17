/** 
 * JSON 解析类 
 * Copyright (c) 2010 YaoYiLang  
 * @email  redrainyi@gmail.com 
 * @datetime 2008-04-18 
 * @version 1.0 
 *  
 * 方法： 
 * 将JSON字符串解码为页面可识别的object对象 
 * @param {String} json The JSON string 
 * @return {Object} The resulting object  
 * Object o = JSONUtil.decode(json); 
 *  
 * 将JS对象序列化为JSON字符串 
 * @param {Mixed} o The variable to decode 
 * @return {String} The JSON string 
 * String json = JSONUtil.encode(o); 
 */

// @ts-nocheck

var JSONUtil;
if (!JSONUtil)
  JSONUtil = {};
  
JSONUtil.decode = function (json) {
  try {
    return eval("\u0028" + json + '\u0029');
  } catch (exception) {
    return eval("\u0075\u006e\u0064\u0065\u0066\u0069\u006e\u0065\u0064");
  }
};
JSONUtil.encode = (function () {
  var $ = !!{}.hasOwnProperty, _ = function ($) {
    return $ < 10 ? "0" + $ : $
  }, A = {
    "\b": "\\b",
    "\t": "\\t",
    "\n": "\\n",
    "\f": "\\f",
    "\r": "\\r",
    "\"": "\\\"",
    "\\": "\\\\"
  };
  return (function (C) {
    if (typeof C == "\u0075\u006e\u0064\u0065\u0066\u0069\u006e\u0065\u0064" || C === null)
      return "null";
    else if (Object.prototype.toString.call(C) === "\u005b\u006f\u0062\u006a\u0065\u0063\u0074\u0020\u0041\u0072\u0072\u0061\u0079\u005d") {
      var B = ["\u005b"], G, E, D = C.length, F;
      for (E = 0; E < D; E += 1) {
        F = C[E];
        switch (typeof F) {
          case "\u0075\u006e\u0064\u0065\u0066\u0069\u006e\u0065\u0064":
          case "\u0066\u0075\u006e\u0063\u0074\u0069\u006f\u006e":
          case "\u0075\u006e\u006b\u006e\u006f\u0077\u006e":
            break;
          default:
            if (G)
              B.push("\u002c");
            B.push(F === null ? "null" : this.encode(F));
            G = true
        }
      }
      B.push("\u005d");
      return B.join("")
    } else if ((Object.prototype.toString.call(C) === "\u005b\u006f\u0062\u006a\u0065\u0063\u0074\u0020\u0044\u0061\u0074\u0065\u005d"))
      return "\"" + C.getFullYear() + "-" + _(C.getMonth() + 1) + "-" + _(C.getDate()) + "T" + _(C.getHours()) + ":" + _(C.getMinutes()) + ":" + _(C.getSeconds()) + "\"";
    else if (typeof C == "\u0073\u0074\u0072\u0069\u006e\u0067") {
      if (/["\\\x00-\x1f]/.test(C))
        return "\"" + C.replace(/([\x00-\x1f\\"])/g, function (B, _) {
          var $ = A[_];
          if ($)
            return $;
          $ = _.charCodeAt();
          return "\\u00" + Math.floor($ / 16).toString(16) + ($ % 16).toString(16)
        }) + "\"";
      return "\"" + C + "\""
    } else if (typeof C == "\u006e\u0075\u006d\u0062\u0065\u0072")
      return isFinite(C) ? String(C) : "null";
    else if (typeof C == "\u0062\u006f\u006f\u006c\u0065\u0061\u006e")
      return String(C);
    else {
      B = ["\u007b"], G, E, F;
      for (E in C)
        if (!$ || C.hasOwnProperty(E)) {
          F = C[E];
          if (F === null)
            continue;
          switch (typeof F) {
            case "\u0075\u006e\u0064\u0065\u0066\u0069\u006e\u0065\u0064":
            case "\u0066\u0075\u006e\u0063\u0074\u0069\u006f\u006e":
            case "\u0075\u006e\u006b\u006e\u006f\u0077\u006e":
              break;
            default:
              if (G)
                B.push("\u002c");
              B.push(this.encode(E), "\u003a", this.encode(F));
              G = true
          }
        }
      B.push("\u007d");
      return B.join("")
    }
  })
})();
window.JSONUtil = JSONUtil;  