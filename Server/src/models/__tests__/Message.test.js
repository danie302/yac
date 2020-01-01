import Sequelize from 'sequelize-mock';
import Message from '../Message';

const sequelize = new Sequelize();
const DataTypes = sequelize.Sequelize;
const model = Message(sequelize, DataTypes);
const schema = model._defaults;

describe('#Message', () => {
    it('should have correct model name', () => {
        expect(model.name).toBe('Message');
    });

    it('should match the schema', () => {
        expect(schema).toEqual({
            id: {
                primaryKey: true,
                allowNull: false,
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4()
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            time: {
                type: DataTypes.STRING,
                allowNull: false
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false
            }
        });
    });
});
