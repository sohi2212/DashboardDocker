let styleMode = localStorage.getItem('styleMode');
const styleToggle = document.querySelector(".switch");

const disableDarkStyle = () =>{
    document.querySelector('.container').setAttribute('id', 'white');
    document.querySelector('.main-header').setAttribute('id', 'white');
    document.querySelector('.burger').setAttribute('id', 'white');
    document.querySelector('.menu-list').setAttribute('id', 'white');
    document.querySelector('.menu-item').setAttribute('id', 'white');
    document.querySelector('.search-element').setAttribute('id', 'white');
    document.querySelector('.dashboard').setAttribute('id', 'white');
    document.querySelector('.snow__flake').setAttribute('id', 'white')
    document.querySelector('.table-name').setAttribute('id', 'white')

    localStorage.setItem('styleMode', 'white');
}

const enableDarkStyle = () =>{
    document.querySelector('.container').removeAttribute('id');
    document.querySelector('.main-header').removeAttribute('id');
    document.querySelector('.burger').removeAttribute('id');
    document.querySelector('.menu-list').removeAttribute('id');
    document.querySelector('.menu-item').removeAttribute('id');
    document.querySelector('.search-element').removeAttribute('id');
    document.querySelector('.dashboard').removeAttribute('id');
    document.querySelector('.snow__flake').removeAttribute('id');
    document.querySelector('.table-name').removeAttribute('id');

    localStorage.setItem('styleMode', 'dark')
}

    if (styleMode === 'dark') { 
    enableDarkStyle(); styleToggle.checked = false; 
    } else { 
    disableDarkStyle(); 
    styleToggle.checked = true; }


styleToggle.addEventListener('change', () => {
    styleMode = localStorage.getItem('styleMode');
    if (styleMode !== 'dark'){
        enableDarkStyle();  
    }else{
        disableDarkStyle();        
    }
})