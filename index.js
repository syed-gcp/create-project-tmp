'use strict';

const core = require('@actions/core');
const { ProjectsClient } = require('@google-cloud/resource-manager').v3;

async function run() {
    try {
        // Authentication using GOOGLE_GHA_CREDS_PATH environment variable:
        const credFile = process.env.GOOGLE_GHA_CREDS_PATH;
        if (!credFile) {
            throw new Error('No authentication found, authenticate with `google-github-actions/auth`.');
        }
        process.env.GOOGLE_APPLICATION_CREDENTIALS = credFile;

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
