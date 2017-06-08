import * as Sequelize from 'sequelize';
import Database from '../base/Database';
import * as Bcrypt from 'bcrypt';

export default class User {

    private user;

    constructor() {
        this.user = Database.getInstance().define('users', {
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            }
        }, {
            timestamps: false
        });
    }

    public getUsers () {
        return this.user.findAll({
            attributes: {
                exclude: ['password']
            }
        });
    };

    public getUserByName (username) {
        return this.user.find({
            where: {
                username: username
            }
        });
    };

    public createUser (username: string, password: string, callback) {
            if (!username || !password) {
                console.log('Error userdata');
            } else {
                Bcrypt.genSalt(10, (err, salt) => {
                    Bcrypt.hash(password, salt, (err, hash) => {
                        this.user.create({
                            username: username,
                            password: hash
                        }).then(callback);
                    });
                });
            }
    }
}