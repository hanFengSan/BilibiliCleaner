//仿python的range函数，生成指定范围的数组
function range(start, stop, step) {
  if (typeof stop == 'undefined') {
    // one param defined
    stop = start;
    start = 0;
  }

  if (typeof step == 'undefined') {
    step = 1;
  }

  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return [];
  }

  var result = [];
  for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }

  return result;
}


//string格式化
String.prototype.format = function (args) {
  var result = this;
  if (arguments.length > 0) {
    if (arguments.length == 1 && typeof (args) == "object") {
      for (var key in args) {
        if (args[key] != undefined) {
          var reg = new RegExp("({" + key + "})", "g");
          result = result.replace(reg, args[key]);
        }
      }
    }
    else {
      for (var i = 0; i < arguments.length; i++) {
        if (arguments[i] != undefined) {
          //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
          var reg = new RegExp("({)" + i + "(})", "g");
          result = result.replace(reg, arguments[i]);
        }
      }
    }
  }
  return result;
}


//为这破js打补丁，foreach循环，非标准js，chrome和firefox支持，ie不支持，下面是为ie添加支持
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (callback, thisArg) {
    var T, k;
    if (this == null) {
      throw new TypeError(" this is null or not defined");
    }
    var O = Object(this);
    var len = O.length >>> 0; // Hack to convert O.length to a UInt32
    if ({}.toString.call(callback) != "[object Function]") {
      throw new TypeError(callback + " is not a function");
    }
    if (thisArg) {
      T = thisArg;
    }
    k = 0;
    while (k < len) {
      var kValue;
      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      }
      k++;
    }
  };
}

//数组的remove函数，dx为所需删除项的下标
Array.prototype.remove = function (dx) {
  if (isNaN(dx) || dx >= this.length) { return false; }
  for (var i = 0, n = 0; i < this.length; i++) {
    if (this[i] != this[dx]) {
      this[n++] = this[i]
    }
  }
  this.length -= 1;
};

//检查数组是否为空，为空则返回空数组，不为空则返回元素为1的一个数组
function checkArray(arr) {
  if (arr.length > 0) {
    return [1]
  } else {
    return []
  }
}

//clone对象
var clone = (function(){
  // classify object
  var classof = function(o){
    if (o === null) { return "null"; }
    if (o === undefined) { return "undefined"; }
    // I suppose Object.prototype.toString use obj.constructor.name
    // to generate string
    var className = Object.prototype.toString.call(o).slice(8,-1);
    return className;
  };

  var references = null;

  var handlers = {
    // Handle regexp and date even in shallow.
    'RegExp': function(reg) {
      var flags = '';
      flags += reg.global ? 'g' : '';
      flags += reg.multiline ? 'm' : '';
      flags += reg.ignoreCase ? 'i' : '';
      return new RegExp(reg.source, flags);
    },
    'Date': function(date) {
      return new Date(+date);
    },
    'Array': function(arr, shallow) {
      var newArr = [], i;
      for (i=0; i<arr.length; i++) {
        if (shallow) {
          newArr[i] = arr[i];
        } else {
          // handle circular reference
          if (references.indexOf(arr[i]) !== -1) {
            continue;
          }
          var handler = handlers[classof(arr[i])];
          if (handler) {
            references.push(arr[i]);
            newArr[i] = handler(arr[i], false);
          } else {
            newArr[i] = arr[i];
          }
        }
      }
      return newArr;
    },
    'Object': function(obj, shallow) {
      var newObj = {}, prop, handler;
      for (prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          // escape prototype properties
          if (shallow) {
            newObj[prop] = obj[prop];
          } else {
            // handle circular reference
            if (references.indexOf(obj[prop]) !== -1) {
              continue;
            }
            // recursive
            handler = handlers[classof(obj[prop])];
            if (handler) {
              references.push(obj[prop]);
              newObj[prop] = handler(obj[prop], false);
            } else {
              newObj[prop] = obj[prop];
            }
          }
        }
      }
      return newObj;
    }
  };

  return function(obj, shallow) {
    // reset references
    references = [];
    // default to shallow clone
    shallow = shallow === undefined ? true : false;
    var handler = handlers[classof(obj)];
    return handler ? handler(obj, shallow) : obj;
  };
}());


//多个值同时验证，只要一个值和第一个参数相等则返回true
var multiVerify = function (target, args) {
  for (var i = 1; i < arguments.length; i++) {
    if (target == arguments[i])
      return true;
  }
  return false;
};
