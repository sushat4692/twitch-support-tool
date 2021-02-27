import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

// Util
import { useSettingState } from "../util/setting";

const DashboardPage: React.FC = () => {
    const setting = useSettingState();

    return (
        <section className="my-4">
            <h2 className="display-4 mb-4 py-4 text-center fw-bolder">
                <i className="bi bi-twitch me-2"></i>
                <FormattedMessage
                    id="Common.Title"
                    defaultMessage="Twitch Support Tool"
                />
            </h2>

            <div
                className="d-grid gap-3"
                style={{
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(280px, 1fr))",
                }}
            >
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            <i className="bi bi-chat me-2"></i>
                            <FormattedMessage
                                id="Common.Chatters.Name"
                                defaultMessage="Chatters"
                            />
                        </h5>
                        <p className="card-text">
                            <FormattedMessage
                                id="Common.Chatters.Description"
                                defaultMessage="Display user list that comment to target channel."
                            />
                        </p>
                        <Link
                            to="/chatters"
                            className={
                                setting.isEnableBot
                                    ? "btn btn-primary stretched-link"
                                    : "btn btn-primary disabled"
                            }
                        >
                            <FormattedMessage
                                id="View.Dashboard.CheckButton"
                                defaultMessage="Check"
                            />
                        </Link>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            <i className="bi bi-tornado me-2"></i>
                            <FormattedMessage
                                id="Common.Raiders.Name"
                                defaultMessage="Raiders"
                            />
                        </h5>
                        <p className="card-text">
                            <FormattedMessage
                                id="Common.Raiders.Description"
                                defaultMessage="Display user list that raided to target channel."
                            />
                        </p>
                        <Link
                            to="/raiders"
                            className={
                                setting.isEnableBot
                                    ? "btn btn-primary stretched-link"
                                    : "btn btn-primary disabled"
                            }
                        >
                            <FormattedMessage
                                id="View.Dashboard.CheckButton"
                                defaultMessage="Check"
                            />
                        </Link>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            <i className="bi bi-display me-2"></i>
                            <FormattedMessage
                                id="Common.Hosts.Name"
                                defaultMessage="Hosts"
                            />
                        </h5>
                        <p className="card-text">
                            <FormattedMessage
                                id="Common.Hosts.Description"
                                defaultMessage="Display user list that hosted to target channel."
                            />
                        </p>
                        <Link
                            to="/hosts"
                            className={
                                setting.isEnableBot
                                    ? "btn btn-primary stretched-link"
                                    : "btn btn-primary disabled"
                            }
                        >
                            <FormattedMessage
                                id="View.Dashboard.CheckButton"
                                defaultMessage="Check"
                            />
                        </Link>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            <i className="bi bi-camera-reels me-2"></i>
                            <FormattedMessage
                                id="Common.Channel.Name"
                                defaultMessage="Channel"
                            />
                        </h5>
                        <p className="card-text">
                            <FormattedMessage
                                id="Common.Channel.Description"
                                defaultMessage="You can check/update Channel information."
                            />
                        </p>
                        <Link
                            to="/channel"
                            className={
                                setting.isEnableChannel
                                    ? "btn btn-primary stretched-link"
                                    : "btn btn-primary disabled"
                            }
                        >
                            <FormattedMessage
                                id="View.Dashboard.CheckButton"
                                defaultMessage="Check"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardPage;