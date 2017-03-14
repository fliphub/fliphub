@TODO:
  - [ ] move ../ fusebox and webpack into this folder
  - [ ] maybe the bundler just registers the op callback for an app?
        as in fusebundler gets called
        then it context.evts.emit(`ops.compile.handler`, this.ops.compile)

  - [ ] BIG UH OH.
        HOW WOULD IT BE ABLE TO DO THE CONFIG FOR TESTING, DEV-PROD, PROD AT THE SAME TIME?
        - [ ] could automagically build out a config for each op at the beginning!
      - [ ] thankfully this can be done in a later step,
      - [ ] and you can easily make an app that extends another app
