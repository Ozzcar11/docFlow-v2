import { type Plugin } from "vue";

const layouts: Plugin = {
  install(app) {
    const layouts = require.context("@/layouts", false, /\.vue$/, "sync");


    for (const layout of layouts.keys()) {
      const fileName = layout.replace(/(\.\/|\.vue)/g, "");

      app.component(fileName, layouts(layout).default);
    }
  },
};

export { layouts };
