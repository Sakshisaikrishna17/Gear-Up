module.exports = (app)=>{
    const user = require('../controllers/user.controller')
    // const signUp = require("../controllers/userSignUp.controller");
    // const book = require("../controllers/bookClasses.controller")
    

    // app.post('/api/userSignup', user.userSignup);

    app.post("/api/userSignUp", user.userSignUp);

    app.post('/api/userLogin',user.userLogin)

    app.put('/api/changeUserPassword/:usersRegId', user.changeUserPassword);

    // app.get('/api/getUserById/:id',user.getUserById)

    // app.put('/api/updateUserDataById/:id',user.updateUserDataById)

    // app.delete('/api/deleteUserDataById/:usersRegId',user.deleteUserDataById)

    // app.post("/api/bookClasses/:userId/:classId",book.bookClasses)

    
    // app.get("/api/getBookingList/:allActive",book.getBookingList)

    // app.get("/api/getClassByDayAndCourseName/:courseId/:Day",book.getClassByDayAndCourseName)


}
