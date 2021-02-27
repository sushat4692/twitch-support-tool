import { atom } from "recoil";
import { Document } from "../../types/Document";

interface Badges {
    admin?: string;
    bits?: string;
    broadcaster?: string;
    partner?: string;
    global_mod?: string;
    moderator?: string;
    vip?: string;
    subscriber?: string;
    staff?: string;
    turbo?: string;
    premium?: string;
    founder?: string;
    ["bits-leader"]?: string;
    ["sub-gifter"]?: string;
    [other: string]: string | undefined;
}

interface BadgeInfo {
    subscriber?: string;
    [other: string]: string | undefined;
}

export interface ChatterRowType extends Document {
    "message-type"?: "chat" | "action" | "whisper";
    username?: string;
    bits?: string;
    badges?: Badges;
    "badge-info"?: BadgeInfo;
    color?: string;
    "display-name"?: string;
    emotes?: { [emoteid: string]: string[] };
    id?: string;
    mod?: boolean;
    turbo?: boolean;
    "emotes-raw"?: string;
    "badges-raw"?: string;
    "badge-info-raw"?: string;
    "room-id"?: string;
    subscriber?: boolean;
    "user-type"?: "" | "mod" | "global_mod" | "admin" | "staff";
    "user-id"?: string;
    "tmi-sent-ts"?: string;
    flags?: string;
    [paramater: string]: any;
}

const state = atom<ChatterRowType[]>({
    key: "Chatters",
    default: [],
});

export default state;