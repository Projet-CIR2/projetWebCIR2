module.exports = {

    verifyConnection(req, con, username, psswrd){


        let sql = 'SELECT *FROM session WHERE Pseudo = \'' + username + '\' AND Mdp = \'' + psswrd + '\'';
        con.query(sql, (err, result) => {
            if (err) throw err;

            

            if (result[0] == undefined){
                req.session.createAccount = true;
            }
            else{
                req.session.createAccount = false;
                req.session.logName = username;
                req.session.logPassword = psswrd;
                req.session.connect = true;
                req.session.account = true;
                req.session.save();
            }
        });

    },


    createAccount(con, username, psswrd){
        
    }

    

}