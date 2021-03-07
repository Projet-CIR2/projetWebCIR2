let logger = (function(){

    function post(name, password){
        $.ajax({
            type: "POST", 
            url: "/login/", 
            data: {
                logName: name, 
                logPassword: password
            },

        })
    }

    return {
        sendLogin(name, password){
            post(name, password);
        }
    }
})();