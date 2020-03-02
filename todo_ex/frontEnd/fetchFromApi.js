const API_URL = 'http://localhost:3000/api/v1'
const NEWS_API_ENDPOINT = `${API_URL}/news`

const getWorkshops = async () => {
  try {
    let response = await fetch(NEWS_API_ENDPOINT)
    let data = await response.json()
    let news = data.news
    return news
  } catch (error) {
    console.log(`there was an error: ${error}`)
    return error
  }
}

const updateWorkshop = async news => {
  try {
    const { title, startDate, endDate, startTime, endTime, location, category, id } = news
    let response = await fetch(`${NEWS_API_ENDPOINT}/${parseInt(id)}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ title, startDate, endDate, startTime, endTime, location, category, id })
    })
    let data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.log(`there was an error: ${error}`)
    return error
  }
}

const deleteWorkshop = async id => {
  try {
    let response = await fetch(`${NEWS_API_ENDPOINT}/${parseInt(id)}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify()
    })
    data = await response.json()
    return data
  } catch (error) {
    console.log(`there was an error: ${error}`)
    return error
  }
}

const addWorkshop = async news => {
  try {
    const { title, startDate, endDate, startTime, endTime, location, category, id } = news
    let response = await fetch(NEWS_API_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ title, startDate, endDate, startTime, endTime, location, category, id })
    })
    let data = response.json()
    console.log(data)
    return data
  } catch (error) {
    console.log(`there was an error: ${error}`)
  }
}
