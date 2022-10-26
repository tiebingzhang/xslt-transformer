function addParameterRow(currentRow) {
  const newRow = currentRow.cloneNode(true);
  newRow.querySelectorAll('input[type="text"]').forEach(input => {
    input.defaultValue = input.value = '';
  });
  currentRow.parentElement.insertBefore(newRow, currentRow.nextSibling);
}

var xsltParams = new SaxonJS.XdmMap();

document.addEventListener(
  'DOMContentLoaded',
  () => {
    document.getElementById('setParamsBtn').addEventListener('click',
      () => {
        xsltParams = new SaxonJS.XdmMap();
        const paramRows = document.querySelector('#params-table').tBodies[0].rows;
        for (let i = 0; i < paramRows.length; i++) {
          const row = paramRows[i];
          const fields = row.querySelectorAll('input[type="text"]');
          const nameField = fields[0];
          const valueField = fields[1];
          if (nameField.value != '' && valueField.value != '') {
            const qname = SaxonJS.XS.QName.fromEQName(nameField.value);
            const value = [SaxonJS.atom(valueField.value)];
            xsltParams.inSituPut(qname, value);
          }
        }
      }
    );
  }
)