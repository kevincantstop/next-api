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
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    meta: {
        type: DataTypes.JSON,
    }
});

const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    meta: {
        type: DataTypes.JSON,
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

User.hasMany(Post, { foreignKey: 'authorId' })
Post.belongsTo(User, { foreignKey: 'authorId', constraints: false})

Category.belongsToMany(Post, { through: 'Post_Category', foreignKey: 'categoryId', constraints: false })
Post.belongsToMany(Category, { through: 'Post_Category', foreignKey: 'postId', constraints: false })

const sync = async () => {
    await sequelize.sync({ force: true })
}

module.exports = {
    User,
    Category,
    Post,
    sync
}
