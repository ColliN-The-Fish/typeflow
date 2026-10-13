import assert from 'node:assert/strict';
import {articles,scenes,courses} from '../content.js';
import {drawCard,currentCard} from '../deck.js';
import {phonetics} from '../phonetics.js';
import {zhuyinKeys} from '../tutorials.js';
import {chars,unitCount,lengthPassage,insertedAttempts,metrics} from '../engine.js';
const languages=['en','zh','tw','yue'];
assert.equal(articles.length,200);assert.equal(new Set(articles.map(a=>a.id)).size,200);assert.equal(new Set(articles.map(a=>a.text.normalize('NFC'))).size,200);
for(const lang of languages){
 const pool=articles.filter(a=>a.lang===lang);assert.equal(pool.length,50);
 assert.equal(new Set(pool.map(a=>a.title)).size,50);
 for(const topic of ['everyday','story','science','culture','work'])assert.equal(pool.filter(a=>a.category===topic).length,10);
 for(const level of ['novice','beginner','normal','advanced','master'])assert.equal(pool.filter(a=>a.level===level).length,10);
 let deck={},previous;const ids=pool.map(a=>a.id);
 for(let round=1;round<=3;round++){const seen=[];for(let i=1;i<=50;i++){deck=drawCard(ids,JSON.parse(JSON.stringify(deck)));assert.equal(deck.round,round);assert.equal(deck.position,i);assert.equal(currentCard(ids,deck),deck.current);if(i===1&&previous)assert.notEqual(previous,deck.current);seen.push(deck.current);}assert.equal(new Set(seen).size,50);previous=deck.current;}
 const lengths=pool.map(a=>unitCount(a.text,lang));console.log(`${lang}: 50 originals; lengths ${Math.min(...lengths)}–${Math.max(...lengths)}; 150 draws without premature repeats`);
 for(const a of pool){assert(a.text.length>70);assert(!a.text.includes('|'));assert.equal(a.texts[lang],a.text);assert.equal(Object.keys(a.texts).length,1);assert.equal(lengthPassage(a.text,lang,5000),a.text);}
}
assert.equal(scenes.length,24);
for(const scene of scenes){for(const lang of ['zh','yue']){assert.equal(phonetics[scene.id][lang].length,scene.words[lang].length);assert(phonetics[scene.id][lang].every(s=>/^[a-z ]+$/.test(s)));}}
assert.equal(Object.keys(zhuyinKeys).length,37);assert.equal(new Set(Object.values(zhuyinKeys)).size,37);
for(const id of ['jyutping','zhuyin']){const course=courses.find(c=>c.id===id);assert.equal(course.lessons.length,14);for(const l of course.lessons){assert(l.body[0].length>50);assert(l.body[2].length>50);assert(l.target);if(id==='jyutping'&&l.spelling)assert(!/\d/.test(l.target));}}
assert.equal(courses.find(c=>c.id==='jyutping').lessons[2].table.length,19);
assert.deepEqual(insertedAttempts('a','ab','ab'),{attempts:1,good:1,errors:[]});assert.equal(metrics(50,55,50,30).acc,50/55*100);assert.equal(chars('𠮷').length,1);
assert.equal(unitCount(lengthPassage('One two three four five.', 'en', 3),'en'),3);
assert.equal(lengthPassage('𠮷你好，世界。','zh',3),'𠮷你好');
for(const scene of scenes){for(const lang of languages){const opening=(scene.texts[lang].match(lang==='en'?/[^.!?]+[.!?]+(?:\s|$)/g:/[^。！？]+[。！？]+/g)||[]).slice(0,2).join('').trim();assert(scene.texts[lang].length>opening.length);}}
console.log('Corpus, shuffle persistence, phonetics, tutorials, passage length, scene progression, and metric checks passed.');
