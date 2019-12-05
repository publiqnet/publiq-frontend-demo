## How To Setup Project

### Install Node.js and Angular Cli
 + `install node (my current version - v10.15.3)`
 + `install angular cli (npm install -g @angular/cli@8.3.17)`


### Clone Project From GitHub

 + `git clone https://github.com/publiqnet/publiq-frontend-demo.git`

## Installing dependencies 

 + Remove from package.json
```console
   "helper-lib": "file:shared-angular-workspace/dist/helper-lib",
   "ui-lib": "file:shared-angular-workspace/dist/ui-lib",
```
 + Run
 ```console
    npm install
    npm run build:libs
 ```
 
  + Add to package.json
 ```console
    "helper-lib": "file:shared-angular-workspace/dist/helper-lib",
    "ui-lib": "file:shared-angular-workspace/dist/ui-lib",
 ```
 
 + Run
  ```console
     npm install
  ```

## Running project
 + Run
  ```console
     run local - npm run pp:serve,
     run stage - npm run pp:start:stage,
     run prod - npm run pp:start:prod
  ```
