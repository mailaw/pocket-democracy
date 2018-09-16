
# Watson News Intelligence starter kit [![](https://img.shields.io/badge/bluemix-powered-blue.svg)](https://bluemix.net)

The Watson News Intelligence starter kit for Node.js visualizes the results of [Discovery](https://www.ibm.com/watson/services/discovery) queries. The app searches [Discovery News](https://www.ibm.com/watson/services/discovery-news) data to get insights from the news, including related concepts, entities, and sentiment trends.

## Getting started

### Running locally

These instructions are for running locally with Node.js. You can also [run locally with Docker](#running-locally-with-docker).

1. Install [Node.js](https://nodejs.org) ([LTS](https://github.com/nodejs/Release) supported versions). 

1. At the command line, go to your project directory.

1. Install the dependencies:

    ```sh
    npm install
    ```

1. Start the app:

    ```sh
    npm start
    ```

1. Point your browser to [localhost:3000](http://localhost:3000).

### Testing the application

Enter a company name in the search bar to query Watson Discovery News through the app. Each panel on the page contains a visual presentation of insights derived from the API response. Press **View Query** in each panel to view the parameters of the API request and the response in JSON form.

### Deploying to IBM Cloud as a CloudFoundry application

1. Login to IBM Cloud with the [IBM Cloud CLI](https://console.bluemix.net/docs/cli/index.html#overview):

    ```
    ibmcloud login
    ```

1. Target a Cloud Foundry organization and space:

    ```
    ibmcloud target --cf
    ```

1. Deploy the application:

    ```
    ibmcloud dev deploy
    ```
    The application will be deployed with the settings in your *manifest.yml* file.

1. Access your app at the URL specified in the command output.

    After your app is deployed, you can manage it from your [IBM Cloud dashboard](https://console.bluemix.net/dashboard/apps).
    
### Directory structure

```none
.
├── .bluemix                        // bluemix files
├── chart                           // helm chart files for Kubernetes
├── public                          // static resources
├── server                          // server app
│   ├── config                      // express configuration
│   ├── routers                      // express routers
│   ├── services                     // express services
|   └── server.js                    // entry point
├── test                             // tests
├── manifest.yml
├── package.json
└── views                           // react components
```
    
## Managing your project in the Watson Console

Select your project from the [Apps list](https://console.bluemix.net/developer/watson/apps) in the Watson developer console. From the project page, you can do the following:

    - Add additional services to your project
    - View documentation and credentials for your project's services
    - Configure a DevOps toolchain

## Running locally with Docker

1. Install the [IBM Cloud CLI tools](https://console.bluemix.net/docs/cli/index.html#overview).

1. If you installed any node dependencies into your project folder, remove them. Open a terminal and run the following command from your project folder, where your starter kit code is:

    ```sh
    rm -rf node_modules
    ```

1. Build the Docker container:

    ```sh
    ibmcloud dev build
    ```
    The build may take a few minutes to complete.

1. Run the Docker container:

    ```sh
    ibmcloud dev run
    ```

1. Point your browser to [localhost:3000](http://localhost:3000).

## License

  This sample code is licensed under Apache 2.0.

## Open Source @ IBM

  Find more open source projects on the [IBM Github Page](http://ibm.github.io/)
