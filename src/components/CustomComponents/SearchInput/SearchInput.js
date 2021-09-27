import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton, TextField } from '@mui/material';
import { Clear, Search } from '@mui/icons-material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';

const SearchInput = ({ func, title }) => {
    const [search, setSearch] = useState("");
    const { t } = useTranslation();

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchClear = () => {
        setSearch("");
    }

    const handleSearchConfirm = () => {
        func(search);
        // setTimeout(() => setSearch(""), 500);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <TextField
                label={title || t("search")}
                size="small"
                InputProps={{
                    endAdornment: <IconButton size="small" onClick={handleSearchClear}><Clear fontSize="small" /></IconButton>
                }}
                value={search}
                onChange={handleSearch}
            />

            <Button variant="outlined" size="small" onClick={handleSearchConfirm} sx={{ marginLeft: 2 }}>
                <Search />
            </Button>
        </Box>
    )
}

SearchInput.propTypes = {
    func: PropTypes.func.isRequired,
    title: PropTypes.string,
}

export default SearchInput;
