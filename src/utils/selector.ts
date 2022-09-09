export class Selector {
  static byQaId(attribute: string) {
    return `[data-qa-id="${attribute}"]`
  }
}
