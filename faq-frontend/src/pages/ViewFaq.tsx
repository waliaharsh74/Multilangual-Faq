import { useEffect, useState } from "react";
import axios from "axios";

interface FAQ {
    id: string;
    question: string;
    answer: string;
    languageCode: string;
}

const ViewFAQ = () => {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [languages, setLanguages] = useState<any[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
    const [loadingLanguages, setLoadingLanguages] = useState<boolean>(true);
    const [loadingFaqs, setLoadingFaqs] = useState<boolean>(false);
    const [deletingFaqId, setDeletingFaqId] = useState<string | null>(null);

    useEffect(() => {
        setLoadingLanguages(true);
        axios
            .get(`${import.meta.env.VITE_APP_API_URL}/languages`)
            .then((response) => {
                setLanguages(response.data.Languages);
                setLoadingLanguages(false);
            })
            .catch((err) => {
                console.error("Error fetching languages", err);
                setLoadingLanguages(false);
            });

        fetchFaqs(selectedLanguage);
    }, []);

    useEffect(() => {
        fetchFaqs(selectedLanguage);
    }, [selectedLanguage]);

    const fetchFaqs = (languageCode: string) => {
        setLoadingFaqs(true);
        axios
            .get(`${import.meta.env.VITE_APP_API_URL}/get-faqs?lang=${languageCode}`)
            .then((response) => {
                setFaqs(response.data.result);
                setLoadingFaqs(false);
            })
            .catch((err) => {
                console.error("Error fetching FAQs", err);
                setLoadingFaqs(false);
            });
    };

    const handleDeleteFaq = async (faqId: string) => {
        setDeletingFaqId(faqId);

        try {
            await axios.delete(`${import.meta.env.VITE_APP_API_URL}/delete-faq/${faqId}`);

            setFaqs(faqs.filter((faq) => faq.id !== faqId));
        } catch (err) {
            console.error("Error deleting FAQ", err);
        } finally {
            setDeletingFaqId(null);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-4">View FAQ List</h2>

            {loadingLanguages && (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
                </div>
            )}

            {!loadingLanguages && languages.length > 0 && (
                <div className="mb-4">
                    <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                        Select Language
                    </label>
                    <select
                        id="language"
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                    >
                        {languages.map((lang) => (
                            <option key={lang.code} value={lang.code}>
                                {lang.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {loadingFaqs && !loadingLanguages && (
                <div className="flex justify-center items-center mb-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
                </div>
            )}

            {!loadingFaqs && !loadingLanguages && faqs.length === 0 && (
                <p>No FAQs available for the selected language.</p>
            )}

            {!loadingFaqs && !loadingLanguages && faqs.length > 0 && (
                <ul>
                    {faqs.map((faq) => (
                        <li key={faq.id} className=" flex justify-between mb-4 p-4 border border-gray-300 rounded-md">
                            <div>

                                <h3 className="font-semibold">{faq.question}</h3>
                                <p>{faq.answer}</p>
                            </div>


                            <button
                                onClick={() => handleDeleteFaq(faq.id)}
                                disabled={deletingFaqId === faq.id}
                                className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-gray-400"
                            >
                                {deletingFaqId === faq.id ? (
                                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white"></div>
                                ) : (
                                    "Delete"
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ViewFAQ;
