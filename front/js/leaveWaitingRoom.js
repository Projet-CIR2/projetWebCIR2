let button = document.getElementById('exit');

button.addEventListener('click', event => {
    event.preventDefault();
    console.log("bitos")
    
    $.ajax({
        type: "POST", 
        url: "/exit/", 
        success: () => {
            window.location.href = "/";
        },
    });
});


