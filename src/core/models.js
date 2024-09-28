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
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // 0: inactive 1: active
    },
    meta: {
        type: DataTypes.JSON,
        defaultValue: {}
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
        defaultValue: {}
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // 0: drafted 1: published
    }
})

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    meta: {
        type: DataTypes.JSON,
        defaultValue: {}
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // 0: invisible 1: visible
    }
})

const Option = sequelize.define('Option', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    value: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: {}
    }
})

User.hasMany(Post, { foreignKey: 'authorId' })
Post.belongsTo(User, { foreignKey: 'authorId', constraints: false})

Post.hasMany(Comment, { foreignKey: 'postId' })
Comment.belongsTo(Post, { foreignKey: 'postId', constraints: false})

User.hasMany(Comment, { foreignKey: 'authorId' })
Comment.belongsTo(User, { foreignKey: 'authorId', constraints: false})

Category.hasMany(Post, { foreignKey: 'categoryId', constraints: false })
Post.belongsTo(Category, { foreignKey: 'categoryId', constraints: false })

module.exports = {
    User,
    Category,
    Post,
    Comment,
    Option,
    sync: () => sequelize.sync({ force: true })
}
