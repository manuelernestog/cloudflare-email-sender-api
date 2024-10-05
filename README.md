# Free Email Sender API

Free and open source email sending API with Cloudflare workers and email forwarding.

> Due Cloudflare limitations, with this API you can only send email to [verified email addresses](https://developers.cloudflare.com/email-routing/setup/email-routing-addresses/#destination-addresses).

## Features

- **Send Emails**: Send emails by making a `POST` request to the `/send` endpoint.
- **Authorization**: Secures the endpoint with a Bearer token.
- **JSON Payload**: Accepts email details (`from`, `to`, `subject`, `html`) in JSON format.

## Prerequisites

- [Cloudflare Account](https://dash.cloudflare.com/sign-up)
- [Cloudflare Workers](https://workers.cloudflare.com/)

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install Dependencies

If you're using modules or packages, install them accordingly.

### 3. Configure Wrangler

Update the `wrangler.toml` file:

- Replace `"your-worker-name"` with your desired worker name.
- Replace `"your_authorization_token"` with a secure token for authorization or set manually the `AUTH_TOKEN` environment variable.
- Replace `"your-email@example.com"` with your email address or the destination configured in Cloudflare Email Routing.

### 4. Set Up Environment Variables

The `AUTH_TOKEN` variable is used to validate incoming requests. Set this in your `wrangler.toml` under `[vars]`.

### 5. Bind the Email Service

The `EMAIL` binding is required to use Cloudflare's email service. Ensure you have Email Routing set up in your Cloudflare dashboard.

## Deployment

Deploy the worker using Wrangler:

```bash
wrangler publish
```

## Usage

### Endpoint

- **URL**: `https://your-worker-domain/send`
- **Method**: `POST`
- **Headers**:
  - `Authorization: Bearer your_authorization_token`
  - `Content-Type: application/json`
- **Body**:

  ```json
  {
    "from": "sender@example.com",
    "to": ["recipient@example.com"],
    "subject": "Hello World",
    "html": "<h1>It works!</h1>"
  }
  ```

### Example Request

```bash
curl -X POST https://your-worker-domain/send \
  -H "Authorization: Bearer your_authorization_token" \
  -H "Content-Type: application/json" \
  -d '{
    "from": "sender@example.com",
    "to": ["recipient@example.com"],
    "subject": "Hello World",
    "html": "<h1>It works!</h1>"
  }'
```

### Responses

- **200 OK**: Email sent successfully.
- **400 Bad Request**: Missing required fields or invalid JSON.
- **401 Unauthorized**: Missing or malformed `Authorization` header.
- **403 Forbidden**: Invalid authorization token.
- **404 Not Found**: Endpoint not found.
- **405 Method Not Allowed**: HTTP method not allowed.
- **500 Internal Server Error**: An error occurred on the server.

## License

This project is licensed under the MIT License.
