import { createStore } from "vuex";

import cards from "./modules/card.js";
import rss from "./modules/rss.js";
import notif from "./modules/notif.js";
import sneak from "./modules/sneak.js";

export default createStore({
  modules: {
    cards,
    rss,
    notif,
    sneak,
  },
  //strict: true,
});
