
const beginningFace = document.querySelector(".beginning");
const reactionFace = document.querySelector(".reaction");

const beginningText = document.querySelector(".beginningT");
const reactionTextFirst = document.querySelector(".reactionT-first");
const reactionTextSecond = document.querySelector(".reactionT-second");


beginningFace.addEventListener('click',()=>{

    if(reactionFace.classList.contains('reaction')){
        reactionFace.classList.add('active');
        beginningFace.classList.remove('active');

        reactionTextFirst.classList.add('active');
        reactionTextSecond.classList.add('active');
        beginningText.classList.remove('active');
    }

});