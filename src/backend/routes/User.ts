import {Router} from 'express';
import User from '../models/User';
import Authenticator from '../base/Authenticator';

let UserRoute = Router(),
    UserModel = new User();

UserRoute.route('/user')
    .get(Authenticator.isAuthenticated, (req, res, next) => {
        UserModel.getUsers().then((result) => {
            res.send(result);
        });
    })
    .post(Authenticator.isAuthenticated, (req, res, next) => {
        res.send('post user route');
    });

export default UserRoute;