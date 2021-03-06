import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Recoil
import SettingUsernameState from "../atom/SettingUsername";
import SettingChannelState from "../atom/SettingChannel";
import ShoutOutMessageState from "../atom/SettingShoutOutMessage";
import ShoutOutNotFoundState from "../atom/SettingShoutOutNotFound";
import ShoutOutFailedState from "../atom/SettingShoutOutFailed";
import ShoutoutAlertInfoLength from "../atom/ShoutoutAlertInfoLength";
import SoundChatterVolumeState from "../atom/SoundChatterVolume";
import SoundChatVolumeState from "../atom/SoundChatVolume";
import SoundRaidVolumeState from "../atom/SoundRaidVolume";
import SoundHostVolumeState from "../atom/SoundHostVolume";
import IsConnectingState from "../atom/IsConnecting";

// Component
import HeaderComponent from "../component/Header";
import NeedSettingPage from "../page/NeedSetting";
import DashboardPage from "../page/Dashboard";
import ChattersPage from "../page/Chatters";
import RaidersPage from "../page/Raiders";
import HostsPage from "../page/Hosts";
import ChannelPage from "../page/Channel";
import UserMemoPage from "../page/UserMemo";
import CommandPage from "../page/Command";
import SettingPage from "../page/Setting";
import LicensePage from "../page/License";

// Utils
import { request } from "../util/request";
import { useSettingState } from "../util/setting";

const Layout: React.FC = () => {
    const setting = useSettingState();

    const updateSettingUsername = useSetRecoilState(SettingUsernameState);
    const updateSettingChannel = useSetRecoilState(SettingChannelState);
    const updateShoutOutMessage = useSetRecoilState(ShoutOutMessageState);
    const updateShoutOutNotFound = useSetRecoilState(ShoutOutNotFoundState);
    const updateShoutOutFailed = useSetRecoilState(ShoutOutFailedState);
    const updateShoutOutInfoLength = useSetRecoilState(ShoutoutAlertInfoLength);
    const updateSoundChatterVolume = useSetRecoilState(SoundChatterVolumeState);
    const updateSoundChatVolume = useSetRecoilState(SoundChatVolumeState);
    const updateSoundRaidVolume = useSetRecoilState(SoundRaidVolumeState);
    const updateSoundHostVolume = useSetRecoilState(SoundHostVolumeState);
    const updateIsConnecting = useSetRecoilState(IsConnectingState);

    useEffect(() => {
        (async () => {
            updateIsConnecting(true);

            const defaultValue = await request("setting:get", null, {
                username: "channel",
                channel: "channel",
                shoutout_message: "",
                shoutout_not_found: "",
                shoutout_failed: "",
                shoutout_info_length: 8,
                chatter_volume: 1,
                chat_volume: 1,
                raid_volume: 1,
                host_volume: 1,
            });

            updateSettingUsername(defaultValue.username);
            updateSettingChannel(defaultValue.channel);
            updateShoutOutMessage(defaultValue.shoutout_message);
            updateShoutOutNotFound(defaultValue.shoutout_not_found);
            updateShoutOutFailed(defaultValue.shoutout_failed);
            updateShoutOutInfoLength(defaultValue.shoutout_info_length);
            updateSoundChatterVolume(defaultValue.chatter_volume);
            updateSoundChatVolume(defaultValue.chat_volume);
            updateSoundRaidVolume(defaultValue.raid_volume);
            updateSoundHostVolume(defaultValue.host_volume);

            updateIsConnecting(false);
        })();
    }, []);

    return (
        <Router>
            <HeaderComponent />

            <div className="has-header">
                <main>
                    {setting.isEnableBot ? (
                        <Switch>
                            <Route
                                path="/chatters"
                                component={ChattersPage}
                            ></Route>
                            <Route
                                path="/raiders"
                                component={RaidersPage}
                            ></Route>
                            <Route path="/hosts" component={HostsPage}></Route>
                            <Route
                                path="/channel"
                                component={ChannelPage}
                            ></Route>
                            <Route
                                path="/user_memo"
                                component={UserMemoPage}
                            ></Route>
                            <Route
                                path="/settings"
                                component={SettingPage}
                            ></Route>
                            <Route
                                path="/commands"
                                component={CommandPage}
                            ></Route>
                            <Route
                                path="/license"
                                component={LicensePage}
                            ></Route>
                            <Route path="/" component={DashboardPage}></Route>
                        </Switch>
                    ) : (
                        <Switch>
                            <Route
                                path="/settings"
                                component={SettingPage}
                            ></Route>
                            <Route
                                path="/license"
                                component={LicensePage}
                            ></Route>
                            <Route path="/" component={NeedSettingPage}></Route>
                        </Switch>
                    )}
                </main>
            </div>
        </Router>
    );
};

export default Layout;
