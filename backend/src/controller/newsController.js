const axios = require("axios");
const getAll = async (req, res) => {
  try {
    const resData = await axios.get(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.API_KEY}`);
    return res
      .status(200)
      .json({ _message: "Get all.", data: resData.data, error: "" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { getAll };
