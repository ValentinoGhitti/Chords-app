//Para llamar la función desde el compon. necesitamos pasar otra función como argumento
//De no hacerlo, nos daría error que getEntriesByTerm no es una función
export const getEntriesByTerm = ( state ) => ( term = '' ) => {
  //Si en el imput no hay ningún valor va a retornar todas las entradas
  if( term.length === 0 ) return state.entries
  //caso contrario, filtramos el arreglo para recibir un booleano, para saber si recibimos la entrada o no
  //pasamos a minuscula para que sea una busqueda insensible.
  //Compara lo que el usuario ingrese en el input, con la propiedad de nuestro state, para así filtrar los que tengan coincidencia
  return state.entries.filter(
    e => e.title.toLowerCase().includes( term.toLocaleLowerCase()) 
    || e.artist.toLowerCase().includes( term.toLocaleLowerCase())
  )
}

export const getEntryById = (state) => (id = '') => {
  //Buscamos desde nuestro state y solo va a regresar el que coincida con el callback en este caso el ID
  const entry = state.entries.find(entry => entry.id === id)

  if (!entry) return 
  //desestructuramos el objeto de la entreda para que la entrada no la mande por referencia, 
  //y así evitar modificar el state de forma directa
  return { ...entry }

}