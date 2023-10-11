/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 450:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 320:
/***/ ((module) => {

module.exports = eval("require")("@google-cloud/resource-manager");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";


const core = __nccwpck_require__(450);
const { ProjectsClient } = (__nccwpck_require__(320).v3);

async function run() {
    try {
        // Get inputs from the workflow file:
        const projectName = core.getInput('project-name', { required: true });
        const projectId = core.getInput('project-id', { required: true });

        // Set up the ProjectsClient and request:
        const resourcemanagerClient = new ProjectsClient();
        const project = {
            name: `projects/${projectId}`,
            projectId: projectId,
            displayName: projectName
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

})();

module.exports = __webpack_exports__;
/******/ })()
;