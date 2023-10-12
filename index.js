'use strict';

const core = require('@actions/core');
const { ProjectsClient } = require('@google-cloud/resource-manager').v3;

async function run() {
    try {
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
        core.setOutput('project-id', response.name); // You might want to output different information

    } catch (error) {
        // If there's an error, set the action as failed:
        core.setFailed(error.message);
    }
}

// Run the action:
run();
