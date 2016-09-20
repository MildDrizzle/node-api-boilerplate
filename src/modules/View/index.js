import nunjucks from 'nunjucks';

class View {
  constructor(options = {}) {
    this.path = options.path || 'src/app/resources/views';
    nunjucks.configure(this.path, { autoescape: true });
  }

  render(str, context) {
    const type = this.type(str);

    if (type === 'raw') {
      return nunjucks.renderString(str, context);
    } else if (type === 'file') {
      return nunjucks.render(str, context);
    }

    throw new Error('Invalid string type.');
  }

  static type(str) {
    const parts = str.split(' ');

    if (parts.length > 1) {
      return 'raw';
    } else if (parts.length === 1) {
      return 'file';
    }

    throw new Error('Impossible to get the string type.');
  }
}

export const view = (str, context = {}) => {
  const V = new View();
  return V.render(str, context);
};

export default View;
