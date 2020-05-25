function makeimg(i){
// console.log(i)
let img = i
    // axios.post('/makeimg' , {img} ).
    //     then((result)=>{
    //         // console.log(result)


    //     }).catch((error)=>{

    //     })
}

function deleteimg(i){
    let id = i
    axios.post('/deleteimg' , {id} ).
        then((result)=>{
            let a = document.querySelector('.photo'+id)
            console.log(a)
            document.querySelector('.photos').removeChild(a)   
        }).catch((error)=>{

        })
}

function addimg(){
    if( document.querySelector('.nkar').style.display === 'none' ){
        document.querySelector('.nkar').style.display = 'block'
    }
    else { document.querySelector('.nkar').style.display = 'none'}
}


document.querySelector('.imageinput').addEventListener('change' , ()=>{
    console.log(document.querySelector('buttonimg'))
    document.querySelector('.buttonimg').removeAttribute('disabled')
})