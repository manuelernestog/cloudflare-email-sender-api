# Free Email Sending API

Free and open source email sending API with Cloudflare workers and email forwarding.

## Features

- **Send Emails**: Send emails by making a `POST` request to the `/send` endpoint.
- **Authorization**: Secures the endpoint with a Bearer token.
- **JSON Payload**: Accepts email details (`from`, `to`, `subject`, `html`) in JSON format.

## Prerequisites

- [Cloudflare Account](https://dash.cloudflare.com/sign-up)
- [Cloudflare Workers](https://workers.cloudflare.com/)

## Setup

### 1. Activate Cloudflare Email Routing

- Log in to your Cloudflare dashboard.
- Select the domain you wish to use.
- Navigate to **Email** > **Email Routing**.
- Follow the instructions to set up Email Routing for your domain.
- Ensure that you have verified your domain and configured any necessary DNS records.
- Set up any custom addresses and specify the destination email addresses.

### 2. Create Environment Variables

- In your Cloudflare dashboard, go to **Workers**.
- Select **Manage Workers** and click on your worker or create a new one.
- In the worker's settings, navigate to **Variables** > **Environment Variables**.
- Add a new variable named `AUTH_TOKEN` and set its value to your desired authorization token.

### 3. Create the Worker

- In the **Workers** section of your Cloudflare dashboard, click **Create a Service**.
- Choose **Start from scratch**, name your worker, and click **Create service**.
- In the worker's editor, replace the default code with the following:

[worker.js](/worker.js)

- Click on **Save and Deploy** to deploy your worker.

### 4. Bind the Email Service

- In the worker's settings, navigate to **Settings** > **Add binding**.
- Under **Type**, select **Email**.
- Set the **Variable name** to `EMAIL`.
- Configure the email binding to use your email routing settings or destination address.
- Save the binding.

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
