import { Configuration } from 'webpack';

const env: Record<string, string> = require('react-scripts/config/env')().raw;

type ITitleFactory = (env: Record<string, string>) => string;

function generateTitle(titleOrTitleFactory: ITitleFactory | string) {
  if (typeof titleOrTitleFactory === 'string') {
    return titleOrTitleFactory;
  }

  return titleOrTitleFactory(env);
}

function addDocumentTitle(
  titleFactory: ITitleFactory
): (config: Configuration) => Configuration;

function addDocumentTitle(
  title: string
): (config: Configuration) => Configuration;

function addDocumentTitle(titleOrTitleFactory: ITitleFactory | string) {
  return (config: Configuration): Configuration => {
    const htmlWebpackPlugin = config.plugins?.find(
      (plugin) => plugin.constructor.name === 'HtmlWebpackPlugin'
    );

    if (htmlWebpackPlugin) {
      Object.assign((htmlWebpackPlugin as any).options, {
        title: generateTitle(titleOrTitleFactory)
      });
    }

    return config;
  };
}

export default addDocumentTitle;
