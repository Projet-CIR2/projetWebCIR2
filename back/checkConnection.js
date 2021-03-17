let checkConnection = (function(sql, username, psswrd){

    let sql = "SELECT *FROM session WHERE Pseudo = ? AND Mdp = ?"

    return{
        verify(){

            con.query(sql,username,psswrd,(err) => {
                if (!err.isEmpty()) {
                    console.log("Pseudo ou Mdp incorrect");
                }
                else{
                    console.log("T'es connecté sale Bg");
                }
            });
        }
    }
})();

module.exports = checkConnection;