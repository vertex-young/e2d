const Instruction = require('./Instruction'),
  end = new Instruction('endShadowStyle');

let shadowStyle = (value, ...children) => {
  value = value || {};
  const result = {
    shadowBlur: null,
    shadowColor: null,
    shadowOffsetX: null,
    shadowOffsetY: null
  };

  if (typeof value.shadowBlur !== 'undefined') {
    result.shadowBlur = value.shadowBlur;
  }
  if (typeof value.shadowColor !== 'undefined') {
    result.shadowColor = value.shadowColor;
  }
  if (typeof value.shadowOffsetX !== 'undefined') {
    result.shadowOffsetX = value.shadowOffsetX;
  }
  if (typeof value.direction !== 'undefined') {
    result.shadowOffsetY = value.shadowOffsetY;
  }

  return [
    new Instruction('shadowStyle', result),
    children,
    end
  ];
};

module.exports = shadowStyle;
