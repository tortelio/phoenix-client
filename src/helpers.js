var generateUUID = function() {
  let repl = function(c) {
    let v = r&0x3|0x8;
    if(c == "x") {v = Math.random() * 16 | 0}

    return v.toString(16);
  };

  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, repl);
};

export generateUUID
