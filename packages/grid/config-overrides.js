const path = require('path');

module.exports = function override(config, env) {
  /**
   * Add workspace root path for module resolution
   */
  const workspaceRootPath = path.resolve(__dirname, '../../', 'node_modules');
  config.resolve.module.push(workspaceRootPath);

  // console.log(config);
  // debug();

  return config;
};
