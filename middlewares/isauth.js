var jwt = require("jsonwebtoken");
const userSchema = require("../modeles/user");

const isauth = async (req, res,next) => {
    try {
      const token = req.get("Authorization");
      console.log("token",token);

      if (!token) {
        return res.status(401).send("Unauthorized");
      }
  
      const decodedToken = jwt.verify(token, "thisisakey");
        userSchema.findOne({_id:decodedToken.id}).then(result=>{
            if (result) {
              return  next()
            }else{
                return res.status(401).send("Unauthorized");

            }
        })
   
    } catch (error) {
      res.status(401).send("Unauthorized");
    }
  };

  module.exports = isauth