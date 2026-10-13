// Consume only confirmed text. Session code owns clock start and deadline checks.
export function bindCommittedInput(input,{onStart=()=>{},onCommit=()=>{},onComposition=()=>{},onBlocked=()=>{}}={}){
 let composing=false,last=input.value;
 const begin=e=>{if(e.inputType?.startsWith('insert')&&!['insertFromPaste','insertFromDrop'].includes(e.inputType))onStart();};
 const commit=()=>{if(composing)return;const next=input.value;if(next===last)return;last=next;onCommit(next);};
 const start=()=>{composing=true;onComposition(true);onStart();};
 const end=()=>{composing=false;onComposition(false);queueMicrotask(commit);};
 const change=e=>{if(!e.isComposing)commit();};
 const block=e=>{e.preventDefault();onBlocked();};
 const key=e=>{if(e.key==='Enter'&&!e.isComposing&&!composing&&e.keyCode!==229)e.preventDefault();};
 for(const [name,fn] of [['beforeinput',begin],['compositionstart',start],['compositionend',end],['input',change],['paste',block],['drop',block],['keydown',key]])input.addEventListener(name,fn);
 return {get composing(){return composing;},sync(){last=input.value;},dispose(){for(const [name,fn] of [['beforeinput',begin],['compositionstart',start],['compositionend',end],['input',change],['paste',block],['drop',block],['keydown',key]])input.removeEventListener(name,fn);}};
}
