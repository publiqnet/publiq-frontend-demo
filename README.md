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

## Running project
 + Run
  ```
     run project on local - `npm run pp:serve`, (configs from environment.ts)
     run project on stage - `npm run pp:start:stage`, (configs from environment.stage.ts)
     run project on prod - `npm run pp:start:prod`, (configs from environment.prod.ts)
  ```
