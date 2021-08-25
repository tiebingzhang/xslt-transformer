var modes = {
  'xml': 'xml',
  'html': 'html',
  'xhtml': 'xml',
  'json': 'json',
  'text': 'text'
};

var filetypes = {
  '.htm': 'html',
  '.html': 'html',
  '.xml': 'xml',
  '.xsl': 'xml',
  '.xslt': 'xml',
  '.xhtml': 'xml',
  '.json': 'json'
};

function setDocument(editor, content, mode) {
  if (mode && modes[mode]) {
    editor.updateOptions({ language: modes[mode] });
    //editor.session.setUseWrapMode(mode === 'text');
  }
  editor.setValue(content);
}