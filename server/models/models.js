const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Meme = sequelize.define('meme', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    img: {type: DataTypes.TEXT, allowNull: false}, //возможно можно хранить как блоб
    vk_route: {type: DataTypes.TEXT},
    text: {type: DataTypes.TEXT},
})

const Meme_Mark = sequelize.define('meme_mark', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //meme_id: {type: DataTypes.INTEGER},
    mark: {type: DataTypes.TEXT},
})

const Complaint = sequelize.define('complaint', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //meme_mark_id: {type: DataTypes.INTEGER},
    //reason_id: {type: DataTypes.INTEGER},
    notes: {type: DataTypes.TEXT},
})

const Reason = sequelize.define('reason', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    //meme_mark_id: {type: DataTypes.INTEGER},
    //reason_id: {type: DataTypes.INTEGER},
    reason: {type: DataTypes.TEXT},
    institution_item: {type: DataTypes.INTEGER}
})

Meme.hasMany(Meme_Mark, {onDelete: 'CASCADE'})
Meme_Mark.belongsTo(Meme, {onDelete: 'CASCADE'})

Meme_Mark.hasMany(Complaint, {onDelete: 'CASCADE'})
Complaint.belongsTo(Meme_Mark, {onDelete: 'CASCADE'})

Reason.hasMany(Complaint, {onDelete: 'CASCADE'})
Complaint.belongsTo(Reason, {onDelete: 'CASCADE'})

module.exports = {
    Meme,
    Meme_Mark,
    Reason,
    Complaint
}