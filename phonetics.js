import {sceneAdditions} from './scene-library.js';
// Unmarked Mandarin Pinyin and untoned Hong Kong Jyutping, aligned to scene words.
const rows=[
['home','jia ren|fang jian|chuang hu|zao can|sha fa|hua yuan','uk kei|gaa jan|fong gaan|coeng|zou caan|so faa'],
['restaurant','cai dan|fu wu yuan|mi fan|yin liao|zhang dan|zuo wei','caan paai|si jing|baak faan|jam ban|maai daan|wai'],
['supermarket','niu nai|shui guo|shu cai|gou wu che|shou yin tai|huo jia','ngau naai|saang gwo|so coi|sau teoi ce|sau ngan cyu|fo gaa'],
['shopping','jia ge|chi ma|yan se|shi yi jian|fa piao|zhe kou','gaa cin|cek maa|ngaan sik|si san sat|daan geoi|zit kau'],
['kitchen','guo|yan|shi pu|xi wan|qie cai|kao xiang','wok|jim|sik pou|sai wun|cit coi|guk lou'],
['weather','qing tian|xia yu|yu san|wen du|da feng|tian qi yu bao','tin cing|lok jyu|ze|hei wan|daai fung|tin hei jyu bou'],
['directions','lu kou|zuo bian|you bian|zhi zou|di tu|jie dao','lou hau|zo bin|jau bin|zik haang|dei tou|tiu gaai'],
['transport','di tie|gong jiao che|che zhan|che piao|huan cheng|dao zhan','gong tit|baa si|ce zaam|ce fei|zyun ce|dou zaam'],
['airport','hu zhao|xing li|deng ji pai|an jian|hang ban|deng ji kou','wu ziu|hang lei|dang gei zing|on gim|hong baan|zaap hau'],
['hotel','yu ding|fang jian|yao shi|qian tai|tui fang|zao can','deng fong|fong gaan|so si|zip doi cyu|teoi fong|zou caan'],
['tourism','jing dian|bo wu guan|men piao|dao you|zhao pian|ji nian pin','ging dim|bok mat gun|mun piu|dou jau|soeng|gei nim ban'],
['driving','fang xiang pan|ting che|jia you|hong deng|lu xian|an quan dai','taai pun|paak ce|jap jau|hung dang|lou sin|on cyun daai'],
['hospital','yi yuan|hu shi|yi sheng|yao wu|yu yue|jian cha','ji jyun|wu si|ji sang|joek|jyu joek|gim caa'],
['dentist','ya chi|ya yi|ya shua|ya gao|teng tong|yu yue','ngaa|ngaa ji|ngaa caat|ngaa gou|tung|jyu joek'],
['pharmacy','yao shi|yao pin|chu fang|yong liang|biao qian|gui tai','joek zai si|joek|cyu fong|fan loeng|biu cim|gwai toi'],
['bank','zhang hu|gui tai|cun kuan|qu kuan|mi ma|hao ma','wu hau|gwai toi|cyun fun|tai fun|mat maa|hou maa'],
['post','bao guo|you piao|di zhi|xin feng|you ji|zhong liang','baau gwo|jau piu|dei zi|seon fung|gei gin|cung loeng'],
['emergency','bang zhu|wei zhi|lian xi|an quan|chu kou|gong zuo ren yuan','bong sau|wai zi|lyun lok|on cyun|ceot hau|zik jyun'],
['school','lao shi|tong xue|ke tang|zuo ye|tu shu guan|kao shi','lou si|tung hok|soeng tong|gung fo|tou syu gun|haau si'],
['office','tong shi|wen jian|ri cheng|you jian|xiang mu|zhuo zi','tung si|man gin|jat cing|din jau|hong muk|toi'],
['job','jian li|mian shi|jing yan|ji neng|zhi wei|jie shao','lik lei|min si|ging jim|gei nang|zik wai|gaai siu'],
['meeting','yi cheng|tao lun|ji lu|jian yi|shi jian|zong jie','ji cing|tou leon|gei luk|gin ji|si gaan|zung git'],
['computer','jian pan|ping mu|wen jian|liu lan qi|mi ma|wang luo','gin pun|jing mok|dong on|lau laam hei|mat maa|mong lok'],
['social','peng you|zhou mo|xing qu|yao qing|xiao xi|ji hua','pang jau|zau mut|hing ceoi|jiu cing|seon sik|gai waak']
];
export const phonetics=Object.fromEntries(rows.map(([id,zh,yue])=>[id,{zh:zh.split('|'),yue:yue.split('|')}]));

for(const [id,extra] of Object.entries(sceneAdditions))for(const lang of ['zh','yue'])phonetics[id][lang].push(...extra.readings[lang]);
