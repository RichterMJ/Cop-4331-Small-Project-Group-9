
function saveCookie(data) {

    const minutes = 20;
    const date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));

    Object.entries(data)
          .map(kv => kv[0] + '=' + kv[1])
          .forEach(datum => document.cookie = datum + ';expires=' + date.toGMTString());
}

function getCookieVal(key) {
    return document.cookie
                   .split('; ')
                   .find(kv => kv.startsWith(key))
                   .split('=')[1];
}

