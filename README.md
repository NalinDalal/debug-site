This is a [Next.js](https://nextjs.org) project bootstrapped with [
`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

- ### Add the following environment variables in a `.env.local` file in the root of the project:
    - #### get the following from [discord developer portal](https://discord.com/developers/applications)
        - DISCORD_APP_ID
        - DISCORD_PUBLIC_KEY
        - DISCORD_CLIENT_ID
        - DISCORD_CLIENT_SECRET
        - DISCORD_BOT_TOKEN
        - NEXT_PUBLIC_DISCORD_BOT_TOKEN
        - DISCORD_SERVER_ID

```bash
DISCORD_APP_ID=your_app_id_here
DISCORD_PUBLIC_KEY=yout_public_key_here
NEXT_PUBLIC_DISCORD_BOT_TOKEN=yout_bot_token_here
DISCORD_SERVER_ID=yout_server_id_here
DISCORD_CLIENT_ID=yout_client_id_here
DISCORD_CLIENT_SECRET=your_app_id_here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here
DISCORD_BOT_TOKEN=yout_bot_token_here
MONGODB_URI=mongodb://0.0.0.0:27017/debug-oist

```

- ### First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Sample Credential:

Regular User:

- Email: [student@college.edu](mailto:student@college.edu)
- Password: student123

Admin User:

- Email: [admin@college.edu](mailto:admin@college.edu)
- Password: admin123

what is done:

- done with eveything except db
- done with user auth{not implemented any 3rd party}
- done with profiles
- done with sponsors page
- done with team
- done with websockets for chatting
- done with events
- done with notes
- done with timeline page

most of work is done b/w 2:30 pm to 12:00 am 25.12.2024

production branch:

```bash
npm run build
npm run start
```

## what to do next:

- repl.it like code editor
- in house contests like leetcode etc
- discord validatiion and bot automation for subgroup joining via admin request on discord server
- 3rd party auth like Oauth,github,Clerk
- new relic setup for monitoring, logging
- allow for code-editor like repl.it
- Kubernetes Containerization
    - Debugging Steps:
        - Ensure the application is properly containerized and works locally.
        - Check Kubernetes deployment configurations and logs for issues during deployment.
        - Monitor pod health and container logs.
- In House creation and registration for events
