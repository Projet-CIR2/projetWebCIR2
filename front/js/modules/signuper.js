let signuper = (function(){

    function post(firstName,lastName,mail,username, password){
        $.ajax({
            type: "POST", 
            url: "/signup/", 
            data: {
                fName: firstName,
                lName: lastName,
                adrmail: mail,
                pseudo: username,
                passwrd: password,
            },
            success: () => {
                window.location.href = "/";
            },
        });

    }

    return {
        sendLogin(firstName,lastName,mail,username, password){
            post(firstName,lastName,mail,username, password);
        }
    }
})();