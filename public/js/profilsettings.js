let buttons = document.querySelectorAll('.data')
for(let i = 0 ; i < buttons.length ; i ++){
    if(buttons[i].style.display === 'none'){
        buttons[i].style.display = 'block'
    }
    else { buttons[i].style.display = 'none'}
}

function totaldata(){
    if(document.querySelector('.totaldata').style.display === 'none'){
        document.querySelector('.totaldata').style.display = 'block'
    }
    else{ document.querySelector('.totaldata').style.display = 'none' }
}

function namedata(){
    if(document.querySelector('.namedata').style.display === 'none'){
        document.querySelector('.namedata').style.display = 'block'
    }
    else{document.querySelector('.namedata').style.display = 'none'}
}

function surnamedata(){
    if(document.querySelector('.surnamedata').style.display === 'none'){
        document.querySelector('.surnamedata').style.display = 'block'
    }
    else{document.querySelector('.surnamedata').style.display = 'none'}
}

function agedata(){
    if(document.querySelector('.agedata').style.display === 'none'){
        document.querySelector('.agedata').style.display = 'block'
    }
    else{document.querySelector('.agedata').style.display = 'none'} 
}

function passworddata(){
    if(document.querySelector('.passworddata').style.display === 'none'){
        document.querySelector('.passworddata').style.display = 'block'
    }
    else{document.querySelector('.passworddata').style.display = 'none'} 
}

function emaildata(){
    if(document.querySelector('.emaildata').style.display === 'none'){
        document.querySelector('.emaildata').style.display = 'block'
    }
    else{document.querySelector('.emaildata').style.display = 'none'}
}