import { get, post, patch, remove } from "./Client";

export const getApps = async token => get(process.env.APP_API_URL, token, "apps");

export const getApp = async (token, appId) => get(process.env.APP_API_URL, token, `apps/${appId}`);

export const deleteApp = async (token, appId) =>
  remove(process.env.APP_API_URL, `apps/${appId}`, token);

export const deleteButton = async (token, appId, buttonId) =>
  remove(process.env.APP_API_URL, `apps/${appId}/home-buttons/${buttonId}`, token);

export const deleteTab = async (token, appId, tabId) =>
  remove(process.env.APP_API_URL, `apps/${appId}/partner-tabs/${tabId}`, token);

export const getSplashScreen = async (token, appId) =>
  get(process.env.APP_API_URL, token, `apps/${appId}/splash-screen`);

export const getPartnerScreen = async (token, appId) =>
  get(process.env.APP_API_URL, token, `apps/${appId}/partner-screen`);

export const getContactsScreen = async (token, appId) =>
  get(process.env.APP_API_URL, token, `apps/${appId}/contacts-screen`);

export const getAboutScreen = async (token, appId) =>
  get(process.env.APP_API_URL, token, `apps/${appId}/about-screen`);

export const postApp = async (token, body) => post(process.env.APP_API_URL, body, "apps", token);

export const postPartnerTab = async (app, token, body) =>
  post(process.env.APP_API_URL, body, `apps/${app}/partner-tabs`, token);

export const postMessage = async (token, appId, body) =>
  post(process.env.APP_API_URL, body, `apps/${appId}/messages`, token);

export const getMessages = async (token, appId) =>
  get(process.env.APP_API_URL, token, `apps/${appId}/messages`);

export const getMessage = async (token, appId, messageId) =>
  get(process.env.APP_API_URL, token, `apps/${appId}/messages/${messageId}`);

export const deleteMessage = async (token, appId, messageId) =>
  remove(process.env.APP_API_URL, `apps/${appId}/messages/${messageId}`, token);

export const getNotificationFeeds = async (token, appId) =>
  get(process.env.APP_API_URL, token, `apps/${appId}/notification-feeds`);

export const postNotificationFeeds = async (token, appId, body) =>
  post(process.env.APP_API_URL, body, `apps/${appId}/notification-feeds`, token);

export const getNotificationFeed = async (token, appId, feedId) =>
  get(process.env.APP_API_URL, token, `apps/${appId}/notification-feeds/${feedId}`);

export const patchNotificationFeed = async (token, appId, feedId, data) =>
  patch(process.env.APP_API_URL, data, `apps/${appId}/notification-feeds/${feedId}`, token);

export const deleteNotificationFeed = async (token, appId, feedId) =>
  remove(process.env.APP_API_URL, `apps/${appId}/notification-feeds/${feedId}`, token);

export const postImage = async (token, appId, body) =>
  post(process.env.APP_API_URL, body, `apps/${appId}/images`, token);

export const deleteImage = async (token, appId, imageId) =>
  remove(process.env.APP_API_URL, `apps/${appId}/images/${imageId}`, token);

export const getImages = async (token, appId) =>
  get(process.env.APP_API_URL, token, `apps/${appId}/images`);

export const getHomeScreen = async (token, appId) =>
  get(process.env.APP_API_URL, token, `apps/${appId}/home-screen`);

export const postHomeButton = async (token, appId, body) =>
  post(process.env.APP_API_URL, body, `apps/${appId}/home-buttons`, token);

export const patchHomeButton = async (token, appId, body, buttonId) =>
  patch(process.env.APP_API_URL, body, `apps/${appId}/home-buttons/${buttonId}`, token);

export const patchApp = async (token, appId, body) =>
  patch(process.env.APP_API_URL, body, `apps/${appId}`, token);

export const patchTeeTimes = async (token, appId, body) =>
  patch(process.env.APP_API_URL, body, `apps/${appId}/tee-time-setting`, token);

export const patchTabIcon = async (token, appId, body) =>
patch(process.env.APP_API_URL, body, `apps/${appId}/tab-icon`, token);

export const patchGroupAppearance = async (token, appId, body) =>
patch(process.env.APP_API_URL, body, `apps/${appId}/group-appearance`, token);

export const patchClientGroupAppearance = async (token, appId, body) =>
patch(process.env.APP_API_URL, body, `apps/${appId}/client-group-appearance`, token);

export const patchWeatherSetting = async (token, appId, body) =>
  patch(process.env.APP_API_URL, body, `apps/${appId}/weather-api-setting`, token);

export const patchPopupSetting = async (token, appId, body) =>
  patch(process.env.APP_API_URL, body, `apps/${appId}/popup-setting`, token);

export const patchSettingsScreen = async (token, appId, body) =>
patch(process.env.APP_API_URL, body, `apps/${appId}/settings-screens`, token);

export const patchSplashScreen = async (token, appId, body) =>
  patch(process.env.APP_API_URL, body, `apps/${appId}/splash-screen`, token);

export const patchSplashScreenBackground = async (token, appId, body) =>
  patch(process.env.APP_API_URL, body, `apps/${appId}/splash-screen/background`, token);

export const patchContactsScreenBackground = async (token, appId, body) =>
  patch(process.env.APP_API_URL, body, `apps/${appId}/contacts-screen/background`, token);

export const patchContactsScreenMore = async (token, appId, body) =>
patch(process.env.APP_API_URL, body, `apps/${appId}/contacts-screen/more`, token);

export const patchAboutScreenBackground = async (token, appId, body) =>
  patch(process.env.APP_API_URL, body, `apps/${appId}/about-screen/background`, token);

export const patchPartnerScreenBackground = async (token, appId, body) =>
  patch(process.env.APP_API_URL, body, `apps/${appId}/partner-screen/background`, token);

export const patchPartnerScreenMore = async (token, appId, body) =>
patch(process.env.APP_API_URL, body, `apps/${appId}/partner-screen/more`, token);

export const patchHomeScreenBackground = async (token, appId, body) =>
  patch(process.env.APP_API_URL, body, `apps/${appId}/home-screen/background`, token);

export const patchHomeScreenHeader = async (token, appId, body) =>
  patch(process.env.APP_API_URL, body, `apps/${appId}/home-screen/header`, token);

export const patchHomeScreenIcon = async (token, appId, body) =>
  patch(process.env.APP_API_URL, body, `apps/${appId}/home-screen/icon`, token);

export const patchAboutContent = async (token, appId, contentId, body) =>
  patch(process.env.APP_API_URL, body, `apps/${appId}/about-contents/${contentId}`, token);

export const patchContactContent = async (token, appId, contentId, body) =>
  patch(process.env.APP_API_URL, body, `apps/${appId}/contact-contents/${contentId}`, token);

export const patchPartnerTab = async (token, appId, body) =>
  patch(process.env.APP_API_URL, body, `apps/${appId}/partner-tabs`, token);

export const postPartnerIcon = async (token, appId, tabId, body) =>
  post(process.env.APP_API_URL, body, `apps/${appId}/partner-tabs/${tabId}/partner-icons`, token);

export const patchPartnerIcon = async (token, appId, tabId, body) =>
  patch(process.env.APP_API_URL, body, `apps/${appId}/partner-tabs/${tabId}/partner-icons`, token);

export const patchButtonTitle = async (token, appId, titleId, body) =>
  patch(process.env.APP_API_URL, body, `apps/${appId}/button-titles/${titleId}`, token);

export const getConnections = async (token, appId) =>
  get(process.env.APP_API_URL, token, `apps/${appId}/connections`);

export const postConnection = async (token, appId, body) =>
  post(process.env.APP_API_URL, body, `apps/${appId}/connections`, token);

export const deleteConnection = async (token, appId, connectionId) =>
  remove(process.env.APP_API_URL, `apps/${appId}/connections/${connectionId}`, token);

export const getInstantMessages = async (token, tokenId) =>
  get(process.env.APP_API_URL, token, `apps/instant_messages/${tokenId}`, tokenId);

export const postAdcontent = async (token, appId, body) =>
  post(process.env.APP_API_URL, body, `apps/${appId}/adcontents`, token);

export const getAdcontents = async (token, appId) =>
  get(process.env.APP_API_URL, token, `apps/${appId}/adcontents`);

export const getAdcontent = async (token, appId, adcontentId) =>
  get(process.env.APP_API_URL, token, `apps/${appId}/adcontents/${adcontentId}`);

export const patchAdcontent = async (token, appId, adcontentId, body) =>
  patch(process.env.APP_API_URL, body, `apps/${appId}/adcontents/${adcontentId}`, token);

export const deleteAdcontent = async (token, appId, adcontentId) =>
  remove(process.env.APP_API_URL, `apps/${appId}/adcontents/${adcontentId}`, token);

export const postFeedCount = async (token, appId, body) =>
  post(process.env.APP_API_URL, body, `apps/${appId}/feed-count`, token);