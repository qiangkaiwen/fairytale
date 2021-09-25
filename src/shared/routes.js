import {
  LoginView,
  ResetPasswordRequestView,
  ResetPasswordView,
  DashboardView,
  ProfileView,
  UsersView,
  UserUpdateForm,
  RoleUpdateForm,
  AppsView,
  NotificationsView,
  MessagesView,
  AppView,
  MessageView,
  NotificationFeedView,
  ImagesView,
  SocialRedirectPage,
  IABRedirectPage,
  ConnectionsView,
  InstantMessagesView,
  PopupSettingView,
  AdcontentsView,
  AdcontentView,
  FeedCountView
} from "./views";


const routes = [
  {
    path: "/",
    exact: true,
    component: LoginView,
    token: false
  },
  {
    path: "/resetrequest",
    exact: true,
    component: ResetPasswordRequestView,
    token: false
  },
  {
    path: "/reset",
    exact: true,
    component: ResetPasswordView,
    token: false
  },
  {
    path: "/dashboard",
    exact: true,
    component: DashboardView,
    token: true
  },
  {
    path: "/profile",
    exact: true,
    component: ProfileView,
    token: true
  },
  {
    path: "/users",
    exact: true,
    component: UsersView,
    token: true
  },
  {
    path: "/users/:userId",
    exact: true,
    component: UserUpdateForm,
    token: true
  },
  {
    path: "/roles/:roleId",
    exact: true,
    component: RoleUpdateForm,
    token: true
  },
  {
    path: "/apps",
    exact: true,
    component: AppsView,
    token: true
  },
  {
    path: "/apps/:appId",
    exact: true,
    component: AppView,
    token: true
  },
  {
    path: "/apps/:appId/notification-feeds/:feedId",
    exact: true,
    component: NotificationFeedView,
    token: true
  },
  {
    path: "/notifications",
    exact: true,
    component: NotificationsView,
    token: true
  },
  {
    path: "/apps/:appId/adcontents/:adcontentId",
    exact: true,
    component: AdcontentView,
    token: true
  },
  {
    path: "/adcontents",
    exact: true,
    component: AdcontentsView,
    token: true
  },
  {
    path: "/feedcount",
    exact: true,
    component: FeedCountView,
    token: true
  },
  {
    path: "/apps/:appId/messages/:messageId",
    exact: true,
    component: MessageView,
    token: true
  },
  {
    path: "/messages",
    exact: true,
    component: MessagesView,
    token: true
  },
  {
    path: "/images",
    exact: true,
    component: ImagesView,
    token: true
  },
  {
    path: "/connections",
    exact: true,
    component: ConnectionsView,
    token: true
  },
  {
    path: "/popup",
    exact: true,
    component: PopupSettingView,
    token: true
  },
  {
    path: "/social_redirect",
    exact: true,
    component: SocialRedirectPage,
    token: false
  },
  {
    path: "/instant_messages/:tokenId",
    exact: true,
    component: InstantMessagesView,
    token: true
  },
  {
    path: "/iab_redirect",
    exact: true,
    component: IABRedirectPage,
    token: false
  },
];

export default routes;
