import string from 'string';
import _ from 'lodash';

class EventMapper {
  map(events, prepend) {
    if (!prepend) {
      prepend = '';
    } else if (prepend[prepend.length - 1] !== '_') {
      prepend += '_';
    }

    var mapped = {};
    _.forEach(events, function (name) {
      mapped[name] = string(name.toLowerCase()).strip(prepend.toLowerCase()).camelize().s;
    });
    return mapped;
  }
}

export default new EventMapper();
