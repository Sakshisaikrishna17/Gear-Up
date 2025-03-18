module.exports = (app)=>{
    const user = require('../controllers/user.controller')

    const list = require('../controllers/list.controller');
    const upload = require('../middlewares/uploads');

    const payment = require('../controllers/payment.controller');

    const review = require('../controllers/review.controller');

    const pickupReturn = require('../controllers/pickupReturn.controller');


    
    app.post("/api/userSignUp", user.userSignUp);

    app.post('/api/userLogin',user.userLogin)

    app.put('/api/changeUserPassword/:usersRegId', user.changeUserPassword);

    //********************** VENDOR *********************************

    app.post("/api/vendorSignUp", user.vendorSignUp);
    app.post("/api/vendorLogin", user.vendorLogin);

    app.put('/api/editVendor/:vendorId', user.editVendor);

    app.delete('/api/deleteVendor/:vendorId', user.deleteVendor);

    //********************** VENDOR *********************************


    app.post('/api/createList', upload.single('photoUrl'), list.createList); // Use upload.single for local storage

    // Search listings
    app.get('/api/searchListings', list.searchListings);



    // app.post("/api/findNearbyMechanics", issue.findNearbyMechanics);



    // Create a booking and process payment
    app.post('/api/processPayment', payment.processPayment);

    // Cancel a booking
    app.post('/api/cancelBooking/:bookingId', payment.cancelBooking);

    // Submit a review
    app.post('/api/submitReview', review.submitReview);


    // Add pickup details
    app.post('/api/addPickupDetails/:bookingId', pickupReturn.addPickupDetails);

    // Add return details
    app.post('/api/addReturnDetails/:bookingId', pickupReturn.addReturnDetails);

    // Get pickup and return details
    app.get('/api/getPickupReturnDetails/:bookingId', pickupReturn.getPickupReturnDetails);

    


    
}
