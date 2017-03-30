export interface IChainable {
  parent: any,
  init?: Function
}

export class Chainable implements IChainable {
  public shorthands?: Array<string>

  constructor(public parent: any) {
    if (this.init) this.init(parent)
  }

  public end() {
    return this.parent
  }
}

export default Chainable
