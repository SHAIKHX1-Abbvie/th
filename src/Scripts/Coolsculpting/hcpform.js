var flag = 0;
function sfe(submitUrl, formId) {
    if (flag == 0) {
        if ($(".g-recaptcha").length > 0) {
            var response = grecaptcha.getResponse();
            if (response.length == 0) {
                $("#g-recaptcha-error").css("display", "inline");
                $("#g-recaptcha-error").css("color", "red");
                return false;
            } else {
                document.getElementById('g-recaptcha-error').innerHTML = "";

            }
        }
        $("#form-submit-button-" + formId).prop("disabled", true);
        let token = $('input[name="__RequestVerificationToken"]').val();
        let datasourceID = $("form[name='form-" + formId + "']").attr('data-source-id');
        let formDataArr = $("form[name='form-" + formId + "']").serializeArray();
        let form = {};
        form["__RequestVerificationToken"] = token;
        form["datasourceID"] = datasourceID;

        for (var arr = 0; arr < formDataArr.length; arr++) {
            var item = formDataArr[arr];
            form[item.name] = item.value;
        }

        $.ajax({
            url: submitUrl,
            type: 'POST',
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: form,
            success: function (response) {
                if (response.toLowerCase() == "true") {
                    $("#form-submit-success-" + formId).css("display", "inline");
                    $("#form-submit-error-" + formId).css("display", "none");
                    $("form[name='form-" + formId + "']").attr("onsubmit", "javascript:void(0);");
                } else {
                    $("#form-submit-button-" + formId).prop("disabled", false);
                    $("#form-submit-error-" + formId).css("display", "inline");
                    $("#form-submit-success-" + formId).css("display", "none");
                }
                flag = 1;
            },
            error: function (err) {
                $("#form-submit-button-" + formId).prop("disabled", false);
                $("#form-submit-error-" + formId).css("display", "inline");
                $("#form-submit-success-" + formId).css("display", "none");
            }

        });
    }
}