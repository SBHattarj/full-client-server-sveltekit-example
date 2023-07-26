# Example for package full-client-server-sveltekit

This showcases all the features so far implemented in the package named full-client-server-sveltekit, it's styling is primitive and is not the focus, It tries to show how in a real application this might be used using any database in this case drizzle orm. it also show casses how this can be used while doing progresive enhancements and points out the places where this might not be the best place to use.

## Use Cases
This aims to completely replace the use cases for the fectch api, trying to allow all server usage be done by some fucntions through the usage of node function the default export of the module. It can be used to create sessions for users, manage that session, adding cross browser server eventlisteners, realtime features, etc. It tries to make development as simple as posible and allows one to use the `server:` and `server:npm:` prefixes to tell the transpiler which imports are from server. It doesn't allow any server code to be exposed to browser by transpiling them away. You can tinker with this repo to learn more!
