/** 
 * echarts 的 geojosn 的 coordinate 是加密的
 * 因此需要解密后才能使用
 * 仅用于解密
 * source: https://github.com/apache/incubator-echarts/blob/dc31c3fda747dbae549bfad34f8f84a9fd7864f7/src/coord/geo/parseGeoJson.js
 */
const gulp = require('gulp')
const through = require('through2');

function removeEncode(json) {
  var features = json.features;
  for (var f = 0; f < features.length; f++) {
    var feature = features[f];

    if (feature.geometry) {
      delete feature.geometry.encodeOffsets;
    }
  }
  return json;
}
function decode(json) {
  if (!json.UTF8Encoding) {
    json = removeEncode(json);
    return json;
  }
  var features = json.features;

  for (var f = 0; f < features.length; f++) {
    var feature = features[f];
    var geometry = feature.geometry;
    var coordinates = geometry.coordinates;
    var encodeOffsets = geometry.encodeOffsets;

    for (var c = 0; c < coordinates.length; c++) {
      var coordinate = coordinates[c];

      if (geometry.type === 'Polygon') {
        coordinates[c] = decodePolygon(
          coordinate,
          encodeOffsets[c]
        );
      }
      else if (geometry.type === 'MultiPolygon') {
        for (var c2 = 0; c2 < coordinate.length; c2++) {
          var polygon = coordinate[c2];
          coordinate[c2] = decodePolygon(
            polygon,
            encodeOffsets[c][c2]
          );
        }
      }
    }
    delete geometry.encodeOffsets;
  }
  // Has been decoded
  json.UTF8Encoding = false;
  return json;
}

function decodePolygon(coordinate, encodeOffsets) {
  var result = [];
  var prevX = encodeOffsets[0];
  var prevY = encodeOffsets[1];

  for (var i = 0; i < coordinate.length; i += 2) {
    var x = coordinate.charCodeAt(i) - 64;
    var y = coordinate.charCodeAt(i + 1) - 64;
    // ZigZag decoding
    x = (x >> 1) ^ (-(x & 1));
    y = (y >> 1) ^ (-(y & 1));
    // Delta deocding
    x += prevX;
    y += prevY;

    prevX = x;
    prevY = y;
    // Dequantize
    result.push([x / 1024, y / 1024]);
  }

  return result;
}

function decodeGeoJson() {
  return  through.obj(function (file, encoding, callback) {
    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isStream()) {
      return callback(createError(file, 'Streaming not supported'));
    }

    if (!file.isBuffer()) {
      return callback(null, file);
    }

    let result = file.contents.toString();
    file.contents = Buffer.from(
      JSON.stringify(decode(JSON.parse(result)))
    )
    callback(null, file);
  });
}

gulp.task('default', function () {
  gulp.src('./*.json')
    .pipe(decodeGeoJson())
    .pipe(gulp.dest('./'))
})
