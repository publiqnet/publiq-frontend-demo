import { configure, addParameters } from '@storybook/angular';
import { configureViewport } from "@storybook/addon-viewport";

function loadStories() {
  const req = require.context('./stories', true, /\.stories\.ts$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

addParameters(configureViewport);
