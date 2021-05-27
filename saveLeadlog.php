<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
date_default_timezone_set('Europe/Kiev');

if ($_GET) { // If form was filled and sent
    $leadFull = array(
        'f_name' => $_GET['f_name'],
        'l_name' => $_GET['l_name'],
        'email' => $_GET['email'],
        'lp' => $_GET['lp'],
        'lp_url' => $_GET['lp_url'],
        't_geo' => $_GET['t_geo'],
        'lang' => $_GET['lang'],
        'pixel_id' => $_GET['pixel_id'],
        'token' => $_GET['token'],
        'phone2' => $_GET['phone2'],
        'params' => $_GET['params']
    );

    $date = date("j.n.Y");
    // Checking if the log dir is existing
    if (!is_dir('./lead_log/')) {
        // Create dir if not exist
        mkdir('./lead_log/');
    }

    // Writing lead info into JSON log file
    $encodeLead = json_encode($leadFull, JSON_UNESCAPED_UNICODE);
    file_put_contents('./lead_log/'.$date. '.json', $encodeLead."\r\n", FILE_APPEND);
}
