/** Image segmentation factory.
 *
 *  var segm = segmentation.create(imageData);
 *  var segmentData = segm.result;  // imageData with numSegments.
 *
 *  segm.finer();
 *  segm.coarser();
 *
 * Copyright 2015  Kota Yamaguchi
 */
 import pff from './segmentation/pff.js'
 import slic from './segmentation/slic.js'
 import slico from './segmentation/slico.js'
 import watershed from './segmentation/watershed.js'
 
  var methods = {
   pff: pff,
   slic: slic,
   slico: slico,
   watershed: watershed,
 };
 
   methods.create = function(imageData, options) {
     options = options || {};
     options.method = options.method || "slic";
     if (!methods[options.method]) throw "Invalid method: " + options.method;
     return new methods[options.method](imageData, options);
   };
 
 export default methods
 