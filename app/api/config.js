"use strict";

const fs = require("fs");

const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");


class Config {

  constructor() {
    this.settings = {};
    this.loadConfig('.env');
    const mode = process.env.NODE_ENV || 'local';
    this.loadConfig(`.env.${mode}`);
    console.log(`Load config in ${mode} mode`);
    this.getSecrets();
  }

  loadConfig(path) {
    if (!fs.existsSync(path)) return;
    fs.readFileSync(path).toString().split('\n').forEach(line => {
      const ax = line.indexOf('=');
      const key = line.slice(0, ax).trim();
      const value = line.slice(ax + 1).trim();
      if (key) this.settings[key] = ax >= 0 && value;
    });
  }

  async getSecrets() {
    const KVUri = this.settings['AZURE_KEY_VAULT_URI'];
    if (!KVUri) return;
    const KVCredential = new DefaultAzureCredential();
    const KVClient = new SecretClient(KVUri, KVCredential);
    for (let key in this.settings) {
      if (!this.settings[key]) {
        const secret = await KVClient.getSecret(key.toLowerCase().replace(/_/g, '-'));
        this.settings[key] = secret.value;
        console.log(`Get secret from Azure Key Vault: ${key}`);
      }
    }
  }

  getDBConfig() {
    return {
      authentication: {
        options: {
          userName: this.settings["AZURE_SQL_USERNAME"],
          password: this.settings["AZURE_SQL_PASSWORD"]
        },
        type: "default"
      },
      server: this.settings["AZURE_SQL_SERVER"],
      options: {
        database: this.settings["AZURE_SQL_DATABASE"],
        encrypt: true
      }
    };
  }

  getPowerBIConfig(reportName) {
    reportName = reportName.toLowerCase().replace(/\&/g, 'and').replace(/[^1-9a-z]+/g, '');
    const reportIdKey = Object.keys(this.settings).find(key => {
      return key.toLowerCase().replace(/[^1-9a-z]+/g, '') === `pbireportid${reportName}`;
    });
    return {
      apiUrl: "https://api.powerbi.com/",
      workspaceId: this.settings["PBI_WORKSPACE_ID"],
      reportId: this.settings[reportIdKey]
    };
  }

  getAuthConfig() {
    return {
      authenticationMode: "ServicePrincipal",
      authorityUri: "https://login.microsoftonline.com/common/v2.0",
      scope: "https://analysis.windows.net/powerbi/api",
      clientId: this.settings["AZURE_APP_CLIENT_ID"],
      clientSecret: this.settings["AZURE_APP_CLIENT_SECRET"],
      tenantId: this.settings["AZURE_TENANT_ID"]
    };
  }

  getJWTOptions() {
    return {
      audience: this.settings["VUE_APP_CLIENT_ID"]
    };
  }
}

const config = new Config();
module.exports = config;
