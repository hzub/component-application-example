export const ConfigsRegistry = {
  config: null,
  load(content) {
    ConfigsRegistry.config = content;
  }
}

export class ConfigService {

  get(field) {
    if (!ConfigsRegistry.config) throw new Error('There is no config file loaded!');

    let config = _.get(ConfigsRegistry.config, field);
    if (!config) throw new Error(`There is no config key ${field}!`);
    return config
  }
}
