import journalApi from '@/api/journalApi'

export const loadEntries = async ({commit}) => {
  const {data} = await journalApi.get('/entries.json')

  if(!data) {
    commit('setEntries', [])
    return
  }

  const entries = []
  //Dejamos de tener el objeto literal, y sacamos los datos necesarios
  for( let id of Object.keys(data)) {
    entries.push({
      id,
      ...data[id]
    })
  }
  commit('setEntries', entries)
}

export const updateEntry = async ({commit}, entry) => {
  const {artist, picture, title, text} = entry
  //payload que envío a la db
  const dataToSave = {artist, picture, title, text}

  const resp = await journalApi.put(`/entries/${entry.id}.json`, dataToSave)
  console.log(resp)

  //volvemos a usar el operador spread para que no pase como referencia
  commit('updateEntry', {...entry})
}

export const createEntry = async ({commit}, entry) => {
  const {artist, picture, title, text} = entry
  const dataToSave = {artist, picture, title, text}
  const {data} = await journalApi.post(`entries.json`, dataToSave)

  dataToSave.id = data.name
  commit('addEntry', dataToSave)

  return data.name
}

export const deleteEntry = async ({commit}, id) => {
  await journalApi.delete(`/entries/${id}.json`)

  commit('deleteEntry', id)
  return id
} 