import React, { FC, ReactNode, useCallback, useMemo, useContext } from 'react'

export interface State {
  displaySidebar: boolean,
  displayLoader: boolean,
  displayModal: boolean,
  modalContent: ReactNode
}

const initialState = {
  displaySidebar: false,
  displayLoader: false,
  displayModal: false,
  modalContent: null,
}

type Action =
  | {
    type: 'OPEN_SIDEBAR'
  }
  | {
    type: 'CLOSE_SIDEBAR'
  }
  | {
    type: 'SHOW_LOADER'
  }
  | {
    type: 'HIDE_LOADER'
  }
  | {
    type: 'TOGGLE_SIDEBAR'
  }
  | {
    type: 'OPEN_MODAL'
  }
  | {
    type: 'CLOSE_MODAL'
  }
  | {
    type: "SET_MODAL_CONTENT";
    payload: ReactNode;
  };


export const UIContext = React.createContext<State | any>(initialState)

UIContext.displayName = 'UIContext'

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN_SIDEBAR': {
      return {
        ...state,
        displaySidebar: true,
      }
    }
    case 'CLOSE_SIDEBAR': {
      return {
        ...state,
        displaySidebar: false,
      }
    }
    case 'TOGGLE_SIDEBAR': {
      return {
        ...state,
        displaySidebar: !state.displaySidebar,
      }
    }
    case 'SHOW_LOADER': {
      return {
        ...state,
        displayLoader: true,
      }
    }
    case 'HIDE_LOADER': {
      return {
        ...state,
        displayLoader: false,
      }
    }
    case 'OPEN_MODAL': {
      return {
        ...state,
        displayModal: true,
      }
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        displayModal: false,
      }
    }
    case "SET_MODAL_CONTENT": {
      return {
        ...state,
        modalContent: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export const UIProvider: FC<{ children?: ReactNode }> = (props) => {

  const [state, dispatch] = React.useReducer(uiReducer, initialState)

  const openSidebar = useCallback(
    () => dispatch({ type: 'OPEN_SIDEBAR' }),
    [dispatch]
  )
  const closeSidebar = useCallback(
    () => dispatch({ type: 'CLOSE_SIDEBAR' }),
    [dispatch]
  )
  const toggleSidebar = useCallback(
    () => dispatch({ type: 'TOGGLE_SIDEBAR' }),
    [dispatch, state.displaySidebar]
  )
  const showLoader = useCallback(
    () => dispatch({ type: 'SHOW_LOADER' }),
    [dispatch]
  )
  const hideLoader = useCallback(
    () => dispatch({ type: 'HIDE_LOADER' }),
    [dispatch]
  )
  const openModal = useCallback(
    () => dispatch({ type: 'OPEN_MODAL' }),
    [dispatch]
  )
  const closeModal = useCallback(
    () => dispatch({ type: 'CLOSE_MODAL' }),
    [dispatch]
  )
  const setModalContent = useCallback(
    (content: ReactNode) =>
      dispatch({
        type: "SET_MODAL_CONTENT",
        payload: content,
      }),
    [dispatch]
  );

  const value = useMemo(
    () => ({
      ...state,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      showLoader,
      hideLoader,
      openModal,
      closeModal,
      setModalContent,
    }),
    [state]
  )

  return <UIContext.Provider value={value} {...props} />
}

export const useUI = () => {
  const context = useContext(UIContext)
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`)
  }
  return context
}

export const ManagedUIContext: FC<{children: any}> = ({ children }) => (
  <UIProvider>
    {children}
  </UIProvider>
)