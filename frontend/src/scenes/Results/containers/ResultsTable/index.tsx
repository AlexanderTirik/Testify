import React, { FunctionComponent, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { ReactComponent as Check } from '../../../../assets/images/check.svg';
import { ReactComponent as Cross } from '../../../../assets/images/close.svg';
import { IBindingCallback } from '../../../../common/models/callback/IBindingCallback';
import { IResult } from '../../../../common/models/results/IResult';
import { IAppState } from '../../../../common/models/store/IAppState';
import { LoaderWrapper } from '../../../../components/LoaderWrapper';
import { fetchResultsRoutine } from '../../routines';
import styles from './styles.module.sass';

interface IProps {
  isLoading: boolean;
  fetchResults: IBindingCallback<string>;
  match: {
    params: {
      testId: string;
    };
  };
  results: IResult[];
}

const ReslutsTable: FunctionComponent<IProps> = ({ isLoading, fetchResults, match, results }) => {
  useEffect(() => {
    const { testId } = match.params;
    fetchResults(testId);
  }, []);
  console.log(!results.length);
  return (
    <LoaderWrapper loading={isLoading || !results.length}>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>
              <span>
                <FormattedMessage id="results.name" defaultMessage="Student name" />
              </span>
            </th>
            {results.length ? results[0].correctness.map((a, n) => (
              <th>
                <span>
                  <FormattedMessage id="results.question" defaultMessage="Q {n}" values={{ n }} />
                </span>
              </th>
            )) : null}
          </tr>
        </thead>
        <tbody>
          {results.map((r, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>{r.user.displayName}</td>
              {r.correctness.map(c => <td className={styles.answerIcon}>{c ? <Check /> : <Cross />}</td>)}
            </tr>
          ))}
        </tbody>
      </Table>
    </LoaderWrapper>
  );
};

const mapStateToProps = ({ results }: IAppState) => ({
  results: results.results,
  isLoading: results.isLoading
});

const mapDispatchToProps = {
  fetchResults: fetchResultsRoutine
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReslutsTable);

