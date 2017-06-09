import * as Sequelize from 'sequelize';
import Database from '../base/Database';
import * as Bcrypt from 'bcrypt';

export default class User {

    private user;

    constructor() {
        this.user = Database.getInstance().define('users', {
            id: {
                type: Sequelize.STRING,
                primaryKey: true
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            firstname: {
                type: Sequelize.STRING,
                allowNull: true,
                validate: {
                    notEmpty: false
                }
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true
                }
            },
            type: {
                type: Sequelize.BOOLEAN,
                allowNull: true,
                validate: {
                    notEmpty: false
                }
            },
            date: {
                type: Sequelize.BIGINT,
                allowNull: true,
                validate: {
                    notEmpty: false
                }
            },
            phone: {
                type: Sequelize.STRING,
                allowNull: true,
                validate: {
                    notEmpty: false
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

    public editUser (id, params) {
        let query = [];

        if (params.firstname) {
            query.push(this.user.update(
                {
                    firstname: params.firstname
                },
                {
                    where: {
                        id: id
                    }
                })
            );
        }

        if (params.phone) {
            query.push(this.user.update(
                {
                    phone: params.phone
                },
                {
                    where: {
                        id: id
                    }
                })
            );
        }

        return Promise.all(query);
    }
}