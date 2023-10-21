export default function slugify(str: string) {
  let string = str
  string = string.replace(/^\s+|\s+$/g, "") // trim
  string = string.toLowerCase() // lowercase

  // remove accents, swap ñ for n, etc
  const from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;"
  const to = "aaaaeeeeiiiioooouuuunc------"
  for (let i = 0, l = from.length; i < l; i++) {
    string = string.replace(new RegExp(from.charAt(i), "g"), to.charAt(i))
  }

  string = string
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-") // collapse dashes

  return string
}
