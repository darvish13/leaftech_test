/** Compatibility API.
 *
 * Copyright 2015  Kota Yamaguchi
 */

  // Internet Explorer doesn't support ImageData().
 
  var context = document.createElement("canvas").getContext("2d");
  var compat = {}
  compat.createImageData = function(width, height){
    return context.createImageData(width, height)
  }
  export default compat


