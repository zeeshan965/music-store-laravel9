<?php

//Replace with your Facebook Page ID
$fb_page_id = 'xxxxxxxxxxxxxxx';

//Replace with your Access Token
$access_token = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';





# Don't need to edit below this line ##################################################################################
#######################################################################################################################

$graph_url= "https://graph.facebook.com/v4.0/" . $fb_page_id;
$postData = "date_format=U&debug=all&fields=feed%7Bfrom%2Cmessage%2Cstory%2Cid%2Cpermalink_url%2Cfull_picture%2Ccreated_time%7D&format=json&method=get&pretty=0&suppress_http_code=1&transport=cors&access_token=" .$access_token;

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $graph_url);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

$output = curl_exec($ch);

curl_close($ch);

echo $output;
?>