import * as React from 'react'
import { useContext, useRef } from 'react'
import { WorkerDataContext } from '../data/WorkerDataProvider'
import { Button, Form } from 'react-bootstrap'
import { FormatAction } from '../data/dataFormattingReducer'
import DropdownWithFilter from '../../shared/components/DropdownWithFilter'
import { pxToRem } from '../../shared/tokens/spacing'

const columnMapLabels: { [s: string]: string } = {
  uniqueIdentifier: 'Unique identifier',
  displayName: 'Display name',
  grouping: 'Grouping',
}

const LoadCSV: React.FC<{
  csvType: 'worker' | 'grouping'
}> = ({ children = 'Load your outreach data', csvType }) => {
  const { convertCsv, dispatch, workersData, groupingsData } =
    useContext(WorkerDataContext)
  const action =
    csvType == 'worker'
      ? FormatAction.LOAD_WORKERS_CSV
      : FormatAction.LOAD_GROUPINGS_CSV
  const convertedCsv = csvType == 'worker' ? workersData : groupingsData
  React.useEffect(() => {
    console.log('CSV has changed', convertCsv)
  }, [convertedCsv, workersData])

  const inputRef = useRef<HTMLInputElement>(null)

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
        </Form.Group>
        {convertedCsv &&
          Object.entries(convertedCsv.columnMap).map(([key, columnLabel]) => (
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
          ))}
      </div>
    </>
  )
}

export default LoadCSV
