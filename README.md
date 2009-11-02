# Observations
## Protocols
- <chrome://> can't have content privilege. (or rather, type="content" isn't responsible for it).
- <data:text/html,> inherits the previous location's privilege.
- <file://> can XHR itself, while <resource://> can't.
