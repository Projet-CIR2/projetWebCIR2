module.exports = {

    verifyConnection(req, con, username, psswrd){

        

       


      

    },


    createAccount(con, values){
        
    let sql = "INSERT INTO session SET ?";  
        con.query(sql, values, (err, result) => {
            if (err) throw err;
            console.log("One Session inserted");
        });

    }

}