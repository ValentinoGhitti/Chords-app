export const setEntries = (state, entries) => {
  //cambiamos el valor del state, desestructuramos el entries actual y esparcimos la nuevas entradas
  //en gaucho: Hacemos un nuevo arreglo, con los viejos valores más los nuevos valores
  state.entries = [ ...state.entries, ...entries]
  state.isLoading = false
}

export const updateEntry = (state, entry) => {
  //creo un nuevo arreglo donde estén solo los id's y busco cual es la entrada que coincida con el id, 
  const idx = state.entries.map( e => e.id).indexOf(entry.id)
  state.entries[idx] = entry
}

export const addEntry = (state, entry) => {
  //coloco al principio la entrada recibida por parametro, y el resto va a ir después
  state.entries = [entry, ...state.entries]
}

export const deleteEntry = (state, id) => {
  state.entries = state.entries.filter(entry => entry.id !== id)
}