let logger = (function(){

    function post(name, password){
        $.ajax({
            type: "POST", 
            url: "/login/", 
            data: {
                login: name,
                passwrd: password,
            },
            success: () => {
                window.location.href = "/";
            },
        });

    }

    return {
        sendLogin(name, password){
            post(name, password);
        }
    }
})();