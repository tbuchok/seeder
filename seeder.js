;(function(exports) {

  var generators = {
    // random int between options.min and options.max
    // defaults to 0 - 100;
    "randomNumber": function(options){
      var min = options.min || 0
        , max = options.max || 100
      ;

      return Math.floor(Math.random() * (max - min + 1)) + min;
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
    
    // Array.prototype
    // .forEach
    // .call(document.querySelectorAll('.data-type-toggle'), function(el){ 
    //   el.addEventLitener('change', handleChange) 
    // });

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

    var addChild = document.getElementById('addChild');
    addChild.addEventListener('click', function(event){
      event.preventDefault();
      var dupSet = duplicateSet();
      form.appendChild(dupSet);
    });


  });
}(this));
