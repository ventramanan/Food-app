
function showAboutUs() {
    var aboutUsContent = document.getElementById('about-us');
    aboutUsContent.classList.add('show');
    setTimeout(function () {
        aboutUsContent.classList.remove('show');
    }, 3000);
}

function showServices() {
    var servicesContent = document.getElementById('servicess');
    servicesContent.classList.add('show');
    setTimeout(function () {
        servicesContent.classList.remove('show');
    }, 3000);
}

function showAlert(event,type){
    event.preventDefault();
    if(type=="signIn"){
        alert("Thank you for signing in");
        var  username=document.getElementById("username").value
        localStorage.setItem("username",username);
        alert("welcome"+username+"!")
        $("#signInModal").modal("hide")
    }else if(type==="subscription"){
        alert("Thank you for subscribing!")
        $('#subscriptionModal').modal('hide')

    }
}

