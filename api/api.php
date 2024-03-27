<?php
include_once './dbincludes.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'OPTIONS':
        handleOptions();
        break;
    case 'GET':
        handleGet($pdo);
        break;
    case 'POST':
        handlePost($pdo);
        break;
    default:
        http_response_code(405);
        echo json_encode(["error" => $method . " method not allowed"]);
}

function handleOptions()
{
    header('Access-Control-Allow-Methods: GET, POST');
    header('Access-Control-Allow-Headers: Content-Type');
}

function handleGet(PDO $pdo)
{
    header('Content-Type: application/json');

    $sql = "SELECT id, name, score FROM highscores ORDER BY score DESC, date ASC LIMIT 10";

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($result);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);
    }
}

function handlePost(PDO $pdo)
{
    $data = json_decode(file_get_contents("php://input"));

    $name = filter_var($data->name, FILTER_DEFAULT);
    $score = filter_var($data->score, FILTER_VALIDATE_INT);

    if (isset($name) && isset($score)) {
        $sql = "INSERT INTO highscores (name, score) VALUES (:name, :score)";

        try {
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':name', $name, PDO::PARAM_STR);
            $stmt->bindParam(':score', $score, PDO::PARAM_INT);
            $stmt->execute();
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Invalid data"]);
    }
}
