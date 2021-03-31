let signuper = (function(){

    function post(firstName,lastName,username, password){
        $.ajax({
            type: "POST", 
            url: "/signup/", 
            data: {
                fName: firstName,
                lName: lastName,
                pseudo: username,
                passwrd: password,
            },
            success: () => {
                window.location.href = "/login.html";
            },
        });

    }

    return {
        sendLogin(firstName,lastName,username, password){
            post(firstName,lastName,username, password);
        }
    }
})();
