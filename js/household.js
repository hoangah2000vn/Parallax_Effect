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



