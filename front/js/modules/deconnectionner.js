let deconnectionner = (function(){

    function post(deco){
        $.ajax({
            type: "POST", 
            url: "/deconnection/", 
            data: {
                deco: deco,
            },
            success: () => {
                console.log('hello world');
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
