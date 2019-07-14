<?php
include 'db Connection.php';
if (!$connection) {
    echo mysqli_connect_error();
} else {
$SQl = "select cid from customer";
$resultset = mysqli_query($connection, $SQl);

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Save Customer</title>
    <link rel="stylesheet" href="css/css/bootstrap.css">
    <style>
        .form-control {
            width: 500px;
            margin-left: 20px;
        }

        label {
            color: white;
        }
    </style>
</head>
<body>
<form id="form" style="background-color: #343a40;margin: 20px;height: 400px;width: 700px" method="post" action="" enctype="application/x-www-form-urlencoded">
    <div class="form-group">
        <h1 style="background-color: #4e555b">Customer Registration Form</h1>
    </div>
        <select class="form-control" name="customerID">
            <?php
            while ($rowdata = mysqli_fetch_row($resultset)) {
                echo "<option value=\"$rowdata[0]\">$rowdata[0]</option>";
            }
            mysqli_free_result($resultset);
            mysqli_close($connection);
            }
            ?>
        </select>
    <div class="form-group">
        <label for="formGroupExampleInput2">Customer Name</label><br>
        <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Name" name="name">
    </div>
    <div class="form-group">
        <label for="formGroupExampleInput2">Customer Address</label><br>
        <input type="text" class="form-control" id="formGroupExampleInput3" placeholder="Address" name="address">
    </div>
    <div class="form-group">
        <label for="formGroupExampleInput2">Customer Salary</label><br>
        <input type="text" class="form-control" id="formGroupExampleInput4" placeholder="Salary" name="salary">
    </div>
    <div class="button">
        <button type="submit" class="btn btn-success">Save Customer</button>
        <button type="submit" class="btn btn-warning" id="remove">Remove </button>
        <button type="submit" class="btn btn-danger" id="update">Update</button>
    </div>
</form>
<script src="js/jquery-3.4.1.min.js"></script>
<!--<script src="../ManageCustomer/js/Controller.js"></script>-->
<script>
    $("#remove").click(function () {
        $("#form").attr("action","RemoveCustomer.php");
        $("#form").submit();
    });
    $("#update").click(function () {
        $("#form").attr("action","UpdateCustomer.php");
        $("#form").submit();
    });
</script>

</body>
</html>