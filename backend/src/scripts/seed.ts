import db from "@/lib/db"

const challenges = [
    {
        title: "Create a Real-time Chat Application",
        slug: "create-a-real-time-chat-application",
        description: "Develop a real-time chat application using WebSockets.",
        deadline: new Date("2025-04-01"),
        duration: "3 weeks",
        prize: 3000,
        contactEmail: "team@umurava.africa",
        projectBrief: "Build a real-time chat application that supports multiple users and chat rooms.",
        projectDescription:
            "The application should be built using React for the frontend and Node.js with Socket.io for the backend. Users should be able to create accounts, join different chat rooms, and send messages in real-time. Include features like typing indicators and online/offline status.",
        projectRequirements:
            "The application must be responsive and work on both desktop and mobile devices. Implement proper error handling and ensure the app can handle a large number of concurrent users. Include both group chats and private messaging functionality.",
        skillsRequired: ["React", "Node.js", "Socket.io", "WebSockets", "MongoDB"],
        seniorityLevers: ["Mid-level", "Senior"],
        deliverables:
            "GitHub repository with frontend and backend code, deployment instructions, and a live demo of the application.",
        createdAt: new Date("2025-01-10T14:45:00Z"),
        updatedAt: new Date("2025-01-10T14:45:00Z"),
    },
    {
        title: "Develop a Machine Learning Image Classifier",
        slug: "develop-a-machine-learning-image-classifier",
        description: "Build an image classification model using deep learning.",
        deadline: new Date("2025-05-01"),
        duration: "4 weeks",
        prize: 5000,
        contactEmail: "team@umurava.africa",
        projectBrief: "Develop a machine learning model that can classify images into different categories.",
        projectDescription:
            "Use TensorFlow or PyTorch to build a convolutional neural network (CNN) that can classify images into predefined categories. Train the model using a well-known dataset such as CIFAR-10 or ImageNet.",
        projectRequirements:
            "The model must achieve at least 85% accuracy on the test dataset. Provide Jupyter notebooks with clear documentation and a web app that allows users to upload images for classification.",
        skillsRequired: ["Python", "TensorFlow", "PyTorch", "Machine Learning", "Deep Learning"],
        seniorityLevers: ["Mid-level", "Senior"],
        deliverables:
            "GitHub repository with model code, training scripts, evaluation metrics, and a simple web interface for testing.",
        createdAt: new Date("2025-01-12T10:00:00Z"),
        updatedAt: new Date("2025-01-12T10:00:00Z"),
    },
    {
        title: "Develop an E-learning Platform",
        slug: "develop-an-e-learning-platform",
        description: "Create a comprehensive e-learning platform with course management and progress tracking.",
        deadline: new Date("2025-06-30"),
        duration: "8 weeks",
        prize: 10000,
        contactEmail: "team@umurava.africa",
        projectBrief: "Build an intuitive and feature-rich e-learning platform for online education.",
        projectDescription:
            "The platform should allow course creation, student enrollment, progress tracking, and interactive learning materials. Include features like quizzes, discussion forums, and certificates.",
        projectRequirements:
            "Implement user roles (admin, instructor, student), video streaming capabilities, and a recommendation system. Ensure the platform is accessible and supports multiple languages.",
        skillsRequired: ["React", "Node.js", "GraphQL", "PostgreSQL", "AWS S3"],
        seniorityLevers: ["Senior", "Lead"],
        deliverables:
            "Full source code, API documentation, database schema, and a deployed staging environment.",
    },
    {
        title: "Build a Smart Home IoT Dashboard",
        slug: "build-a-smart-home-iot-dashboard",
        description: "Develop a dashboard for monitoring and controlling smart home devices.",
        deadline: new Date("2025-05-15"),
        duration: "5 weeks",
        prize: 6000,
        contactEmail: "team@umurava.africa",
        projectBrief: "Create an intuitive dashboard for managing various smart home devices and sensors.",
        projectDescription:
            "The dashboard should display real-time data from different IoT devices, allow device control, and provide insights through data visualization. Implement user-defined automation rules.",
        projectRequirements:
            "Support various IoT protocols (MQTT, CoAP), implement a responsive design, and ensure low-latency updates. Include features for device management and user notifications.",
        skillsRequired: ["React", "Node.js", "MQTT", "InfluxDB", "D3.js"],
        seniorityLevers: ["Mid-level", "Senior"],
        deliverables:
            "Source code, API documentation, deployment instructions, and a video demonstration of the dashboard.",
    },
    {
        title: "Develop a Blockchain-based Voting System",
        slug: "develop-a-blockchain-based-voting-system",
        description: "Create a secure and transparent voting system using blockchain technology.",
        deadline: new Date("2025-07-31"),
        duration: "10 weeks",
        prize: 15000,
        contactEmail: "team@umurava.africa",
        projectBrief: "Build a decentralized voting system that ensures transparency and prevents fraud.",
        projectDescription:
            "The system should allow voter registration, secure authentication, vote casting, and real-time result tabulation. Implement smart contracts for vote validation and result calculation.",
        projectRequirements:
            "Use Ethereum blockchain, implement zero-knowledge proofs for voter privacy, and ensure the system is scalable and resistant to common attack vectors.",
        skillsRequired: ["Solidity", "React", "Node.js", "Ethereum", "zk-SNARKs"],
        seniorityLevers: ["Senior", "Lead"],
        deliverables:
            "Smart contract code, frontend application, technical whitepaper, and a testnet deployment.",
    },
    {
        title: "Create an AI-powered Content Recommendation Engine",
        slug: "create-an-ai-powered-content-recommendation-engine",
        description: "Develop a machine learning-based system for personalized content recommendations.",
        deadline: new Date("2025-06-15"),
        duration: "6 weeks",
        prize: 8000,
        contactEmail: "team@umurava.africa",
        projectBrief: "Build an intelligent recommendation system for a digital content platform.",
        projectDescription:
            "The system should analyze user behavior, content metadata, and engagement metrics to provide personalized content recommendations. Implement both collaborative and content-based filtering approaches.",
        projectRequirements:
            "Use machine learning frameworks, implement A/B testing capabilities, and ensure the system can handle large-scale data processing. Include a user feedback loop for continuous improvement.",
        skillsRequired: ["Python", "TensorFlow", "Apache Spark", "PostgreSQL", "Flask"],
        seniorityLevers: ["Senior", "Data Scientist"],
        deliverables:
            "Machine learning models, API for recommendations, documentation of algorithms, and performance benchmarks.",
    },
    {
        title: "Develop a Cross-platform Mobile Game",
        slug: "develop-a-cross-platform-mobile-game",
        description: "Create an engaging mobile game that runs on both iOS and Android platforms.",
        deadline: new Date("2025-08-31"),
        duration: "12 weeks",
        prize: 20000,
        contactEmail: "team@umurava.africa",
        projectBrief: "Design and develop a casual mobile game with multiplayer capabilities.",
        projectDescription:
            "The game should feature intuitive controls, engaging gameplay mechanics, and social features. Implement real-time multiplayer, leaderboards, and in-app purchases.",
        projectRequirements:
            "Use a cross-platform game engine, implement efficient resource management, and ensure high performance on a wide range of devices. Include analytics and crash reporting.",
        skillsRequired: ["Unity", "C#", "Mobile UI/UX", "RESTful APIs", "SQLite"],
        seniorityLevers: ["Mid-level", "Senior"],
        deliverables:
            "Game source code, asset files, server-side code for multiplayer, and app store deployment packages.",
    },
    {
        title: "Build a Microservices-based E-commerce Platform",
        slug: "build-a-microservices-based-e-commerce-platform",
        description: "Develop a scalable e-commerce platform using a microservices architecture.",
        deadline: new Date("2025-09-30"),
        duration: "16 weeks",
        prize: 25000,
        contactEmail: "team@umurava.africa",
        projectBrief: "Create a modern, cloud-native e-commerce platform with high scalability and resilience.",
        projectDescription:
            "The platform should include services for product catalog, user management, order processing, and payment integration. Implement features like real-time inventory, personalized recommendations, and analytics.",
        projectRequirements:
            "Use container orchestration, implement service discovery and API gateway, and ensure each microservice is independently deployable. Include comprehensive monitoring and logging.",
        skillsRequired: ["Kubernetes", "Docker", "Node.js", "Go", "MongoDB", "Redis"],
        seniorityLevers: ["Senior", "Architect"],
        deliverables:
            "Source code for all microservices, Kubernetes manifests, CI/CD pipelines, and architecture documentation.",
    },
    {
        title: "Develop an Augmented Reality Navigation App",
        slug: "develop-an-augmented-reality-navigation-app",
        description: "Create a mobile app that provides AR-based navigation and information overlay.",
        deadline: new Date("2025-07-31"),
        duration: "10 weeks",
        prize: 18000,
        contactEmail: "team@umurava.africa",
        projectBrief: "Build an innovative AR navigation app for urban exploration and tourism.",
        projectDescription:
            "The app should provide real-time AR navigation, point of interest information, and user-generated content. Implement features like offline maps, AR object recognition, and social sharing.",
        projectRequirements:
            "Use AR frameworks (ARKit/ARCore), implement efficient geospatial data handling, and ensure accurate positioning. Include multilingual support and accessibility features.",
        skillsRequired: ["Swift", "Kotlin", "ARKit", "ARCore", "CoreLocation", "Computer Vision"],
        seniorityLevers: ["Senior", "Mobile Specialist"],
        deliverables:
            "iOS and Android app source code, backend services for content management, and detailed UX design assets.",
    },
    {
        title: "Create a Decentralized File Storage System",
        slug: "create-a-decentralized-file-storage-system",
        description: "Develop a peer-to-peer file storage and sharing system using blockchain technology.",
        deadline: new Date("2025-10-31"),
        duration: "14 weeks",
        prize: 22000,
        contactEmail: "team@umurava.africa",
        projectBrief: "Build a secure and scalable decentralized alternative to traditional cloud storage.",
        projectDescription:
            "The system should allow users to store, retrieve, and share files in a decentralized network. Implement features like file encryption, redundancy, and incentive mechanisms for storage providers.",
        projectRequirements:
            "Use IPFS for distributed storage, implement smart contracts for access control and payments, and ensure high availability and fault tolerance. Include a user-friendly web interface.",
        skillsRequired: ["Rust", "IPFS", "Ethereum", "React", "libp2p"],
        seniorityLevers: ["Senior", "Blockchain Specialist"],
        deliverables:
            "Core protocol implementation, smart contracts, web interface, and comprehensive technical documentation.",
    },
    {
        title: "Build an AI-powered Virtual Assistant",
        slug: "build-an-ai-powered-virtual-assistant",
        description: "Develop a conversational AI assistant capable of handling various tasks and queries.",
        deadline: new Date("2025-08-15"),
        duration: "8 weeks",
        prize: 12000,
        contactEmail: "team@umurava.africa",
        projectBrief: "Create an intelligent virtual assistant with natural language understanding and task automation capabilities.",
        projectDescription:
            "The assistant should be able to understand and respond to user queries, perform tasks like scheduling, information retrieval, and basic data analysis. Implement multi-turn conversations and context awareness.",
        projectRequirements:
            "Use natural language processing models, implement intent recognition and entity extraction, and ensure privacy-preserving data handling. Include voice recognition and text-to-speech capabilities.",
        skillsRequired: ["Python", "TensorFlow", "NLP", "Speech Recognition", "DialogFlow"],
        seniorityLevers: ["Senior", "AI/ML Specialist"],
        deliverables:
            "AI model code, conversation flow designs, API integrations, and a demo application showcasing key features.",
    },
    {
        title: "Develop a Quantum Computing Simulator",
        slug: "develop-a-quantum-computing-simulator",
        description: "Create a web-based simulator for quantum computing circuits and algorithms.",
        deadline: new Date("2025-11-30"),
        duration: "16 weeks",
        prize: 30000,
        contactEmail: "team@umurava.africa",
        projectBrief: "Build an educational tool for simulating and visualizing quantum computing concepts.",
        projectDescription:
            "The simulator should allow users to construct quantum circuits, run simulations, and visualize results. Include a library of common quantum algorithms and interactive tutorials.",
        projectRequirements:
            "Implement accurate quantum gate operations, support for various qubit counts, and integration with classical computing elements. Ensure the UI is intuitive for both beginners and experts.",
        skillsRequired: ["Python", "React", "WebAssembly", "Linear Algebra", "Quantum Mechanics"],
        seniorityLevers: ["Senior", "Quantum Computing Specialist"],
        deliverables:
            "Simulator core implementation, web interface, educational content, and performance benchmarks against known quantum systems.",
    },
    {
        title: "Create a Privacy-Preserving Data Analytics Platform",
        slug: "create-a-privacy-preserving-data-analytics-platform",
        description: "Develop a platform for performing data analytics while maintaining data privacy.",
        deadline: new Date("2025-09-30"),
        duration: "12 weeks",
        prize: 20000,
        contactEmail: "team@umurava.africa",
        projectBrief: "Build a secure analytics platform that allows insights extraction without exposing raw data.",
        projectDescription:
            "The platform should implement techniques like differential privacy, secure multi-party computation, and homomorphic encryption to enable data analysis while protecting individual privacy. Include features for data anonymization and auditing.",
        projectRequirements:
            "Implement state-of-the-art privacy-preserving algorithms, ensure compliance with data protection regulations, and provide intuitive visualizations of aggregated results. Include robust access controls and encryption mechanisms.",
        skillsRequired: ["Python", "Cryptography", "Distributed Systems", "Statistical Analysis", "Go"],
        seniorityLevers: ["Senior", "Privacy Engineer"],
        deliverables:
            "Source code for the analytics platform, privacy-preserving algorithms implementation, documentation on security measures, and a sample dataset with demo analytics.",
    },
    {
        title: "Build a Serverless Video Streaming Platform",
        slug: "build-a-serverless-video-streaming-platform",
        description: "Develop a scalable, serverless video streaming service with adaptive bitrate streaming.",
        deadline: new Date("2025-10-15"),
        duration: "10 weeks",
        prize: 16000,
        contactEmail: "team@umurava.africa",
        projectBrief: "Create a modern video streaming platform utilizing serverless architecture for maximum scalability.",
        projectDescription:
            "The platform should support live and on-demand video streaming, implement adaptive bitrate streaming, and provide features like real-time transcoding and content protection. Include analytics for viewer engagement and quality of service.",
        projectRequirements:
            "Utilize serverless computing services, implement efficient video chunking and delivery, and ensure low-latency playback. Include support for multiple video formats and DRM integration.",
        skillsRequired: ["AWS Lambda", "Node.js", "FFmpeg", "HLS/DASH", "React"],
        seniorityLevers: ["Senior", "Cloud Architect"],
        deliverables:
            "Serverless functions code, frontend application, architecture diagrams, and performance test results.",
    },
    {
        title: "Develop a Predictive Maintenance System for IoT Devices",
        slug: "develop-a-predictive-maintenance-system-for-iot-devices",
        description: "Create an AI-driven system for predicting maintenance needs of industrial IoT devices.",
        deadline: new Date("2025-11-30"),
        duration: "14 weeks",
        prize: 24000,
        contactEmail: "team@umurava.africa",
        projectBrief: "Build an intelligent system that predicts maintenance requirements for industrial equipment using IoT sensor data.",
        projectDescription:
            "The system should collect and analyze data from various IoT sensors, use machine learning models to predict potential failures, and provide actionable maintenance recommendations. Implement real-time monitoring and alert mechanisms.",
        projectRequirements:
            "Use time-series analysis techniques, implement anomaly detection algorithms, and ensure the system can handle high-frequency data ingestion. Include a dashboard for visualizing equipment health and maintenance schedules.",
        skillsRequired: ["Python", "TensorFlow", "Apache Kafka", "Time Series Analysis", "ElasticSearch"],
        seniorityLevers: ["Senior", "Data Scientist"],
        deliverables:
            "Machine learning models, data pipeline code, web-based dashboard, and documentation on model training and evaluation.",
    },
    {
        title: "Create a Decentralized Social Media Platform",
        slug: "create-a-decentralized-social-media-platform",
        description: "Develop a blockchain-based social media platform emphasizing user privacy and data ownership.",
        deadline: new Date("2026-01-31"),
        duration: "20 weeks",
        prize: 35000,
        contactEmail: "team@umurava.africa",
        projectBrief: "Build a next-generation social media platform that gives users full control over their data and content.",
        projectDescription:
            "The platform should allow users to create, share, and interact with content in a decentralized manner. Implement features like self-sovereign identity, content monetization, and decentralized storage for media files.",
        projectRequirements:
            "Use blockchain technology for user authentication and content verification, implement a decentralized storage solution, and ensure high performance for real-time interactions. Include mechanisms for content moderation and dispute resolution.",
        skillsRequired: ["Solidity", "React", "IPFS", "Ethereum", "Rust"],
        seniorityLevers: ["Senior", "Blockchain Architect"],
        deliverables:
            "Smart contract code, frontend and backend applications, technical whitepaper, and testnet deployment.",
    }
]

async function main() {
    console.log(`Adding ${challenges.length} challenges`)
    for (const challenge of challenges) {
        console.log(`Adding ${challenge.title} challenge`)
        await db.challenge.create({
            data: challenge,
        })
        console.log(`Added ${challenge.title} challenge`)
    }

    console.log(`Seeded ${challenges.length} challenges`)
}

main()
    .catch((e) => {
        console.error(e)
    })
    .finally(async () => {
        console.log("done")
    })

