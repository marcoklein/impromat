import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "urql";
import { graphql } from "./graphql-client";

const LanguageUpdate_Query = graphql(`
  query LanguageUpdate_Query {
    me {
      id
      languageCodes
    }
  }
`);

export function useLanguageUpdateEffect() {
  const { i18n } = useTranslation();
  const [languageQueryResult] = useQuery({
    query: LanguageUpdate_Query,
  });
  useEffect(() => {
    const languageCode = languageQueryResult.data?.me?.languageCodes[0];
    if (languageCode) {
      i18n.changeLanguage(languageCode);
    }
  }, [languageQueryResult.data?.me?.languageCodes, i18n]);
}
