import { FaHeartbeat, FaMountain, FaMicrophone, FaChartLine, FaCar, FaSmile, FaUserClock, FaUtensils, FaSearch } from 'react-icons/fa';

export const projects = [
    {
        id: "fitsync",
        title: "FitSync",
        category: "ml",
        icon: FaHeartbeat,
        brief: "AI-driven fitness ecosystem bridging workout tracking and nutritional analytics.",
        problem: "Users struggle to correlate workout intensity with nutritional needs, leading to suboptimal fitness progress.",
        solution: "Built a cross-platform mobile app that integrates real-time workout tracking with a ML-based recommendation engine for personalized nutrition plans.",
        techStack: ["Flutter", "TensorFlow Lite", "Firebase", "Python", "FastAPI"],
        metrics: "92% prediction accuracy for calorie needs; 40% increase in user retention.",
        architecture: "Mobile frontend -> API Gateway -> ML Inference Service -> NoSQL Database.",
        links: {
            github: "https://github.com/3bsalam-1/FitSync",
            demo: "#"
        }
    },
    {
        id: "mountain-car",
        title: "MountainCar RL Agent",
        category: "rl",
        icon: FaMountain,
        brief: "Deep Q-Network (DQN) implementation solving the classic MountainCar control problem.",
        problem: "The sparse reward signal in the MountainCar environment makes it difficult for standard agents to learn an effective policy.",
        solution: "Implemented a DQN with Experience Replay and Target Networks to stabilize training and improve convergence speed.",
        techStack: ["Python", "PyTorch", "OpenAI Gym", "NumPy"],
        metrics: "Solved environment in <100 episodes; Avg reward -110 (vs baseline -200).",
        architecture: "Agent -> Environment -> Replay Buffer -> Neural Network Policy.",
        links: {
            github: "https://github.com/3bsalam-1/MountainCar",
            demo: "#"
        }
    },
    {
        id: "soundify",
        title: "Soundify",
        category: "nlp",
        icon: FaMicrophone,
        brief: "Accessibility tool converting Arabic text images into natural-sounding speech.",
        problem: "Limited accessibility tools exist for visually impaired Arabic speakers to digitize and listen to physical documents.",
        solution: "Developed a desktop app combining Tesseract OCR (customized for Arabic) with a TTS engine to read aloud text from images.",
        techStack: ["Python", "Tesseract OCR", "gTTS", "Tkinter", "OpenCV"],
        metrics: "95% OCR accuracy on printed Arabic text; <2s processing time per page.",
        architecture: "Image Preprocessing -> OCR Engine -> Text Normalization -> TTS Synthesis.",
        links: {
            github: "https://github.com/3bsalam-1/Soundify_Arabic-OCR-Text-to-Speech",
            demo: "#"
        }
    },
    {
        id: "regression-models",
        title: "Housing Price Predictor",
        category: "ml",
        icon: FaChartLine,
        brief: "Ensemble regression system comparing ML vs DL approaches for price estimation.",
        problem: "Real estate pricing is highly volatile and dependent on non-linear factors often missed by simple linear models.",
        solution: "Developed and benchmarked multiple models (XGBoost, Random Forest, ANN) to identify the most robust predictor.",
        techStack: ["Scikit-learn", "Keras", "Pandas", "Matplotlib"],
        metrics: "Reduced RMSE by 15% using ensemble methods compared to baseline Linear Regression.",
        architecture: "Data Cleaning -> Feature Engineering -> Model Training -> Evaluation Pipeline.",
        links: {
            github: "https://github.com/3bsalam-1/Regression-Models",
            demo: "#"
        }
    },
    {
        id: "car-info-api",
        title: "Car Valuation API",
        category: "api",
        icon: FaCar,
        brief: "Production-ready REST API for real-time used car valuation.",
        problem: "Marketplaces lack instant, data-driven pricing tools for used cars.",
        solution: "Designed a high-performance REST API serving a Gradient Boosting model to predict car prices based on specs and condition.",
        techStack: ["FastAPI", "CatBoost", "Docker", "PostgreSQL"],
        metrics: "<50ms API latency; Handles 100+ concurrent requests.",
        architecture: "Client -> Nginx -> FastAPI -> Model Inference.",
        links: {
            github: "https://github.com/3bsalam-1/Car-Info",
            demo: "#"
        }
    },
    {
        id: "mood-detection",
        title: "Real-time Mood Detector",
        category: "cv",
        icon: FaSmile,
        brief: "CNN-based facial expression recognition system.",
        problem: "Need for real-time emotional feedback analysis for customer service applications.",
        solution: "Trained a lightweight CNN on the FER-2013 dataset optimized for real-time inference on CPU.",
        techStack: ["TensorFlow", "OpenCV", "Keras", "Python"],
        metrics: "88% test accuracy; Runs at 30 FPS on standard webcam.",
        architecture: "Video Stream -> Face Detection (Haar) -> CNN Classifier -> Overlay UI.",
        links: {
            github: "https://github.com/3bsalam-1/Mood-Detection",
            demo: "#"
        }
    },
    {
        id: "age-detector",
        title: "Age EstimationNet",
        category: "cv",
        icon: FaUserClock,
        brief: "Deep learning model for age regression from facial images.",
        problem: "Automated demographic analysis in retail requires non-intrusive age estimation.",
        solution: "Utilized Transfer Learning with ResNet50 framework to predict age groups from facial features.",
        techStack: ["PyTorch", "ResNet", "Pandas", "Scikit-image"],
        metrics: "MAE (Mean Absolute Error) of 3.5 years on validation set.",
        architecture: "Input Image -> Preprocessing -> ResNet50 Backbone -> Fully Connected Layers.",
        links: {
            github: "https://github.com/3bsalam-1/Age-Detector",
            demo: "#"
        }
    },
    {
        id: "calories-detector",
        title: "NutriVision API",
        category: "api",
        icon: FaUtensils,
        brief: "Food recognition and calorie estimation API.",
        problem: "Manual food tracking is tedious and prone to user estimation errors.",
        solution: "Built a computer vision pipeline that segments food items and estimates volume to calculate calories.",
        techStack: ["Flask", "TensorFlow", "OpenCV", "NutritionIX API"],
        metrics: "Recognizes 100+ food categories; 85% calorie estimation correlation.",
        architecture: "Image Upload -> Object Detection -> Volume Estimation -> Database Lookup.",
        links: {
            github: "https://github.com/3bsalam-1/Calories-Image-Detector",
            demo: "#"
        }
    },
    {
        id: "cbir",
        title: "Image Search Engine",
        category: "cv",
        icon: FaSearch,
        brief: "Content-Based Image Retrieval system using feature extraction.",
        problem: "Text-based image search fails when metadata is missing or inaccurate.",
        solution: "Implemented a CBIR system using Color Histograms and Gabor Filters to find visually similar images.",
        techStack: ["Python", "OpenCV", "Scipy", "NumPy"],
        metrics: "Top-5 retrieval precision of 90% on Corel dataset.",
        architecture: "Query Image -> Feature Extraction -> Distance Calculation (Chi-Square) -> Ranking.",
        links: {
            github: "https://github.com/3bsalam-1/CBIR",
            demo: "#"
        }
    }
];

export const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'ml', name: 'Machine Learning' },
    { id: 'cv', name: 'Computer Vision' },
    { id: 'rl', name: 'Reinforcement Learning' },
    { id: 'nlp', name: 'NLP' },
    { id: 'api', name: 'API Services' }
];
