import { useField, defineRule, configure } from "vee-validate";
import AllRules from "@vee-validate/rules";

import { setLocale, localize } from "@vee-validate/i18n";

import en from "@vee-validate/i18n/dist/locale/en.json";
import pt_BR from "@vee-validate/i18n/dist/locale/pt_BR.json";

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize({
    pt_BR,
    en,
  }),
  validateOnInput: true,
});

setLocale("pt_BR");

export const useVeeField = ({ name, rules, initialValue }) =>
  useField(name, rules, { initialValue });
