import React, { useEffect, useState } from "react";

import IsConnectingStore from "../store/IsConnecting";

const LoadingComponent: React.FC = () => {
    const [isConnecting, updateIsConnecting] = useState(false);

    useEffect(() => {
        IsConnectingStore.subscribe(() => {
            updateIsConnecting(IsConnectingStore.getState());
        });
    });

    return isConnecting ? (
        <div
            className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ background: "rgba(255, 255, 255, 0.8)" }}
        >
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    ) : (
        <></>
    );
};

export default LoadingComponent;
