//获取当前相对路径
export function GetUrlRelativePath() {
    let url = document.location.toString();
    let arrUrl = url.split('//');
    let start = arrUrl[1].indexOf('#');
    let relUrl = arrUrl[1].substring(start + 1); //stop省略，截取从start开始到结尾的所有字符
    if (relUrl.indexOf('?') != -1) {
        relUrl = relUrl.split('?')[0];
    }
    return relUrl;
}