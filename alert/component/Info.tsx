import React, { useEffect, useState } from "react";
import cn from "classnames";
import socket from "../socket";

import styles from "./Info.module.css";

// Types
import { UserType } from "../../types/User";

const InfoComponent: React.FC = () => {
    const [timer, updateTimer] = useState(null);
    const [user, updateUser] = useState<UserType | null>(null);
    const [isActive, updateIsActive] = useState<boolean>(false);

    const showInfo = () => {
        updateIsActive(true);
    };

    const hideInfo = () => {
        updateIsActive(false);
    };

    useEffect(() => {
        socket.on("info", (info, length) => {
            if (timer !== null) {
                clearTimeout(timer);
            }

            updateUser(info);
            setTimeout(() => {
                showInfo();
            }, 1);

            updateTimer(
                setTimeout(() => {
                    hideInfo();

                    setTimeout(() => {
                        updateUser(null);
                        updateTimer(null);
                    }, 500);
                }, length * 1000 - 500)
            );
        });
    }, []);

    return (
        <>
            {user ? (
                <div
                    className={cn(styles.info, {
                        [styles["is-active"]]: isActive,
                    })}
                >
                    <div className={styles.info__wrap}>
                        <h2 className={styles.info__head}>
                            Please check the Streamer!
                        </h2>
                        <div className={styles.info__inner}>
                            <figure className={styles.info__figure}>
                                <img
                                    src={user.profilePictureUrl}
                                    alt={user.displayName}
                                    className={styles.info__image}
                                />
                            </figure>
                            <p className={styles.info__name}>
                                {user.displayName}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default InfoComponent;
