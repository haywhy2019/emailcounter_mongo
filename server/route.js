const Email = require("./model");

module.exports = (app) => {

app.get("/", (req, res) => {
   Email.estimatedDocumentCount({}, function (err, count) {
     if (err) {
       res.send(err, "an error occured")
     }else{
        console.log('there are %d emails', count);
        res.render("home", { count: count });
      }
      });
  });

  app.get("/error", (req, res) => {
    Email.estimatedDocumentCount({}, function (err, count) {
      if(err){
        res.send(err, "an error occured")
      }else {
        console.log('there are %d emails', count);
        res.render("error", { count: count });
      }
      });

   });
 
 
  
  app.post("/register", (req, res) => {
    
    let email = req.body.email;
    let user  = req.body
    console.log(email, "email")
  
    Email.findOne({ email })
      .then((email) => {
        if (email) {
        res.redirect("/error")
        } else {
        new Email(user)
            .save()
            .then(() => res.redirect("/"))
            .catch((err) =>
              res
                .status(400)
                .json({
                  error: err,
                  message: "there is an error while registering",
                })
            );
        }
      })
      .catch((err) =>
        res.status(400).json({ error: err, message: "an error occured" })
      );

  });
  
 
}


// Email.findOne({ email })
// .then((email) => {
//   if (email) {
//     res.status(200).json({ err: "email has been already registered" });
//   } else {
//     new Email(user)
//       .save()
//       .then(() => res.status(200).json({ message: "signup successful" }))
//       .catch((err) =>
//         res
//           .status(400)
//           .json({
//             error: err,
//             message: "there is an error while registering",
//           })
//       );
//   }
// })
// .catch((err) =>
//   res.status(400).json({ error: err, message: "an error occured" })
// );



    // .then(() => res.redirect("/"))