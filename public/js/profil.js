
function settings(){   
}

function poxel(){
    document.querySelector('.nkar').style.display = 'block'
    document.querySelector('.poxel').style.display = 'none'
}

document.querySelector('.inpimg').addEventListener('change' , ()=>{
    document.querySelector('.buttonimg').removeAttribute('disabled')
})
