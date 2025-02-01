import React, { useState, useEffect } from "react";
import axios from "axios";

interface Language {
    code: string;
    name: string;
}

const CreateFAQ = () => {
    const [languages, setLanguages] = useState<Language[]>([]);
    const [question, setQuestion] = useState<string>("");
    const [answer, setAnswer] = useState<string>("");
    const [languageCode, setLanguageCode] = useState<string>("");

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/v1/languages")
            .then((response) => setLanguages(response.data.Languages))
            .catch((err) => console.error("Error fetching languages", err));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newFAQ = { question, answer, languageCode };

        try {
            const response = await axios.post("http://localhost:3000/api/v1/create-faq", {
                userInput: newFAQ,
            });
            alert(response.data.msg);
        } catch (error) {
            console.error("Error creating FAQ:", error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Create FAQ</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="question" className="block text-sm font-medium text-gray-700">Question</label>
                    <input
                        type="text"
                        id="question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="answer" className="block text-sm font-medium text-gray-700">Answer</label>
                    <textarea
                        id="answer"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
                    <select
                        id="language"
                        value={languageCode}
                        onChange={(e) => setLanguageCode(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                        required
                    >
                        <option value="">Select Language</option>
                        {languages.map((lang) => (
                            <option key={lang.code} value={lang.code}>
                                {lang.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
                    Submit FAQ
                </button>
            </form>
        </div>
    );
};

export default CreateFAQ;
