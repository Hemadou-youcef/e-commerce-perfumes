<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
</head>

<body>
    <!-- explode("\n", $contact['message']) -->
    @foreach (explode("\n", $contact['message']) as $line)
        <p>{{ $line }}</p>
    @endforeach

</body>

</html>