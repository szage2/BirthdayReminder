<?php
$postBody = $_POST;

$f = fopen("../logs/requests.json", "a") or die ("Unable to open file!");
fwrite($f, json_encode($_POST, JSON_PRETTY_PRINT));
fclose($f);
?>
