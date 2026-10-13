import {zhuyinKeys} from './tutorials.js';
const step=(target,code,candidates,meaning)=>({target,code,candidates,meaning});
export const candidateLessons={
 pinyin:[step('你','ni',['泥','你','妮'],'你好'),step('好','hao',['号','好','浩'],'你好'),step('妈','ma',['马','吗','妈'],'妈妈'),step('天','tian',['田','天','填'],'天空'),step('水','shui',['睡','水','谁'],'喝水'),step('女','nv',['女','钕'],'女儿'),step('学','xue',['雪','学','血'],'学习'),step('家','jia',['加','假','家'],'家人')],
 zhuyin:[step('你','su3',['妳','你','擬'],'你好'),step('好','cl3',['好','郝'],'你好'),step('媽','a8 ',['媽'],'媽媽'),step('天','wu0 ',['天','添'],'天空'),step('水','gjo3',['水'],'喝水'),step('女','sm3',['女'],'女兒'),step('學','vm,6',['學','穴'],'學習'),step('家','ru8 ',['加','家','佳'],'家人')],
 jyutping:[step('你','nei',['尼','你','妮'],'你好'),step('好','hou',['號','浩','好'],'你好'),step('唔','m',['唔','嘸'],'唔該'),step('該','goi',['改','該'],'唔該'),step('屋','uk',['屋'],'屋企'),step('企','kei',['期','旗','企'],'屋企'),step('水','seoi',['水','誰','垂'],'飲水'),step('學','hok',['殼','學','鶴'],'學習')]
};
export function symbolsForKeys(keys){return Array.from(keys.toLowerCase()).map(k=>zhuyinKeys[k]||({'3':'ˇ','4':'ˋ','6':'ˊ','7':'˙',' ':'〔一聲確認〕'}[k])||k).join('');}
export function checkSpelling(value,step,method){const spelling=value.normalize('NFC').toLowerCase();if(method==='zhuyin')return spelling===step.code||spelling===symbolsForKeys(step.code).replace('〔一聲確認〕','');return spelling.trim()===step.code;}
export function nextCandidateState(state,candidate,steps){const current=steps[state.index];if(candidate!==current.target)return {...state,wrong:state.wrong+1,feedback:'wrong'};const index=state.index+1;return {...state,index,done:index>=steps.length,feedback:'correct'};}
