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
        handleGet();
        break;
    case 'POST':
        handlePost();
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

function handleGet()
{
    header('Content-Type: application/json');

    echo json_encode(dbAction(
        "SELECT name, score, date FROM highscores ORDER BY score DESC, date ASC LIMIT 10",
        [],
        true
    )->fetchAll(PDO::FETCH_ASSOC));
}

function handlePost()
{
    $data = json_decode(file_get_contents("php://input"));

    $name = filter_var($data->name, FILTER_DEFAULT);
    $score = filter_var($data->score, FILTER_VALIDATE_INT);

    if ($name && $score) {
        $nameDuplicate = dbAction(
            "SELECT id FROM highscores WHERE name = :name AND score < :score",
            [[':name', $name, PDO::PARAM_STR], [':score', $score, PDO::PARAM_INT]],
            true
        )->fetchColumn();

        if ($nameDuplicate) {
            dbAction(
                "UPDATE highscores SET score = :score WHERE id = :id",
                [[':score', $score, PDO::PARAM_INT], [':id', $nameDuplicate, PDO::PARAM_INT]]
            );

            echo json_encode(["message" => "Updated the score of " . $name . " to " . $score]);
        } else {
            $rows = dbAction(
                "SELECT COUNT(*) AS count FROM highscores",
                [],
                true
            )->fetch(PDO::FETCH_ASSOC)['count'];

            if ($rows < 10) {
                dbAction(
                    "INSERT INTO highscores (name, score) VALUES (:name, :score)",
                    [[':name', $name, PDO::PARAM_STR], [':score', $score, PDO::PARAM_INT]]
                );

                echo json_encode(["message" => "Added new highscore"]);
            } else {
                $lowestRanking = dbAction(
                    "SELECT score, id FROM highscores ORDER BY score ASC, date DESC LIMIT 1",
                    [],
                    true
                )->fetchObject();

                if ($score > $lowestRanking->score) {
                    dbAction(
                        "UPDATE highscores SET name = :name, score = :score WHERE id = :id",
                        [[':name', $name, PDO::PARAM_STR], [':score', $score, PDO::PARAM_INT], [':id', $lowestRanking->id, PDO::PARAM_INT]]
                    );

                    echo json_encode(["message" => "Replaced a highscore with new highscore"]);
                }
            }
        }
    } else {
        http_response_code(400);
        echo json_encode(["error" => "Data for name or score is missing"]);
    }
}

function dbAction(string $sql, array $bindings = [], bool $returnStmt = false)
{
    global $pdo;

    try {
        $stmt = $pdo->prepare($sql);

        if ($bindings) {
            for ($i = 0; $i < count($bindings); $i++) {
                $b = $bindings[$i];
                $stmt->bindParam($b[0], $b[1], $b[2]);
            }
        }

        $stmt->execute();

        if ($returnStmt) {
            return $stmt;
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => $e->getMessage()]);

        return false;
    }
}
