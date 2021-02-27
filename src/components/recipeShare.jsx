export function recipeShare (
  const share(pathname, setShared) {
    const twoSeconds = 2000;
    copy(`http://localhost:3000${pathname}`);
    setShared(true);
    setTimeout(() => setShared(false), twoSeconds);
  }
  
  const recipesShare = (pathname, setShared) => (
    <div>
      <button
        data-testid="share-btn"
        onClick={ () => share(pathname, setShared) }
        type="button"
        className=""
      >
        <img src={ shareIcon } alt="share" />
      </button>
    </div>
  );
)