export default (sequelize, { TEXT, STRING, UUID, UUIDV4 }) => {
    const Message = sequelize.define('Message', {
        id: {
            primaryKey: true,
            allowNull: false,
            type: UUID,
            defaultValue: UUIDV4()
        },
        content: {
            type: TEXT,
            allowNull: false
        },
        time: {
            type: STRING,
            allowNull: false
        },
        username: {
            type: STRING,
            allowNull: false
        }
    });

    return Message;
};
