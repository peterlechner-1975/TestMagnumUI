var GENERIC;
jQuery(document).ready(function ($) {
    GENERIC = (function (root, undefined) {
        var arr1 = [];
        function apiDomain() {
            return "https://localhost:5001";
        }
        function createdBy() {
            return "EA\\plechne";
        }
        function currentDate() {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = today.getFullYear(); 
            today = yyyy + '-' + mm + '-' + dd;
            return today;
        }
        function TOASTSHOW(info) {
            $('.toast-body').text(info);
            $('.toast').toast('show');

        }
        function StringBuilder(value) {
            this.strings = new Array();
            this.append(value);
        }

        StringBuilder.prototype.append = function (value) {
            if (value) {
                this.strings.push(value);
            }
        }

        StringBuilder.prototype.clear = function () {
            this.strings.length = 0;
        }

        StringBuilder.prototype.toString = function () {
            return this.strings.join("");
        }

        function tableSearch(idName,idTable) {
            $("#" + idName).on("keyup", function () {
                var value = $(this).val().toLowerCase();
                $("#" + idTable + " tr").filter(function () {
                    $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                });
            });

        }

        function datasetGet(url) { 

            //const axios = require('axios');
            async () => {
                return await axios({
                    method: 'get',
                    url: url
                })
            }
            // Make a request for a user with a given ID
            //axios.get(url)
            //    .then(function (response) {
            //        // handle success
            //       return (response);
            //    })
            //    .catch(function (error) {
            //        // handle error
            //        console.log(error);
            //    })
            //    .finally(function () {
            //        // always executed
            //    });


            //var xmlHttp = new XMLHttpRequest();
            //xmlHttp.onreadystatechange = function () {
            //    if (xmlHttp.readyState == XMLHttpRequest.DONE) { 
            //        if (xmlHttp.responseText == "") {
            //            GENERIC.TOASTSHOW("Error: Could not connect to " + GENERIC.APIDOMAIN());

            //        }
            //        {
            //            var arr = JSON.parse(xmlHttp.responseText);
            //            if (arr.statusCode == 200) {
            //                GENERIC.arr1 = arr.data;
            //            }
            //            else {
            //                GENERIC.TOASTSHOW("Error:" + arr.errors[0]);
            //            }
            //        }
            //    }
            //}
            //xmlHttp.open("GET", url, false); // false for synchronous request
            //xmlHttp.send(null); 
        }
        function dropdownGeneral(theUrl, column, valueSelected, name, className) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", theUrl, false); // false for synchronous request
            xmlHttp.send(null);

            var arr = JSON.parse(xmlHttp.responseText);
            var sb = new GENERIC.STRINGBUILDER();
            sb.append('<select class="form-select ' + className + '"  id="' + name + '" aria-label="Default select example">'); 
            sb.append('<option value="" ></option>');

            var max = arr.data.length;
            for (var i = 0; i < max; i++) {
                var obj = arr.data[i];
                var valueFull = "";
                var selected = " ";
                var keyValue = "";
                for (var key in obj) {
                    var value = obj[key];
                    if (key.toUpperCase() == "CHANGED_BY") {
                        continue;
                    }
                    if (key.toUpperCase() == "CHANGED_AT") {
                        continue;
                    }
                    if (value == null) {
                        continue;
                    }
                    if (key.toUpperCase() == column.toUpperCase()) {
                        if (value == valueSelected) {
                            selected = " selected ";
                        }
                        keyValue = value;
                    }
                    valueFull += value + " "
                }

                sb.append(' <option value="' + keyValue + '" ' + selected + '>' + valueFull + '</option>');
            }

            sb.append(' </select>');
            return sb.toString();
        }
        function tableShow(url,nameToUse,type) {
             
            var arr = [];
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == XMLHttpRequest.DONE) {
                    if (xmlHttp.responseText == "") {
                        GENERIC.TOASTSHOW("Error: Could not connect to " + GENERIC.APIDOMAIN());

                    }
                    {
                        var arrFull = JSON.parse(xmlHttp.responseText);
                        if (arrFull.statusCode == 200) {
                            arr = arrFull.data;
                        }
                        else {
                            GENERIC.TOASTSHOW("Error:" + arr.errors[0]);
                        }
                    }
                }
            }
            xmlHttp.open("GET", url, false); // false for synchronous request
            xmlHttp.send(null);  
            var sb = new GENERIC.STRINGBUILDER();
            sb.append(' <div class="table-responsive">');
            sb.append(' <table class="table table-striped table-sm" id="tableInProgress">');
             


            for (var i = 0; i < 1; i++) { 
                var obj = arr[i];

                sb.append('<thead><tr>');
                for (var key in obj) {
                    var value = obj[key];
                    sb.append(' <th scope="col">' + key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ") + '</th>');
                }
                sb.append('</tr></thead>');
            }

            sb.append('<tbody id="tableInProgressBody">');
            var max = arr.length;
            if (max > 50) {
                max = 50;
            }
            for (var i = 0; i < max; i++) {
                var obj = arr[i];

                sb.append('<tr>');
                var first = true;
                var variable = "";
                for (var key in obj) {
                    var value = obj[key];
                    if (first) {
                        first = false;
                        variable = key + '=' + value;
                    }
                    sb.append(' <td>' + value + '</td>');
                }
                sb.append(' </tr>   ');
            }
            sb.append('</tbody>');
            sb.append(' </table>');
            sb.append(' </div>');
            let elem = document.querySelector('.' + nameToUse);
            elem.innerHTML = sb.toString();

        }

        function tableShowData(arr, nameToUse) {

             
            var sb = new GENERIC.STRINGBUILDER();
            sb.append(' <div class="table-responsive table-wrapper">');
            sb.append(' <div class="p-3 border bg-light"><input class="form-control searchable" id="filter' + nameToUse + '" type="text" placeholder="Search.."></div>');
            sb.append(' <table class="table table-striped table-sm" id="table' + nameToUse + '">');



            for (var i = 0; i < 1; i++) {
                var obj = arr[i];

                sb.append('<thead><tr>');
                for (var key in obj) {
                    var value = obj[key];
                    sb.append(' <th scope="col">' + key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, " ") + '</th>');
                }
                sb.append('</tr></thead>');
            }

            sb.append('<tbody id="table' + nameToUse + 'Body">');
            var max = arr.length; 
            for (var i = 0; i < max; i++) {
                var obj = arr[i];

                sb.append('<tr>');
                var first = true;
                var variable = "";
                for (var key in obj) {
                    var value = obj[key];
                    if (first) {
                        first = false;
                        variable = key + '=' + value;
                    }
                    sb.append(' <td>' + value + '</td>');
                }
                sb.append(' </tr>   ');
            }
            sb.append('</tbody>');
            sb.append(' </table>');
            sb.append(' </div>');
            let elem = document.querySelector('.' + nameToUse);
            elem.innerHTML = sb.toString();

        }
        function errorShow(err) {

            var sb = new GENERIC.STRINGBUILDER();
            var errList = err.split(',');
            var max = errList.length;

            for (var i = 0; i < max; i++) { 
                sb.append(errList[i] + "<br/><br/>");
            }
            let elem = document.querySelector('.popup');
            elem.style.height = "55vh";
            elem.innerHTML = sb.toString();

            let myModal = document.querySelector('.modal');

            myModal.style.display = "block";
            myModal.style.paddingRight = "17px";
            myModal.className = "modal fade show";
            myModal.style.height = "55vh";


            let myModalContent = document.querySelector('.modal-content');
            myModalContent.style.height = "55vh";

            let myModalTitle = document.querySelector('.modal-title');
            myModalTitle.innerHTML = "Error"; 
        }
        function dropdownSearch(theUrl, idName, caption, indexId, className) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", theUrl, false);
            xmlHttp.send(null);

            var arrResponse = JSON.parse(xmlHttp.responseText);
            var sb = new GENERIC.STRINGBUILDER();

            sb.append('<button class="form-select" type="button" id="btnDropdown' + idName + '" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false" onclick="setFocusToTextBox(\'search' + idName + '\');return false;">' + caption + '</button>');
            sb.append('<ul class="dropdown-menu" id="myDropdownsearch' + idName + '" aria-labelledby="btnDropdown' + idName + '"><input type="text" placeholder="Search.." id="search' + idName + '" onkeyup="filterFunction(this)"/>');

            var column = "company_Code";
            var val = "";
            var valIndex = "";
            var max = arrResponse.data.length;

            for (var i = 0; i < max; i++) {
                var obj = arrResponse.data[i];
                var valueFull = "";
                var selected = " ";
                for (var key in obj) {
                    var value = obj[key];
                    if (key.toUpperCase() == "CHANGED_BY") {
                        continue;
                    }
                    else if (key.toUpperCase() == "CHANGED_AT") {
                        continue;
                    }
                    else if (value==null) {
                        continue;
                    }
                    if (key.toUpperCase() == column.toUpperCase()) {
                        val = value;
                    }
                    if (indexId.toUpperCase() == key.toUpperCase()) {
                        valIndex = value;
                    }
                    valueFull += value + " "
                }

                sb.append('<li><a class="dropdown-item" href="#' + val + '" onclick="fncSelectDropdown(\'' + idName + '\',\'' + valueFull + '\',\'' + valIndex + '\',\'' + className + '\');return false;">' + valueFull + '</a></li>');
            }
            sb.append('</ul>');
            return sb.toString();
        }
        return {
            TOASTSHOW: TOASTSHOW,
            STRINGBUILDER: StringBuilder,
            APIDOMAIN: apiDomain,
            CREATEDBY: createdBy,
            CURRENTDATE: currentDate,
            TABLESEARCH: tableSearch,
            DROPDOWNSEARCH: dropdownSearch,
            TABLESHOW: tableShow,
            TABLESHOWDATA: tableShowData,
            DATASETGET: datasetGet,
            DROPDOWNGENERAL: dropdownGeneral,
            ERRORSHOW: errorShow
        };
    }(GENERIC || {}, jQuery));

});



