const express = require('express');
const cors = require('cors');
const Data = require('./data.js'); 
const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/fetch-data', async (req, res) => {
    const userInput = req.query.userInput; 
  if (userInput !== undefined && userInput !== "") {
    try {
    const data = new Data();
    const result = await data.main(userInput); 
    res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data" });
    }
  } else {
    res.status(400).json({ error: "userInput query parameter is required" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
