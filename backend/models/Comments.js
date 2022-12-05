module.exports = (sequelize, DataTypes) => {
	const Comments = sequelize.define(
		"Comments",
		{
			commentBody: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			createdAt: "commentedAt",
			modifiedAt: false,
		}
	);

	return Comments;
};
