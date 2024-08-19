require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");
const Configuration = new Configuration({ apiKey: OPENAI_API_KEY });
import OpenAI from 'openai';
const openai = new OpenAI();

// const openai = new OpenAIApi(Configuration);


const app = express();

const PORT = process.env.PORT ||5000;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Sunucu çalışıyor!');
});

 async function AskGPT(prompt) {
    try{
          const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",  // ChatGPT modelini kullanıyoruz
    messages: [{ role: "user", content: prompt }],
  });
        return response.data.choices[0].text;
        } catch (error) {
            throw new Error(`API request failed: ${error.message}`);
        }    
    };


app.post("/api/chatgpt",async (req,res)=>{
    const {message} = req.body;
    try {
        const response =await axios.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-3.5-turbo",
            messages: 
                {
                    role: "user",
                    content: message
                }
            
        },{
            headers:{
                "Authorization":`Bearer ${process.env.OPENAI_API_KEY}`
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({error: error.message});
    }});

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));