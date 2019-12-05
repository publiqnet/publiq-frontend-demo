## How To Setup Publishing Platform Frontend

### Install Node.js and Angular Cli
 + `install node (my current version - v10.15.3)`
 + `install angular cli (npm install -g @angular/cli@8.3.17)`

### Clone Project From GitHub

 + `git clone https://github.com/publiqnet/publiq-frontend-demo.git`

## Installing dependencies 

 + Remove from package.json
```
   "helper-lib": "file:shared-angular-workspace/dist/helper-lib",
   "ui-lib": "file:shared-angular-workspace/dist/ui-lib",
```
 + Run
 ```
    npm install
    npm run build:libs
 ```
 
  + Add to package.json
 ```
    "helper-lib": "file:shared-angular-workspace/dist/helper-lib",
    "ui-lib": "file:shared-angular-workspace/dist/ui-lib",
 ```
 
 + Run
  ```
     npm install
  ```
### Set parameters in environment.ts (environment.stage.ts, environment.prod.ts) 
```
    production: false, (true for production mode)
    backend: 'https://stage-mainnet-state.publiq.network', (backend url)
    oauth_backend: 'https://stage-mainnet-oauth.publiq.network', (do not change if you gonna use PUBLIQ oAUTH)
    froala_editor_key: '1D4I4C10B6eF5C4C3E3E2C2A5D6A3A1xusedc1D-17C6F-11dzj==', (froala editor key)
    google_analytics_id: 'NUA-99830524-3', (google analytics id)
    main_site_url: 'https://stage-mainnet.publiq.site', (current website url)
    wallet_url: 'https://wallet.publiq.network/user/login', (wallet website url)
    explorerAddress: 'https://explorer.publiq.network', (explorer website url)
    coinName: 'TPBQ' (coin name, for production mode it's PBQ)
```

## Running project
 + Run
  ```
     run project on local - `npm run pp:serve`, (configs from environment.ts)
     run project on stage - `npm run pp:start:stage`, (configs from environment.stage.ts)
     run project on prod - `npm run pp:start:prod`, (configs from environment.prod.ts)
  ```
