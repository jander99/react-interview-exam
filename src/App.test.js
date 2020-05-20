import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { waitFor, within } from '@testing-library/dom'
import { act } from 'react-dom/test-utils'
import axios from 'axios'
import App from './App'

jest.mock('axios')

const mockData = [{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "suite": "Apt. 556",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phone": "1-770-736-8031 x56442",
  "website": "hildegard.org",
  "company": {
    "name": "Romaguera-Crona",
    "catchPhrase": "Multi-layered client-server neural-net",
    "bs": "harness real-time e-markets"
  }
},
{
  "id": 2,
  "name": "Ervin Howell",
  "username": "Antonette",
  "email": "Shanna@melissa.tv",
  "address": {
    "street": "Victor Plains",
    "suite": "Suite 879",
    "city": "Wisokyburgh",
    "zipcode": "90566-7771",
    "geo": {
      "lat": "-43.9509",
      "lng": "-34.4618"
    }
  },
  "phone": "010-692-6593 x09125",
  "website": "anastasia.net",
  "company": {
    "name": "Deckow-Crist",
    "catchPhrase": "Proactive didactic contingency",
    "bs": "synergize scalable supply-chains"
  }
}
]

beforeEach(() => {
  jest.clearAllMocks()
})

describe('Build the search page', () => {
  test('Renders Search text', () => {
    const { getByText, getByTestId } = render(<App />)
    const searchText = getByText(/Please search by Username:/i)
    expect(searchText).toBeInTheDocument()

    const searchBox = getByTestId('searchBox')
    expect(searchBox).toBeInTheDocument()


    const resultsDiv = getByTestId('resultsDiv')
    expect(resultsDiv).toBeInTheDocument()
  })

  test('Types in the search box', () => {
    const { getByTestId } = render(<App />)
    const searchBox = getByTestId('searchBox')
    expect(searchBox.value).toBe('')

    fireEvent.change(searchBox, { target: { value: 'Br' } })
    expect(searchBox.value).toBe('Br')
  })

  test('Display nothing if only one character is entered', () => {
    const { getByTestId } = render(<App />)
    const searchBox = getByTestId('searchBox')

    fireEvent.change(searchBox, { target: { value: 'B' } })
    expect(searchBox.value).toBe('B')

    const resultsDiv = getByTestId('resultsDiv')
    expect(resultsDiv.children).toHaveLength(0)

  })

  test('Displays Search results from API filtered', async () => {

    axios.get.mockResolvedValueOnce({ data: mockData })

    const { getByTestId } = render(<App />)

    await waitFor(() => axios.get)

    await act(async () => fireEvent.change(getByTestId('searchBox'), { target: { value: 'Br' } }))
    expect(axios.get).toHaveBeenCalledTimes(1)

    const { getByText } = within(getByTestId('resultsDiv'))

    expect(getByText(/Bret/)).toBeInTheDocument()

  })

  test('Errors on Axios Call', async () => {

    axios.get.mockRejectedValueOnce(new Error('Mock Error'))

    const { getByTestId } = render(<App />)

    await waitFor(() => axios.get)

    await act(async () => fireEvent.change(getByTestId('searchBox'), { target: { value: 'Br' } }))

    expect(axios.get).toHaveBeenCalledTimes(1)
  })

})
