const punctuationPairs={'，':',','。':'.','；':';','：':':','！':'!','？':'?','（':'(', '）':')','【':'[','】':']','「':'"','」':'"','『':'"','』':'"','“':'"','”':'"','‘':"'",'’':"'",'　':' ',' ':' '};
export function matchCharacter(a,b,mode='strict') {if(a===b)return true;if(mode!=='compatible')return false;const fold=c=>punctuationPairs[c]||(c&&c.codePointAt(0)>=0xff01&&c.codePointAt(0)<=0xff5e&&/\p{P}/u.test(c)?String.fromCodePoint(c.codePointAt(0)-0xfee0):c);return fold(a)===fold(b);}
export function chars(text) { return Array.from(text.normalize('NFC')); }
export function compare(text, target, whole=false,mode='strict') {
 const a=chars(text),b=chars(target);let correct=0,incorrect=0,extra=0;
 a.forEach((c,i)=>{if(i>=b.length)extra++;else if(matchCharacter(c,b[i],mode))correct++;else incorrect++;});
 return {correct,incorrect,extra,missed:whole?Math.max(0,b.length-a.length):0};
}
export function insertedAttempts(previous,next,target,mode='strict') {
 const a=chars(previous),b=chars(next),goal=chars(target);let start=0;
 while(start<a.length&&start<b.length&&a[start]===b[start])start++;
 let tail=0;while(tail<a.length-start&&tail<b.length-start&&a[a.length-1-tail]===b[b.length-1-tail])tail++;
 let attempts=0,good=0,errors=[];
 for(let i=start;i<b.length-tail;i++){attempts++;if(matchCharacter(b[i],goal[i],mode))good++;else errors.push(i);}
 return {attempts,good,errors};
}
export function metrics(correct,attempts,good,seconds) {
 const minutes=Math.max(seconds,0.01)/60;
 return {wpm:correct/5/minutes,raw:attempts/5/minutes,acc:attempts?good/attempts*100:100,cpm:correct/minutes};
}
export function consistency(samples) {
 if(!samples.length)return 0;const mean=samples.reduce((a,b)=>a+b,0)/samples.length;
 if(!mean)return 0;const sd=Math.sqrt(samples.reduce((a,b)=>a+(b-mean)**2,0)/samples.length);
 return 100/(1+sd/mean);
}
export function lengthPassage(text,language,count) {
 if(language==='en')return text.trim().split(/\s+/).slice(0,count).join(' ');
 let units=0,out='';for(const ch of chars(text)){if(!/\s/.test(ch)&&units++>=count)break;out+=ch;}return out.trim();
}
export function unitCount(text,language){return language==='en'?text.trim().split(/\s+/).filter(Boolean).length:chars(text.replace(/\s/g,'')).length;}
export function dayKey(date=new Date()){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
export function hash(value){return Array.from(value).reduce((a,c)=>(a*31+c.codePointAt(0))>>>0,0);}
