//##################################
const gameStart = ()=>{
    window.requestAnimationFrame(gameStart);
    isActive();
};

window.onload = ()=>{
    window.requestAnimationFrame(gameStart);
}

//##############################################
const randNum = (maxValue)=>{
    return Math.floor(Math.random()*(maxValue+1));
}


let boxStatus = Array(35).fill(0);
for(var i=0; i<boxStatus.length; i++){
    boxStatus[i] = {
        value: 0,
        is_active: false,
        dom_element: document.getElementById(`${i+1}`)
    }
}
let activePos = [0,1,2,3];
for(let i=0;i<activePos.length;i++){
    boxStatus[i].is_active = true;
}


const randBoxValue = ()=>{
    for(let i=0; i<boxStatus.length; i++){
        boxStatus[i].value = `${randNum(9)}${randNum(9)}`;
    }
}
const updateBox = ()=>{
    for(let i=0; i<boxStatus.length; i++){
        boxStatus[i].dom_element.innerHTML = boxStatus[i].value;
    }
}


let key = Array(4);
const randKey = ()=>{
    for(let i=0; i<boxStatus.length; i++){
        key[i] = `${randNum(9)}${randNum(9)}`;
    }
}
const updateTopText = ()=>{
    document.getElementById("topText")
    .innerHTML = `cari nomor dibawah ini mas<br>${key[0]}.${key[1]}.${key[2]}.${key[3]}`;
}


const randKeyPos = ()=>{
    let keyPos = randNum(31);
    boxStatus[keyPos].value = key[0];
    boxStatus[keyPos+1].value = key[1];
    boxStatus[keyPos+2].value = key[2];
    boxStatus[keyPos+3].value = key[3];
}


const isActive = ()=>{
    for(let i=0; i<boxStatus.length; i++){
        if(boxStatus[i].is_active){
            boxStatus[i].dom_element.classList.add("active");
        }else{
            boxStatus[i].dom_element.classList.remove("active");
        }
    }
}


let upButton = document.getElementById("upButton");
let leftButton = document.getElementById("leftButton");
let rightButton = document.getElementById("rightButton");
let downButton = document.getElementById("downButton");
let centerButton = document.getElementById("centerButton");

rightButton.addEventListener("click", ()=>{
    if(activePos[3]+1 <= 34){
        for(let i=activePos.length-1;i>-1;i--){
            boxStatus[activePos[i]].is_active = false;
            boxStatus[activePos[i]+1].is_active = true;
        }
        for(let i=0;i<activePos.length;i++){
            activePos[i]+=1;
        }
    }
});

leftButton.addEventListener("click", ()=>{
    if(activePos[0]-1 >= 0){
        for(let i=0;i<activePos.length;i++){
            boxStatus[activePos[i]].is_active = false;
            boxStatus[activePos[i]-1].is_active = true;
        }
        for(let i=0;i<activePos.length;i++){
            activePos[i]-=1;
        }
    }
});

upButton.addEventListener("click", ()=>{
    if(activePos[0]-7 >= 0){
        for(let i=0;i<activePos.length;i++){
            boxStatus[activePos[i]].is_active = false;
            boxStatus[activePos[i]-7].is_active = true;
        }
        for(let i=0;i<activePos.length;i++){
            activePos[i]-=7;
        }
    }
});

downButton.addEventListener("click", ()=>{
    if(activePos[3]+7 <= 34){
        for(let i=activePos.length-1;i>-1;i--){
            boxStatus[activePos[i]].is_active = false;
            boxStatus[activePos[i]+7].is_active = true;
        }
        for(let i=0;i<activePos.length;i++){
            activePos[i]+=7;
        }
    }
});

centerButton.addEventListener("click", ()=>{
    let activePosValue = Array(4);
    for(let i=0;i<activePos.length;i++){
        activePosValue[i] = boxStatus[activePos[i]].value;
    }
    
    if(key[0] == activePosValue[0] &&
       key[1] == activePosValue[1] &&
       key[2] == activePosValue[2] &&
       key[3] == activePosValue[3]
       ){
           alert("you win")
       }else{
           randKey();
           updateTopText();
           randBoxValue();
           randKeyPos();
           updateBox();
       }
});

randKey();
updateTopText();
randBoxValue();
randKeyPos();
updateBox();

setInterval(()=>{
    randBoxValue();
    randKeyPos();
    updateBox();
},2000);