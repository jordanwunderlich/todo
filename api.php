<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {

	$file = "json/".htmlspecialchars($_GET["file"])."-info.json";
	$data = json_decode(file_get_contents("php://input"));
	/*foreach($data as $item) {
		$item->name = htmlspecialchars($item->name);
		$item->checked = htmlspecialchars($item->checked);
	}*/
	file_put_contents($file, json_encode($data));

	echo var_dump($data);

} else if($_SERVER["REQUEST_METHOD"] == "GET") {

	$file = "json/".htmlspecialchars($_GET["file"])."-info.json";

	if (!file_exists($file))
		file_put_contents($file, "[]");

	echo file_get_contents($file);
}