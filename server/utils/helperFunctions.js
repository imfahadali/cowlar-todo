const jwt = require("jsonwebtoken");

exports.generateAccessToken = async ({ email, id }) => {
  return jwt.sign({ id, email }, process.env.SECRET_KEY, {
    expiresIn: "2h",
  });
};

exports.getStartEndPeriod = (timeframe) => {
  // const timeframe = timeframe ?? "today";
  let start, end;
  const now = new Date();
  start = now.toISOString();

  if (timeframe === "today") {
    end = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  } else if (timeframe === "week") {
    const startOfWeek = now.getDate() - now.getDay() + 1;
    end = new Date(now.setDate(startOfWeek - 6)).toISOString();
  } else if (timeframe === "month") {
    end = new Date(now.setDate(now.getDate() - 29)).toISOString();
  }
  return {
    start,
    end,
  };
};
