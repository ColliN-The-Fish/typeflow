import {API_BASE} from './api-config.js';
export class OnlineError extends Error{constructor(code,status=0){super(code);this.code=code;this.status=status;}}
export function createOnlineClient(prefix){
 let identity=null;try{identity=JSON.parse(localStorage.getItem(prefix+'identity'));}catch{}
 if(!identity?.user?.id||!identity?.user?.name||!/^[A-Za-z0-9_-]{43}$/.test(identity?.token||''))identity=null;
 async function request(path,{method='GET',body,token=identity?.token}={}){
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),20000);
  try{const response=await fetch(API_BASE+'/'+path,{method,headers:{...(token?{Authorization:'Bearer '+token}:{}),...(body!==undefined?{'Content-Type':'application/json'}:{})},body:body===undefined?undefined:JSON.stringify(body),signal:controller.signal,credentials:new URL(API_BASE,location.href).origin===location.origin?'same-origin':'omit'});let data;try{data=await response.json();}catch{throw new OnlineError('NETWORK');}if(!response.ok)throw new OnlineError(data.error||'SERVICE',response.status);return data;}
  catch(error){if(error instanceof OnlineError)throw error;throw new OnlineError('NETWORK');}finally{clearTimeout(timeout);}
 }
 function remember(value){identity=value;try{localStorage.setItem(prefix+'identity',JSON.stringify(identity));return true;}catch{return false;}}
 return {get identity(){return identity;},request,clear(){identity=null;try{localStorage.removeItem(prefix+'identity');}catch{}},
  async register(name){const data=await request('profiles',{method:'POST',body:{name},token:null});return {user:data.user,remembered:remember(data)};},
  async restore(token){const data=await request('profile',{token});return {user:data.user,remembered:remember({user:data.user,token})};},
  async refresh(){if(!identity)return null;const data=await request('profile');remember({...identity,user:data.user});return data.user;},
  async rename(name){const data=await request('profile',{method:'PATCH',body:{name}});remember({...identity,user:data.user});return data.user;},
  leaderboard(lang){return request('leaderboard?lang='+encodeURIComponent(lang));},
  createRun(lang){return request('runs',{method:'POST',body:{lang}});},
  startRun(id,token=identity?.token){return request('runs/'+encodeURIComponent(id)+'/start',{method:'POST',body:{},token});},
  finishRun(id,trace,token=identity?.token){return request('runs/'+encodeURIComponent(id)+'/finish',{method:'POST',body:{trace},token});}
 };
}
