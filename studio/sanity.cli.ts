import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'na5c11mv',
    dataset: 'production',
  },
  // Studio desplegado en https://ibncoruna.sanity.studio/
  deployment: {
    appId: 'aavxqc02cbpmqac1vek1hv5l',
  },
});
