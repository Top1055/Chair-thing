import React, { useRef, useEffect, Children, cloneElement } from "react";
import "@google/model-viewer";
import Hotspot from "./Hotspot"; // Import the Hotspot component

const ModelViewerComponent = ({ modelUrl, posterUrl, iosUrl, children }) => {
    const modelViewerRef = useRef(null);

    useEffect(() => {
        // Ensure the model-viewer library has defined the custom element
        if (typeof customElements.get("model-viewer") !== "undefined") {
            // Access the model-viewer element
            const modelViewer = modelViewerRef.current;

            // Clear previous hotspots if any
            modelViewer.innerHTML = "";

            // React children can be a single element or an array, so we normalize it
            const hotspotElements = Children.toArray(children);

            // Add each hotspot to the model-viewer element
            hotspotElements.forEach((hotspot) => {
                if (
                    hotspot.props.identifier &&
                    hotspot.props.position &&
                    hotspot.props.normal
                ) {
                    const button = document.createElement("button");
                    button.slot = `hotspot-${hotspot.props.identifier}`;
                    button.setAttribute(
                        "data-position",
                        hotspot.props.position
                    );
                    button.setAttribute("data-normal", hotspot.props.normal);
                    button.className = "hotspot"; // Add your hotspot styling class here
                    button.innerText = hotspot.props.content; // For demonstration, could be more complex

                    modelViewer.appendChild(button);
                }
            });
        }
    }, [children]);

    return (
        <model-viewer
            ref={modelViewerRef}
            src={modelUrl}
            ios-src={iosUrl}
            poster={posterUrl}
            alt="A 3D model of your product"
            shadow-intensity="1"
            camera-controls
            auto-rotate
            ar
            style={{ width: "100%", height: "400px" }}
        ></model-viewer>
    );
};

export default ModelViewerComponent;
