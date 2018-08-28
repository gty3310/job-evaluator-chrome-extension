var elements = document.getElementsByTagName('*');
console.log("right");
var num = 0;

//get the number of appearance of a keyword
var wholeText =  document.body.innerText;
var count = (wholeText.match(/is/g) || []).length;

