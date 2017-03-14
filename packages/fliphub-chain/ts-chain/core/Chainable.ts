export class Chainable {
  public shorthands: Array<string>
  constructor(public parent: any) {}

  public end() {
    return this.parent
  }
}

export default Chainable
