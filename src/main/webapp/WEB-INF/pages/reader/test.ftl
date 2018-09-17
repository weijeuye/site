<#assign config_v="20140830004">
<style type="text/css">
 .reader {
     height: 2px;
     border: 1px;
     color: #c9302c;
 }

</style>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="Mosaddek">
    <meta name="keyword"
          content="FlatLab, Dashboard, Bootstrap, Admin, Template, Theme, Responsive, Fluid, Retina">
    <link rel="shortcut icon" href="img/favicon.png">
    <title>测试</title>
    <!-- Bootstrap core CSS -->
    <link href="${basePath}/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <script type="text/javascript" src="${basePath}/bootstrap/js/jquery.min.js"></script>
    <script type="text/javascript"   src="${basePath}/bootstrap/js/bootstrap.min.js"></script>
</head>
<body class="boxed-page">
<div class="container">
        <#list readers as item>
            <table>
                <tr class="reader">
                    <td>${item.readerId}</td>
                    <td>${item.name}</td>
                    <td>${item.sex}</td>
                    <td>${item.birthday?string('yyyy-MM-dd')}</td>
                    <td>${item.address}</td>
                    <td>${item.telcode}</td>
                </tr>
            </table>
        </#list>
</div>
</body>
</html>