# Angular Multiple-module Application template

Angular application template, that contains basic structure for applications that use multiple modules and authentication.

## Authentication

Basic architecture provides authentication service, token interceptor and auth guard. Also it has default auth page with username and password fields.

## Suggested modules structure
Modules should be lazy loaded. If some components need to be used in multiple different modules, you could create particular module for this component and place it to ```modules/components``` folder.
Each module should have this folder structure:
```
module
	pages
	components
	modules
		shared
			components
			modules
			...
	...
```