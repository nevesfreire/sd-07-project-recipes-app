import { useContext, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import context from '../contextAPI/context';
import { fetchApi } from '../services/fetchApi';
import siteMap from '../helpers/siteMap';

const useCall = async (url, page) => {
  const { state, setState, RecipesUrl, setRecipesUrl } = useContext(context);
  // const [RecipesUrl, setRecipesUrl] = useState('');
  // const history = useHistory();

  setState((s) => ({
    ...s,
    profileButton: siteMap[page].profileButton,
    title: siteMap[page].title,
    searchButton: siteMap[page].searchButton,
    toggleSearch: false,
  }));

  const ListCards = () => {
    const { state, setState } = useContext(context);
    const [recipes, setRecipes] = useState();
    const history = useHistory();
    const { location: { pathname } } = history;
    const { data } = state;
    const maxRecipesNumber = 12;
  
    useEffect(() => {
      newFunc(pathname, setState, data);
    }, [pathname]);
  useEffect(() => {
    if (RecipesUrl !== '') {
      fetchApi(RecipesUrl)
        .then((r) => setState((s) => ({ ...s, data: r })));
    }
  }, [RecipesUrl, setState]);

  return [state, setRecipesUrl];
  // history.push(`/${page}`);
};

export default useCall;
