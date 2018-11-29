/** @module src/chat/MessageSectionsMap */

function map(entry) {
  return { title: entry[0], data: entry[1] };
}

function sort(entry1, entry2) {
  if (entry1[0] > entry2[0]) return -1;
  if (entry1[0] < entry2[0]) return 1;

  return 0;
}

/** Wrapper for JS Map with additional get/set methods specific to chat messages. */
class MessageSectionsMap {
  constructor() {
    this.map = new Map();
  }

  get = (datestamp) => {
    if (!this.map.has(datestamp)) this.map.set(datestamp, []);

    return this.map.get(datestamp);
  };

  toList = () => [...this.map.entries()].sort(sort).map(map);
}

export default MessageSectionsMap;
