const svgTransformer = require('react-native-svg-transformer/expo');

module.exports.transform = function ({ src, filename, options }) {
  if (filename.endsWith('.svg')) {
    src = src
      .replaceAll(/<svg[^>]*>/g, (match) => match.replaceAll(/ (width|height)="[^"]+"/g, ' '))
      .replace(/<(path|circle|ellipse|rect|line)([^>\/]*)(\/?)>/g, (match, element, attributes, selfClosing) => {
        if (/vector-effect/.test(attributes)) {
          return match;
        }
        const newAttributes = `${attributes} vector-effect="non-scaling-stroke"`;
        return `<${element} ${newAttributes} ${selfClosing}>`;
      });

    const dirname = filename.split('/').at(-2);

    if (dirname !== 'colored') {
      src = src
        .replaceAll(/fill="(?!none)[^"]*"/g, 'fill="currentColor"')
        .replaceAll(/stroke="([^"]+)"/g, 'stroke="currentColor"');
    }
  }

  return svgTransformer.transform({
    src,
    filename,
    options,
  });
};
