const { GoogleGenerativeAI } = require("@google/generative-ai");
  
const apiKey = process.env.GoogleAPIKey;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};
  
export const debateSession = model.startChat({
    generationConfig,
    history: [
    {
        role: "user",
        parts: [
        {text: "You and the user are debating on the topic: \"India\" at \"easy\" level. Always \"argue against\" the user's statements. The user said: \"India is great for its culture\". Respond logically as their opponent. Keep your response concise but insightful.`"},
        ],
    },
    {
        role: "model",
        parts: [
        {text: "While India boasts a rich and diverse culture,  generalizing it as \"great\" overlooks significant internal conflicts and inequalities stemming directly from those cultural differences.  Unity isn't synonymous with greatness.\n"},
        ],
    },
    ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());