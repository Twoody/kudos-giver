# Strava Kudos Giver - Playwright

## Warning
Since the initial concept of using playwright, Strava has introduced recpatcha.
This use of recaptcha limits the previous use of this "bot".

An update to this would probably be to setup a `token`.
The `token` would be an `access token`.
This `access token` might need configured via the strava developer api:
    `https://www.strava.com/oauth/authorize?client_id=YOUR_CLIENT_ID&response_type=code&redirect_uri=YOUR_CALLBACK_URL&scope=read,activity:read`

After the user approves, Strava will redirect to the callback URL specified.
The callback URL will have an authorization code in the query parameters.
Use the authorization code to obtain the `access token`:

```
POST https://www.strava.com/oauth/token
{
    client_id: YOUR_CLIENT_ID,
    client_secret: YOUR_CLIENT_SECRET,
    code: AUTHORIZATION_CODE,
    grant_type: 'authorization_code'
}
```

### Easy console command
Simply open up the devtools, type this out, and hit enter.
You will want to click the `x`'s that show up for your activities.
Pasting code into the console is blocked for some browsers.

```
document.querySelectorAll("[data-testid='kudos_button']").forEach(button => {
if (button.querySelector('[data-testid="unfilled_kudos"]')){
utton.click()
}
});
```

## Setup

1. `npm install`
1. `npx playwright install`
1. `cp .env.example .env`
1. `.env`: **update email and password appropriately**
1. `npm run test`
