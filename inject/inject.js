//setup injectscope
var injectJS = {

    init: function () {

        var checkForms = setInterval(function () {

            if (document && document.forms && 0 < document.forms.length) {
                for (var i = 0; i < document.forms.length; ++i) {
                    // Found a form!

                    clearInterval(checkForms);
                    window.stop();

                    var myTable = document.getElementsByTagName('table')[0];
                    var rows = myTable.rows;
                    var firstRow = rows[1];
                    var colLength = myTable.rows[0].cells.length
                    firstRow.innerHTML = `<td colspan="${colLength}" id="chromeextensionMessage">Søgning stoppet af chromeudvidelse.<br>Du behøver derfor ikke vente med at lave din egen søgning.<br> God fornøjelse. <br><br>Mvh. Lars Emil</td>`;
                    
                    document.forms[i].addEventListener('submit', function(event){
                        firstRow.innerHTML = `<td colspan="${colLength}"><div class="sk-spinner sk-spinner-wave"><div class="sk-rect1"></div><div class="sk-rect2"></div><div class="sk-rect3"></div><div class="sk-rect4"></div><div class="sk-rect5"></div></div></td>`;
                    })
                    

                }
            }
        }, 1);

        // Kill check if it continues for more than 5sec.
        setTimeout(function () {
            clearInterval(checkForms);
        }, 5000)
    }
}
injectJS.init();
