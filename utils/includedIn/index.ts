export default (collection: any[]) => (subject: any): boolean =>
  collection.indexOf(subject) !== -1
