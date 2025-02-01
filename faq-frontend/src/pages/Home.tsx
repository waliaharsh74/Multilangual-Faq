
const Home = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-3xl font-semibold mb-6">About This Project</h2>

            <p className="mb-4 text-lg">
                This project is a FAQ Management System designed to handle multilingual FAQs with real-time caching
                and efficient API management. It uses a Node.js backend with Express.js, Prisma ORM to interact with a PostgreSQL database, and Redis for caching to ensure high performance.
                On the frontend, React and TypeScript are used to create an intuitive and dynamic user interface.
            </p>

            <h3 className="text-2xl font-semibold mb-4">Objective</h3>
            <p className="mb-4">
                The objective of this project is to evaluate full-stack development skills, focusing on efficient API creation,
                multilingual support, caching for performance, and UI development with modern technologies.
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li>Design and implement a scalable FAQ model with multilingual support.</li>
                <li>Integrate a rich-text editor (WYSIWYG) for formatting FAQ answers.</li>
                <li>Develop a REST API using Express.js for managing FAQs and handle language selection via query parameters.</li>
                <li>Implement caching with Redis to store translations and reduce latency.</li>
                <li>Ensure efficient database interaction with Prisma ORM and PostgreSQL.</li>
                <li>Build a responsive frontend using React and TypeScript, leveraging modern hooks and components.</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4">Technologies Used</h3>
            <p className="mb-4">
                The following technologies were used to build this project:
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li>
                    <strong>Backend:</strong>
                    <ul className="list-inside list-disc">
                        <li>Node.js - Runtime environment for the backend.</li>
                        <li>Express.js - Web framework used to build the RESTful API.</li>
                        <li>Prisma - ORM for interacting with the PostgreSQL database.</li>
                        <li>PostgreSQL - Relational database used to store FAQ data and translations.</li>
                        <li>Redis - In-memory data store used for caching translations and improving API performance.</li>
                    </ul>
                </li>
                <li>
                    <strong>Frontend:</strong>
                    <ul className="list-inside list-disc">
                        <li>React - Frontend library used to build a dynamic and responsive UI.</li>
                        <li>TypeScript - A typed superset of JavaScript, enhancing the development experience with static typing.</li>
                        <li>TailwindCSS - Utility-first CSS framework for building responsive and maintainable user interfaces.</li>
                    </ul>
                </li>

            </ul>

            <h3 className="text-2xl font-semibold mb-4">Key Features</h3>
            <p className="mb-4">
                The application includes the following key features:
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li><strong>Multi-language Support:</strong> FAQs can be viewed and created in multiple languages (English, Hindi, Bengali, etc.). The system automatically translates FAQs if a translation is not available.</li>
                <li><strong>Real-time Caching:</strong> Translations are cached using Redis to ensure fast retrieval and minimize load on the translation API.</li>
                <li><strong>WYSIWYG Editor:</strong> The FAQ answers support rich formatting using a WYSIWYG editor, enabling a rich text experience for users and admins.</li>
                <li><strong>Efficient API:</strong> The REST API supports multiple endpoints for managing FAQs, including support for language-specific queries.</li>
                <li><strong>Admin Interface:</strong> A user-friendly admin interface is provided for managing FAQs, adding new entries, and editing or deleting existing ones.</li>
            </ul>




        </div>
    );


};

export default Home;
