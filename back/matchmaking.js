module.exports = {

    getPlayerName(sessionData){
        if(sessionData.connect == true) return sessionData.logName;
        else return "Invité";
        
    },

    lookQueue(queue){
        console.log(queue.length);
    }

}