import { FC, useContext, useEffect, useMemo, useState } from 'react'
import {
  Button,
  ButtonGroup,
  Dropdown,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  ToggleButton,
} from 'react-bootstrap'
import * as DropdownMenu from 'react-bootstrap/lib/DropdownMenu'
import DropdownWithFilter from '../../../shared/components/DropdownWithFilter'
import ListOfColumns from '../../../shared/components/ListOfColumns'
import { pxToRem } from '../../../shared/tokens/spacing'
import { FormatAction } from '../../data/dataFormattingReducer'
import { WorkerDataContext } from '../../data/WorkerDataProvider'
import { StarOptionsKeys, Value } from '../../types'
import { configTitleClass } from '../styles'
import ColorGrid from './ColorGrid'

let colorsList = ['orange', 'red', 'blue', 'green', 'purple', 'yellow']

const StarOptionsForm: FC<{ starIndex: number }> = ({ starIndex = 0 }) => {
  const { workersData, dispatch, chartOptions } = useContext(WorkerDataContext)

  const column = chartOptions.stars[starIndex]?.column
  const active = chartOptions.stars[starIndex]?.use

  const value = useMemo<Value>(
    () => chartOptions.stars[starIndex]?.value,
    [chartOptions, starIndex]
  )

  const possibleValues = useMemo<Set<Value>>(
    () => workersData?.listValues(column) || new Set(),
    [column, workersData]
  )

  const starColor = useMemo<string>(
    () => chartOptions.stars[starIndex]?.color,
    [chartOptions, starIndex]
  )

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Check
            id={`use-star-${starIndex + 1}`}
            type="switch"
            label={`Use Star ${starIndex + 1}`}
            checked={active}
            onChange={() => {
              dispatch({
                type: FormatAction.SET_STAR_OPTION,
                optionType: StarOptionsKeys.USE,
                value: !active,
                starIndex,
              })
            }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="star-options-label">
            Label for legend
            <Form.Control name="star-options-label" disabled={!active} />
          </Form.Label>
        </Form.Group>
        <ListOfColumns
          onSelect={(eventKey) => {
            dispatch({
              type: FormatAction.SET_STAR_OPTION,
              optionType: StarOptionsKeys.COLUMN,
              value: `${eventKey}`,
              starIndex,
            })
          }}
          toggleText={column || '------'}
          columnList={workersData?.columns || []}
          disabled={!active}
        />

        {column && (
          <DropdownWithFilter
            list={[...possibleValues].map((v) => `${v}`)}
            onSelect={(eventKey) => {
              dispatch({
                type: FormatAction.SET_STAR_OPTION,
                optionType: StarOptionsKeys.VALUE,
                value: eventKey,
                starIndex,
              })
            }}
            label={'Value'}
            toggleText={`${chartOptions.stars[starIndex].value}` || ''}
          />
        )}

        {column && (
          <Form.Group key={`${value}`}>
            <Form.Label htmlFor="star-options-column">
              Value
              <Dropdown
                role="select"
                onSelect={(eventKey) => {
                  dispatch({
                    type: FormatAction.SET_STAR_OPTION,
                    optionType: StarOptionsKeys.VALUE,
                    value: eventKey,
                    starIndex,
                  })
                }}
              >
                <Dropdown.Toggle value={'Name'} disabled={!active}>
                  {value || '------'}
                </Dropdown.Toggle>
                <Dropdown.Menu role="select">
                  {[...possibleValues].map((v) => (
                    <Dropdown.Item key={`${v}`} eventKey={`${v}`}>
                      {v || '(No value)'}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Label>
          </Form.Group>
        )}
        <Form.Group>
          <Form.Label>
            Color
            <ColorGrid
              generateOnClick={(color) => () => {
                dispatch({
                  type: FormatAction.SET_STAR_OPTION,
                  optionType: StarOptionsKeys.COLOR,
                  value: color,
                  starIndex,
                })
              }}
              noText
              disabled={!active}
            />
          </Form.Label>
        </Form.Group>
      </Form>
    </div>
  )
}

export default StarOptionsForm
