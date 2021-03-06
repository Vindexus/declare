/**
 * Found at https://github.com/christianalfoni/form-data-to-object
 *
 * @arg {FormData} formData The form data to convert to an object.
 *
 * @returns {Object}
 */
function formDataToObject(formData) {
  var source = {}
  for(var pair of formData.entries()) {
    source[pair[0]] = pair[1]
  }
  return Object.keys(source).reduce(function (output, key) {
    var parentKey = key.match(/[^\[]*/i);
    var paths = key.match(/\[.*?\]/g) || [];
    paths = [parentKey[0]].concat(paths).map(function (key) {
      return key.replace(/\[|\]/g, '');
    });
    var currentPath = output;
    while (paths.length) {
      var pathKey = paths.shift();

      if (pathKey in currentPath) {
        currentPath = currentPath[pathKey];
      } else {
        currentPath[pathKey] = paths.length ? isNaN(paths[0]) ? {} : [] : source[key];
        currentPath = currentPath[pathKey];
      }
    }

    return output;
  }, {});
}

/**
 * Wrapper to convert form element data to object.
 *
 * @arg {Element} form The form to get data from.
 *
 * @returns {Object}
 */
function formToObject (form) {
  return formDataToObject(new FormData(form))
}
