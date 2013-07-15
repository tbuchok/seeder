;(function(exports) {

  var data = {
    size: 0,
    nodes: [],
    addNode: function(key, value){
      this.nodes.push({key: key, value: value});
    },
    generate: function(){
      var results = [];
      for(var i=0; i<this.size; i++){
        var obj = {};
        this.nodes.forEach(function(node){
          var min = 0;
          var max = 1000;
          obj[node.key] = Math.floor(Math.random() * (max - min + 1)) + min;
        })
        results.push(obj);  
      }
      return JSON.stringify(results, null, '  ');
    }
  }

  var duplicateSet = function(){
    var set = document.querySelectorAll('.kvSet')[0];
    var dupSet = set.cloneNode(true);

    return dupSet;
  }


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
        var value = sets[i].querySelectorAll('[name=value]')[0].value;
        data.addNode(key, value);
      }

      var blob = new Blob([data.generate()], {type: "text/plain;charset=utf-8"});
      saveAs(blob, "data.json");
    });

    var addChild = document.getElementById('addChild');
    addChild.addEventListener('click', function(event){
      event.preventDefault();
      var dupSet = duplicateSet();
      form.appendChild(dupSet);
    })


  });
}(this));