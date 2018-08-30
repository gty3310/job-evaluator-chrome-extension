// document.documentElement.style.height = '100%';
// document.body.style.height = '100%';
// document.documentElement.style.width = '100%';
// document.body.style.width = '100%';
let hastoggle = false;
let html = `<div >

<div id="float_element_base_chrome_extention" style="
    html, body, header, nav, h1, a,
    ul, li, strong, main, button, i,
    section, img, div, h2, p, form,
    fieldset, label, input, textarea,
    span, article, footer, time, small {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    color: inherit;
    font: "Open Sans", sans-serif;
    text-align: inherit;
    text-decoration: inherit;
    vertical-align: inherit;
    box-sizing: inherit;
    background: transparent;
    }

    p {
    font-size: 14px;
    line-height: 170%;
    }
">
    <div id="score">
        <div id="score_value" style="
            font-family: "Times New Roman", Times, serif;
            display: block;
            font-size:2em;
            margin-top: 0.67em;
            margin-bottom: 0.67em;
            margin-left: 0;
            margin-right: 0;
            font-weight: bold;
            color: green;
            ">
            60%
        </div>
        <div id="score_discription" style="
        font-family: "Times New Roman", Times, serif;
             display: block;
            font-size: 1.17em;
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