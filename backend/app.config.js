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
    },
  };
  
  module.exports = config;