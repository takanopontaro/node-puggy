'use strict';

var $pug;
var $pugOptions;
var $isPretty;
var $indentString;


function indent(str, lv) {
  var indent = '';
  for (var i = 0; i < (lv || 0); i++) indent += $indentString;
  return str.replace(/.+\n?/g, function (match) { return indent + match; });
}


exports.init = function (pug, pugOptions) {
  var pretty = pugOptions.pretty;
  $indentString = typeof pretty === 'string' ? pretty : '  ';
  $isPretty = !!pretty;
  $pug = pug;
  $pugOptions = pugOptions;
};


exports.blockElement = function (text, options) {
  if (!$isPretty) return $pug.render(text, $pugOptions);
  Object.keys(options).forEach(function (tag) {
    switch (tag) {
      case 'comment':
        text = text.replace(/<!--.+?-->/g, function (match) { return '_ ' + match; });
        break;
      default:
        text = text.replace(new RegExp('^(\\s*)(' + tag + ')\\b', 'mg'), '$1_$2');
    }
  });
  var str = $pug.render(text, $pugOptions);
  // str = str.replace(/^\n/, '');
  str = str.replace(/<\/?_>/g, '');
  str = str.replace(/(<\/?)_(.+?)\b/g, '$1$2');
  return indent(str, options.lv || 0);
};


exports.commentOutNewline = function (text, options) {
  var str = $pug.render(text, $pugOptions);
  if (!$isPretty) return str;
  str = str.replace(/>(\n\s*)</g, '><!--$1--><');
  return indent(str, options.lv || 0);
};


exports.commentOut = function (text, options) {
  var str = $pug.render(text, $pugOptions);
  if (!$isPretty) return '<!--' + str + '-->';
  if (!/^\n/.test(str)) str = '\n' + str;
  if (!/\n$/.test(str)) str = str + '\n';
  if (options.indent) str = indent(str, 1);
  str = '\n<!--' + str + '-->';
  return indent(str, options.lv || 0);
};


exports.preserve = function (text, options) {
  return indent('\n' + text, options.lv || 0);
};
