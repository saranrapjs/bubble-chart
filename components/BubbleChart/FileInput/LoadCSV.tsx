import * as React from 'react'
import type { DSVRowArray } from 'd3-dsv';
import { useContext, useRef } from 'react'
import { Button, Form } from 'react-bootstrap'
import { WorkerDataContext } from '../data/WorkerDataProvider'
import { FormatAction } from '../data/dataFormattingReducer'
import DropdownWithFilter from '../../shared/components/DropdownWithFilter'
import { pxToRem } from '../../shared/tokens/spacing'

declare global {
  interface Window {
    tokenClient?: google.accounts.oauth2.TokenClient;
  }
}

function toDSV(headers: string[], rows: string[][]): DSVRowArray<string> {
  // @ts-expect-error
  const res: DSVRowArray<string> = rows.map(row => 
    Object.fromEntries(Object.values(headers).map((key, i) => [key, row[i]]))
  );

  res.columns = headers;

  return res;
}

async function loadSheet(spreadsheetId: string) {
  console.warn('loading shset', spreadsheetId)
  let response;
  try {
    const spread = await gapi.client.sheets.spreadsheets.get({
      spreadsheetId,
    });
    const sheet = spread.result?.sheets?.find(sh => sh.properties?.sheetId === 0);
    if (!sheet) throw new Error('couldnt find default sheet');
    // Fetch first 10 files
    response = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId,
      range: sheet?.properties?.title || '',
    });
  } catch (err) {
    console.error(err);
    return;
  }
  const range = response.result;
  if (!range || !range.values || range.values.length == 0) {
    return;
  }
  return toDSV(range.values[0], range.values.slice(1));
}

function onSheetsClick(sheetId: string) {
  return new Promise<DSVRowArray<string>>(resolve => {
    if (window.tokenClient) {
      // @ts-expect-error
      window.tokenClient.callback = async (resp) => {
        if (resp.error !== undefined) {
          throw (resp);
        }
        const result = await loadSheet(sheetId);
        if (result) resolve(result);
      };
      if (gapi.client.getToken() === null) {
        // Prompt the user to select a Google Account and ask for consent to share their data
        // when establishing a new session.
        window.tokenClient.requestAccessToken({ prompt: 'consent' });
      } else {
        // Skip display of account chooser and consent dialog for an existing session.
        window.tokenClient.requestAccessToken({ prompt: '' });
      }
    }
  })
}

const columnMapLabels: { [s: string]: string } = {
  uniqueIdentifier: 'Unique identifier',
  displayName: 'Display name',
  primaryGrouping: '1st Grouping',
  secondaryGrouping: '2nd Grouping (optional)',
}

const LoadCSV: React.FC<{
  csvType: 'worker' | 'grouping'
}> = ({ children = 'Load your outreach data', csvType }) => {
  const { convertCsv, dispatch, workersData } = useContext(WorkerDataContext)
  const action = FormatAction.LOAD_WORKERS_CSV

  const convertedCsv = workersData

  const inputRef = useRef<HTMLInputElement>(null)

  const [maybeSheets, setSheets] = React.useState('');

  return (
    <>
      <div>
        {children}

        <Form.Group>
          <Form.Label htmlFor={`${csvType}-data"`}>
            <Form.Control
              size="sm"
              className={'form-control'}
              ref={inputRef}
              type="file"
              name={`${csvType}-data"`}
              accept=".csv"
              placeholder={'Choose a CSV file with your worker data'}
              onChange={() => {
                if (!inputRef.current) return
                const files = inputRef.current.files
                if (files) {
                  convertCsv(action, files)
                }
              }}
            />
          </Form.Label>
          <Form.Label>
            <Button
              variant={'secondary'}
              size="sm"
              style={{ marginBottom: pxToRem(4), marginLeft: pxToRem(6) }}
              onClick={() => {
                dispatch({ type: FormatAction.LOAD_EXAMPLE_DATA })
              }}
            >
              ...or load example data
            </Button>
          </Form.Label>
          <Form.Label>
            <Form.Control
              size="sm"
              className={'form-control'}
              type="text"
              value={maybeSheets}
              onChange={e => {
                setSheets(e.target.value);
              }}
            />
            <Button
              variant={'secondary'}
              size="sm"
              style={{ marginBottom: pxToRem(4), marginLeft: pxToRem(6) }}
              onClick={async () => {
                const sheetMatch = maybeSheets.match(/spreadsheets\/d\/(.*)\/edit/);
                if (sheetMatch) {
                  const res = await onSheetsClick(sheetMatch[1]);
                  console.warn('res', res);
                  dispatch({ type: FormatAction.LOAD_WORKERS_CSV, parsedData: res });                
                }
              }}
            >
              Load from Sheets
            </Button>
          </Form.Label>
        </Form.Group>

        {convertedCsv && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns:
                'max-content max-content max-content max-content',
              gridGap: pxToRem(20),
            }}
          >
            {Object.entries(convertedCsv.columnMap).map(
              ([key, columnLabel]) => (
                <DropdownWithFilter
                  id={`${key}-dropdown-for-csv`}
                  list={convertedCsv.columns || []}
                  label={columnMapLabels[`${key}`]}
                  key={key}
                  toggleText={columnLabel || 'Select column...'}
                  onSelect={(eventKey) => {
                    dispatch({
                      type: FormatAction.SET_COLUMN_MAP,
                      columnMap: {
                        [key]: eventKey,
                      },
                      listFromCsv: convertedCsv,
                    })
                  }}
                />
              )
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default LoadCSV
