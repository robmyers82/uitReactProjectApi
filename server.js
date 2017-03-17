var express     =   require("express");
var app         =   express();
var bodyParser  =   require("body-parser");
var Category    =   require("./models/category");
var Reference    =   require("./models/reference");
var Note    =   require("./models/note");
var categoriesRouter      =   express.Router();
var referencesRouter      =   express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

var gamesRouter      =   express.Router();

gamesRouter.route("/")
    .get(function(req, res) {

    var gamesList = [
            {
                id: 1,
                title: "Final Fantasy XV",
                description: "Final Fantasy XV is an open world action role-playing video game developed and published by Square Enix for the PlayStation 4 and Xbox One home consoles.",
                photo: "http://cdn.wegotthiscovered.com/wp-content/uploads/2016/08/Final-Fantasy-XV-Wallpaper-Pictures.jpg",
                comments: []
            },
            {
                id: 2,
                title: "Doom",
                description: "Doom is a first-person shooter video game developed by id Software and published by Bethesda Softworks.",
                photo: "http://www.roadtovr.com/wp-content/uploads/2016/06/doom-2016-vr.jpg",
                comments: ["Awesome Game!", "This game sucks"]
            },
            {
                id: 3,
                title: "Street Fighter V",
                description: "Street Fighter V is a fighting video game developed by Capcom and Dimps. It is the sixth main numbered entry in the Street Fighter series.",
                photo: "http://www.fightersgeneration.com/nz3/game/sf5-ryu-key-artwork.jpg",
                comments: []
            },
            {
                id: 4,
                title: "NHL 17",
                description: "NHL 17 lets players hit the ice for another season of hockey!",
                photo: "http://multijoueur.ca/wp-content/uploads/2016/09/NHL-2017-avant-menu-933x445.jpg",
                comments: []
            },
            {
                id: 5,
                title: "Rocket League",
                description: "Rocket League is a vehicular soccer video game developed and published by Psyonix. The game was first released for Microsoft Windows and PlayStation 4 in July 2015, with ports for Xbox One, OS X, and Linux being released in 2016.",
                photo: "http://cdn.edgecast.steamstatic.com/steam/apps/252950/header.jpg?t=1487806299",
                comments: []
            }
        ];

    var jsonStr = {
        "games": gamesList
    };

    res.json(jsonStr);
});

categoriesRouter.route("/")
    .get(function(req,res){
        var response = {};
        Category.find({},function(err,data){
            if(err) {
                response = {"error":true, "message":"Error fetching data"};
            } else {
                response = {"error":false,"data":data};
            }
            res.json(response);
        });
    })
    .post(function(req,res){
        var newCatModel = new Category();
        var response = {};
        if (!req.body.name || !req.body.description || (!req.body.photo && req.body.photo != "")) {
            response = {"error" : false,"message" : "Invalid data. Please enter a name, description, and photo link."};
            res.json(response);
        }
        else {
            newCatModel.name = req.body.name;
            newCatModel.description = req.body.description;
            newCatModel.photo = req.body.photo;
            newCatModel.save(function(err){
                if(err) {
                    response = {"error" : true,"message" : "Error adding data"};
                } else {
                    response = {"error" : false,"message" : "Data added"};
                }
                res.json(response);
            });
        }
    });

categoriesRouter.route("/:id")
    .get(function(req,res){
        var response = {};
        Category.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"data" : data};
            }
            res.json(response);
        });
    })
    .put(function(req,res){
        var response = {};
        Category.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                if(req.body.name !== undefined) {
                    data.name = req.body.name;
                }
                if(req.body.description !== undefined) {
                    data.description = req.body.description;
                }
                if (req.body.photo !== undefined) {
                	data.photo = req.body.photo;
                }
                data.save(function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false,"message" : "Data updated."};
                    }
                    res.json(response);
                })
            }
        });
    })
    .delete(function(req,res){
        var response = {};
        Category.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                Category.remove({_id : req.params.id},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data"};
                    } else {
                        response = {"error" : true,"message" : "Data deleted"};
                    }
                    res.json(response);
                });
            }
        });
    })

referencesRouter.route("/:catId")
    .get(function(req,res){
        var response = {};
        Reference.find({"categoryId":req.params.catId},function(err,data){
            if(err) {
                response = {"error":true, "message":"Error fetching data"};
            } else {
                response = {"error":false,"data":data};
            }
            res.json(response);
        });
    })
    .post(function(req,res){
        var newRefModel = new Reference();
        var response = {};
        if (!req.body.name || !req.body.description || !req.body.type || !req.body.url) {
            response = {"error" : false,"message" : "Invalid data. Please enter a name, description, type, and URL."};
            res.json(response);
        }
        else {
            newRefModel.name = req.body.name;
            newRefModel.categoryId = req.params.catId;
            newRefModel.description = req.body.description;
            newRefModel.refType = req.body.type;
            newRefModel.url = req.body.url;
            newRefModel.save(function(err){
                if(err) {
                    response = {"error" : true,"message" : "Error adding data"};
                } else {
                    response = {"error" : false,"message" : "Data added"};
                }
                res.json(response);
            });
        }
    });

referencesRouter.route("/addNote/:refId")
    .post(function(req,res){
        var newRefNote = new Note();
        var response = {};
        if (!req.body.note) {
            response = {"error" : false,"message" : "Invalid data."};
            res.json(response);
        }
        else {
            newRefNote.note = req.body.note;
            newRefNote.refId = req.params.refId;
            newRefNote.save(function(err){
                if(err) {
                    response = {"error" : true,"message" : "Error adding data"};
                } else {
                    response = {"error" : false,"message" : "Data added", "newNote":newRefNote};
                }
                res.json(response);
            });
        }
    });


referencesRouter.route("/ref/:refId")
    .get(function(req,res){
        var response = {};
        Reference.findById(req.params.refId,function(err,data){

            var theRef = data;
            theRef.comments = [];

            Note.find({"refId": req.params.refId},function(err,notes){

                if(err) {
                    response = {"error" : true,"message" : "Error fetching data"};
                } else {
                    response = {"error" : false,"data" : {"ref": theRef, "notes": notes}};
                }
                res.json(response);
            });
        });
    })
    .put(function(req,res){
        var response = {};
        Reference.findById(req.params.refId,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                if(req.body.name !== undefined) {
                    data.name = req.body.name;
                }
                if(req.body.description !== undefined) {
                    data.description = req.body.description;
                }
                if (req.body.type !== undefined) {
                    data.refType = req.body.type;
                }
                if (req.body.url !== undefined) {
                    data.url = req.body.url;
                }
                data.save(function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false,"message" : "Data updated."};
                    }
                    res.json(response);
                })
            }
        });
    })
    .delete(function(req,res){
        var response = {};
        Reference.findById(req.params.refId,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                var catId = data.categoryId;
                Reference.remove({_id : req.params.refId},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data"};
                    } else {
                        response = {"error" : true,"message" : "Data deleted", "catId":catId};
                    }
                    res.json(response);
                });
            }
        });
    })

app.use('/games', gamesRouter);
app.use('/categories', categoriesRouter);

app.use('/references', referencesRouter);

app.listen(3000);
console.log("Listening to port 3000");