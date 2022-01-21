
function saveCookie(data) {
    Object.entries(data)
          .map(kv => kv[0] + '=' + kv[1])
          .forEach(datum => document.cookie = datum);
}

function getCookieVal(key) {
    return document.cookie
                   .split('; ')
                   .find(kv => kv.startsWith(key))
                   .split('=')[1];
}

