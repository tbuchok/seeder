;(function(exports) {

  var addEventListeners = function(list, type, cb) {
    Array.prototype.forEach.call(list, function(el) {
      el.addEventListener(type, cb);
    });
  };

  var addInputs = function() {
    var kvSet = document.createElement('div');
    kvSet.className = 'kvSet';
    var input = document.createElement('input');
    input.name = input.placeholder ='key';
    input.type = 'text';
    kvSet.appendChild(input);
    return kvSet;
  };

  var addDateInputs = function(form) {
    var kvSet = addInputs();
    var min = document.createElement('input');
    min.name = min.placeholder = 'min'
    var max = document.createElement('input');
    max.name = max.placeholder = 'max'
    form.appendChild(kvSet);
  };
  var addRandInputs = function(form) {
    var kvSet = addInputs();
    form.appendChild(kvSet);
  };
  var addConstInputs = function(form) {
    var kvSet = addInputs();
    form.appendChild(kvSet);
  };

  var generators = {
    // random int between options.min and options.max
    // defaults to 0 - 100;
    "randomNumber": function(options){
      var min = options.min || 0
        , max = options.max || 100
      ;

      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    // random date betwen options.start and options.end
    // defaults to dates over the past year.
    // can also pass in format string, defaults to MM/DD/YYYY
    "randomDate": function(options){
      var MS_PER_YEAR = 365 * 24 * 60 * 60 * 1000;

      var start = options.start || new Date(new Date() - msPerYear) // one year ago
        , end = options.end || new Date() // today
        , format = options.format || new Date() // today
      ; 
    }
  };
  
  var data = {
    size: 0,
    nodes: [],
    addNode: function(key, generator, options){
      this.nodes.push({key: key, generator: generator, options: options});
    },
    generate: function(){
      var results = [];
      for(var i=0; i<this.size; i++){
        var obj = {};
        this.nodes.forEach(function(node){
          obj[node.key] = node.generator(node.options);
        });
        results.push(obj);  
      }
      return JSON.stringify(results, null, '  ');
    }
  };

  var duplicateSet = function(){
    var set = document.querySelectorAll('.kvSet')[0];
    var dupSet = set.cloneNode(true);

    return dupSet;
  };


  document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('seeder');

    form.addEventListener('submit', function(event) {
      event.preventDefault();
      var numberOfRecords = event.target[0].value;
      var sets = document.querySelectorAll('.kvSet');

      data.size = numberOfRecords;

      for(var i=0; i<sets.length; i++){
        console.log(sets[i]);
        var key = sets[i].querySelectorAll('[name=key]')[0].value;
        var generator = sets[i].querySelectorAll('[name=generator]')[0].value;
        var options = { min: 0, max: 1000 }; //sets[i].querySelectorAll('[name=value]')[0].value;

        data.addNode(key, generators[generator], options);
      }

      var blob = new Blob([data.generate()], {type: "text/plain;charset=utf-8"});
      saveAs(blob, "data.json");
    });

    addEventListeners(document.querySelectorAll('.addChild'), 'click', function(event) {
      event.preventDefault();
      // var dupSet = duplicateSet();
      // form.appendChild(dupSet);
      switch (event.target.id) {
        case 'date': addDateInputs(form); break;
        case 'rand': addRandInputs(form); break;
        case 'const': addConstInputs(form); break;
        default:
          console.log('whoops!');
      }
    });

  });
}(this));
