var garage = require('../controllers/garage');

module.exports = function(app){
	app.post("/api/garage/openclose" , function (req , res )
	{
	  res.send(200);
	  garage.startGarageDoorLoop();
	});
}
