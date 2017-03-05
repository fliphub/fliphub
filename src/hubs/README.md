so flags have
- defaults
- subscribe as a hug for things being added to the app
- publish? why do they publish? to do updates to the app?
  if all things are done on init, there is no need
- decorate, when the app is build, then things get decorated





----- todo -----
----

@TODO:
- [ ] test hub

----
~~~
@TODO:
- [ ] caching hub, auto build configs for manifest and such based on rest of config
- [ ] combining multiple files (like gulp merge maybe?)
~~~


~~~
could have a Registrator
that registers things just like a client would

- [ ] these should be resetting their state in init,
      or holding state for all apps

- [ ] clear all listeners when all done
- [ ] clear unused listeners later

~~~


if hubs were registered,
they could handle their own everything
- decorating the box
- subscribing
...

process is
- init (subscribe)
- build
  - defaults
  - decorate
