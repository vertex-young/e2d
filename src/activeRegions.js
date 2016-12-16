let pointInPolygon = require('point-in-polygon');
let transformPoints = require('./transformPoints');

module.exports = (ctx) => {
  let regions = ctx.canvas[Symbol.for('regions')],
    mousePoints = ctx.canvas[Symbol.for('mousePoints')],
    mouseData = ctx.canvas[Symbol.for('mouseData')],
    results = [];

  //the mouse might have held still, add the current mouse position
  if (mousePoints.length === 0) {
    mousePoints.push([mouseData.x, mouseData.y, mouseData.state]);
  }

  for(let region of regions) {
    //transform the points given the stored matrix
    let points = transformPoints(region.points, region.matrix);

    //loop over each point until one is matched
    for(let mousePoint of mousePoints) {
      if (pointInPolygon(mousePoint, points)) {
        region.hover = true;
        region.clicked = !!mouseData.clicked;
        results.push(region);
        break;
      }
    }
  }
  return results;
};