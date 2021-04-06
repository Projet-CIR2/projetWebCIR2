let deconnectionner = (function(){

    function post(deco){
        $.ajax({
            type: "POST", 
            url: "/deconnection/", 
            data: {
                deco: deco,
            },
            success: () => {
                window.location.href = "/";
            },
        });

    }

    return {
        senddeco(deco){
            post(deco);
        }
    }
})();
