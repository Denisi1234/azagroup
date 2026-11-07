<?php

declare(strict_types=1);

function respond(int $status, string $message): void
{
    $ok = $status >= 200 && $status < 300;
    http_response_code($status);
    header('Cache-Control: no-store');

    if (strpos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(['ok' => $ok, 'message' => $message]);
        exit;
    }

    header('Content-Type: text/html; charset=utf-8');
    $title = $ok ? 'Enquiry submitted' : 'Enquiry not sent';
    $safeMessage = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
    echo <<<HTML
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>$title | Aza Group</title>
      <link rel="stylesheet" href="css/style.css?v=6" />
    </head>
    <body class="interior-page">
      <main>
        <section class="contact-section">
          <div class="contact-layout">
            <div class="contact-intro">
              <h1>$title</h1>
              <p>$safeMessage</p>
              <a class="offering-link" href="contact.html">Return to Contact Us</a>
            </div>
          </div>
        </section>
      </main>
    </body>
    </html>
    HTML;
    exit;
}

function field(string $name): string
{
    $value = $_POST[$name] ?? '';
    return is_string($value) ? trim($value) : '';
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, 'Please use the Contact Us form to send an enquiry.');
}

if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 65536) {
    respond(413, 'This enquiry is too long. Please shorten your message and try again.');
}

$kinds = ['quote' => 'Quote request', 'general' => 'General enquiry'];
$services = [
    'Aza Akaunting',
    'Fastnetstays',
    'Custom Software Development',
    'Data Science & Analytics',
    'Networking & Structured Cabling',
    'Cybersecurity',
    'Other / Not sure yet',
];

$name = field('name');
$email = field('email');
$company = field('company');
$phone = field('phone');
$kind = field('kind');
$service = field('service');
$message = field('message');

if (
    field('website') !== '' || $name === '' || $message === '' ||
    !isset($kinds[$kind]) || !in_array($service, $services, true) ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) ||
    preg_match('/[\r\n]/', $email) ||
    strlen($name) > 400 || strlen($email) > 254 || strlen($company) > 480 ||
    strlen($phone) > 128 || strlen($message) > 12000
) {
    respond(422, 'Please check the required fields and enter a valid email address before sending.');
}

$recipient = 'info@azagroup.co.tz';
$subject = 'Aza Group website: ' . $kinds[$kind];
$body = implode("\r\n", [
    $kinds[$kind],
    'Product or service: ' . $service,
    'Name: ' . $name,
    'Email: ' . $email,
    'Company or organisation: ' . ($company !== '' ? $company : 'Not provided'),
    'Phone: ' . ($phone !== '' ? $phone : 'Not provided'),
    '',
    'Message:',
    str_replace("\n", "\r\n", str_replace(["\r\n", "\r"], "\n", $message)),
]);
$headers = [
    'From' => 'Aza Group Website <' . $recipient . '>',
    'Reply-To' => $email,
    'MIME-Version' => '1.0',
    'Content-Type' => 'text/plain; charset=UTF-8',
    'Content-Transfer-Encoding' => 'quoted-printable',
];

if (!function_exists('mail') || !@mail($recipient, $subject, quoted_printable_encode($body), $headers)) {
    error_log('Aza Group enquiry mail was not accepted by the mail service.');
    respond(503, 'We could not send your enquiry. Please email info@azagroup.co.tz or call 0624 105 850.');
}

respond(200, 'Thank you. Your enquiry was submitted. We’ll reply using the email address you provided.');
