document.documentElement.style.height = '100%';
document.body.style.height = '100%';
document.documentElement.style.width = '100%';
document.body.style.width = '100%';


var div = document.createElement( 'div' );
div.id = 'myDivId';
div.style.position = 'fixed';
div.style.top = '10%';
div.style.left = '50%';
div.style.width = '100%';   
div.style.height = '100%';
div.style.backgroundColor = 'red';
div.style.width = '100px';
div.style.height = '100px';
div.innerHTML = '<div style="color:blue; width:300px; height:300px; ">yyyyyyyyyyyyyyyy</div>';
document.body.appendChild( div );


// $.get(chrome.extension.getURL('/float_elemente.html'), function(data) {
//     $(data).appendTo('body');    
// });

fetch(chrome.extension.getURL('/float_element.html'))
.then(response => response.text())
.then(data => {
	document.body.innerHTML += data;	
}).catch(err => {
	// error
});