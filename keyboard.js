// Standard ANSI QWERTY: 15 units per row. Key widths naturally stagger letters.
const key=(label,code=label.toLowerCase(),units=1,shift='')=>({label,code,units,shift});
export const keyboardRows=[
 [key('`','`',1,'~'),...'1234567890'.split('').map((k,i)=>key(k,k,1,'!@#$%^&*()'[i])),key('-','-',1,'_'),key('=','=',1,'+'),key('Backspace','backspace',2)],
 [key('Tab','tab',1.5),...'QWERTYUIOP'.split('').map(k=>key(k)),key('[','[',1,'{'),key(']',']',1,'}'),key('\\','\\',1.5,'|')],
 [key('Caps Lock','capslock',1.75),...'ASDFGHJKL'.split('').map(k=>key(k)),key(';',';',1,':'),key("'","'",1,'"'),key('Enter','enter',2.25)],
 [key('Shift','shift-left',2.25),...'ZXCVBNM'.split('').map(k=>key(k)),key(',',',',1,'<'),key('.','.',1,'>'),key('/','/',1,'?'),key('Shift','shift-right',2.75)],
 [key('Ctrl','control-left',1.25),key('Win','meta-left',1.25),key('Alt','alt-left',1.25),key('Space','space',6.25),key('Alt','alt-right',1.25),key('Win','meta-right',1.25),key('Menu','menu',1.25),key('Ctrl','control-right',1.25)]
];
