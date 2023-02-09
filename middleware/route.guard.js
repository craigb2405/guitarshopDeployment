const isLoggedIn = (req, res, next) => {
  
 new Promise((resolve,reject)=>{
    if(req.session.currentUser){
      resolve(next())

    }
    else{
      reject(res.render('auth/login',{errorMessage:"You must either log in or sign up"}))
      
    }
  })


};

const isLoggedOut = (req, res, next) => {
  if (req.session.currentUser) {
    res.redirect("/profile");
  }
  next();
};

const isAdmin = (req, res, next) => {
  const userType = req.session.adminUser.userType;
  if (userType !== "admin") {
    res.redirect("/profile");
  }

  next();
};

module.exports = { isLoggedIn, isLoggedOut, isAdmin };
