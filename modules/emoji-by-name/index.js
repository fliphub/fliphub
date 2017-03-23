const names = [
  {
    emojis: ['📝', '✏'],
    names: ['todos'],
  },
  {
    emojis: ['🔧🛠🏗'],
    names: ['tooling', 'build'],
  },
  {
    emojis: ['📦'],
    names: ['deps'],
  },
  {
    emojis: ['⬇'],
    names: ['down'],
  },
  {
    emojis: ['⬆'],
    names: ['up'],
  },
  {
    emojis: ['👕'],
    names: ['lint'],
  },
  {
    emojis: ['👾'],
    names: ['simplify'],
  },
  {
    emojis: ['🌊'],
    names: ['flow'],
  },
  {
    emojis: ['🖇'],
    names: ['utils / lib / helpers / library / utilities'],
  },
  {
    emojis: ['⛑,🛡'],
    names: ['safety'],
  },
  {
    emojis: ['⌨️⚒'],
    names: ['typo'],
  },
  {
    emojis: ['🔍'],
    names: ['find', 'search'],
  },
  {
    emojis: ['🐛'],
    names: ['bugs'],
  },
  {
    emojis: ['🚑🐛'],
    names: ['fix-bugs'],
  },
  {
    emojis: ['📖,📚,ℹ️'],
    names: ['documentation / comments / docs / examples'],
  },
  {
    emojis: ['❗❕❓❔‼️⁉️⚠␦'],
    names: ['info'],
  },
]

// - 🔈🔇🙊 - adding logging / reducing logging
// - ⚡🐎🐌 - optimization / perf
// - 🐘🐬 - storage layer / data layer
// - 🗽 - model / computed properties / computed props
// - 💾💽 - save, disc, saving, localstorage
// - ✂️🗑🚮🚯💈 - cleaning / disabling / removing / cutting killing cleaning old cruft / trash / garbage
// - 💅 - polishing
// - 💄🎩🎨🎀 - for code style/sexy/colors/colours/design/fancy
// - ⚙🎚🎛⚡ - options / config / prefs / configuration / preferences / tweaking / fine tuning / adjusting / settings / dials / sliders
// - 🛂 - validation
// - 🌐 - api
// - 🕸 - routing / route / router
// - 🗺📍 - sitemaps / schema / index / navigation
// - ⛓ - connecting / chain
// - 🚼👶👀 - children (react, vue, inferno, html) / view layer / eye / baby
// - 🌀 - animation
// - 🔗 - links, linking, href
// - 🍬🍭🍁 - sugar syntax / es6 / es7 / es / js / wrap
// - 🏛️🏰📐📏 - architecture / structure / measure / refactor
// - 🏭 - factory / factories / design patterns
// - 📼📺 - old code / ancient / artifacts
// - 📒🚚 - renaming/rename/moving/copying files/folders
// - 🚫❌✖️✖︎✗✘✕ - remove / disable / delete / x / close / prevent
// - 👃🐽☢☣🛢🍝 - code smells should be cleaned up / messy / spaghetti code / toxic / bad
// - 🐴🤢👺🤦‍♀️🤦 - stupid jackass hacks / hacky things / bad / dislike / facepalm
// - ⛓🔧🏹 :: 🎯 - aliasing :: specificity / resolving / target
// - ♻️♺♻︎♼▶️◀️ - abstracting / reusability / reuse / combine
// - ⚗☠💀 - experiments / skeletons / dead / death / skull / bones
// - 🚨🔬 - tests
// - 📜 - scripts
// - 🔌 - plugins / middleware
// - 📆📅 - planning
// - 💡 - ideas
// - 📓 - stories / story
// - 📟📋 - pagination / lists / page
// - 🚧 - WIP / work in progress
// - 🏷 - version bump / tag / tagging / release
// - 🔖 - merging code / merge
// - ✨ - new feature
// - ⛴🚢 - shipping
// - 💩 - depreciating
// - 📇 - metadata
// - ♿️ - accessibility
// - 👂📢 - event publishers / listeners / subscribers / handlers
// - ⌛⏳⏲ - time changes such as timeouts or polling / timing
// - 🚈🚆🚂 - network
// - ☕🏴🏳️ - filter things / whitelist / blacklist
// - 🔏🔐🔒🔓 - security
// - 🖥 - cli / command line / command-line / commandline
// - 🤖 - robots / macros /
// - ↩️↪️ - undo redo (e.g. commits)
// - 🔁➰ - loops
// - 🖼️ - images / pictures / polyfills
// - ➕✙✚ - adding / enabling / enable / plus
// - 🤖🎓 - machine learning / ml / ai
// - 🛅 - pack / box
// - 📧 - mail / email / e-mail
// - 🌎🌍🌏🗣 - i18n / language / internationalization / world / globe
// - 👤 - iaam / user / account
// - 💪🙏🔖 - collab with others hi5 hi 5 high5 high 5
// - 🍪 - cookies / tracking
// - 📊📈📉 - charting / graphs
// - 🗂🛒 - organizing / grouping / putting things together
// - 🔮🦄💍 - magic / async / promises
// - 🆒😎🕶️ - cool
// - 😷 - sanitization
// - ⚖️🏋️ - scaling / scale / loader / benchmarks / comparisons
// - 🐣 - nesting
// - 🤣🐦 - mocks / stubs
// - 🏃 🏃‍♀️ - run / runner
// - ✨🚩❄️ - flagging / feature flagging / feature freezing / flags
// - ❄️🙊 - immutables / immutablejs
// - 🍦 - vanilla / vanilla js / defaults
// - 🏄 🏄🏻‍♀️ - onboard / on board / surf
// - 🤾🏻‍♀️  🤾🏻‍♂️ 🏸 ☁️☁︎🔙🔚  - server / cloud / backend / back-end / back end
// - 🤸🏻‍♀️  🤸🏻‍♂️ - splitting code / separating
// - 👍👎 - approve / disapprove / like / dislike / thumbs down thumbs up
// - 👢📌 - bootstrap / entry point
// - 🍑(‿ˠ‿)👣  - bottom / butt / footer / foot / feet / walk / soles / paths /step
// - ⑆ ⑇ ⑈  ⑉ - layout
// - ⌶✎✐ - editing
// - ✔️☑️☒ - done / finishing / complete
// - ⍝ - touch / point
// - ☮️ - compatibility
// - 🌲 - ast, parsing
// - 🏎️ - engine
// - 🔋 - batteries
// - 🍰 - presets / baked in
// - 🖥👑⚔️ - commander / battle / crown / king / queen [commander](https://github.com/tj/commander.js/) / terminal
// - 🕳 🏊🏼‍♂️ 🏊‍♀️ - deep / digging / hole / black hole / advanced / diving deeper / swim
// - 👋 - introduction
// - 🎃 - tips n tricks
// - 💸 - cache
// - 📛 - badge
// #### (could be for validating / formulas / keypad / input)
// - 🔣 - special characters
// - 🔢 - numbers / order
// - 🔤🔡🔠⎁⎂ words / letters
// - 🗝️⎁ - terms / definitions
// - 🇦 🇧 🇨
// - 🇩 🇪 🇫
// - 🇬 🇭 🇮
// - 🇯 🇰 🇱
// - 🇲 🇳 🇴 🇵
// - 🇶 🇷 🇸
// - 🇹 🇺 🇻
// - 🇼 🇽 🇾 🇿


module.exports = function(names) {

}
