import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./main.css";
import ModelViewerComponent from "./ModelViewerComponent";
import Hotspot from "./Hotspot";

const models = [
    {
        id: "JRMY",
        url: "models/JRMY.glb",
        poster: "models/JRMY.png",
        iosUrl: "models/JRMY.usdz",
        icon: "models/JRMYIcon.png",
        details:
            "With a fully retractable arm and comforting arm rests, JRMY is a great choice for someone short on space but not on style.",
        hotspots: [
            {
                identifier: "hotspot1",
                position: "0.2 0.6 0.5",
                normal: "0 1 0",
                content: "Restractable Arm!",
            },
        ],
    },
    {
        id: "Avona",
        url: "models/Avona.glb",
        poster: "models/Avona.png",
        iosUrl: "models/Avona.usdz",
        icon: "models/AvonaIcon.png",
        details:
            "Avona's lushous deep blue brightens any room creating an aura of luxury.",
        hotspots: [],
    },

    {
        id: "Oba",
        url: "models/Oba.glb",
        poster: "models/Oba.png",
        iosUrl: "models/Oba.usdz",
        icon: "models/ObaIcon.png",
        details:
            "Oba's unique design brings the feel of the 40s/60s with it's bright bold yellow but is beautifully built to capture the style of the modern era, perfect for any artsy people who are looking for a bold piece.",
        hotspots: [
            {
                identifier: "hotspot1",
                position: "0.2 0.6 0.5",
                normal: "0 1 0",
                content: "50% off in stores!",
            },
            {
                identifier: "hotspot2",
                position: "0.5 1.3 0.5",
                normal: "0 1 0",
                content: "YELLOW!!",
            },
        ],
    },
    {
        id: "Onsilla",
        url: "models/Onsilla.glb",
        poster: "models/Onsilla.png",
        iosUrl: "models/Onsilla.usdz",
        icon: "models/OnsillaIcon.png",
        details:
            "This chair is ugly and looks uncomfortable but it was our intern's first project so we put it here anyway!",
        hotspots: [],
    },
];

function App() {
    const [currentModel, setCurrentModel] = useState(models[0]);
    const [isMaximized, setIsMaximized] = useState(false);
    const [maximizedModel, setMaximizedModel] = useState(null);

    const maximizeModel = (model) => {
        setIsMaximized(true);
        setMaximizedModel(model);
    };

    const closeModal = () => {
        setIsMaximized(false);
        setMaximizedModel(null);
    };

    return (
        <div>
            <header>
                {/* Placeholder for your banner and basic info */}
                <img src="/chair_case.png" alt="Banner" className="banner" />
                <h1>Product Showcase</h1>
            </header>
            <main style={{ display: "flex" }}>
                <div style={{ flex: 7 }}>
                    <div className="model">
                        <ModelViewerComponent
                            modelUrl={currentModel.url}
                            posterUrl={currentModel.poster}
                            iosUrl={currentModel.iosUrl}
                        >
                            {/* Dynamically create Hotspot components for the current model */}
                            {currentModel.hotspots.map((hotspot, index) => (
                                <Hotspot
                                    key={index}
                                    identifier={hotspot.identifier}
                                    position={hotspot.position}
                                    normal={hotspot.normal}
                                    content={hotspot.content}
                                />
                            ))}
                        </ModelViewerComponent>
                        <button onClick={() => maximizeModel(currentModel)}>
                            Maximize
                        </button>
                    </div>
                    <div className="model-buttons">
                        {models.map((model) => (
                            <button
                                key={model.id}
                                onClick={() => setCurrentModel(model)}
                            >
                                <img
                                    src={model.icon}
                                    alt={model.id}
                                    onClick={() => setCurrentModel(model)}
                                />
                            </button>
                        ))}
                    </div>
                </div>
                <aside style={{ flex: 3 }}>
                    {/* Placeholder for text and headers about the current model */}
                    <h2>{currentModel.id}</h2>
                    <p>{currentModel.details}</p>
                </aside>
            </main>
            {isMaximized && (
                <div className="overlay">
                    <ModelViewerComponent
                        modelUrl={currentModel.url}
                        posterUrl={currentModel.poster}
                        iosUrl={currentModel.iosUrl}
                        style={{ width: "100%", height: "100%" }} // Adjust size as needed
                    />
                    <button className="close-button" onClick={closeModal}>
                        X
                    </button>
                </div>
            )}
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
