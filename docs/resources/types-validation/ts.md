should make a medium article

- usually requires a multi-step build system where you have to build ts, and then build again with babel or other which overcomplicates things
- having to do `* as pkg` (`* as path, * as fs`), along with different exporting, which follow different standards than what is common in the industry often causing things to break with importing or exporting
- it is not used by many large projects: aside from Angular and Inferno, there are not many using it.
- flow has all functionality typescript provides, yet can be stripped out without messing your code, and is not a multi-step build system
- not understanding spread syntax on maps with es5 target (which contributes to point #1),
- not understanding if I pass in a string or string[] or Array<string> and cast a string to an array that it can be looped
- trying to enforce rules that would be required in an actually strongly typed language on a super loosely typed language, which is trying to make a language seem like something that it is not, which in turn reduces many of the benefits the language has to offer, and often reduces iteration ability aka slows development speed
- not understanding multi inheritence with public properties defined on constructors - constructor(public parent: any) yet in 3 classes down the class says property "parent" is not on class ThreeDown
- is a superset, which are prone to go extinct when language syntax improves (coffeescript, livescript) made by microsoft, also prone to go extinct (silverlight).
- on average in my experience I have seen many more people have problems with it than babel or the like while I've purposefully been watching for the things that cause the most problems with build systems while building fliphub
- does force reformatting your code when you compile,
- it is very very slow (multiple times slower) when compiling large files compared to babel
- does not offer runtime validation, such as  
  - https://codemix.github.io/flow-runtime/#/babel-plugin-flow-runtime
  - https://github.com/gcanti/babel-plugin-tcomb

- having to run dist every time I want to just run a node file,

https://djcordhose.github.io/flow-vs-typescript/2016_hhjs.html#/
https://medium.com/@basarat/typescript-vs-flowlang-caee1386b4fc#.mez8520cx
https://codemix.github.io/flow-runtime/#/babel-plugin-flow-runtime
https://nuclide.io/
https://egghead.io/lessons/react-setup-nuclide-to-use-flow-and-eslint-mac

- can be compiled to lower with ocaml https://github.com/facebook/flow/issues/1619


7. the lack of runtime is actually a pro for me, bc JS ecosystem has enuf runtime bloat :disappointed:
overall the build ecosystem around TS sucks I totally agree
1. yeah the build system is pretty bad right now :disappointed:
2. the `* as pkg` is actually "correct", bc of incompatibility btwn commonjs & ES modules, what babel is doing is actually wrong
3. TS is mainly used at the application level, where business logic is a lot trickier than lib w/ a well-defined set of requirements, lots of big websites are written in TS
once spec's finalized, babel will have to make backwards-incompat change
and that ain't gon be nice
4. TS is a lot more mature than Flow in terms of typedefs. If anything I think Flow'll fade away
I mean the guy who made TS made C#, and afaik a lot of people have more confidence in him
5. TS is not strongly typed (or meant to be), it's duck-typing, like Python
6. Multi-inheritence is debatable, C++ has templates, Java doesn't support it, Python has mixins
not supporting multi-inheritence is not a cons imo
