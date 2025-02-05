import { useState, useEffect } from 'react';
import { Box, TextField, InputAdornment, Autocomplete } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import './Searchbar.css';

function Searchbar({ lst }) {
    const [input, setInput] = useState('');
    const [list, setList] = useState([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        // Map over inventory items to extract item names
        const sanitizedList = Array.isArray(lst) ? lst.map(item => item.itemName).filter(name => typeof name === 'string') : [];
        setList(sanitizedList);
    }, [lst]);

    const handleSelect = (event, value) => {
        if (typeof value === 'string') {
            const selectedItem = lst.find(item => item.itemName.toLowerCase() === value.toLowerCase());
            if (selectedItem) {
                // Navigate to the inventory item details page
                navigate(`/inventory/${selectedItem.itemId}`);
            }
        }
    };

    return (
        <Box className="searchbar-container">
            <Autocomplete
                freeSolo
                options={filteredSuggestions}
                inputValue={input}
                onInputChange={(event, newInputValue) => {
                    setInput(newInputValue);
                    const filtered = list.filter(name =>
                        name.toLowerCase().includes(newInputValue.toLowerCase())
                    );
                    setFilteredSuggestions(filtered);
                }}
                onChange={handleSelect}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        placeholder="Search for inventory item"
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            className: 'searchbar-input',
                        }}
                        className="searchbar-textfield"
                    />
                )}
                sx={{ width: '100%' }}
            />
        </Box>
    );
}

export default Searchbar;
