const SearchBar = ({ handleSearch }) => (
    <div>
        Find country <input type="text" onChange={handleSearch} />
    </div>
)

export default SearchBar