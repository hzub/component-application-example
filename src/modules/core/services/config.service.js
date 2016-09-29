class configService {
  load(content) {
    this.config = content;
  }
  get(field) {
    if (!this.config) {
      throw new Error('There is no config file loaded!');
    }
    if (!this.config[field]) {
      throw new Error(`There is no config key ${field}!`);
    }
    return this.config[field];
  }
  $get() {
    return this.get.bind(this);
  }
}

export default configService;
