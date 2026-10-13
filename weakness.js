import {chars,matchCharacter} from './engine.js';
export function mistakeDetails(previous,next,target,{mode='strict',kind='character'}={}){
 const a=chars(previous),b=chars(next),goal=chars(target);let start=0;while(start<a.length&&start<b.length&&a[start]===b[start])start++;
 let tail=0;while(tail<a.length-start&&tail<b.length-start&&a[a.length-1-tail]===b[b.length-1-tail])tail++;
 const out=[];for(let i=start;i<b.length-tail;i++){if(i>=goal.length||matchCharacter(b[i],goal[i],mode))continue;
  const punctuation=/[\p{P}\p{Z}]/u.test(goal[i]);let phrase;
  if(kind==='spelling')phrase=goal.slice(Math.max(0,i-12),Math.min(goal.length,i+13)).join('');
  else if(/[A-Za-z]/.test(goal[i])){let left=i,right=i+1;while(left>0&&!/\s/.test(goal[left-1]))left--;while(right<goal.length&&!/\s/.test(goal[right]))right++;phrase=goal.slice(left,right).join('');}
  else{let left=i,right=i+1;while(left>0&&i-left<12&&!/[。！？.!?]/.test(goal[left-1]))left--;while(right<goal.length&&right-i<12&&!/[。！？.!?]/.test(goal[right]))right++;if(/[。！？.!?]/.test(goal[right]||''))right++;phrase=goal.slice(left,right).join('');}
  out.push({expected:goal[i],got:b[i],phrase:phrase.trim()||goal[i],kind:punctuation?'punctuation':kind});}
 return out;
}
export function recordWeaknesses(entries,mistakes,{lang,userId,method,now=Date.now()}={}){
 const result=entries.map(e=>({...e}));for(const m of mistakes){const key=[userId,lang,method,m.kind,m.expected,m.got].join('|');let entry=result.find(x=>x.key===key);if(!entry){entry={...m,key,userId,lang,method,count:0,streak:0,due:now};result.push(entry);}entry.count++;entry.last=now;entry.phrase=m.phrase;entry.streak=0;entry.due=now;}
 return result.sort((a,b)=>b.last-a.last).slice(0,400);
}
export function dueWeaknesses(entries,{userId,lang,now=Date.now()}={}){return entries.filter(e=>e.userId===userId&&e.lang===lang&&e.due<=now).sort((a,b)=>b.count-a.count||a.due-b.due).slice(0,10);}
export function finishReview(entries,keys,{success,now=Date.now()}={}){const wanted=new Set(keys);return entries.map(e=>{if(!wanted.has(e.key))return e;const streak=success?Math.min(3,e.streak+1):0,days=[0,1,3,7][streak];return {...e,streak,due:now+days*86400000,reviewed:now};});}
