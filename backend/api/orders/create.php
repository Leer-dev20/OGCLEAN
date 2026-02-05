<?php
require "../utils/headers.php";
require "../../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["error" => "Données invalides"]);
    exit;
}

$pdo->beginTransaction();

try {
    $stmt = $pdo->prepare(
        "INSERT INTO orders (customer_name, phone, address, total)
         VALUES (?, ?, ?, ?)"
    );
    $stmt->execute([
        $data['customer'],
        $data['phone'],
        $data['address'],
        $data['total']
    ]);

    $orderId = $pdo->lastInsertId();

    foreach ($data['cart'] as $item) {
        $stmt = $pdo->prepare(
            "INSERT INTO order_items (order_id, product_id, quantity, price)
             VALUES (?, ?, ?, ?)"
        );
        $stmt->execute([
            $orderId,
            $item['id'],
            $item['quantity'],
            $item['price']
        ]);
    }

    $pdo->commit();
    echo json_encode(["success" => true, "order_id" => $orderId]);

} catch (Exception $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(["error" => "Commande échouée"]);
}
