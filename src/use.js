let keycode = require('keycode');

module.exports = (ctx) => {
  let { canvas } = ctx;

  //mouseData
  canvas[Symbol.for('mouseData')] = {
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    previousX: 0,
    previousY: 0,
    state: false,
    clicked: 0
  };


  let keys = canvas[Symbol.for('keyData')] = {};

  for (let name in keycode.code) {
    if (keycode.code.hasOwnProperty(name)) {
      keys[name] = false;
    }
  }

  //mouse regions
  canvas[Symbol.for('regions')] = [];
  canvas[Symbol.for('mousePoints')] = [];

  //make the canvas receive touch and mouse events
  canvas.tabIndex = 1;

  let mouseMove = (evt) => {
    let { clientX, clientY } = evt;
    //get left and top coordinates
    let { left, top } = canvas.getBoundingClientRect();

    let point = [clientX - left, clientY - top];

    let mouseData = canvas[Symbol.for('mouseData')];
    mouseData.x = point[0];
    mouseData.y = point[1];

    //store the mouse position for hover detection
    canvas[Symbol.for('mousePoints')].push(point);
    evt.preventDefault();
    return false;
  };

  canvas.addEventListener('mousemove', (evt) => mouseMove(evt));
  canvas.addEventListener('mousedown', (evt) => {
    let { target } = evt;
    if (target === canvas) {
      let mouseData = canvas[Symbol.for('mouseData')];

      if (!mouseData.state) {
        mouseData.clicked += 1;
      }

      mouseData.state = true;
      return mouseMove(evt);
    }
  });
  canvas.addEventListener('mouseup', (evt) => {
    let mouseData = canvas[Symbol.for('mouseData')];
    mouseData.state = false;
    return mouseMove(evt);
  });
  canvas.addEventListener('keydown', (evt) => {
    canvas[Symbol.for('keyData')][keycode(evt.keyCode)] = true;
    evt.preventDefault();
    return false;
  });
  canvas.addEventListener('keyup', (evt) => {
    canvas[Symbol.for('keyData')][keycode(evt.keyCode)] = false;
    evt.preventDefault();
    return false;
  });
};