const levels=[
    {
        name:'Ёжик в тумане',
        level:0,
        exp:0
    },
    {
        name:'Турист',
        level:1,
        exp:725
    },
    {
        name:'Искатель',
        level:2,
        exp:1215
    },
    {
        name:'Авантюрист ',
        level:3,
        exp:2180
    },
    {
        name:'Первооткрыватель',
        level:4,
        exp:3570
    },
    {
        name:'Бывалый',
        level:5,
        exp:5600
    },
    {
        name:'Странник',
        level:6,
        exp:7200
    },
    {
        name:'Гуру',
        level:7,
        exp:9500
    },
    {
        name:'Знаток города',
        level:8,
        exp:11570
    },
    {
        name:'Мэр',
        level:9,
        exp:15000
    },
    {
        name:'Самый ЕЖанутый',
        level:10,
        exp:20000
    },

]

export const getLevel=(exp)=>{
    let needIndex=0;
    for(let i=0;i<levels.length;i++){
        if(exp<levels[i].exp){
            needIndex=i;
            break;
        }
    }
    return [levels[needIndex-1],levels[needIndex]];
}