import React, { useState } from 'react';
import { Badge, Button, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Popover, Radio, RadioGroup, Typography } from "@mui/material";
import { FilterAlt, FilterList } from '@mui/icons-material';

//TODO create at, update at filter
const FilterCategory = ({ handleFilter }) => {
    const [filterMenu, setFilterMenu] = useState(null);
    const [filter, setFilter] = useState({ name: 0, createAt: 0, updateAt: 0 });
    const [isFilter, setIsFilter] = useState(false);

    const handleLangOnClose = () => {
        setFilterMenu(null);
    };

    const handleLangMenuClick = (e) => {
        setFilterMenu(e.currentTarget);
    };

    const handleFilterChange = (e) => {
        console.log(e.target.name);

        // setFilter({ name: Number(e.target.value) });
    }

    const handleFilterConfirm = () => {
        handleFilter(filter);
        setFilterMenu(null);
        setIsFilter(true);
    };

    const handleFilterReset = () => {
        handleFilter({});
        setFilter({ name: 0 });
        setFilterMenu(null);
        setIsFilter(false);
    }

    return (
        <>
            <IconButton color={isFilter ? "secondary" : "default"} onClick={handleLangMenuClick}>
                <Badge color="secondary" variant="dot" invisible={!isFilter}>
                    {isFilter ? <FilterAlt /> : <FilterList />}
                </Badge>
            </IconButton>

            <Popover
                anchorEl={filterMenu}
                open={!!filterMenu}
                onClose={handleLangOnClose}
                disableScrollLock={true}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Grid item sx={{ padding: 2 }}>
                    <Grid item sx={{ mb: 0 }}>
                        <Typography variant="h6">Filter Option</Typography>
                    </Grid>

                    <Grid item>
                        <FormControl>
                            <FormLabel>Category name</FormLabel>
                            <RadioGroup row name="name" value={filter.name} onChange={handleFilterChange}>
                                <FormControlLabel value={1} control={<Radio />} label="Ascending" />
                                <FormControlLabel value={-1} control={<Radio />} label="Descending" />
                            </RadioGroup>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Create at</FormLabel>
                            <RadioGroup row name="createAt" value={filter.createAt} onChange={handleFilterChange}>
                                <FormControlLabel value={1} control={<Radio />} label="Ascending" />
                                <FormControlLabel value={-1} control={<Radio />} label="Descending" />
                            </RadioGroup>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Update at</FormLabel>
                            <RadioGroup row name="updateAt" value={filter.updateAt} onChange={handleFilterChange}>
                                <FormControlLabel value={1} control={<Radio />} label="Ascending" />
                                <FormControlLabel value={-1} control={<Radio />} label="Descending" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>

                    <Grid container justifyContent="space-between">
                        <Button variant="outlined" color="error" size="small" onClick={handleFilterReset}>
                            Reset Filter
                        </Button>

                        <Button variant="contained" size="small" onClick={handleFilterConfirm}>
                            Apply Filter
                        </Button>
                    </Grid>
                </Grid>
            </Popover>
        </>
    )
}

export default FilterCategory
