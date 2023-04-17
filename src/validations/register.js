import * as Yup from "yup";
import { compareAsc, isValid } from "date-fns";

export const useSignupSchema = () =>
  Yup.object({
    name_patient: Yup.string()
      .test(
        "two-words",
        "Nome e sobrenome",
        (value) => value.trim().split(" ").length >= 2
      )
      .required("Nome Obrigatório"),

    name_mother: Yup.string()
      .test(
        "two-words",
        "Nome e sobrenome",
        (value) => value.trim().split(" ").length >= 2
      )
      .required("Nome Obrigatório"),

    birthday: Yup.string()
      .nullable()
      .test("max-date", "Data Inválida", (value) => {
        if (!value) {
          return false;
        }

        const date = new Date(value);

        if (!isValid(date)) {
          return false;
        }

        const result = compareAsc(new Date(), date);

        return result === 1 || result === 0;
      })
      .required("Nascimento Obrigatório"),

    cns: Yup.string()
      .test("cns-is-valid", "CNS Invalido", (cns) => {
        var validaTamanho = cns.length == 15;
        var validaInicio = ["1", "2", "7", "8", "9"].includes(cns[0]);

        if (validaTamanho && validaInicio) {
          //CNS Iniciados em 7, 8 ou 9
          if (["7", "8", "9"].includes(cns[0])) {
            var soma = cns
              .split("")
              .reduce((total, value, index) => total + value * (15 - index), 0);
            return soma % 11 == 0;
          } else {
            //CNS Iniciados em 1, 2
            var pis = cns.substring(0, 11);
            var soma = pis
              .split("")
              .reduce((total, value, index) => total + value * (15 - index), 0);

            var resto = soma % 11;
            var dv = resto == 0 ? 0 : 11 - resto;

            var resultado =
              dv == 10
                ? `${pis}001${11 - ((soma + 2) % 11)}`
                : `${pis}000${dv}`;
            return resultado == cns;
          }
        }
        return false;
      })
      .required("CNS Obrigatorio"),

    cpf: Yup.string()
      .test("cpf-is-valid", "CPF Inválido", (value) => {
        const regex = /([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;

        if (!regex.test(value)) {
          return false;
        }

        const nCpf = value.replace(/[^0-9 ]/g, "").replace(" ", "");

        let digit;
        let sum = nCpf
          .split("")
          .slice(0, 9)
          .reduce((acc, num, index) => {
            acc += parseInt(num) * (10 - index);
            return acc;
          }, 0);

        digit = (sum * 10) % 11;
        digit = digit > 9 ? 0 : digit;

        if (digit !== parseInt(nCpf[9])) {
          return false;
        }

        sum = nCpf
          .split("")
          .slice(0, 10)
          .reduce((acc, num, index) => {
            acc += parseInt(num) * (11 - index);
            return acc;
          }, 0);

        digit = (sum * 10) % 11;
        digit = digit > 9 ? 0 : digit;

        if (digit !== parseInt(nCpf[10])) {
          return false;
        }

        return true;
      })
      .required("CPF Obrigatorio"),
  });
