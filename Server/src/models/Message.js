export default (sequelize, { TEXT, UUID, UUIDV4 }) => {
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
        }
    });

    return Message;
};
