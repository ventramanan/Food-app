const button=document.getElementById("bt")
button.addEventListener("click",()=>{
    window.location.href="./main.html";
})
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
document.addEventListener("DomcontentLoaded",function(){
    createSnowflakes();
})
function createSnowflakes(){
    const snowflakeContainer=document.createElement("div")
    snowflakeContainer.classList.add('snowflake')
    document.body.appendChild(snowflakeContainer)


    for(let i=0;i<30;i++){
        const snowflake=document.createElement('div')
        snowflake.classList.add('snowflake')
        snowflake.style.left=`${Math.random()*window.innerWidth}px`
        snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`; // Adjust the duration as needed
        snowflakeContainer.appendChild(snowflake);
        

    }
}
