import {sceneLexicalOverrides} from './scene-library.js';
import {readingSnapshots} from './reading-snapshots.js';
import {sceneReadings} from './jyutping-scene-words.js';
import {lexicon} from './jyutping-lexicon.js';
const dictionary=new Map(lexicon.split('\n').map(line=>{const at=line.indexOf('\t');return [line.slice(0,at),line.slice(at+1).split(' ')];}));
// Context-specific readings and teaching examples take precedence over lookup.
const overrides={
'你好':'nei hou','我哋':'ngo dei','唔該':'m goi','多謝':'do ze','屋企':'uk kei','梳化':'so faa','醫院':'ji jyun','港鐵':'gong tit','八達通':'baat daat tung','星期日':'sing kei jat','朝早':'ziu zou','一齊':'jat cai','執屋':'zap uk','陽光':'joeng gwong','照入嚟':'ziu jap lai','傾吓':'king haa','今日':'gam jat','銀行':'ngan hong','行路':'haang lou','行過':'haang gwo','行返':'haang faan','直行':'zik haang','行程':'hang cing','行李':'hang lei','重新':'cung san','重複':'cung fuk','重要':'zung jiu','長大':'zoeng daai','長者':'zoeng ze','得閒':'dak haan','覺得':'gok dak','食飯':'sik faan','早餐':'zou caan','房間':'fong gaan','家人':'gaa jan','窗':'coeng','窗戶':'coeng wu','落雨':'lok jyu','上堂':'soeng tong','覆診':'fuk can','埋單':'maai daan','似':'ci','咋':'zaa','嘅':'ge','咗':'zo','喺':'hai','係':'hai','冇':'mou','咩':'me','佢':'keoi','哋':'dei','嚟':'lai','唔':'m','嗰':'go','啲':'di','咁':'gam','吓':'haa','喎':'wo','喇':'laa','嘞':'laak','噉':'gam','呢':'ni','呀':'aa','啊':'aa','行':'haang','長':'coeng','巴':'baa','怕':'paa','媽':'maa','花':'faa','打':'daa','他':'taa','那':'naa','啦':'laa','家':'gaa','卡':'kaa','牙':'ngaa','蝦':'haa','瓜':'gwaa','夸':'kwaa','蛙':'waa','渣':'zaa','叉':'caa','沙':'saa','也':'jaa','山':'saan','新':'san','詩':'si','夫':'fu','書':'syu','水':'seoi','上':'soeng','院':'jyun','心':'sam','生':'saang','十':'sap','八':'baat','屋':'uk','學':'hok','吳':'ng','史':'si','試':'si','時':'si','市':'si','事':'si'
};
for(const [word,code] of Object.entries({...sceneReadings,...sceneLexicalOverrides,...overrides}))dictionary.set(word,code.split(' '));
const maxLength=6;
const curated=new Set(Object.keys({...sceneReadings,...sceneLexicalOverrides,...overrides}));
export const alternativeReadings={"便":["bin","pin"],"差":["caa","caai","ci","co"],"朝":["ciu","ziu","zyu"],"長":["coeng","zoeng"],"藏":["cong","zong"],"數":["cuk","sok","sou"],"重":["cung","zung"],"傳":["cyun","zyun"],"單":["daan","sim","sin"],"地":["dei","deng"],"調":["deu","diu","tiu"],"覺":["gaau","gok"],"強":["goeng","koeng"],"行":["haang","hang","hong"],"了":["laa","liu"],"露":["lau","lou"],"樂":["lok","ngaau","ngok"],"還":["syun","waan"],"正":["zeng","zing"],"着":["ziu","zoek"],"著":["zoek","zyu"]};
const cache=new Map();
export function readingDetails(text,{custom=false,edits={}}={}){
 const characters=Array.from(text.normalize('NFC')),result=characters.map(character=>({reading:'',source:/\p{Script=Han}/u.test(character)?'unknown':'none',word:character}));
 for(let i=0;i<characters.length;){let match=null,length=0,word='';
  for(let n=Math.min(maxLength,characters.length-i);n>0;n--){const token=characters.slice(i,i+n).join(''),candidate=dictionary.get(token);if(candidate?.length===n){match=candidate;length=n;word=token;break;}}
  if(match){for(let j=0;j<length;j++){const letter=characters[i+j];result[i+j]={reading:match[j],word,source:custom&&alternativeReadings[letter]&&(length===1||!curated.has(word))?'uncertain':curated.has(word)?'specified':'lexicon'};}i+=length;}else i++;
 }
 for(const [position,reading] of Object.entries(edits)){const i=Number(position);if(Number.isInteger(i)&&result[i]&&/^[a-z]+$/.test(reading))result[i]={...result[i],reading,source:'user'};}
 return result;
}
export function jyutpingFor(text){text=text.normalize('NFC');if(readingSnapshots[text])return readingSnapshots[text];if(cache.has(text))return cache.get(text);const result=readingDetails(text).map(x=>x.reading);if(cache.size>96)cache.delete(cache.keys().next().value);cache.set(text,result);return result;}

const allowedSyllables=new Set([...dictionary.values()].flat());
export function validJyutpingReading(value){return allowedSyllables.has(value);}
