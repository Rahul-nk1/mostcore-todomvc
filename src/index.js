// @flow
// TODO:
// 1. Add AppStateWithCompletedCount type and derive it from AppState
//    via action stream
// 2. Use CSS to show/hide
import { skipRepeats, map, mergeArray, scan, runEffects } from '@most/core'
import { newDefaultScheduler } from '@most/scheduler'
import { hashchange } from '@most/dom-event'
import { bind } from 'hyperhtml'

import { emptyApp, setFilter } from './model'
import { updateView } from './view'
import { type Action, handleFilterChange, runAction } from './action'
import { createHyperEventAdapter } from './hyperEventAdapter'

const fail = (s: string): empty => { throw new Error(s) }
const qs = (s: string, el: Document): Element => el.querySelector(s) || fail(`${s} not found`)

const appNode = qs('.todoapp', document)
const appState = emptyApp
const scheduler = newDefaultScheduler()

const [addAction, todoActions] = createHyperEventAdapter(scheduler)

const updateFilter = map(handleFilterChange, hashchange(window))

const actions = mergeArray([todoActions, updateFilter])

const stateUpdates = skipRepeats(scan(runAction, appState, actions))
const viewUpdates = scan(updateView(addAction), appNode, stateUpdates)

runEffects(viewUpdates, scheduler)
