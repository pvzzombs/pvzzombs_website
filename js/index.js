function loadContents(responseText){
  document.getElementById("loader").style.display = "none";
  document.getElementById("loaderText").style.display = "none";
  var result = responseText;
  var obj = JSON.parse(result);
  var parent = document.getElementById("contents-here");
  for(var i=0; i<obj["pages"].length; i++){
    // link
    // image
    // description
    var child = document.createElement("div");
    var link = document.createElement("a");
    var image = document.createElement("img");
    var text = document.createElement("p");
    var loader = document.createElement("div");

    link.href = obj["pages"][i]["link"];
    image.src = obj["pages"][i]["image"];
    text.innerText = obj["pages"][i]["text"].length > 50 ? obj["pages"][i]["text"].substr(0, 50) + "..." : obj["pages"][i]["text"];
    loader.className = "loader";
    loader.id = "loader"+i;

    function loaderFactory(i){
      return function(){
        document.getElementById("loader"+i).style.display = "none";
      }
    }

    image.onload = loaderFactory(i);

    link.appendChild(loader);
    link.appendChild(image);
    link.appendChild(text);
    child.appendChild(link);
    parent.appendChild(child);
  }
}

function runAndDisplayContents(){
  xhttp.open("GET", "./pages/contents.json");
  xhttp.send();
}

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function(){
  if(this.readyState == 4){
    if(this.status == 200){
      loadContents(this.responseText);
    }else{
      document.getElementById("loader").style.display = "";
      document.getElementById("loaderText").style.display = "";
      setTimeout(runAndDisplayContents, 3000);
    }
  }
}

runAndDisplayContents();