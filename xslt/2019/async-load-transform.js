      function loadDoc(url) {
           return new Promise(function(resolve) {
             var req = new XMLHttpRequest();
             req.open("GET", url);
             if (typeof XSLTProcessor === 'undefined') {
               try {
                 req.responseType = 'msxml-document';
               }
               catch (e) {}
             }
             req.onload = function() {
               resolve(this.responseXML)
             }
             req.send();
           });
      }
      
      function transform(xmlUrl, xslUrl, xsltParams, targetElement) {
        Promise.all([loadDoc(xmlUrl), loadDoc(xslUrl)]).then(function(data) {
          var xmlDoc = data[0];
          var xslDoc = data[1];
          
          if (typeof XSLTProcessor !== 'undefined') {
            var proc = new XSLTProcessor();
            proc.importStylesheet(xslDoc);
            
            for (var prop in xsltParams) {
              proc.setParameter(null, prop, xsltParams[prop]);
            }
            
            var resultFrag = proc.transformToFragment(xmlDoc, targetElement.ownerDocument);
            
            targetElement.textContent = '';
            targetElement.appendChild(resultFrag);
          }
          else {
              var template = new ActiveXObject('Msxml2.XslTemplate.6.0');
              template.stylesheet = xslDoc;
              var proc = template.createProcessor();
              
              for (var prop in xsltParams) {
                proc.addParameter(prop, xsltParams[prop]);
              }
              
              proc.input = xmlDoc;
              
              proc.transform();
              
              var resultHTML = proc.output;
              
              targetElement.innerHTML = resultHTML;
          }
        });
      }
