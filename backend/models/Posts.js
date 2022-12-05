module.exports = (sequelize, DataTypes) => {
	const Posts = sequelize.define(
		"Posts",
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			postText: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			updatedAt: false,
			createdAt: "PostCreatedAt",
		}
	);

	Posts.associate = (models) => {
		Posts.hasMany(models.Comments, {
			onDelete: "cascade",
		});

		Posts.hasMany(models.Likes, {
			onDelete: "cascade",
		});
	};

	return Posts;
};
