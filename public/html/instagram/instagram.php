<?php
header('Content-type: application/json');

$user_id = 'xxxxxxxxxxxxxxxxx';
$access_token = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';

$graph_url= "https://graph.instagram.com/".$user_id."?fields=media&access_token=".$access_token;

function fetchData($url){
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, $url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_TIMEOUT, 20);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
	$result = curl_exec($ch);
	curl_close($ch);
	return $result;
}

$result = fetchData($graph_url);

$feed = json_decode($result, TRUE);
$output = array();

if ($feed != "" && array_key_exists('media', $feed)) {
		
	if (array_key_exists('data', $feed['media'])) {
		
		foreach ($feed['media']['data'] as $media) {
			
			$graph_url= "https://graph.instagram.com/".$media['id']."?fields=caption,media_url,permalink&access_token=".$access_token;
			
			$result = fetchData($graph_url);
			
			if ($result){
				$output['data'][] = $result;
			}
		}
		
	}
	
	echo json_encode($output);
} else {
	echo "error";
}
?>