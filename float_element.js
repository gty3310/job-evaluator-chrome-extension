// document.documentElement.style.height = '100%';
// document.body.style.height = '100%';
// document.documentElement.style.width = '100%';
// document.body.style.width = '100%';
let hastoggle = false;
let html = `<div >
<style>
@import url('https://fonts.googleapis.com/css?family=Raleway');
</style>
<div style="
background-color: lightblue; 
/* position: 'fixed'; */
        top: '10%';
        left: '50%';
        box-sizing: border-box;
        opacity: 0.5;

        outline: 0;
        position: fixed;
        right: 20px;
        bottom: 90px;
        display: block;

        width: 95px;
        height: 120px;
        

        border: 0;
        padding: 15px;
        border-radius: 25px;

        box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06), 0 2px 32px rgba(0, 0, 0, 0.16);
        transition: box-shadow 200ms ease;
        cursor: pointer;
        align-items: center;
        text-align: center;

        z-index: 1000;
" >
    <div id="score">
        <div style="
        font-family: 'Raleway', sans-serif !important;
        
            display: block;
            font-size: 17px;
            margin-top: 0.67em;
            margin-bottom: 0.67em;
            margin-left: 0;
            margin-right: 0;
            font-weight: bold;
        ">
            60%
        </div>
        <div style="
        font-family: 'Raleway', sans-serif !important;
        
            display: block;
            font-size: 12px;
            margin-top: 1em;
            margin-bottom: 1em;
            margin-left: 0;
            margin-right: 0;
            font-weight: bold;
        ">
            Keywords Matching
        </div>
    </div> 
</div> 
</div>`

var div = document.createElement( 'div' );
// div.id = 'myDivId';
// div.style.position = 'fixed';
// div.style.top = '10%';
// div.style.left = '50%';
// div.style.width = '100%';   
// div.style.height = '100%';
// div.style.backgroundColor = 'red';
// div.style.width = '100px';
// div.style.height = '100px';

div.innerHTML = html;
// div.innerHTML = '<div style="color:blue; width:300px; height:300px; ">yyyyyyyyyyyyyyyy</div>';
document.body.appendChild( div );
console.log('working');
debugger;

// $.get(chrome.extension.getURL('/float_elemente.html'), function(data) {
//     $(data).appendTo('body');    
// });

let result = document.getElementById('float_element_base_chrome_extention');
// // document.body.appendChild(result);
console.log(result);
// fetch(chrome.extension.getURL('/float_element.html'))
// .then(response => response.text())
// .then(data => {
    
//     result.innerHTML += data;	

// }).catch(err => {
// 	// error
// });
// function toggle () {
//     hastoggle = !hastoggle;
//     if(hastoggle) {
//         result.style.display = 'block';
//     }
//     else {
//         result.style.display = 'none';
//     }
//     return hastoggle;
// }
function loadCss() {
    var link = document.createElement( "link" );
link.type = "text/css";
link.rel = "stylesheet";
link.href = 'style.css'

document.getElementsByTagName( "head" )[0].appendChild( link );
}


window.onload = function(){
    loadCss();
}