import Sequelize from 'sequelize-mock';
import { isFunction } from '../../utils/is';
import User from '../User';

const sequelize = new Sequelize();
const DataTypes = sequelize.Sequelize;
const model = User(sequelize, DataTypes);
const schema = model._defaults;

describe('#User', () => {
    it('Should have correct model name', () => {
        expect(model.name).toBe('User');
    });

    it('Should match the schema', () => {
        expect(schema).toEqual({
            id: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4()
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isAlphanumeric: {
                        args: true,
                        msg: 'The username just accept alphanumeric characters'
                    },
                    len: {
                        args: [4, 20],
                        msg: 'The username must be from 4 to 20 characters'
                    }
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: {
                        args: true,
                        msg: 'Invalid Email'
                    }
                }
            }
        });
    });

    it('Should have beforeCreate hook', () => {
        expect(isFunction(model.options.hooks.beforeCreate)).toBe(true);
    });

    it('Should not create the user', () => {
        const user = model.create({ username: 'Jhon', password: 'Dow' });
        expect(user).not.toBeFalsy();
    });
});
