import assert from 'node:assert/strict';
import {compare,insertedAttempts,matchCharacter} from '../engine.js';
import {languageProfiles,methodFor,inspectPassage,preparePassage} from '../language-profiles.js';
import {candidateLessons,symbolsForKeys,checkSpelling,nextCandidateState} from '../candidate-trainer.js';
import {recordWeaknesses,dueWeaknesses,finishReview,mistakeDetails} from '../weakness.js';
import {readingDetails,validJyutpingReading,jyutpingFor} from '../jyutping.js';
import {readingSnapshots} from '../reading-snapshots.js';
import {scenes,courses,articles} from '../content.js';
import {bindCommittedInput} from '../ime.js';
assert.equal(compare('你好,世界.','你好，世界。',true).incorrect,2);
assert.equal(compare('你好,世界.','你好，世界。',true,'compatible').incorrect,0);
assert.equal(insertedAttempts('','Hello,','Hello，','compatible').good,6);
assert.equal(matchCharacter('a','A','compatible'),false);
assert.equal(matchCharacter('简','簡','compatible'),false);
assert.equal(matchCharacter('Ａ','A','compatible'),false);
assert.equal(matchCharacter('’',"'",'compatible'),true);
assert.equal(methodFor('yue',{}),'jyutping');assert.equal(methodFor('tw',{tw:'pinyin'}),'pinyin');assert.equal(methodFor('tw',{tw:'bogus'}),'zhuyin');assert.equal(languageProfiles.yue.locale,'yue-Hant-HK');
assert.deepEqual(inspectPassage('Hello\u200b\u00a0“test”\n').issues,['invisible','spaces','quotes','linebreaks']);
assert.equal(preparePassage('  A\u200bB\u00a0C\nD '),'AB C D');assert.equal(preparePassage('👩‍💻'),'👩‍💻');assert.equal(preparePassage('a\u200db'),'ab');
for(const [method,steps] of Object.entries(candidateLessons)){assert.equal(steps.length,8);for(const step of steps){assert(step.candidates.includes(step.target));assert(checkSpelling(step.code,step,method));if(method==='jyutping')assert(!/\d/.test(step.code));}}
assert.equal(symbolsForKeys('su3'),'ㄋㄧˇ');assert(checkSpelling('ㄋㄧˇ',candidateLessons.zhuyin[0],'zhuyin'));
assert.equal(checkSpelling('su',candidateLessons.zhuyin[0],'zhuyin'),false);
let tr={index:0,wrong:0};tr=nextCandidateState(tr,'泥',candidateLessons.pinyin);assert.equal(tr.index,0);assert.equal(tr.wrong,1);tr=nextCandidateState(tr,'你',candidateLessons.pinyin);assert.equal(tr.index,1);
assert.equal(readingDetails('行',{custom:true})[0].source,'uncertain');assert.equal(readingDetails('銀行',{custom:true})[1].source,'specified');assert.equal(readingDetails('𰻝',{custom:true})[0].source,'unknown');assert.equal(readingDetails('行',{custom:true,edits:{0:'hong'}})[0].reading,'hong');
assert(validJyutpingReading('m'));assert(validJyutpingReading('nei'));assert(!validJyutpingReading('abc'));assert(!validJyutpingReading('nei5'));
for(const a of articles.filter(a=>a.lang==='yue'))assert.deepEqual(readingSnapshots[a.text],jyutpingFor(a.text));
for(const scene of scenes)for(const lang of ['en','zh','tw','yue']){assert.equal(scene.words[lang].length,12);assert.equal(scene.passages[lang].length,2);assert.equal(new Set(scene.passages[lang]).size,2);assert.equal(new Set(scene.sentenceSets[lang]).size,3);}
assert(courses.find(c=>c.id==='pinyin').lessons.length>=12);
const m=mistakeDetails('','abx','abc');assert.equal(m[0].expected,'c');assert.equal(m[0].got,'x');assert.equal(mistakeDetails('',',','，',{mode:'compatible'}).length,0);
let list=recordWeaknesses([],m,{lang:'en',userId:'a',method:'keyboard',now:100});assert.equal(dueWeaknesses(list,{userId:'b',lang:'en',now:100}).length,0);assert.equal(dueWeaknesses(list,{userId:'a',lang:'zh',now:100}).length,0);assert.equal(dueWeaknesses(list,{userId:'a',lang:'en',now:100}).length,1);
for(const days of [1,3,7]){list=finishReview(list,[list[0].key],{success:true,now:100});assert.equal(list[0].due,100+days*86400000);assert.equal(dueWeaknesses(list,{userId:'a',lang:'en',now:101}).length,0);}
list=finishReview(list,[list[0].key],{success:false,now:200});assert.equal(list[0].due,200);
class Input extends EventTarget{value='';}
const input=new Input(),commits=[];let starts=0;const binding=bindCommittedInput(input,{onStart:()=>starts++,onCommit:value=>commits.push(value)});
const fire=(name,attrs={})=>{const event=new Event(name,{cancelable:true});Object.assign(event,attrs);input.dispatchEvent(event);return event;};
fire('compositionstart');input.value='ni';fire('input',{isComposing:true});assert.equal(commits.length,0);input.value='你好';fire('compositionend');fire('input',{isComposing:false});await Promise.resolve();assert.deepEqual(commits,['你好']);
fire('compositionstart');fire('compositionend');await Promise.resolve();assert.equal(commits.length,1);assert.equal(binding.composing,false);
assert(fire('paste').defaultPrevented);assert(fire('keydown',{key:'Enter',isComposing:false,keyCode:13}).defaultPrevented);assert(!fire('keydown',{key:'Enter',isComposing:true,keyCode:229}).defaultPrevented);
binding.dispose();input.value='再见';fire('input',{isComposing:false});assert.equal(commits.length,1);
console.log('PASS: exact vs compatible rules, original case/characters preserved, safe text cleanup, language profiles, finite candidates, untoned contextual readings, scene variations, spaced reviews, and IME duplicate/cancel/Enter handling');
