import express from "express";
import request from 'request';
import querystring from 'querystring';
const spotifyRouter = express.Router();
var client_id = 'bc93c832a39548c5a59f6320f995e067'; // Your client id
var client_secret = '644c5383fc4945f4a048f4f8987bf972'; // Your secret
var redirect_uri = 'http://localhost:3000/spotify/callback'; // Your redirect uri
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
var stateKey = 'spotify_auth_state';
spotifyRouter.get('/login', function (req, res) {
    console.log("get login route hit");
    var state = generateRandomString(16);
    res.cookie(stateKey, state);
    // your application requests authorization
    var scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        }));
});
spotifyRouter.get('/callback', function (req, res) {
    console.log("callback route hit");
    // your application requests refresh and access tokens
    // after checking the state parameter
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;
    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    }
    else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };
        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var access_token = body.access_token, refresh_token = body.refresh_token;
                // we can also pass the token to the browser to make requests from there
                res.redirect('http://localhost:3001/?' +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));
            }
            else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
});
spotifyRouter.get('/refresh_token', function (req, res) {
    // requesting access token from refresh token
    var refresh_token = req.query.refresh_token;
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        //    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        headers: { 'Authorization': 'Basic ', client_id: client_secret },
        form: {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        },
        json: true
    };
    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var access_token = body.access_token;
            res.send({
                'access_token': access_token
            });
        }
    });
});
export default spotifyRouter;
