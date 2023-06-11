var modes = {
    'xml': 'ace/mode/xml',
    'html': 'ace/mode/html',
    'xhtml': 'ace/mode/xml',
    'json': 'ace/mode/json',
    'text': 'ace/mode/text'
};

var filetypes = {
  '.htm': 'html',
  '.html': 'html',
  '.xml': 'xml',
  '.xsl': 'xml',
  '.xslt': 'xml',
  '.xhtml' : 'xml',
  '.json' : 'json'
};

function setDocument(editor, content, mode) {
	console.log("setting editor to mode", mode);
	new Error().stack.toString();
    if (mode && modes[mode]) {
      editor.session.setMode(modes[mode]);
      editor.session.setUseWrapMode(mode === 'text');
    }
	/*
	if (mode==="xml"){
		content=vkbeautify.xml(content);
	}else if (mode==="json"){
		content=vkbeautify.json(content);
	}
	*/
    editor.session.setValue(content);
}
