import { DataTypes } from "sequelize";
import sequelize from "@/core/database";

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

const sync = async () => {
    await sequelize.sync({ force: true })
}

module.exports = {
    User,
    sync
}
