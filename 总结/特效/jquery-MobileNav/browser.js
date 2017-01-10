/**
 * @author AnThen
 * 检测用户当前浏览器类型并返回
 */

function browser(){
    var  browser = {};  
    var  userAgent = navigator.userAgent.toLowerCase();  
    var  s;  
    (s = userAgent.match(/msie ([\d.]+)/)) ? browser.ie = s[1] : 
    (s = userAgent.match(/firefox\/([\d.]+)/)) ? browser.firefox = s[1] :
    (s = userAgent.match(/chrome\/([\d.]+)/)) ? browser.chrome = s[1] :
    (s = userAgent.match(/opera.([\d.]+)/)) ? browser.opera = s[1] :
    (s = userAgent.match(/version\/([\d.]+).*safari/)) ? browser.safari = s[1] : 0;
    var  version;
    if  (browser.ie) {
        version = 'msie '  + browser.ie;
    } else if  (browser.firefox) {
        version = 'firefox '  + browser.firefox;
    } else if  (browser.chrome) {
        version = 'chrome '  + browser.chrome;
    } else if  (browser.opera) {
        version = 'opera '  + browser.opera;
    } else if  (browser.safari) {
        version = 'safari '  + browser.safari;
    } else {
        version = '未知浏览器' ;
    }
    return  version;
}
