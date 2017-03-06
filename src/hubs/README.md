hubs are registered and their lifecycles allow
hubs decorate bottom up which makes it easier

- init (subscribe)
- build
  - decorating the box: when the box is created, hubs can decorate the box (Composite decorator pattern)
  - decorate app: when the app is build, then things get decorated
  - app defaults
  - subscribing, registering sub subscribers, and handling
