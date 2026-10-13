// Static hosts may canonicalize daily.html to /daily or /daily/.
export const isDailyPath=path=>/\/daily(?:\.html)?\/?$/.test(path);
export function documentPath(path,page){
 const name=page==='daily'?'daily.html':'index.html';
 return isDailyPath(path)?path.replace(/daily(?:\.html)?\/?$/,name):path.replace(/[^/]*$/,name);
}
