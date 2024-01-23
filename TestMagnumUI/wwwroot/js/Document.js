var DOCUMENT;
jQuery(document).ready(function ($) {
    DOCUMENT = (function (root, undefined) {

        function DocumentSubmit(e1) {
            var oReq = new XMLHttpRequest();
            var formData = new FormData();
            if (document.getElementById("documentFiles").files.length == 0) {
                GENERIC.TOASTSHOW("Please select a file.");
                return false;
            }
            formData.append("documentFiles", document.getElementById("documentFiles").files[0], document.getElementById("documentFiles").files[0].name);
            oReq.onreadystatechange = function () {
                if (oReq.readyState == XMLHttpRequest.DONE) {

                    var arr = JSON.parse(oReq.responseText);
                    if (arr.statusCode == 200) {
                        GENERIC.TOASTSHOW("File Uploaded");

                        DocumentList(document.getElementById('agreement_Code').value,'LoanFiles');
                    }
                    else {
                        GENERIC.TOASTSHOW("Error:" + arr.errors[0]);
                    }
                }
            }
            var url = GENERIC.APIDOMAIN() + "/api/v1/MagnumCustom/UploadFile?agreementCode=" + document.getElementById('agreement_Code').value + "&functionalGroupCode=" + $('#fileFunctionName').val();
            url += "&externalEndorser=" + document.getElementById('external_Endorser').value + "&changedBy=" + GENERIC.CREATEDBY();
            oReq.open("post", url);
            oReq.send(formData);
            return false;
        }
        function DocumentEndorsementSubmit(e1) {
            var oReq = new XMLHttpRequest();
            var formData = new FormData();
            if (document.getElementById("documentEndorsedFiles").files.length == 0) {
                GENERIC.TOASTSHOW("Please select a file.");
                return false;
            }
            formData.append("documentFiles", document.getElementById("documentEndorsedFiles").files[0], document.getElementById("documentEndorsedFiles").files[0].name);
            oReq.onreadystatechange = function () {
                if (oReq.readyState == XMLHttpRequest.DONE) {

                    var arr = JSON.parse(oReq.responseText);
                    if (arr.statusCode == 200) {
                        GENERIC.TOASTSHOW("File Uploaded"); 
                    }
                    else {
                        GENERIC.TOASTSHOW("Error:" + arr.errors[0]);
                    }
                }
            }
            var url = GENERIC.APIDOMAIN() + "/api/v1/MagnumCustom/UploadEndorsementFile?agreementCode=" + document.getElementById('agreement_Code').value + "&changedBy=" + GENERIC.CREATEDBY();
            oReq.open("post", url);
            oReq.send(formData);
            return false;
        }
        function DocumentDelete(Agreement_Code, Functional_Group_Code) {
            var base64 = "";
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("DELETE", 'https://localhost:5001/api/v1/MagnumCustom/DELETE_AGREEMENT_ENDORSEMENT?Agreement_Code=' + Agreement_Code + "&functionalGroupCode=" + Functional_Group_Code, false); // false for synchronous request
            xmlHttp.send(null);

            var arr = JSON.parse(xmlHttp.responseText);
            if (arr.statusCode == 200) {
                GENERIC.TOASTSHOW("Deleted file");
                DocumentList(document.getElementById('agreement_Code').value, 'LoanFiles');
            }
            else {
                GENERIC.TOASTSHOW("Error:" + arr.errors[0]);
            }



        }
        function DocumentShow(Agreement_Code, Functional_Group_Code) {
            var base64 = "";
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", 'https://localhost:5001/api/v1/MagnumCustom/LoadFile?Agreement_Code=' + Agreement_Code + "&Functional_Group_Code=" + Functional_Group_Code, false); // false for synchronous request
            xmlHttp.send(null);

            var arr = JSON.parse(xmlHttp.responseText);
            for (var i = 0; i < 1; i++) {
                var obj = arr.data[i];
                base64 = obj.endorsement_Doc;
            }
            DocumetInNewWindow(base64);



        }
        function DocumetInNewWindow(base64) {

            var sb = new GENERIC.STRINGBUILDER();
             
            //sb.append('<object width="100%" height="100%" data="base64,');
            //sb.append(base64);
            //sb.append('" type="application/pdf" class="internal">');
            //sb.append('<embed src="data:application/pdf;base64,');
            //sb.append(base64);
            //sb.append('" type="application/pdf"  />');
            //sb.append('</object>');
            //sb.append('<iframe src="data:application/msword;base64,' + base64 + '" height="100%" width="100%"></iframe>');
            
            sb.append('<object width="100%" height="100%" data="data:application/pdf;base64,');
            sb.append(base64);
            sb.append('" type="application/pdf" class="internal">');
            sb.append('<embed src="data:application/pdf;base64,');
            sb.append(base64);
            sb.append('" type="application/pdf"  />');
            sb.append('</object>');

            let elem = document.querySelector('.popup');
            elem.style.height = "85vh";
            elem.innerHTML = sb.toString();

            let myModal = document.querySelector('.modal');

            myModal.style.display = "block";
            myModal.style.paddingRight = "17px";
            myModal.className = "modal fade show";
            myModal.style.height = "85vh";


            let myModalContent = document.querySelector('.modal-content');
            myModalContent.style.height = "85vh";

            let myModalTitle = document.querySelector('.modal-title');
            myModalTitle.innerHTML = "Document"; 

        }

        function DocumentList(Agreement_Code, className) { 
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", 'https://localhost:5001/api/v1/AGREEMENT_ENDORSEMENT?Agreement_Code=' + Agreement_Code , false); // false for synchronous request
            xmlHttp.send(null);
            var arr = JSON.parse(xmlHttp.responseText);

            var sb = new GENERIC.STRINGBUILDER();

            sb.append(' <div class="table-responsive">'); 
            sb.append('<thead><tr>');
            //sb.append(' <th scope="col"><h5>Documents</h5> </th>');
            sb.append('</tr></thead>');
            sb.append(' <table class="table table-striped table-sm">');
            for (var i = 0; i < arr.data.length; i++) {
                var obj = arr.data[i];

                var Agreement_Code = "";
                var Functional_Group_Code = "";

                sb.append('<tbody>');
                var counter = 1;
                for (var key in obj) {
                    var value = obj[key];
                    if (key == "agreement_Code") {

                        Agreement_Code = value;
                    }
                    if (key == "functional_Group_Code") {

                        Functional_Group_Code = value;
                    }
                    if (key == "functional_Group") {


                        sb.append('<tr>');
                        sb.append('<td>');
                        sb.append(value);
                        sb.append('</td>');
                    } 
                    counter += 1;
                }

                sb.append('<td>');
                sb.append('<a href ="" onclick="DOCUMENT.DOCUMENTSHOW(\'' + Agreement_Code + '\',' + Functional_Group_Code + '); return false;">Show</a>');
                sb.append('</td>');
                sb.append('<td>');
                sb.append('<a href ="" onclick="DOCUMENT.DOCUMENTDELETE(\'' + Agreement_Code + '\',' + Functional_Group_Code + '); return false;">Delete</a>');
                sb.append('</td>');
                sb.append('</tr>');
            }
            sb.append('</tbody>');
            sb.append(' </table>');
            sb.append(' </div>'); 
            let elem = document.querySelector('.' + className);
            elem.innerHTML = sb.toString();

        }


        return {
            DOCUMENTLIST: DocumentList,
            DOCUMENTSHOW: DocumentShow,
            DOCUMENTDELETE: DocumentDelete,
            DOCUMENTSUBMIT: DocumentSubmit,
            DOCUMENTINNEWWINDOW: DocumetInNewWindow,
            DOCUMENTENDORSEMENTSUBMIT: DocumentEndorsementSubmit
        };
    }(DOCUMENT || {}, jQuery));

});



