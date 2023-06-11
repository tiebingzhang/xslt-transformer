document.addEventListener('DOMContentLoaded',
    function () {
        document.getElementById('input-types').addEventListener('click',
            function (evt) {
                var inputType = evt.currentTarget.form['input-type'].value;
                if (inputType !== 'None') {
                    inputEditor.session.setMode(modes[inputType.toLowerCase()]);
                }
                document.getElementById('input-col').style.display =
                    inputType === 'None' ? 'none' : '';
                return true;
            },
            false
        );
    },
    false
)
