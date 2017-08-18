module.exports = function (app) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var mongoose = require("mongoose");

    var userDbModel = require('../model/user/user.model.server.js')();
    var artistDbModel = require('../model/artist/artist.model.server')();

    // http handlers
    app.post("/api/user", createUser);
    app.get("/api/user", handleGetQuery);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);
    app.post("/api/user/:userId/watchlist/add/:artistSpotifyId", addArtistToWatchlist);
    app.delete("/api/user/:userId/watchlist/delete/:artistSpotifyId", removeArtistFromWatchlist);
    app.get("/api/user/:userId/watchlist", getUserWatchlist);

    // FB authentification
    app.get('/auth/facebook', passport.authenticate('facebook', {scope: ['email']}));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/#!/profile',
            failureRedirect: '/project/#!/login'
        }));
    // Google Authentification
    app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email', 'https://www.googleapis.com/auth/contacts.readonly']}));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project/#!/profile',
            failureRedirect: '/project/#!/login'
        }));

    // Google and Facebook Authenticate code

    var keys = {};

    try {
        keys = require("../../env.vars.local");
    } catch (e) {
        if (process.env.GOOGLE_CLIENT_ID) {
            keys = process.env;
        } else {

            keys.GOOGLE_CLIENT_ID = "none";
            keys.GOOGLE_CLIENT_SECRET = "none";
            keys.GOOGLE_CALLBACK_URL = "none";

            keys.FACEBOOK_CLIENT_ID = "none";
            keys.FACEBOOK_CLIENT_SECRET = "none";
            keys.FACEBOOK_CALLBACK_URL = "none";
        }
    }

    var googleConfig = {
        clientID: keys.GOOGLE_CLIENT_ID,
        clientSecret: keys.GOOGLE_CLIENT_SECRET,
        callbackURL: keys.GOOGLE_CALLBACK_URL
    };

    var facebookConfig = {
        clientID: keys.FACEBOOK_CLIENT_ID,
        clientSecret: keys.FACEBOOK_CLIENT_SECRET,
        callbackURL: keys.FACEBOOK_CALLBACK_URL
    };

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function facebookStrategy(token, refreshToken, profile, done) {
        userDbModel
            .findUserByFacebookId(profile.id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var fullNameParts = profile.displayName.split(" ");
                        var newFacebookUser = {
                            username: fullNameParts[0] + fullNameParts[1],
                            name: fullNameParts[0]+fullNameParts[1],
                            email: profile.emails ? profile.emails[0].value : "",
                            facebook: {
                                id: profile.id,
                                token: token
                            }
                        };

                        var createUsername = function (num) {
                            return userDbModel.findUserByUsername(newFacebookUser.username + num)
                                .then(function (user) {
                                        if (!user) {
                                            newFacebookUser.username = newFacebookUser.username + num;
                                            return userModel.createUser(newFacebookUser);
                                        } else {
                                            return createUsername(num + 1);
                                        }
                                    },
                                    function (err) {
                                        newFacebookUser.username = newFacebookUser.username + num;
                                        return userDbModel.createUser(newFacebookUser);
                                    });
                        };

                        return userDbModel.findUserByUsername(newFacebookUser.username)
                            .then(function (user) {
                                    if (!user) {
                                        return userDbModel.createUser(newFacebookUser);
                                    } else {
                                        return createUsername(0);
                                    }
                                },
                                function(err) {
                                    console.log(err);
                                    return userDbModel.createUser(newFacebookUser);

                                });
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function googleStrategy(token, refreshToken, profile, done) {
        userDbModel
            .findUserByGoogleId(profile.id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var newGoogleUser = {
                            username: profile.name.givenName + profile.name.familyName,
                            name: profile.name.givenName+profile.name.familyName,
                            email: profile.emails[0].value,
                            google: {
                                id: profile.id,
                                token: token
                            }
                        };

                        var createUsername = function (num) {
                            return userDbModel.findUserByUsername(newGoogleUser.username + num)
                                .then(function(user) {
                                    if (!user) {
                                        newGoogleUser.username = newGoogleUser.username + num;
                                        return userDbModel.createUser(newGoogleUser);
                                    } else {
                                        return createUsername(num + 1);
                                    }
                                }, function(err) {
                                    newGoogleUser.username = newGoogleUser.username + num;
                                    return userDbModel.createUser(newGoogleUser);
                                })
                        };

                        return userDbModel.findUserByUsername(newGoogleUser.username)
                            .then(function(user) {
                                if (!user) {
                                    return userDbModel.createUser(newGoogleUser);
                                } else {
                                    return createUsername(0);
                                }
                            }, function (err) {
                                console.log(err);
                                return userDbModel.createUser(newGoogleUser);

                            });

                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function localStrategy(username, password, done) {
        userDbModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    console.log(user);
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                },
                function (err) {
                    console.log(err);
                    if (err) {
                        return done(err);
                    }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userDbModel
            .findUserById(user._id)
            .then(
                function (user) {
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    // End authentification code


    function getUserWatchlist(req, res) {
        var userId = req.params.userId;
        artistDbModel
            .getAllArtistsForUser(userId)
            .then(function (artists) {
                res.json(artists);
            })
            .catch(function (err) {
                console.log(err);
                res.status(err);
            })
    }

    function addArtistToWatchlist(req, res) {
        var artistSpotifyId = req.params.artistSpotifyId;
        var userId = req.params.userId;
        var artist = req.body;
        console.log(artist);
        console.log("user.service.server");
        artistDbModel
            .addArtistForUser(userId, artistSpotifyId, artist)
            .then(function (artistSpotifyIdBack) {
                res.json(artistSpotifyIdBack);
            })
            .catch(function (err) {
                console.log(err);
                res.status(err);
            })
    }

    function removeArtistFromWatchlist(req, res) {
        var artistSpotifyId = req.params.artistSpotifyId;
        var userId = req.params.userId;

        artistDbModel
            .removeArtistForUser(userId, artistSpotifyId)
            .then(function (entry) {
                res.json(entry);
            })
            .catch(function (err) {
                console.log(err);
                res.status(err);
            });
    }

    function handleGetQuery(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if (password) {
            findUserByCredentials(req, res);
        }
        else if (username) {
            findUserByUsername(req, res);
        }
        else {
            res.status(404);
        }
    }

    function createUser(req, res) {
        userDbModel
            .createUser(req.body)
            .then(function (user) {
                res.json(user);
            })
            .catch(function (err) {
                console.log(err);
                res.status(500);
            });
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;

        userDbModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            });
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        userDbModel
            .findUserByUsername(username, password)
            .then(function (user) {
                res.json(user);
            });
    }

    function findUserById(req, res) {
        userDbModel
            .findUserById(req.params.userId)
            .then(function (user) {
                if (!!user) {
                    res.json(user);
                }
            })
            .catch(function (err) {
                res.status(err);
            });
    }

    function updateUser(req, res) {
        userDbModel
            .updateUser(req.params.userId, req.body)
            .then(function () {
                res.status(200);
            })
            .catch(function (err) {
                res.status(err);
            });
    }

    function deleteUser(req, res) {
        userDbModel
            .deleteUser(req.params.userId)
            .then(function () {
                res.status(200);
            })
            .catch(function (err) {
                res.status(err);
            });
    }
};