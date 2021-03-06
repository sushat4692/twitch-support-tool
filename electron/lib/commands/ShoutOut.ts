import { HelixUser } from "twitch/lib";

// Library
import { getInstance as getTwichAPIInstance } from "../TwitchAPI";

// Store
import { getInstance as getStoreInstance } from "../../store";

// Socket
import { useServer } from "../../server";

export const shoutOut = async (
    _,
    username: string,
    showWindow: "info" | "clip" | null = null
) => {
    if (!username) {
        return `* You need to add username: e.g. !so {username}`;
    }

    const TwitchAPI = getTwichAPIInstance();
    const store = getStoreInstance();

    const replaceVariableMessage = (
        message: string,
        hasUser = true,
        hasChannel = true
    ) => {
        return message
            .replaceAll("%url%", `https://www.twitch.tv/${username}`)
            .replaceAll("%username%", hasUser && User ? User.displayName : "")
            .replaceAll("%user_id%", username)
            .replaceAll(
                "%category%",
                hasChannel && shoutOutChannel ? shoutOutChannel.gameName : ""
            );
    };

    const User = await TwitchAPI.getUserByName(username);
    if (!User) {
        return replaceVariableMessage(
            store.get("shoutout_not_found"),
            false,
            false
        );
    }

    const shoutOutChannel = await TwitchAPI.getChannelInfo(User);
    if (!shoutOutChannel) {
        return replaceVariableMessage(
            store.get("shoutout_failed"),
            true,
            false
        );
    }

    shoutOutAlert(User, showWindow);
    return replaceVariableMessage(store.get("shoutout_message"));
};

export const shoutOutAlert = async (
    User: HelixUser,
    showWindow: "info" | "clip" | null
) => {
    const TwitchAPI = getTwichAPIInstance();
    const store = getStoreInstance();
    const server = useServer();

    switch (showWindow) {
        case "info": {
            const length = store.get("shoutout_info_length");
            server.sendSocketEmit(
                "info",
                {
                    id: User.id,
                    name: User.name,
                    displayName: User.displayName,
                    description: User.description,
                    type: User.type,
                    broadcasterType: User.broadcasterType,
                    profilePictureUrl: User.profilePictureUrl,
                    offlinePlaceholderUrl: User.offlinePlaceholderUrl,
                    views: User.views,
                    creationDate: User.creationDate,
                },
                length
            );
            break;
        }
        case "clip": {
            const Clips = await TwitchAPI.getClipsByUser(User);
            if (Clips && Clips.data.length > 0) {
                const Clip = Clips.data[0];
                const Game = await Clip.getGame();

                server.sendSocketEmit("clip", {
                    id: Clip.id,
                    url: Clip.url,
                    embedUrl: Clip.embedUrl,
                    broadcasterId: Clip.broadcasterId,
                    broadcasterDisplayName: Clip.broadcasterDisplayName,
                    creatorId: Clip.creatorId,
                    creatorDisplayName: Clip.creatorDisplayName,
                    videoId: Clip.videoId,
                    gameId: Clip.gameId,
                    gameName: Game?.name || "",
                    gameBoxArtUrl: Game?.boxArtUrl || "",
                    language: Clip.language,
                    title: Clip.title,
                    views: Clip.views,
                    creationDate: Clip.creationDate,
                    thumbnailUrl: Clip.thumbnailUrl,
                });
            }

            break;
        }
    }
};

export const shoutOutClipStop = () => {
    const server = useServer();
    server.sendSocketEmit("clip:stop");
};
