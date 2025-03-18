module.exports = (app)=>{
    const admin  = require('../controllers/admin.controller')
    
    app.post('/api/createAdmin', admin.createAdmin);

    app.post('/api/adminLogin', admin.adminLogin);

    //  get all user 
    app.get('/api/getAllUsers', admin.getAllUsers);

     //  get all vendors 
     app.get('/api/getAllVendors', admin.getAllVendors);

    // Edit user route
    app.put('/api/editUser/:userId', admin.editUser);

    // Delete user route
    app.delete('/api/deleteUser/:userId', admin.deleteUser);
    
    app.get("/api/totalCounts", admin.getTotalCounts);


}