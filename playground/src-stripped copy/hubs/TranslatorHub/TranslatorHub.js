const AbstractHub = require('../AbstractHub')
const Translator = require('./translation')

class TranslatorHub extends AbstractHub {
  appInit({context, app, helpers, box}) {
    console.log('translator init ' +  app.name + context.name)
    app._keys = Object.keys(app)
    this.translator = new Translator({
      box, context, app,
      helpers: this.helpers,
    })
  }

  decorate() {
    this.translator.translate()
  }
}

module.exports = TranslatorHub
