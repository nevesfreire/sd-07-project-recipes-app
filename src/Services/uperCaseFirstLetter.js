// https://pt.stackoverflow.com/questions/278442/regex-para-deixar-primeira-letra-de-nome-completo-mai%C3%BAsculo-mesmo-com-caractere

export default function UperCaseFirstLetter(text) {
  return text.toLowerCase()
    .replace(/(?:^|\s)(?!da|de|do)\S/g, (letter) => letter.toUpperCase());
}
