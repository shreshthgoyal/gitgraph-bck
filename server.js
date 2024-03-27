const express = require('express');
const cors = require('cors');
const main = require('./data'); 
const port = 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.get('/fetch-data', async (req, res) => {
    const userInput = req.query.userInput; 
  if (userInput !== undefined && userInput !== "") {
    try {
    const data = await main(userInput); 
    res.json({nodes: data.nodes, links: data.links});
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
