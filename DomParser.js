var DomParser = function() {
  function generateDomPath(el) {
    var stack = [];
    while ( el.parentNode != null ) {
      console.log(el.nodeName);
      var sibCount = 0;
      var sibIndex = 0;
      for ( var i = 0; i < el.parentNode.childNodes.length; i++ ) {
        var sib = el.parentNode.childNodes[i];
        if ( sib.nodeName == el.nodeName ) {
          if ( sib === el ) {
            sibIndex = sibCount;
          }
          sibCount++;
        }
      }
      if ( el.hasAttribute('id') && el.id != '' ) {
        stack.unshift(el.nodeName.toLowerCase() + '#' + el.id);
      } else if ( sibCount > 1 ) {
        stack.unshift(el.nodeName.toLowerCase() + ':eq(' + sibIndex + ')');
      } else {
        stack.unshift(el.nodeName.toLowerCase());
      }
      el = el.parentNode;
    }
    return stack.slice(1);
  }

  function findNodeByPath(pathStack) {
    var path = document.firstElementChild;

    pathStack.forEach(function(tag) {
      var nodeDetails = tagType(tag)

      if(nodeDetails.type === "ID") {
        path = document.getElementById(nodeDetails.value)

      } else if(nodeDetails.type === "SIBLING") {
        var i = 0;

        for(var child of path.childNodes) {
          var nodeName = extractNodeNameFromSiblingTag(tag);

          if(child.nodeName.toLowerCase() === nodeName) {
            
            if(i === nodeDetails.value) {
              path = child;
              break;
            }

            i++;
          }
        }
      } else {
        
        for(var child of path.childNodes) {
        
          if(child.nodeName.toLowerCase() === tag) {
            path = child;
        
            break;
          } 
        }
      }
    });

    return path;
  }

  function tagType(tag) {
    var id = tag.indexOf("#");
    var sib = tag.indexOf(":eq(")
    if(id > -1) {
      var idString = extractID(tag, id)
      return {type: "ID", value: idString};
    } else if(sib > -1) {
      var sibIndex = extractSibIndex(tag, sib);
      return {type: "SIBLING", value: sibIndex};
    }

    return {type: "PLAIN_NODE"};
  }

  function extractID(tag, id) {
    return tag.substring(id+1);
  }

  function extractSibIndex(tag) {
    return parseInt(tag.charAt(tag.indexOf(":eq(") + 4));
  }

  function extractNodeNameFromSiblingTag(tag) {
    return tag.substring(0, tag.indexOf(":eq("));
  }

  return {
    generateDomPath: generateDomPath,
    findNodeByPath: findNodeByPath
  }
}();