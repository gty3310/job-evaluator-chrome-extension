var elements = document.getElementsByTagName('*');

var num = 0;

var skillsList = ["react.js", "JavaScript", "script", "react"];

//get the number of appearance of a keyword
var wholeText =  document.body.innerText;
var skillInReg = "";
var skillsCount = 0;
for (let listIndex = 0; listIndex < skillsList.length; listIndex ++){
    // skillInReg = new RegExp(skillsList[listIndex],'g');
    skillInReg = new RegExp("\\b"+skillsList[listIndex]+ "\\b",'gi');
    skillsCount += (wholeText.match(skillInReg) || []).length;
}

console.log("------skillsCount:");
console.log(skillsCount);