import { useCallback, useState } from 'react'

import { isomorphicWindow } from '@/utils/browser'

import { useEventListener } from './useEventListener'

export function useKeyPress(targetKey: string): boolean {
  const [keyPressed, setKeyPressed] = useState(false)

  const downHandler = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(true)
      }
    },
    [targetKey]
  )

  const upHandler = useCallback(
    ({ key }: KeyboardEvent) => {
      if (key === targetKey) {
        setKeyPressed(false)
      }
    },
    [targetKey]
  )
  useEventListener(isomorphicWindow, 'keydown', downHandler)
  useEventListener(isomorphicWindow, 'keyup', upHandler)

  return keyPressed
}
