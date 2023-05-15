const disclaimer_popup = document.querySelectorAll('.contentBox')[0]
const dissappear = document.querySelectorAll('.close')[0]

window.onload = function(){
   setTimeout(function(){
       disclaimer_popup.style.display = 'flex'
   }, 200)
}

dissappear.addEventListener('click', () => {
    console.log("clicked");
    disclaimer_popup.style.display = 'none';
})


