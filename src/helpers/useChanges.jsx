import { useContext } from 'react';
import context from '../contextAPI/context';

function UseChanges({ target: { name, value } }) {
  const { state, setState } = useContext(context);
  setState({ ...state, [name]: value });
}

// function useChanges() {
//   const { state, setState } = useContext(context);
  



 
// }

// const getHandle = ({ target: { name, value } }) => {
//   setState({ ...state, [name]: value });
// }
// /*
// useEffect(() => {
//   const { name } = filters.filterByName;

//   if (name) {
//     const nameFilter = new RegExp(`\\w*${name}\\w*`, 'i');
//     const fPlanets = planets.filter((planet) => nameFilter.test(planet.name));
//     setFilteredPlanets(fPlanets);
//   } else {
//     setFilteredPlanets(planets);
//   }
// }, [filters]);

// export default useFilter;
//  */
// // function handleClick(email, senha) {

// //   setState()
// // }

export default UseChanges;
