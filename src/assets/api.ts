import axios from "axios";

const apiClient = axios.create({
    baseURL: "https://api.openai.com/v1",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer ${process.env.OPENAI_API_KEY}",
    },
});

export const getChatGPT = async (message:string) => {
    const response = await apiClient.post("/chat/completions", {
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: message }],
    max_tokens: 50,
});
    return response.data.choices[0].text.trim();
};