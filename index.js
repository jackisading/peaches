let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

let login = document.querySelector('.loginForm');
login.addEventListener('submit', (e) => {
    e.preventDefault();
    let pass = document.querySelector('.formText');
    if (pass.value.toLowerCase() != 'show') {
        console.log('incorrect')
    } else {
        console.log('correct')
        location.replace('page1.html')
    }
})