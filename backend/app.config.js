const config = {
    auth: {
      google: {
        clientId:
          process.env.GOOGLE_CLIENT_ID || "177675535827-2bl1tgt56b4jaumq54jqqdm1dv3t3q1r.apps.googleusercontent.com",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "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",
        redirectUri: process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/callback/google",
        tokenEndpoint: "https://oauth2.googleapis.com/token",
        scope: "openid",
      },

      oid: {
        clientId:
          process.env.OID_CLIENT_ID || "mycid",
        clientSecret: process.env.OID_CLIENT_SECRET || "mycsecret",
        redirectUri: process.env.OID_REDIRECT_URI || "http://localhost:3000/callback/oid",
        tokenEndpoint: "http://localhost:4000/api/user/token",
        scope: "openid",
      },

      github: {
        clientId: process.env.GITHUB_CLIENT_ID || "a6b3d8e1c2c6c193dac2",
        clientSecret: process.env.GITHUB_CLIENT_SECRET || "7c566a9529bc9ef3dee18af40e183ec31e768291",
        redirectUri: process.env.GITHUB_REDIRECT_URI || "http://localhost:3000/callback/github",
        tokenEndpoint: "https://github.com/login/oauth/access_token",
        scope: "user",
        userEndpoint: "https://api.github.com/user", // need this if provider is OAuth compatible only
        user_id: "id",
      },

      spotify: {
        clientId: process.env.SPOTIFY_CLIENT_ID || "d4057ca6c39b408496e9a83ecabe4b4a",
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "0b57a0786e4f4cf0b7d09cdbbee3f6e6",
        redirectUri: process.env.SPOTIFY_REDIRECT_URI || "http://localhost:3000/callback/spotify",
        tokenEndpoint: "https://accounts.spotify.com/api/token",
        scope: "user",
        userEndpoint: "https://api.spotify.com/v1/me", // need this if provider is OAuth compatible only
        user_id: "id",
      },
    },
  };
  
  module.exports = config;