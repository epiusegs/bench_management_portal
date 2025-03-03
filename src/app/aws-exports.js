const awsmobile = {
    Auth: {
        region: "us-east-1",
        userPoolId: "your-user-pool-id",
        userPoolWebClientId: "your-app-client-id",
        identityPoolId: "your-identity-pool-id",
        oauth: {
            domain: "your-cognito-domain.auth.us-east-1.amazoncognito.com",
            scope: ["openid", "email", "profile"],
            redirectSignIn: "http://localhost:3000/profile",
            redirectSignOut: "http://localhost:3000/login",
            responseType: "code"
        }
    }
};

export default awsmobile;
