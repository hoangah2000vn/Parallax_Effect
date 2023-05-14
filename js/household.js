
function set_object(thisObject){
    //console.log(thisObject);
    objects = ['tv','fridge','microwave','stove','computer','internet','telephone','ac','car','washer','stereo'];
    for (i = 0;i <objects.length;i++){
        print(objects[i])
        objectDiv = document.getElementById(objects[i]);
        //console.log(objectDiv);
        objectDiv.style.display = 'none';
    }
    objectDiv = document.getElementById(thisObject);
    objectDiv.style.display = 'block';
}



/*
const tvmodal = document.querySelectorAll('.tvmodal')[0]
const openTvButton = document.querySelectorAll('.tv_open')[0]
const closeTvButton = document.querySelectorAll('.tv_close')[0]

openTvButton.addEventListener('click', () => {
    tvmodal.style.display = 'block';
    console.log('opening')
})

closeTvButton.addEventListener('click', () => {
    tvmodal.style.display = 'none';
    console.log('closing')
})
*/






