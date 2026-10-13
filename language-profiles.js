export const languageProfiles={
 en:{locale:'en',region:'English',methods:['keyboard'],defaultMethod:'keyboard'},
 zh:{locale:'zh-Hans',region:'普通话 · 简体',methods:['pinyin','other'],defaultMethod:'pinyin'},
 tw:{locale:'zh-Hant-TW',region:'台灣國語 · 繁體',methods:['zhuyin','pinyin','other'],defaultMethod:'zhuyin'},
 yue:{locale:'yue-Hant-HK',region:'香港粵語 · 繁體',methods:['jyutping','other'],defaultMethod:'jyutping'}
};
export function methodFor(lang,saved={}){const profile=languageProfiles[lang]||languageProfiles.zh;return profile.methods.includes(saved?.[lang])?saved?.[lang]:profile.defaultMethod;}
export function inspectPassage(value){
 const text=String(value).normalize('NFC'),issues=[];
 if(/[\u00AD\u200B-\u200D\uFEFF\u2060]/u.test(text))issues.push('invisible');
 if(/[\u00A0\u202F\u3000]/u.test(text))issues.push('spaces');
 if(/[‘’“”「」『』]/u.test(text))issues.push('quotes');
 if(/[\r\n]/u.test(text))issues.push('linebreaks');
 return {text,issues};
}
export function preparePassage(value,{removeInvisible=true}={}){let text=String(value).normalize('NFC');if(removeInvisible)text=text.replace(/[\u00AD\u200B\u200C\uFEFF\u2060]/gu,'').replace(/(?<!\p{Extended_Pictographic})\u200D(?!\p{Extended_Pictographic})/gu,'');return text.replace(/\s+/gu,' ').trim();}
