const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
      apiKey: process.env.OPEN_API_KEY,
});
const openai = new OpenAIApi(configuration);
console.log(process.env.OPEN_API_KEY)
const generateimage = async (req, res) => {
  const { prompt, size } = req.body;
  const imageSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";

  try {
    const response = await openai.createImage({
      prompt,
      n: 4,
      size: imageSize,
    });
    imageUrl = response.data.data;
    res.status(200).json({
      success: true,
      data: imageUrl,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
    });
  }
};
module.exports = { generateimage };
