let button = document.getElementById('search');

button.onclick = function(element){
  chrome.tabs.query(
    {active: true, currentWindow: true},
    function(tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          command: "findAllSkills",
          allSkills:['JavaScript','question'],
          userSkills:['question']
        },
        function(response) {
          //do something with the response
        }
      );
    }
  );
};
