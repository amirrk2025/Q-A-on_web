const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3010;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// OpenAI API
app.post('/generate-qa', async (req, res) => {
    const { text, prompt } = req.body;
    const API_KEY = 'tpsg-acF4DMisHKzZTN9SSn9aGvLESF4tzja';
    const url = 'https://api.metisai.ir/openai/v1/chat/completions';

    try {
        const response = await axios.post(url, {
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'You are a helpful assistant who generates specific types of questions from a given text.' },
                { role: 'user', content: `${prompt}\n\n${text}` }
            ]
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        const assistantMessage = response.data.choices[0].message.content;
        res.json({ message: assistantMessage });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error communicating with OpenAI API');
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

