function hash256() {
  var message = document.getElementById('target').value;
  var hash = sha256(message, true);
  Swal.fire({
    icon: "success",
    title: "SHA-256 hash",
    html: "message: '" + message + "', hash: " + hash + "\n"
  });
}

function _hash256file() {
  var file = document.getElementById('files').files[0];
  var message = getBase64File(file);
  var hash = sha256(message);
  Swal.fire({
    icon: "success",
    title: "SHA-256 hash",
    html: "hash: " + hash + "\n"
  });
}

function hash256file() {
  var file = document.getElementById('files').files[0];
  if(typeof file === "undefined") {
    Swal.fire({
      icon: "error",
      title: "SHA-256 hash",
      html: "Please choose a valid file"
    });
    return;
  }
  var reader = new FileReader();
  Swal.fire({
    icon: "info",
    title: "SHA-256 hash",
    html: "Please wait while the file is being hashed...",
    showConfirmButton: false
  });
  reader.onload = function(event) {
    //var message = reader.result;
    var message = event.target.result;
    setTimeout(function() {
      var output = sha256(message);
      Swal.fire({
        icon: "success",
        title: "SHA-256 hash",
        html: "hash: " + output + "\n"
      });
    }, 1000);
  };
  reader.onerror = function(err) {
    Swal.fire({
      icon: "error",
      title: "SHA-256 hash",
      message: err
    });
  };
  reader.readAsBinaryString(file);
}