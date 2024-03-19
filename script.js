import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyDb3vYFYQIz0CSJug8VFPdWRJ5X4GS0BfY";
// const key = Buffer.from(process.env.PRIVATE_KEY , 'base64').toString('ascii');
const genAI = new GoogleGenerativeAI(API_KEY);
const input = document.getElementById("ip");
const btn = document.getElementById("btn");
const fillingBox = document.getElementById("outPut");
const progressBar = document.getElementById("progressBar");

function updateProgress(progress) {
    progressBar.value = progress;
}

async function run() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = input.value;
        const result = await model.generateContent(prompt, { maxTime: 10000 }); // Example timeout of 10 seconds
        const response = await result.response;
        const text = response.text();
        return text;
    } catch (error) {
        console.error("Error in run():", error);
        throw error;
    }
}

btn.addEventListener("click", async () => {
    try {
        fillingBox.innerHTML = '';
        progressBar.style.display = "block"; 
        let progress = 0;
        updateProgress(progress);
        const interval = setInterval(() => {
            progress += 5; 
            updateProgress(Math.min(progress, 100)); 
        }, 500); 
        let res = await run();
        fillingBox.innerHTML = res;
        input.value = "";
        clearInterval(interval); 
    } catch (error) {
        console.error("Error in button click event listener:", error);
        fillingBox.innerHTML = "I am sorry as a LLM model i am unable to answer this question.";
    } finally {
        progressBar.style.display = "none";
    }
});
