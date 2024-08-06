import RSSFeedItem from "../models/RssFeedModel";

type RoutesList = {
    Splash: undefined;
    Login: undefined;
    Register: undefined;
    Home: undefined;
    Profile: undefined;
    Detail: { item: RSSFeedItem }
  };

export default RoutesList;