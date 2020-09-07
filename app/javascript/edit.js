window.addEventListener("turbolinks:load", setEdit);

function setEdit(){

  if (location.pathname != "/typings/new") {
    return false;
  }

  const inputs = document.querySelectorAll("input");
  inputs.forEach(input =>{
    input.addEventListener('keydown', function(e){
      if (e.keyCode === 13) {
        e.preventDefault();
      }
    });
  });

  const btn = document.getElementById("display-btn");
  const forms = document.querySelectorAll(".edit-form");  
  btn.addEventListener("click", function(){
    forms.forEach(form => {
      form.classList.toggle("hide");
    });
  });

};

