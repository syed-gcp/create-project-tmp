const core = require('@actions/core');
const { Resource } = require('@google-cloud/resource-manager');

async function run() {
  try {
    // Get inputs from the workflow file:
    const projectName = core.getInput('project-name', { required: true });
    const projectId = core.getInput('project-id', { required: true });

    // Initialize Google Cloud Resource Manager:
    const resource = new Resource();

    // Create a new project:
    const project = await resource.createProject({
      name: projectName,
      projectId: projectId
    });

    // Output the project ID:
    core.setOutput('project-id', project.id);

  } catch (error) {
    // If there's an error, set the action as failed:
    core.setFailed(error.message);
  }
}

// Run the action:
run();
