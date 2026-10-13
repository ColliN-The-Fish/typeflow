// A persisted shuffle bag per language. Configuration changes never draw cards.
export function drawCard(ids,previous={},random=Math.random){
 const valid=new Set(ids);const known=previous.ids||[];
 const compatible=known.length===ids.length&&known.every(id=>valid.has(id));
 const old=compatible?previous:{};
 let remaining=(old.remaining||[]).filter(id=>valid.has(id));let round=old.round||0;
 if(!remaining.length){
  remaining=[...ids];round++;
  for(let i=remaining.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[remaining[i],remaining[j]]=[remaining[j],remaining[i]];}
  if(remaining.length>1&&remaining[0]===old.current)[remaining[0],remaining[1]]=[remaining[1],remaining[0]];
 }
 const current=remaining.shift();
 return {ids:[...ids],current,remaining,round,position:ids.length-remaining.length};
}
export function currentCard(ids,saved){return saved&&saved.ids?.length===ids.length&&saved.ids.every(id=>ids.includes(id))&&ids.includes(saved.current)?saved.current:null;}
