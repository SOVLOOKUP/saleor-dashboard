import {
  Card,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import ResponsiveTable from "@saleor/components/ResponsiveTable";
import Skeleton from "@saleor/components/Skeleton";
import TableRowLink from "@saleor/components/TableRowLink";
import { LanguageFragment } from "@saleor/graphql";
import { makeStyles } from "@saleor/macaw-ui";
import React from "react";
import { FormattedMessage } from "react-intl";

import { maybe, renderCollection } from "../../../misc";

export interface TranslationsLanguageListProps {
  languages: LanguageFragment[];
  getRowLink: (code: string) => string;
}

const useStyles = makeStyles(
  {
    capitalize: {
      textTransform: "capitalize"
    },
    link: {
      cursor: "pointer"
    }
  },
  { name: "TranslationsLanguageList" }
);

const TranslationsLanguageList: React.FC<TranslationsLanguageListProps> = props => {
  const { languages, getRowLink } = props;

  const classes = useStyles(props);

  return (
    <Card>
      <ResponsiveTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <FormattedMessage defaultMessage="Language" />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderCollection(
            languages,
            language => (
              <TableRowLink
                data-test-id={language ? language.code : "skeleton"}
                className={!!language ? classes.link : undefined}
                hover={!!language}
                key={language ? language.code : "skeleton"}
                href={getRowLink(language.code)}
              >
                <TableCell className={classes.capitalize}>
                  {maybe<React.ReactNode>(
                    () => language.language,
                    <Skeleton />
                  )}
                </TableCell>
              </TableRowLink>
            ),
            () => (
              <TableRow>
                <TableCell colSpan={1}>
                  <FormattedMessage defaultMessage="No languages found" />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};
TranslationsLanguageList.displayName = "TranslationsLanguageList";
export default TranslationsLanguageList;
