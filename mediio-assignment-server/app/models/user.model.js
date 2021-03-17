module.exports = mongoose => {
  const User = mongoose.model(
    "user",
    mongoose.Schema(
      {
        email: String,
        username: String,
        password: String,
        token: String
      },
      { timestamps: true }
    )
  );

  return User;
};