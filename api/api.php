<?php
include_once './dbincludes.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PATCH, POST, DELETE');
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
    header('Access-Control-Allow-Methods: GET, PATCH, POST, DELETE');
    header('Access-Control-Allow-Headers: Content-Type');
}

function handleGet(PDO $pdo)
{
    header('Content-Type: application/json');

    $sql = "SELECT * FROM highscores";

    try {
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($result === TRUE) {
            http_response_code(200);
            echo json_encode($result);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Could not find any highscores"]);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo "Error: " . $e->getMessage();
    }
}

function handlePost(PDO $pdo)
{
    $data = json_decode(file_get_contents("php://input"));

    $name = filter_var($data->name, FILTER_DEFAULT);
    $score = filter_var($data->score, FILTER_VALIDATE_INT);

    if ($name && $score) {
        $sql = "INSERT INTO highscores (name, score) VALUES (:name, :score)";

        try {
            $stmt = $pdo->prepare($sql);
            $stmt->bindParam(':name', $name, PDO::PARAM_STR);
            $stmt->bindParam(':score', $score, PDO::PARAM_INT);
            $result = $stmt->execute();

            if ($result === TRUE) {
                http_response_code(200);
                echo json_encode(["message" => "Operation succeeded"]);
            }
        } catch (PDOException $e) {
            http_response_code(500);
            echo "Error: " . $e->getMessage();
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Invalid data"]);
    }
}
