const { execSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

'use strict';

const core = require('@actions/core');
const { ProjectsClient } = require('@google-cloud/resource-manager').v3;

async function run() {
    try {
        // Extract credentials from the environment variable and write to a temporary file:
        const creds = process.env.GOOGLE_CREDENTIALS_FILE;
        if (!creds) {
            throw new Error('Credentials are not provided. Set the GOOGLE_CREDENTIALS_FILE environment variable.');
        }

        const credFilePath = path.join(os.tmpdir(), 'gcloud-service-account.json');
        fs.writeFileSync(credFilePath, creds, { encoding: 'utf-8' });

        // Authenticate using the gcloud CLI:
        execSync(`gcloud auth activate-service-account --key-file=${credFilePath}`);

        // Get inputs from the workflow file:
        const projectName = core.getInput('project-name', { required: true });
        const projectId = core.getInput('project-id', { required: true });
        const organizationId = core.getInput('org-id', { required: true });

        // Set up the ProjectsClient and request:
        const resourcemanagerClient = new ProjectsClient();
        const project = {
            projectId: projectId,
            displayName: projectName,
            parent: `organizations/${organizationId}`
        };

        // Run the request to create the project:
        const [operation] = await resourcemanagerClient.createProject({ project });
        const [response] = await operation.promise();

        // Log the response and set the output:
        console.log(response);
        core.setOutput('project-id', response.name);

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
