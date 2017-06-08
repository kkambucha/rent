import {Router} from 'express';
import User from '../models/User';

let RegistrationRoute = Router(),
    UserModel = new User();

RegistrationRoute.route('/')
    .post((req, res, next) => {
        if (req.isAuthenticated()) {
            res.redirect('/');
        } else {
            if (req.body.username && req.body.password) {
                UserModel.getUserByName(req.body.username).then((result) => {
                    if (!result) {
                        UserModel.createUser(req.body.username, req.body.password, (result) => {
                            res.redirect('/login');
                        });
                    } else {
                        res.send('Error user is exist');
                    }

                });
            } else {
                res.send('Error userdata');
            }
        }
    });

export default RegistrationRoute;