module.exports = (app) => {
  const user = require("../controllers/user.controller");

  const list = require("../controllers/list.controller");
  const upload = require("../middlewares/uploads");

  app.post("/api/userSignUp", user.userSignUp);

  app.post("/api/userLogin", user.userLogin);

  app.put("/api/changeUserPassword/:usersRegId", user.changeUserPassword);

  app.post("/api/vendorSignUp", user.vendorSignUp);
  app.post("/api/vendorLogin", user.vendorLogin);

  // Issue routes
  // app.post('/api/createList', upload.single('photo'), issue.createList); // Use upload.single for local storage
  // app.post('/api/createList', upload.array('images', 5), issue.createList); // Use upload.single for local storage
  // app.post('/add-listing', upload.array('images', 5), addListing);

  // app.get('/api/getUserList/:userId', list.getUserIssues);

  // app.post('/api/createList', upload.single('photo'), list.createList); // Use upload.single for local storage
  // app.get('/api/getUserIssues/:userId', issue.getUserIssues);

  app.post("/api/createList", upload.single("photoUrl"), list.createList); // Use upload.single for local storage

  // app.post("/api/findNearbyMechanics", issue.findNearbyMechanics);
};
